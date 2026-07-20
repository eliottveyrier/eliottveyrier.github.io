import "./YoutubeVideo.css"
interface Props {
    id: string;
}

export default function YoutubeVideo({ id }: Props) {
    return (
        <iframe
            src={`https://www.youtube.com/embed/${id}`}
            allow="autoplay"
            title="Video Preview for the selected project"
            allowFullScreen
        />
    );
}