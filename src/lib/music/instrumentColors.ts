export type InstrumentCategory =
    | "woodwinds"
    | "brass"
    | "strings"
    | "percussion"
    | "keyboards"
    | "voices"
    | "fx"
    | "synths";


export type InstrumentColorClass =
    | "instrument-color-woodwinds"
    | "instrument-color-brass"
    | "instrument-color-strings"
    | "instrument-color-percussion"
    | "instrument-color-keyboards"
    | "instrument-color-voices"
    | "instrument-color-synths"
    | "instrument-color-fx";


const INSTRUMENT_COLOR_CLASSES: Record<
    InstrumentCategory,
    InstrumentColorClass
> = {
    woodwinds: "instrument-color-woodwinds",
    brass: "instrument-color-brass",
    strings: "instrument-color-strings",
    percussion: "instrument-color-percussion",
    keyboards: "instrument-color-keyboards",
    voices: "instrument-color-voices",
    synths: "instrument-color-synths",
    fx: "instrument-color-fx",

};

export function instrumentColorClass(
    category: InstrumentCategory,
): InstrumentColorClass {
    return INSTRUMENT_COLOR_CLASSES[category];
}

export const categoryInstrumentColors: Record<
    InstrumentCategory,
    string
> = {
    woodwinds:  "#B47A4A",
    brass:      "#D9A441",
    strings:    "#C94A4A",
    percussion: "#4F82B8",
    keyboards:  "#5FA66A",
    voices:     "#D9A6B5",
    synths:     "#9A63C7",
    fx:         "#A1B5D8",
};

export const categoryColorVariations: Record<
    string,
    string
> = {
    /*
     * ============================================================
     * Woodwinds
     * ============================================================
     */

    woodwinds_hi: "#D09A63",
    woodwinds:    "#B47A4A",
    woodwinds_lo: "#96603F",

    /*
     * ============================================================
     * Brass
     * ============================================================
     */

    brass_hi: "#F0C968",
    brass:    "#D9A441",
    brass_lo: "#A87829",

    /*
     * ============================================================
     * Strings
     * ============================================================
     */

    strings_hi: "#E06A6A",
    strings:    "#C94A4A",
    strings_lo: "#A93636",

    /*
     * ============================================================
     * Percussion
     * ============================================================
     */

    percussion_hi: "#6D9AC8",
    percussion:    "#4F82B8",
    percussion_lo: "#416F9F",

    /*
     * ============================================================
     * Keyboards
     * ============================================================
     */

    keyboards_hi: "#72B87B",
    keyboards:    "#5FA66A",
    keyboards_lo: "#4B8955",

    /*
     * ============================================================
     * Voices
     * ============================================================
     */

    voices_hi: "#E4B9C7",
    voices:    "#D9A6B5",
    voices_lo: "#B9798F",

    /*
     * ============================================================
     * Synths
     * ============================================================
     */

    synths_hi: "#B77BD8",
    synths:    "#9A63C7",
    synths_lo: "#7544A5",

    /*
     * ============================================================
     * FX
     * ============================================================
     */

    fx_hi: "#C7D5E8",
    fx:    "#A1B5D8",
    fx_lo: "#7188AA",
};

export const detailedInstrumentColors: Record<string, string> = {
    /*
     * ============================================================
     * Woodwinds
     * ============================================================
     */

    piccolo:              "#D9A66E",
    flute:                "#D09A63",
    alto_flute:           "#B47A4A",
    bass_flute:           "#96603F",

    oboe:                 "#C98959",
    oboe_d_amore:         "#B9764C",
    english_horn:         "#965C3C",
    heckelphone:          "#70452F",

    e_flat_clarinet:      "#D49B60",
    clarinet:             "#C98D5C",
    bass_clarinet:        "#965E3E",
    contrabass_clarinet:  "#70452F",

    bassoon:              "#8D593A",
    contrabassoon:        "#633D2C",

    /*
     * ============================================================
     * Brass
     * ============================================================
     */

    piccolo_trumpet:      "#F2D98B",
    trumpet:              "#E8C269",
    cornet:               "#D9A441",
    flugelhorn:           "#C38D35",

    french_horn:          "#D9A441",
    tenor_horn:           "#C08B32",
    wagner_tuba:          "#A87829",

    alto_trombone:        "#D1A044",
    trombone:             "#B8862F",
    bass_trombone:        "#9A7026",
    contrabass_trombone:  "#76531E",

    euphonium:            "#A87929",
    tuba:                 "#79551F",
    contrabass_tuba:      "#5C401A",

    /*
     * ============================================================
     * Strings
     * ============================================================
     */

    violin:               "#E06A6A",
    viola:                "#C94A4A",
    cello:                "#A93636",
    double_bass:          "#762A2D",

    harp:                 "#C94A4A",
    concert_harp:         "#C94A4A",

    /*
     * ============================================================
     * Percussion
     * ============================================================
     */

    crotales:             "#9CBDE0",
    glockenspiel:         "#87ADD5",
    celesta:              "#79A3D0",

    triangle:             "#80A8D2",
    suspended_cymbal:     "#6E9BC9",
    cymbals:              "#5D8FC3",

    xylophone:            "#6594C2",
    vibraphone:           "#5A88BA",
    marimba:              "#4F82B8",

    tubular_bells:        "#4A7CAF",

    tambourine:           "#6D9AC8",
    castanets:            "#82A8CE",
    claves:               "#709BC5",
    wood_block:           "#5D8FC3",
    maracas:              "#7FA9D2",
    shaker:               "#8AAFD4",

    snare_drum:           "#5687B8",
    tenor_drum:           "#4F82B8",
    concert_toms:         "#416F9F",
    tom_toms:             "#3C6A99",

    timpani:              "#3B6898",
    bass_drum:            "#315C8A",
    tam_tam:              "#294D76",

    /*
     * ============================================================
     * Keyboards
     * ============================================================
     */

    clavichord:           "#8CCB91",
    grand_piano:          "#72B87B",
    piano:                "#6BAF73",
    upright_piano:        "#5FA66A",
    prepared_piano:       "#4B8955",

    harpsichord:          "#78B77D",
    accordion:            "#5B9E68",

    reed_organ:           "#63A86C",
    harmonium:            "#559660",
    organ:                "#4B8955",
    pipe_organ:           "#3B7045",
    church_organ:         "#32613D",

    /*
     * ============================================================
     * Voices
     * ============================================================
     */

    soprano:              "#F0D3DC",
    mezzo_soprano:        "#E4B9C7",
    alto:                 "#D9A6B5",
    contralto:             "#C88FA2",

    countertenor:         "#E0B3C2",
    tenor:                "#C98FA2",
    baritone:             "#B9798F",
    bass:                 "#965C70",

    childrens_choir:      "#F0D3DC",
    female_choir:         "#E4B9C7",
    mixed_choir:          "#D9A6B5",
    male_choir:           "#B9798F",
    choir:                "#D9A6B5",

    /*
     * ============================================================
     * Synths
     * ============================================================
     */

    lead_synth:           "#B77BD8",
    pluck_synth:          "#A96ACD",
    fm_synth:             "#A260C5",

    pad_synth:            "#9A63C7",
    wavetable_synth:      "#9059BE",
    analog_synth:         "#8752B5",

    string_synth:         "#7F4BAE",
    modular_synth:        "#7544A5",
    digital_synth:        "#6E3D9A",

    bass_synth:           "#633687",
    sub_synth:            "#542F70",

    /*
     * ============================================================
     * FX
     * ============================================================
     */

    air:                  "#C7D5E8",
    wind:                 "#BFD0E6",
    noise:                "#B4C7E0",

    rain:                 "#A9BFDC",
    water:                "#9FB8D7",
    texture:              "#A1B5D8",

    whoosh:               "#9AAFD0",
    riser:                "#91A7C9",

    impact:               "#8299BB",
    explosion:            "#7188AA",
    thunder:              "#627A9E",

    sub_drop:             "#506889",
};