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
    members?: string[];
};

const MAX_VISIBLE_MEMBERS = 10;

export default function OrchestraNav({
    fullName,
    category,
    family,
    familyLabel,
    members,
    ...props
}: OrchestraNavProps) {
    const visibleMembers = members?.slice(
        0,
        MAX_VISIBLE_MEMBERS,
    );

    const remainingMembers =
        members &&
        members.length > MAX_VISIBLE_MEMBERS
            ? members.length - MAX_VISIBLE_MEMBERS
            : 0;

    const linkTarget = family
        ? `/orchestration/family/${family}`
        : "/orchestration/";

    const linkLabel = familyLabel ?? family ?? "orchestra";

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