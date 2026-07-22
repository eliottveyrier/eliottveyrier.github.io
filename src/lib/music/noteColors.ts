import { Note, type NoteLiteral } from "tonal";

type NoteLetter =
    | "C"
    | "D"
    | "E"
    | "F"
    | "G"
    | "A"
    | "B";

const NOTE_LETTERS: NoteLetter[] = [
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B",
];

const NOTE_COLOR_CLASSES: Record<NoteLetter, NoteColorClass> = {
    C: "note-color-c",
    D: "note-color-d",
    E: "note-color-e",
    F: "note-color-f",
    G: "note-color-g",
    A: "note-color-a",
    B: "note-color-b",
};

export type NoteColorClass =
    | "note-color-c"
    | "note-color-d"
    | "note-color-e"
    | "note-color-f"
    | "note-color-g"
    | "note-color-a"
    | "note-color-b";

export function noteColorClass(
    note: NoteLiteral,
    colorRoot: NoteLiteral = "C",
): NoteColorClass {
    const noteData = Note.get(note);
    const rootData = Note.get(colorRoot);

    const noteIndex = NOTE_LETTERS.indexOf(noteData.letter as NoteLetter);
    const rootIndex = NOTE_LETTERS.indexOf(rootData.letter as NoteLetter);

    const relativeIndex =
        (noteIndex - rootIndex + NOTE_LETTERS.length) %
        NOTE_LETTERS.length;

    const colorLetter = NOTE_LETTERS[relativeIndex];

    return NOTE_COLOR_CLASSES[colorLetter];
}

export function letterColorClass(letter: NoteLetter) {
    return NOTE_COLOR_CLASSES[letter]
}

