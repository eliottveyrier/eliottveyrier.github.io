import type { ComponentChildren } from "preact";

import type {
    Clef,
    RangeNote,
} from "./InstrumentRangeScore";

import NoteSpan from "./mtheory/NoteSpan";
import InstrumentTuningScore from "./InstrumentTuningScore";
import InstrumentRangeScore from "./InstrumentRangeScore";

import "./InstrumentSpecsCard.css";

interface Props {
    tuning: string[];
    tuningClef: Clef;

    range: string;
    comfortableRange?: string;

    rangeStart: RangeNote;
    comfortableTop?: RangeNote;
    maxEnd: RangeNote;

    children?: ComponentChildren;
}

export default function InstrumentSpecsCard({
    tuning,
    tuningClef,
    range,
    comfortableRange,
    rangeStart,
    comfortableTop,
    maxEnd,
    children,
}: Props) {
    const displayedRange = [
        rangeStart,
        ...(comfortableTop ? [comfortableTop] : []),
        maxEnd,
    ];

    return (
        <section class="instrument-specs-card">

            <h3>
                Range &amp; tuning
            </h3>


            <div class="instrument-specs-scores">

                <div class="instrument-specs-section">

                    <h4>
                        Open strings
                    </h4>

                    <InstrumentTuningScore
                        tuning={tuning}
                        clef={tuningClef}
                    />

                </div>


                <div class="instrument-specs-section">

                    <h4>
                        Written range
                    </h4>

                    <InstrumentRangeScore
                        range={displayedRange}
                    />

                </div>

            </div>


            <dl class="instrument-specs-values">

                <div>
                    <dt>
                        Range
                    </dt>

                    <dd>
                        <NoteSpan note={rangeStart.note} />

                        <span class="range-separator">
                            –
                        </span>

                        <NoteSpan note={maxEnd.note} />
                    </dd>
                </div>


                {comfortableTop && (
                    <div>
                        <dt>
                            Comfortable range
                        </dt>

                        <dd>
                            <NoteSpan note={rangeStart.note} />

                            <span class="range-separator">
                                –
                            </span>

                            <NoteSpan note={comfortableTop.note} />
                        </dd>
                    </div>
                )}

            </dl>


            {children && (
                <div class="instrument-specs-content">
                    {children}
                </div>
            )}

        </section>
    );
}