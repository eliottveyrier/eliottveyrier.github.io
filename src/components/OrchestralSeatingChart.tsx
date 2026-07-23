import type { ComponentProps } from 'preact';
import OrchestraSVG from './OrchestraSVG';

type Props = ComponentProps<typeof OrchestraSVG> 

export default function OrchestralSeatingChart(
  props: Props,
) {
  return <OrchestraSVG {...props} />;
}
