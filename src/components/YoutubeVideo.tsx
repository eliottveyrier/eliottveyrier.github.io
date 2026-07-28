import "./YoutubeVideo.css"
interface Props {
    id: string;
    title: string;
}

export default function YoutubeVideo({ 
    id,
    title
}: Props) {
    return (
        <iframe
            src={`https://www.youtube.com/embed/${id}`}
            allow="autoplay"
            title={title}
            allowFullScreen
        />
    );
}