import { useMemo, useState } from "preact/hooks";
import "./PlaceholderCodeCopy.css";

interface Props {
    code: string;
    placeholders: string[];
}

export default function PlaceholderCodeCopy({
    code,
    placeholders,
}: Props) {
    const [values, setValues] = useState<Record<string, string>>(
        Object.fromEntries(
            placeholders.map((placeholder) => [placeholder, placeholder]),
        ),
    );

    const renderedCode = useMemo(() => {
        return code.replace(
            /\{\{([^}]+)\}\}/g,
            (_, key: string) => values[key] ?? key,
        );
    }, [code, values]);

    function updateValue(
        placeholder: string,
        value: string,
    ) {
        setValues((current) => ({
            ...current,
            [placeholder]: value,
        }));
    }

    async function copyCode() {
        await navigator.clipboard.writeText(renderedCode);
    }

    return (
        <details class="placeholder-code-copy">
            <summary>
                Customize command
            </summary>

            <div class="placeholder-code-copy-content">
                <div class="placeholder-code-copy-inputs">
                    {placeholders.map((placeholder) => (
                        <input
                            key={placeholder}
                            value={values[placeholder]}
                            onInput={(event) =>
                                updateValue(
                                    placeholder,
                                    (
                                        event.currentTarget as HTMLInputElement
                                    ).value,
                                )
                            }
                        />
                    ))}
                </div>

                <div class="placeholder-code-copy-output">
                    <pre>
                        {renderedCode}
                    </pre>

                    <button onClick={copyCode}>
                        Copy
                    </button>
                </div>
            </div>
        </details>
    );
}