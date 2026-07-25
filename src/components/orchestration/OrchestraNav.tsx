import type { ComponentProps } from "preact";
import OrchestralSeatingNav from "./OrchestralSeatingNav";
import {
    instrumentColorClass,
    type InstrumentCategory,
} from "../../lib/music/instrumentColors";
import "./OrchestraNav.css";
import "../../lib/music/instrumentColors.css";

type OrchestraNavProps = ComponentProps<
    typeof OrchestralSeatingNav
> & {
    fullName: string;
    category: InstrumentCategory;
    family?: string;
    familyLabel?: string;
    linkTargetOverride?: string;
    linkLabelOverride?: string;
    members?: string[];
};

const MAX_VISIBLE_MEMBERS = 10;

export default function OrchestraNav({
    fullName,
    category,
    family,
    familyLabel,
    linkTargetOverride,
    linkLabelOverride,
    members,
    ...props
}: OrchestraNavProps) {

    const linkTarget = linkTargetOverride ?? (family
        ? `/orchestration/family/${family}`
        : "/orchestration/");

    const linkLabel = linkLabelOverride ?? familyLabel ?? family ?? "orchestra";

    return (
        <section
            class={`orchestra-nav ${instrumentColorClass(category)}`}
        >
            <div class="orchestra-nav__chart">
                <OrchestralSeatingNav {...props} />
            </div>

            <div class="orchestra-nav__info">
                <a
                    href={linkTarget}
                    class="orchestra-nav__family-link"
                >
                    {linkLabel} →
                </a>

                <h2>{fullName}</h2>
            </div>
        </section>
    );
}