import { useEffect, useRef, useState } from "preact/hooks";
import type { CollectionEntry } from "astro:content";

import "./MusicGrid.css";
import DriveVideo from "./DriveVideo";
import YoutubeVideo from "./YoutubeVideo";


type MusicProject = CollectionEntry<"music">;


interface Props {
    projects: MusicProject[];
}


export default function MusicGrid({ projects }: Props) {
    const [selected, setSelected] =
        useState<MusicProject | null>(null);

    const previewRef = useRef<HTMLElement | null>(null);


    useEffect(() => {
        if (selected && previewRef.current) {
            const element = previewRef.current;

            const y =
                element.getBoundingClientRect().top +
                window.scrollY -
                75; // offset in pixels

            window.scrollTo({
                top: y,
                behavior: "smooth",
            });
        }
    }, [selected]);


    return (
        <div class="music-grid-container">

            <div class="music-grid">
                {projects.map((project) => (
                    <button
                        key={project.id}
                        class={`music-card ${
                            selected?.id === project.id
                                ? "selected"
                                : ""
                        }`}
                        onClick={() => setSelected(project)}
                    >
                        <img
                            src={project.data.image}
                            alt={project.data.title}
                        />

                            <div class="music-overlay">
                                <h3>
                                    {project.data.title}
                                </h3>

                                {project.data.year && (
                                    <small>
                                        {project.data.year}
                                    </small>
                                )}

                                <p>
                                    {project.data.description}
                                </p>
                            </div>
                    </button>
                ))}
            </div>


            {selected && (
                <section
                    ref={previewRef}
                    class="music-preview card"
                >
                    {selected.data.youtube_id && 
                        <YoutubeVideo
                            id={selected.data.youtube_id}
                        />
                    }
                    {selected.data.google_drive_id && !selected.data.youtube_id && (
                        <DriveVideo
                            id={selected.data.google_drive_id}
                        />
                    )}
                </section>
            )}

        </div>
    );
}