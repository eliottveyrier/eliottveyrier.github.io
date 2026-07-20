import "./DriveVideo.css"
interface Props {
    id: string;
}

export default function DriveVideo({ id }: Props) {
    return (
        <iframe
            src={`https://drive.google.com/file/d/${id}/preview`}
            allow="autoplay"
            title="Video Preview for the selected project"
            allowFullScreen
        />
    );
}