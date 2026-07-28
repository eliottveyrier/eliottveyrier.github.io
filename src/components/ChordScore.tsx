import type { ComponentProps } from "preact";
import { Note } from "tonal";

import Abcjs from "./AbcJs";
import { noteToAbc } from "../lib/music/noteToAbc";

interface ChordScoreProps extends ComponentProps<"div"> {
    notes: string[];
    breakingPoint?: string;
}

export default function ChordScore({
    notes,
    breakingPoint = "C4",
    ...divProps
}: ChordScoreProps) {
    const breakingPointNote = Note.get(breakingPoint);

    if (breakingPointNote.midi === null) {
        throw new Error(
            `Invalid breaking point: ${breakingPoint}`,
        );
    }

    const breakingPointMidi = breakingPointNote.midi;

    const trebleNotes = notes.filter(note => {
        const parsed = Note.get(note);

        return (
            parsed.midi !== null &&
            parsed.midi >= breakingPointMidi
        );
    });

    const bassNotes = notes.filter(note => {
        const parsed = Note.get(note);

        return (
            parsed.midi !== null &&
            parsed.midi < breakingPointMidi
        );
    });

    const hasBass = bassNotes.length > 0;

    const abcNotation = hasBass
        ? `X:1
M:none
K:C
L:1
V:treble clef=treble
V:bass clef=bass
[V:treble] ${makeChord(trebleNotes)}
[V:bass] ${makeChord(bassNotes)}`
        : `X:1
M:none
K:C
L:1
${makeChord(trebleNotes)}`;

    return (
        <Abcjs
            {...divProps}
            className={`chord-score no-selection ${divProps.className ?? ""}`}
            visualParams={{
                responsive: "resize",
                staffwidth: 150,
            }}
            abcNotation={abcNotation}
        />
    );
}

function makeChord(notes: string[]): string {
    if (notes.length === 0) {
        return "z";
    }

    return `[${notes.map(noteToAbc).join("")}]`;
}