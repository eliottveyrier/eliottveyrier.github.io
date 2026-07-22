import { Chord, Note, RomanNumeral } from "tonal";

import {
    noteColorClass,
} from "../../lib/music/noteColors";

import {
    instrumentColorClass,
    type InstrumentCategory,
} from "../../lib/music/instrumentColors";

import "../../lib/music/noteColors.css";
import "../../lib/music/instrumentColors.css";
import "./ChordSpan.css";

interface Props {
    chord: string;

    colorRoot?: string;

    colorBy?: "note" | "instrument";

    instrumentCategory?: InstrumentCategory;

    romanNumeral?: boolean;

    noColor?: boolean;

    showArrow?: boolean;

    highlighted?: boolean;

    verbose?: boolean;

    className?: string;
}

export default function ChordSpan({
    chord,
    colorRoot = "C",
    colorBy = "note",
    instrumentCategory,
    romanNumeral = false,
    noColor = false,
    highlighted = false,
    verbose = false,
    showArrow = false,
    className = "",
}: Props) {
    const parsedChord = Chord.get(chord);

    const parsedRomanNumeral = romanNumeral
        ? RomanNumeral.get(chord)
        : undefined;

    const colorClass =
        !noColor && colorBy === "note"
            ? romanNumeral && parsedRomanNumeral?.interval
                ? noteColorClass(
                    Note.transpose(
                        colorRoot,
                        parsedRomanNumeral.interval
                    )
                )
                : parsedChord.tonic
                    ? noteColorClass(
                        parsedChord.tonic,
                        colorRoot
                    )
                    : undefined
            : !noColor &&
                colorBy === "instrument" &&
                instrumentCategory
                ? instrumentColorClass(instrumentCategory)
                : undefined;

    const classes = [
        "chord-span",
        colorClass,
        noColor && "chord-span--no-color",
        highlighted && "chord-span--highlighted",
        showArrow && "chord-span--arrow",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const displayChord = verbose
        ? romanNumeral
            ? parsedRomanNumeral?.name ?? chord
            : parsedChord.name
        : chord;

    const title = romanNumeral
        ? parsedRomanNumeral?.name ?? chord
        : parsedChord.name;

    return (
        <span
            className={classes}
            title={title}
        >
            {displayChord}
        </span>
    );
}