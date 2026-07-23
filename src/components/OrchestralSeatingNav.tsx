import type { ComponentProps } from "preact";
import OrchestraSVG, {
    type InstrumentGroup,
} from "./OrchestraSVG";

type Props = ComponentProps<
    typeof OrchestraSVG
>;

const ORCHESTRAL_GROUP_TO_INSTRUMENT: Partial<
    Record<InstrumentGroup, string>
> = {
    choir: "choir",
    harp: "harp",
    "violins-i": "violins",
    "violins-ii": "violins",
    violas: "viola",
    celli: "cello",
    contrabasses: "double-bass",
};

const ORCHESTRAL_GROUP_TO_FAMILY: Partial<
    Record<InstrumentGroup, string>
> = {
    "keyboard-left": "keyboard",
    "keyboard-right": "keyboard",
    woodwinds: "woodwinds",
    horns: "brass",
    brass: "brass",
    percussion: "percussion",
    synths: "synths",
    fx: "fx",
};

export default function OrchestralSeatingNav(
    props: Props,
) {
    const handleClickInstrumentGroup = (
        instrumentGroup: InstrumentGroup,
    ) => {
        const instrument =
            ORCHESTRAL_GROUP_TO_INSTRUMENT[
                instrumentGroup
            ];

        if (instrument) {
            window.location.href =
                `/orchestration/instrument/${instrument}`;

            return;
        }

        const family =
            ORCHESTRAL_GROUP_TO_FAMILY[
                instrumentGroup
            ];

        if (family) {
            window.location.href =
                `/orchestration/family/${family}`;

            return;
        }
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