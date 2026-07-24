import {
    categoryColorVariations,
    type InstrumentCategory,
} from "./instrumentColors";


const COLUMN_COUNT = 16;
const VARIATION_COUNT = 6;


const ORCHESTRAL_ORDER: InstrumentCategory[] = [
    "woodwinds",
    "brass",
    "horns",
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
   RGB → relative luminance
============================================================ */

/*
 * Calculate perceived brightness using
 * the sRGB relative luminance formula.
 *
 * Green contributes more strongly to perceived
 * brightness than red, and blue contributes less.
 */
function hexToLuminance(
    hex: string,
): number {
    const value =
        normalizeHex(hex);

    const channels = [
        parseInt(
            value.slice(0, 2),
            16,
        ) / 255,

        parseInt(
            value.slice(2, 4),
            16,
        ) / 255,

        parseInt(
            value.slice(4, 6),
            16,
        ) / 255,
    ].map(
        channel =>
            channel <= 0.03928
                ? channel / 12.92
                : Math.pow(
                    (
                        channel +
                        0.055
                    ) / 1.055,
                    2.4,
                ),
    );

    return (
        0.2126 * channels[0] +
        0.7152 * channels[1] +
        0.0722 * channels[2]
    );
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
   Column sorting
============================================================ */

/*
 * Sort colors from brightest to darkest
 * according to their perceived luminance.
 *
 * This is preferable to sorting by HSL lightness,
 * since HSL lightness does not account for the fact
 * that colors such as yellow appear much brighter
 * than colors such as blue at the same HSL lightness.
 *
 * A copy is returned so the original palette
 * arrays are not mutated.
 */
function sortLightToDark(
    colors: string[],
): string[] {
    return [
        ...colors,
    ].sort(
        (
            a,
            b,
        ) =>
            hexToLuminance(b) -
            hexToLuminance(a),
    );
}


/* ============================================================
   Orchestral category columns
============================================================ */

/*
 * Generate a controlled six-step gradient from
 * the category's base color.
 *
 * The hue shifts subtly through the column.
 * Saturation is increased to keep the colors vivid.
 *
 * The final palette is sorted by perceived luminance
 * rather than by the generated HSL lightness values.
 */
function categoryPalette(
    category: InstrumentCategory,
): string[] {
    const base =
        categoryColorVariations[
            category
        ];

    const hsl =
        hexToHsl(base);

    const saturation =
        Math.min(
            100,
            hsl.s * 1.25,
        );

    return sortLightToDark([
        /*
         * Light
         */
        hslToHex(
            hsl.h - 4,
            Math.min(
                100,
                saturation * 0.70,
            ),
            70,
        ),

        /*
         * Medium-light
         */
        hslToHex(
            hsl.h - 2,
            Math.min(
                100,
                saturation * 0.88,
            ),
            58,
        ),

        /*
         * Category color
         */
        hslToHex(
            hsl.h,
            saturation,
            hsl.l,
        ),

        /*
         * Saturated dark
         */
        hslToHex(
            hsl.h + 2,
            Math.min(
                100,
                saturation * 1.15,
            ),
            42,
        ),

        /*
         * Rich dark
         */
        hslToHex(
            hsl.h + 4,
            Math.min(
                100,
                saturation * 1.25,
            ),
            35,
        ),

        /*
         * Deep, saturated color
         */
        hslToHex(
            hsl.h + 6,
            Math.min(
                100,
                saturation * 1.30,
            ),
            29,
        ),
    ]);
}


/* ============================================================
   Neutral gray gradient
============================================================ */

function grayPalette(): string[] {
    return [
        "#E0E0E0",
        "#B8B8B8",
        "#909090",
        "#686868",
        "#404040",
        "#181818",
    ];
}


/* ============================================================
   Missing hue columns
============================================================ */

const ACCENT_COLORS = [
    /*
     * Vibrant pink
     */
    "#F50057",

    /*
     * Apple green
     */
    "#55C900",

    /*
     * Very saturated blue
     */
    "#0057FF",

    /*
     * Very saturated red
     */
    "#F00000",
];


function accentPalette(
    color: string,
): string[] {
    return [
        adjustColor(
            color,
            {
                saturation: 4,
                lightness: 22,
            },
        ),

        adjustColor(
            color,
            {
                saturation: 2,
                lightness: 11,
            },
        ),

        color,

        adjustColor(
            color,
            {
                saturation: 4,
                lightness: -11,
            },
        ),

        adjustColor(
            color,
            {
                saturation: 8,
                lightness: -22,
            },
        ),

        adjustColor(
            color,
            {
                saturation: 12,
                lightness: -33,
            },
        ),
    ];
}


/* ============================================================
   Tangerine hue gradient
============================================================ */

function tangerinePalette(): string[] {
    return [
        "#F04400",
        "#F75C00",
        "#FF7500",
        "#FF8C00",
        "#FFA500",
        "#FFB800",
    ];
}


/* ============================================================
   Blue → green gradient
============================================================ */

/*
 * This column intentionally progresses through hue:
 *
 *     blue
 *        ↓
 *     blue-cyan
 *        ↓
 *     cyan-teal
 *        ↓
 *     teal
 *        ↓
 *     green
 *        ↓
 *     apple green
 *
 * Unlike the instrument and accent columns,
 * this is not sorted by luminance.
 */
function blueGreenPalette(): string[] {
    return [
        "#2457D6",
        "#247CCB",
        "#229DB5",
        "#20B39A",
        "#36B86A",
        "#63B82E",
    ];
}


/* ============================================================
   Public API
============================================================ */

export function makeStudioOneColorPalette(): string[] {
    const columns = [
        /*
         * Instrument categories
         */
        ...ORCHESTRAL_ORDER.map(
            category =>
                categoryPalette(
                    category,
                ),
        ),

        /*
         * Neutral gray gradient
         */
        grayPalette(),

        /*
         * Missing hue families
         */
        ...ACCENT_COLORS.map(
            color =>
                sortLightToDark(
                    accentPalette(
                        color,
                    ),
                ),
        ),

        /*
         * Tangerine:
         *
         * red-orange → yellow-orange
         */
        tangerinePalette(),

        /*
         * Blue → green
         */
        blueGreenPalette(),
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