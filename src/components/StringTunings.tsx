import type { ComponentProps } from "preact";

import InstrumentTuningScore from "./InstrumentTuningScore";
import "./StringTunings.css"

interface StringTuning {
    name: string;
    tuning: string[];
    clef: "treble" | "alto" | "bass";
}

interface StringTuningsProps extends ComponentProps<"div"> {
    tunings?: StringTuning[];
}

const DEFAULT_TUNINGS: StringTuning[] = [
    {
        name: "Violin",
        tuning: ["G3", "D4", "A4", "E5"],
        clef: "treble",
    },
    {
        name: "Viola",
        tuning: ["C3", "G3", "D4", "A4"],
        clef: "alto",
    },
    {
        name: "Cello",
        tuning: ["C2", "G2", "D3", "A3"],
        clef: "bass",
    },
    {
        name: "Double Bass",
        tuning: ["E2", "A2", "D3", "G3"],
        clef: "bass",
    },
];

export default function StringTunings({
    tunings = DEFAULT_TUNINGS,
    ...divProps
}: StringTuningsProps) {
    return (
        <div
            {...divProps}
            className={`string-tunings ${
                divProps.className ?? ""
            }`}
        >
            {tunings.map(({ name, tuning, clef }) => (
                <div className="string-tuning">
                    <h3>{name}</h3>

                    <InstrumentTuningScore
                        tuning={tuning}
                        clef={clef}
                    />
                </div>
            ))}
        </div>
    );
}