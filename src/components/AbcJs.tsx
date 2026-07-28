import { useEffect, useRef } from "preact/hooks";
import type { ComponentProps } from "preact";
import abcjsObj, { type AbcVisualParams } from "abcjs";

import "./AbcJs.css";

interface AbcjsProps extends ComponentProps<"div"> {
  abcNotation?: string;
  visualParams?: AbcVisualParams;
}

export default function Abcjs({
  abcNotation = "",
  visualParams = {},
  ...divProps
}: AbcjsProps) {
  const uniqueNumber = useRef(Date.now() + Math.random());

  const resultId = `abcjs-result-${uniqueNumber.current}`;

  useEffect(() => {
    if (!abcNotation) return;

    const element = document.getElementById(resultId);

    if (!element) return;

    element.innerHTML = "";

    abcjsObj.renderAbc(
      resultId,
      abcNotation,
      visualParams,
    );
  }, [abcNotation]);

  return (
    <div
      {...divProps}
      className={`abcjs-score ${divProps.className ?? ""}`}
    >
      <div
        id={resultId}
        className="abcjs-score__content"
      />
    </div>
  );
}