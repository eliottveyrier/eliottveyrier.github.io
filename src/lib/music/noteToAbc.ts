import { Note } from "tonal";


type PitchName = 
    | "C"
    | "D"
    | "E"
    | "F"
    | "G"
    | "A"
    | "B"

const ABC_PITCHES = [
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B",
] as const;

export function noteToAbc(note: string): string {
    const parsed = Note.get(note);

    if (
        !parsed.name ||
        parsed.oct === undefined ||
        parsed.acc === undefined
    ) {
        throw new Error(`Invalid note: ${note}`);
    }

    const base = parsed.letter;
    const octave = parsed.oct;
    const accidental = parsed.alt;

    if (!ABC_PITCHES.includes(base as PitchName)) {
        throw new Error(`Invalid note name: ${note}`);
    }

    const abcAccidental =
        accidental > 0
            ? "^".repeat(accidental)
            : "_".repeat(-accidental);

    if (octave >= 5) {
        const abcPitch = base.toLowerCase();

        const octaveMarks = "'".repeat(octave - 5);

        return `${abcAccidental}${abcPitch}${octaveMarks}`;
    }

    const abcPitch = base.toUpperCase();

    const octaveMarks = ",".repeat(4 - octave);

    return `${abcAccidental}${abcPitch}${octaveMarks}`;
}