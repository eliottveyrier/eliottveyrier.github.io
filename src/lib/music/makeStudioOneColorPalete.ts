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
   Color normalization
============================================================ */

function normalizeHex(
    color: string,
): string {
    const hex =
        color
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

    /*
     * Internally, all colors are standard RGB:
     *
     *     RRGGBB
     *
     * If an alpha channel is provided, discard it.
     */
    return hex.slice(-6);
}


/* ============================================================
   RGB → HSL
============================================================ */

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
        Math.max(
            r,
            g,
            b,
        );

    const min =
        Math.min(
            r,
            g,
            b,
        );

    const l =
        (max + min) / 2;

    if (
        max === min
    ) {
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
            ? d /
                (2 - max - min)
            : d /
                (max + min);

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


/* ============================================================
   HSL → RGB
============================================================ */

function hslToHex(
    h: number,
    s: number,
    l: number,
): string {
    s /= 100;
    l /= 100;

    const k = (
        n: number,
    ) =>
        (
            n +
            h / 30
        ) % 12;

    const a =
        s *
        Math.min(
            l,
            1 - l,
        );

    const f = (
        n: number,
    ) =>
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
        Math.round(
            value * 255,
        )
            .toString(16)
            .padStart(
                2,
                "0",
            )
            .toUpperCase();

    return [
        toHex(f(0)),
        toHex(f(8)),
        toHex(f(4)),
    ].join("");
}


/* ============================================================
   Studio One color format
============================================================ */

/*
 * Internal color format:
 *
 *     RRGGBB
 *
 * Studio One format:
 *
 *     ABGR
 *
 * For opaque colors:
 *
 *     FFBBGGRR
 *
 * Example:
 *
 *     #9AD0ED
 *
 *     R = 9A
 *     G = D0
 *     B = ED
 *     A = FF
 *
 *     → FFEDD09A
 */
function toStudioOneColor(
    color: string,
): string {
    const hex =
        normalizeHex(color);

    const r =
        hex.slice(0, 2);

    const g =
        hex.slice(2, 4);

    const b =
        hex.slice(4, 6);

    return `FF${b}${g}${r}`;
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

    return hslToHex(
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


/* ============================================================
   Orchestral category columns
============================================================ */

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

    /*
     * All colors remain standard RGB here.
     */
    return [
        /*
         * High register
         */
        high,

        adjustColor(
            high,
            {
                hue: 8,
                saturation: -18,
                lightness: 12,
            },
        ),

        /*
         * Main category
         */
        base,

        adjustColor(
            base,
            {
                hue: -6,
                saturation: 18,
                lightness: -8,
            },
        ),

        /*
         * Low register
         */
        low,

        adjustColor(
            low,
            {
                hue: -10,
                saturation: 20,
                lightness: -12,
            },
        ),
    ];
}


/* ============================================================
   Secondary accent columns
============================================================ */

const ACCENT_COLORS = [
    "#E85D75",
    "#F28E5C",
    "#E6C84A",
    "#7FBE6A",
    "#4FAF9B",
    "#55A9D6",
    "#6977D8",
    "#A66BC4",
];


function accentPalette(
    color: string,
): string[] {
    /*
     * All colors remain standard RGB here.
     */
    return [
        adjustColor(
            color,
            {
                saturation: 8,
                lightness: 18,
            },
        ),

        adjustColor(
            color,
            {
                hue: 8,
                saturation: -8,
                lightness: 8,
            },
        ),

        color,

        adjustColor(
            color,
            {
                hue: -6,
                saturation: 12,
                lightness: -6,
            },
        ),

        adjustColor(
            color,
            {
                hue: -10,
                saturation: 18,
                lightness: -16,
            },
        ),

        adjustColor(
            color,
            {
                hue: 12,
                saturation: 24,
                lightness: -24,
            },
        ),
    ];
}


/* ============================================================
   Public API
============================================================ */

export function makeStudioOneColorPalette(): string[] {
    const columns = [
        ...ORCHESTRAL_ORDER.map(
            category =>
                categoryPalette(
                    category,
                ),
        ),

        ...ACCENT_COLORS.map(
            color =>
                accentPalette(
                    color,
                ),
        ),
    ];

    const palette: string[] = [];

    /*
     * Studio One fills the palette:
     *
     *     left → right
     *     then top → bottom
     *
     * Transpose the column-oriented palette
     * into row-major order.
     */
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
     * Convert from standard RGB to Studio One ABGR.
     *
     * RRGGBB
     *     ↓
     * FFBBGGRR
     */
    return palette.map(
        toStudioOneColor,
    );
}


export function studioOneToCssColor(
    color: string,
): string {
    const hex =
        color
            .replace(/^#/, "")
            .toUpperCase();

    if (
        hex.length !== 8
    ) {
        throw new Error(
            `Invalid Studio One color format: ${color}`,
        );
    }

    /*
     * Studio One format:
     *
     *     A B G R
     *
     *     FF BB GG RR
     *
     * CSS format:
     *
     *     #RRGGBB
     */
    const r =
        hex.slice(6, 8);

    const g =
        hex.slice(4, 6);

    const b =
        hex.slice(2, 4);

    return `#${r}${g}${b}`;
}