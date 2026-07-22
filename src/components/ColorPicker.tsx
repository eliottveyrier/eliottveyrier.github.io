import { useState } from "preact/hooks";

import "./ColorPicker.css";

interface Props {
    color: string;
    className?: string;
}

export default function ColorPicker({
    color,
    className = "",
}: Props) {
    const [copied, setCopied] = useState(false);

    async function copyColor() {
        await navigator.clipboard.writeText(color);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1200);
    }

    const classes = [
        "color-picker",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            className={classes}
            type="button"
            onClick={copyColor}
            title={`Copy ${color}`}
        >
            <span
                className="color-picker__swatch"
                style={{
                    backgroundColor: color,
                }}
            />

            <span className="color-picker__value">
                {copied ? "Copied!" : color}
            </span>
        </button>
    );
}