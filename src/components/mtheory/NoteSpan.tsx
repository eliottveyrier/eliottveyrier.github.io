import { Note, type NoteLiteral } from "tonal";

import {
    noteColorClass,
} from "../../lib/music/noteColors";

import {
    instrumentColorClass,
    type InstrumentCategory,
} from "../../lib/music/instrumentColors";

import "../../lib/music/noteColors.css";
import "../../lib/music/instrumentColors.css";
import "./NoteSpan.css";

interface Props {
    note: NoteLiteral;

    colorRoot?: NoteLiteral;

    colorBy?: "note" | "instrument";

    instrumentCategory?: InstrumentCategory;

    noColor?: boolean;

    highlighted?: boolean;

    className?: string;
}

function formatAlteration(alt: number): string {
    switch (alt) {
        case 1:
            return "♯";

        case 2:
            return "x";

        case -1:
            return "♭";

        case -2:
            return "𝄫";

        default:
            return "";
    }
}

export default function NoteSpan({
    note,
    colorRoot = "C",
    colorBy = "note",
    instrumentCategory,
    noColor = false,
    highlighted = false,
    className = "",
}: Props) {
    const parsedNote = Note.get(note);

    const colorClass =
        !noColor && colorBy === "note"
            ? noteColorClass(note, colorRoot)
            : !noColor &&
                colorBy === "instrument" &&
                instrumentCategory
                ? instrumentColorClass(instrumentCategory)
                : undefined;

    const classes = [
        "note-span",
        colorClass,
        noColor && "note-span--no-color",
        highlighted && "note-span--highlighted",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <span className={classes}>
            <span className="note-span__letter">
                {parsedNote.letter}
                {formatAlteration(parsedNote.alt)}
            </span>

            {parsedNote.oct !== undefined && (
                <span className="note-span__octave">
                    {parsedNote.oct}
                </span>
            )}
        </span>
    );
}