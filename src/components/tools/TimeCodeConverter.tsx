import { useState } from "preact/hooks";
import "./TimeCodeConverter.css"

const FPS_VALUES = [24, 25, 30, 29.97, 60];

function secondsToTimecode(seconds: number, fps: number) {
    const totalFrames = Math.floor(seconds * fps);

    const frames = totalFrames % Math.round(fps);
    const totalSeconds = Math.floor(totalFrames / fps);

    const s = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);

    const m = totalMinutes % 60;
    const h = Math.floor(totalMinutes / 60);

    return [h, m, s, frames]
        .map(v => String(v).padStart(2, "0"))
        .join(":");
}

function timecodeToSeconds(tc: string, fps: number) {
    const [h, m, s, f] = tc.split(":").map(Number);

    return (
        h * 3600 +
        m * 60 +
        s +
        f / fps
    );
}

export default function TimecodeConverter() {
    const [bpm, setBpm] = useState(120);
    const [fps, setFps] = useState(24);

    const [startTimecode, setStartTimecode] =
        useState("00:00:00:00");

    const [beats, setBeats] = useState(16);
    const [timecode, setTimecode] = useState("00:00:08:00");


    const startSeconds = timecodeToSeconds(
        startTimecode,
        fps
    );


    const beatsToTC = secondsToTimecode(
        startSeconds + beats * 60 / bpm,
        fps
    );


    const tcToBeats =
        (
            timecodeToSeconds(timecode, fps)
            - startSeconds
        )
        * bpm / 60;


    return (
        <div class="tool">

            <div class="controls">

                <label>
                    BPM
                    <input
                        type="number"
                        value={bpm}
                        onInput={e =>
                            setBpm(Number(e.currentTarget.value))
                        }
                    />
                </label>


                <label>
                    FPS
                    <select
                        value={fps}
                        onChange={e =>
                            setFps(Number(e.currentTarget.value))
                        }
                    >
                        {FPS_VALUES.map(v => (
                            <option value={v}>
                                {v}
                            </option>
                        ))}
                    </select>
                </label>


                <label>
                    Start Timecode
                    <input
                        value={startTimecode}
                        onInput={e =>
                            setStartTimecode(
                                e.currentTarget.value
                            )
                        }
                    />
                </label>

            </div>


            <div class="columns">

                <section>
                    <h2>
                        Beats → Timecode
                    </h2>

                    <input
                        type="number"
                        value={beats}
                        onInput={e =>
                            setBeats(
                                Number(e.currentTarget.value)
                            )
                        }
                    />

                    <output>
                        {beatsToTC}
                    </output>
                </section>


                <section>
                    <h2>
                        Timecode → Beats
                    </h2>

                    <input
                        value={timecode}
                        onInput={e =>
                            setTimecode(
                                e.currentTarget.value
                            )
                        }
                    />

                    <output>
                        {tcToBeats.toFixed(3)} beats
                    </output>
                </section>

            </div>
        </div>
    );
}