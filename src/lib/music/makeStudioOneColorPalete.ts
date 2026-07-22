// src/lib/makeStudioOneColorPalette.ts

import {
    categoryColorVariations,
    type InstrumentCategory,
} from "./instrumentColors";

const COLUMN_COUNT = 16;
const VARIATION_COUNT = 6;

const ORCHESTRAL_ORDER: InstrumentCategory[] = [
    "woodwinds",
    "brass",
    "strings",
    "percussion",
    "keyboards",
    "voices",
    "synths",
    "fx",
];

type Hsl = {
    h: number;
    s: number;
    l: number;
};


/* ============================================================
   Color conversion
============================================================ */

function normalizeHex(
    color: string,
): string {
    const hex = color
        .replace(/^#/, "")
        .toUpperCase();

    if (
        hex.length !== 6 &&
        hex.length !== 8
    ) {
        throw new Error(
            `Invalid color format: ${color}`,
        );
    }

    // Always return RGB, dropping alpha if present.
    return hex.slice(-6);
}


function toStudioOneColor(
    color: string,
): string {
    return `FF${normalizeHex(color)}`;
}


function hexToHsl(
    hex: string,
): Hsl {
    const value =
        normalizeHex(hex);

    const r =
        parseInt(
            value.slice(0, 2),
            16,
        ) / 255;

    const g =
        parseInt(
            value.slice(2, 4),
            16,
        ) / 255;

    const b =
        parseInt(
            value.slice(4, 6),
            16,
        ) / 255;

    const max =
        Math.max(r, g, b);

    const min =
        Math.min(r, g, b);

    const l =
        (max + min) / 2;

    if (max === min) {
        return {
            h: 0,
            s: 0,
            l: l * 100,
        };
    }

    const d =
        max - min;

    const s =
        l > 0.5
            ? d / (2 - max - min)
            : d / (max + min);

    let h: number;

    switch (max) {
        case r:
            h =
                (g - b) / d +
                (g < b ? 6 : 0);
            break;

        case g:
            h =
                (b - r) / d +
                2;
            break;

        default:
            h =
                (r - g) / d +
                4;
            break;
    }

    return {
        h: (h / 6) * 360,
        s: s * 100,
        l: l * 100,
    };
}


function hslToStudioOneHex(
    h: number,
    s: number,
    l: number,
): string {
    s /= 100;
    l /= 100;

    const k = (n: number) =>
        (n + h / 30) % 12;

    const a =
        s * Math.min(l, 1 - l);

    const f = (n: number) =>
        l -
        a *
            Math.max(
                -1,
                Math.min(
                    k(n) - 3,
                    Math.min(
                        9 - k(n),
                        1,
                    ),
                ),
            );

    const toHex = (
        value: number,
    ) =>
        Math.round(value * 255)
            .toString(16)
            .padStart(2, "0")
            .toUpperCase();

    return [
        "FF",
        toHex(f(0)),
        toHex(f(8)),
        toHex(f(4)),
    ].join("");
}


/* ============================================================
   Color variations
============================================================ */

function adjustColor(
    color: string,
    {
        hue = 0,
        saturation = 0,
        lightness = 0,
    }: {
        hue?: number;
        saturation?: number;
        lightness?: number;
    },
): string {
    const hsl =
        hexToHsl(color);

    return hslToStudioOneHex(
        (
            hsl.h +
            hue +
            360
        ) % 360,

        Math.max(
            0,
            Math.min(
                100,
                hsl.s +
                    saturation,
            ),
        ),

        Math.max(
            0,
            Math.min(
                100,
                hsl.l +
                    lightness,
            ),
        ),
    );
}


function categoryPalette(
    category: InstrumentCategory,
): string[] {
    const high =
        categoryColorVariations[
            `${category}_hi`
        ];

    const base =
        categoryColorVariations[
            category
        ];

    const low =
        categoryColorVariations[
            `${category}_lo`
        ];

    return [
        high,

        adjustColor(high, {
            lightness: 10,
            saturation: -12,
        }),

        base,

        adjustColor(base, {
            lightness: -5,
            saturation: 12,
        }),

        low,

        adjustColor(low, {
            lightness: -10,
            saturation: 10,
        }),
    ];
}


/* ============================================================
   Padding
============================================================ */

function makePaddingColumn(): string[] {
    return [
        "FF303030",
        "FF404040",
        "FF505050",
        "FF606060",
        "FF707070",
        "FF808080",
    ];
}


/* ============================================================
   Public API
============================================================ */

export function makeStudioOneColorPalette(): string[] {
    const columns =
        ORCHESTRAL_ORDER.map(
            category =>
                categoryPalette(
                    category,
                ),
        );

    while (
        columns.length <
        COLUMN_COUNT
    ) {
        columns.push(
            makePaddingColumn(),
        );
    }

    const palette: string[] = [];

    for (
        let row = 0;
        row < VARIATION_COUNT;
        row++
    ) {
        for (
            let column = 0;
            column < COLUMN_COUNT;
            column++
        ) {
            palette.push(
                columns[column][row],
            );
        }
    }

    /*
     * Normalize the final result.
     *
     * This guarantees that every single output
     * is Studio One's opaque ARGB format:
     *
     *     FFRRGGBB
     */
    return palette.map(
        toStudioOneColor,
    );
}