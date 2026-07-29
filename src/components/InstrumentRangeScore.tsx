import type { ComponentProps } from "preact";
import { Note } from "tonal";

import Abcjs from "./AbcJs";
import { noteToAbc } from "../lib/music/noteToAbc";

export type Clef =
    | "treble"
    | "bass";

export interface RangeNote {
    note: string;
    clef: Clef;
    octava?: 1 | -1;
}

interface InstrumentRangeScoreProps
    extends ComponentProps<"div"> {
    range: RangeNote[];
}

export default function InstrumentRangeScore({
    range,
    ...divProps
}: InstrumentRangeScoreProps) {
    let previousClef: Clef | undefined;
    let previousOctava: 1 | -1 | undefined;

    const abcNotes = range
        .map(({ note, clef, octava }) => {
            const clefChange =
                clef !== previousClef
                    ? `[K: C ${clef}]`
                    : "";

            const octavaChange =
                octava !== previousOctava
                    ? octavaToAbc(octava)
                    : "";

            previousClef = clef;
            previousOctava = octava;

            const writtenNote =
                transposeForOctava(note, octava);

            return [
                clefChange,
                octavaChange,
                noteToAbc(writtenNote),
            ]
                .filter(Boolean)
                .join(" ");
        })
        .join("-");

    const abcNotation = `X:1
M:4/4
L:1
${abcNotes}`;

    return (
        <Abcjs
            {...divProps}
            className={`instrument-range-score no-selection ${
                divProps.className ?? ""
            }`}
            visualParams={{
                responsive: "resize",
                staffwidth: 150,
            }}
            abcNotation={abcNotation}
        />
    );
}

function transposeForOctava(
    note: string,
    octava: 1 | -1 | undefined,
): string {
    if (octava === undefined) {
        return note;
    }

    return Note.transposeOctaves(
        note,
        -octava,
    );
}

function octavaToAbc(
    octava: 1 | -1 | undefined,
): string {
    switch (octava) {
        case 1:
            return '"^8va"';

        case -1:
            return '"_8vb"';

        default:
            return "";
    }
}