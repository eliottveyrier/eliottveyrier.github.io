import type { ComponentProps } from "preact";
import { Note } from "tonal";

import Abcjs from "./AbcJs";
import { noteToAbc } from "../lib/music/noteToAbc";

interface InstrumentTuningScoreProps
    extends ComponentProps<"div"> {
    tuning: string[];
    clef?: "treble" | "bass" | "alto" | "tenor";
}

export default function InstrumentTuningScore({
    tuning,
    clef = "treble",
    ...divProps
}: InstrumentTuningScoreProps) {
    const abcNotes = tuning
        .map(note => {
            const parsed = Note.get(note);
            const abcNote = noteToAbc(note);

            return `^"${parsed.pc}"${abcNote}`;
        })
        .join(" ");

    const abcNotation = `X:1
M:none
K:C
L:1
V:main clef=${clef}
[V:main] ${abcNotes}`;

    return (
        <Abcjs
            {...divProps}
            className={`instrument-tuning-score no-selection ${
                divProps.className ?? ""
            }`}
            renderParams={{
                responsive: "resize",
                staffwidth: 150,
            }}
            abcNotation={abcNotation}
        />
    );
}