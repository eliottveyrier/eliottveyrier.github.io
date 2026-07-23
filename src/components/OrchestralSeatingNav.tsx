import type { ComponentProps } from "preact";
import OrchestraSVG, {
    type InstrumentGroup,
} from "./OrchestraSVG";

type Props = ComponentProps<
    typeof OrchestraSVG
>;

const ORCHESTRAL_STRING_GROUPS: InstrumentGroup[] = [
    "harp",
    "violins-i",
    "violins-ii",
    "violas",
    "celli",
    "contrabasses",
];

export default function OrchestralSeatingNav(
    props: Props,
) {
    const handleClickInstrumentGroup = (
        instrumentGroup: InstrumentGroup,
        categories: Parameters<
            NonNullable<
                Props["onClickInstrumentGroup"]
            >
        >[1],
    ) => {
        if (
            ORCHESTRAL_STRING_GROUPS.includes(
                instrumentGroup,
            )
        ) {
            window.location.href = `/orchestration/families/${instrumentGroup}`
            return;
        }

        window.location.href =
            `/orchestration/families/${instrumentGroup}`;
    };

    return (
        <OrchestraSVG
            {...props}
            onClickInstrumentGroup={
                handleClickInstrumentGroup
            }
        />
    );
}