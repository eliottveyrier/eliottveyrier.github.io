import type { ComponentProps } from "preact";
import OrchestralSeatingNav from "./OrchestralSeatingNav";
import "./OrchestraNav.css"

type OrchestraNavProps = ComponentProps<
    typeof OrchestralSeatingNav
> & {
    fullName: string;
    members?: string[];
};

const MAX_VISIBLE_MEMBERS = 10;

export default function OrchestraNav({
    fullName,
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

    return (
        <section class="orchestra-nav">
            <div class="orchestra-nav__chart">
                <OrchestralSeatingNav {...props} />
            </div>

            <div class="orchestra-nav__info">
                <h2>{fullName}</h2>
            </div>
        </section>
    );
}