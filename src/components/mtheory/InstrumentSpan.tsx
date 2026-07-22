import type { ComponentChildren } from "preact";

import {
    instrumentColorClass,
    type InstrumentCategory,
} from "../../lib/music/instrumentColors";

import "../../lib/music/instrumentColors.css";
import "./InstrumentSpan.css";

interface Props {
    cat?: InstrumentCategory;
    category?: InstrumentCategory;

    color?: string;

    children: ComponentChildren;

    className?: string;
}

export default function InstrumentSpan({
    cat,
    category,
    color,
    children,
    className = "",
}: Props) {
    const instrumentCategory = category ?? cat;

    const colorClass = instrumentCategory
        ? instrumentColorClass(instrumentCategory)
        : undefined;

    const style = color
        ? {
            "--note-color": color,
        }
        : undefined;

    const classes = [
        "instrument-span",
        colorClass,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <span
            className={classes}
            style={style}
        >
            {children}
        </span>
    );
}