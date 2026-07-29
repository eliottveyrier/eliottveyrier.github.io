import "./YoutubeVideo.css";

interface Props {
    id: string;
    title: string;
    startTime?: number;
}

export default function YoutubeVideo({
    id,
    title,
    startTime,
}: Props) {
    const src = new URL(`https://www.youtube.com/embed/${id}`);

    if (startTime !== undefined) {
        src.searchParams.set("start", startTime.toString());
    }

    return (
        <iframe
            src={src.toString()}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            title={title}
            allowFullScreen
        />
    );
}