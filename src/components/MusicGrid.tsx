import { useEffect, useRef, useState } from "preact/hooks";
import type { CollectionEntry } from "astro:content";

import "./MusicGrid.css";
import DriveVideo from "./DriveVideo";
import YoutubeVideo from "./YoutubeVideo";
import type { RefObject } from "preact";


type MusicProject = CollectionEntry<"music">;


interface Props {
    projects: MusicProject[];
}


export default function MusicGrid({ projects }: Props) {
    const [selected, setSelected] =
        useState<MusicProject | null>(null);

    const previewRef = useRef<HTMLElement | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 591);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (selected && previewRef.current && !isMobile) {
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
                    <div key={project.id} class="music-grid-item">
                        <button
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
                                    {renderDescription(project.data.description)}
                                </p>
                            </div>
                        </button>
                        {selected?.id === project.id && isMobile && (
                            <PreviewVideo
                                selected={selected}
                                previewRef={previewRef}
                            />
                        )}
                    </div>
                ))}
            </div>
            
            {
                !isMobile && <PreviewVideo
                    selected={selected}
                    previewRef={previewRef}
                />
            }



        </div>
    );
}

interface PreviewVideoProps {
    selected: MusicProject | null;
    previewRef: RefObject<any>;
}

function PreviewVideo({ selected, previewRef }: PreviewVideoProps) {
    return <>      
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
    </>
}



function renderDescription(description: string) {
    const parts = description.split(/(\*[^*]+\*)/g);

    return parts.map((part, index) => {
        if (part.startsWith("*") && part.endsWith("*")) {
            return (
                <em key={index}>
                    {part.slice(1, -1)}
                </em>
            );
        }

        return part;
    });
}