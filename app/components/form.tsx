"use client";
import React, {
    useState,
    useEffect,
    createRef,
    useTransition,
    useCallback,
    useContext,
} from "react";
import saveForm from "@/app/actions/form";
import styles_light from "./questions_light.module.css";
import styles_dark from "./questions_dark.module.css";
import { useTheme } from "@mui/material";
import { useDebouncedCallback } from "use-debounce";
import { Prisma } from ".prisma/client";
import { RuleType, Type } from "@prisma/client";
import { STQ, LTQ, MCQ, SCQ } from "@/app/components/questions";
import { Box } from "@mui/system";
import PagesContext from "@/lib/PagesContext";
import "./form.css";

const arts = {
    cc: [
        " ██████╗ ██████╗",
        "██╔════╝██╔════╝",
        "██║     ██║     ",
        "██║     ██║     ",
        "╚██████╗╚██████╗",
        " ╚═════╝ ╚═════╝",
    ],
    web: [
        "██╗    ██╗███████╗██████╗ ",
        "██║    ██║██╔════╝██╔══██╗",
        "██║ █╗ ██║█████╗  ██████╔╝",
        "██║███╗██║██╔══╝  ██╔══██╗",
        "╚███╔███╔╝███████╗██████╔╝",
        " ╚══╝╚══╝ ╚══════╝╚═════╝ ",
    ],
    design: [
        "██████╗ ███████╗███████╗██╗ ██████╗ ███╗   ██╗",
        "██╔══██╗██╔════╝██╔════╝██║██╔════╝ ████╗  ██║",
        "██║  ██║█████╗  ███████╗██║██║  ███╗██╔██╗ ██║",
        "██║  ██║██╔══╝  ╚════██║██║██║   ██║██║╚██╗██║",
        "██████╔╝███████╗███████║██║╚██████╔╝██║ ╚████║",
        "╚═════╝ ╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝",
    ],
    research: [
        "██████╗ ███████╗███████╗███████╗ █████╗ ██████╗  ██████╗██╗  ██╗",
        "██╔══██╗██╔════╝██╔════╝██╔════╝██╔══██╗██╔══██╗██╔════╝██║  ██║",
        "██████╔╝█████╗  ███████╗█████╗  ███████║██████╔╝██║     ███████║",
        "██╔══██╗██╔══╝  ╚════██║██╔══╝  ██╔══██║██╔══██╗██║     ██╔══██║",
        "██║  ██║███████╗███████║███████╗██║  ██║██║  ██║╚██████╗██║  ██║",
        "╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝",
    ],
    app: [
        " █████╗ ██████╗ ██████╗ ",
        "██╔══██╗██╔══██╗██╔══██╗",
        "███████║██████╔╝██████╔╝",
        "██╔══██║██╔═══╝ ██╔═══╝ ",
        "██║  ██║██║     ██║     ",
        "╚═╝  ╚═╝╚═╝     ╚═╝     ",
    ],
    management: [
        "███╗   ███╗ █████╗ ███╗   ██╗ █████╗  ██████╗ ███████╗███╗   ███╗███████╗███╗   ██╗████████╗",
        "████╗ ████║██╔══██╗████╗  ██║██╔══██╗██╔════╝ ██╔════╝████╗ ████║██╔════╝████╗  ██║╚══██╔══╝",
        "██╔████╔██║███████║██╔██╗ ██║███████║██║  ███╗█████╗  ██╔████╔██║█████╗  ██╔██╗ ██║   ██║   ",
        "██║╚██╔╝██║██╔══██║██║╚██╗██║██╔══██║██║   ██║██╔══╝  ██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║   ",
        "██║ ╚═╝ ██║██║  ██║██║ ╚████║██║  ██║╚██████╔╝███████╗██║ ╚═╝ ██║███████╗██║ ╚████║   ██║   ",
        "╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ",
    ],
};
export function Form({
    round,
}: {
    round: Prisma.RoundGetPayload<{
        include: {
            Question: { include: { responses: true; validators: true } };
        };
    }>;
}) {
    const questions = round.Question;
    const roundId = round.id;

    const [, startSave] = useTransition();
    const { setUnsavedChanges } = useContext(PagesContext);
    const [formData, setFormData] = useState<{
        [key: string]: {
            response: string | { [key: string]: boolean };
            error: {
                message: string;
                title: string;
            } | null;
        };
    }>(
        Object.fromEntries(
            questions.map((question) => [
                question.id,
                {
                    response: question.responses[0]?.response
                        ? JSON.parse(question.responses[0]?.response)
                        : ["stq", "ltq"].includes(question.type)
                        ? ""
                        : Object.fromEntries(
                              question.options.map((option) => [option, false])
                          ),
                    error: JSON.parse(
                        (question.responses[0]?.error as string) || "null"
                    ),
                },
            ])
        )
    );

    const [lastSaved, setLastSaved] = useState(formData);

    const form = createRef<HTMLFormElement>();

    const preventSave = useCallback(
        () => "Are you sure you want to leave?",
        []
    );

    useEffect(() => {
        if (JSON.stringify(formData) === JSON.stringify(lastSaved)) {
            window.onbeforeunload = () => undefined;
            setUnsavedChanges(false);
        } else {
            window.onbeforeunload = preventSave;
            setUnsavedChanges(true);
        }
    }, [formData, lastSaved, preventSave, setUnsavedChanges]);

    const [lines, setLines] = useState<number[]>([]);
    useEffect(() => {
        if (!form.current) return;
        const resizeObserver = new ResizeObserver(() => {
            if (form.current) {
                const { current } = form;
                const boundingRect = current.getBoundingClientRect();
                const { height } = boundingRect;
                const lineHeight = 21;
                const numLines = Math.floor(height / lineHeight);
                const lines = Array.from(Array(numLines).keys());
                setLines(lines);
            }
        });
        resizeObserver.observe(form.current);
        return () => resizeObserver.disconnect();
    }, [form]);

    const theme = useTheme();
    const styles = theme.palette.mode === "light" ? styles_light : styles_dark;

    const debouncedSave = useDebouncedCallback(() => {
        // submit the form
        // (form!.current! as HTMLFormElement).requestSubmit();
        startSave(() => {
            const temp = { ...formData };
            saveForm(
                roundId,
                !Object.entries(temp).filter(([, i]) => i.error !== null)
                    .length,
                temp
            ).then((res) => {
                if (!res) alert("Error in saving");
                else setLastSaved({ ...temp });
            });
        });
    }, 5000);

    const validate = useCallback(
        (
            data: Record<
                string,
                {
                    response: string | { [key: string]: boolean };
                    error: { message: string; title: string } | null;
                }
            >
        ) => {
            for (const i in data) {
                const question = questions.find((q) => q.id === i)!;
                const _validators = question.validators;

                data[i].error = null;

                if (_validators.length) {
                    for (const validator of _validators) {
                        if (
                            question.type === Type.stq &&
                            validator.ruleType === RuleType.pattern
                        ) {
                            const regex = new RegExp(validator.ruleValue!);
                            if (!regex.test(data[i].response as string)) {
                                data[i].error = {
                                    message: validator.helpText,
                                    title: validator.helpTitle,
                                };
                                break;
                            }
                        }
                        if (
                            question.type === Type.mcq &&
                            validator.ruleType === RuleType.min
                        ) {
                            if (
                                Object.entries(
                                    data[i].response as {
                                        [key: string]: boolean;
                                    }
                                ).filter(([, value]) => value).length <
                                JSON.parse(validator.ruleValue!)
                            ) {
                                data[i].error = {
                                    message: validator.helpText,
                                    title: validator.helpTitle,
                                };
                                break;
                            }
                        }
                        if (
                            question.type === Type.mcq &&
                            validator.ruleType === RuleType.max
                        ) {
                            if (
                                Object.entries(
                                    data[i].response as {
                                        [key: string]: boolean;
                                    }
                                ).filter(([, value]) => value).length >
                                JSON.parse(validator.ruleValue!)
                            ) {
                                data[i].error = {
                                    message: validator.helpText,
                                    title: validator.helpTitle,
                                };
                                break;
                            }
                        }
                        if (validator.ruleType === RuleType.required) {
                            if (
                                question.type === Type.stq &&
                                !data[i].response?.length
                            ) {
                                data[i].error = {
                                    message: validator.helpText,
                                    title: validator.helpTitle,
                                };
                                break;
                            }
                            if (
                                question.type === Type.ltq &&
                                !data[i].response?.length
                            ) {
                                data[i].error = {
                                    message: validator.helpText,
                                    title: validator.helpTitle,
                                };
                                break;
                            }
                            if (
                                question.type === Type.mcq &&
                                !Object.values(
                                    data[i].response as {
                                        [key: string]: boolean;
                                    }
                                ).includes(true)
                            ) {
                                data[i].error = {
                                    message: validator.helpText,
                                    title: validator.helpTitle,
                                };
                                break;
                            }
                            if (
                                question.type === Type.scq &&
                                !data[i].response
                            ) {
                                data[i].error = {
                                    message: validator.helpText,
                                    title: validator.helpTitle,
                                };
                                break;
                            }
                        }
                        if (validator.ruleType === RuleType.requiredIf) {
                            const deps = JSON.parse(validator.ruleValue!) as {
                                question: string;
                                selected: string;
                            };
                            if (
                                (
                                    data[deps.question].response as {
                                        [key: string]: boolean;
                                    }
                                )[deps.selected]
                            ) {
                                if (
                                    question.type === Type.stq &&
                                    !data[i].response
                                ) {
                                    data[i].error = {
                                        message: validator.helpText,
                                        title: validator.helpTitle,
                                    };
                                    break;
                                }
                                if (
                                    question.type === Type.ltq &&
                                    !data[i].response
                                ) {
                                    data[i].error = {
                                        message: validator.helpText,
                                        title: validator.helpTitle,
                                    };
                                    break;
                                }
                                if (
                                    question.type === Type.mcq &&
                                    !Object.values(
                                        data[i].response as {
                                            [key: string]: boolean;
                                        }
                                    ).includes(true)
                                ) {
                                    data[i].error = {
                                        message: validator.helpText,
                                        title: validator.helpTitle,
                                    };
                                    break;
                                }
                                if (
                                    question.type === Type.scq &&
                                    !data[i].response
                                ) {
                                    data[i].error = {
                                        message: validator.helpText,
                                        title: validator.helpTitle,
                                    };
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            return data;
        },
        [questions]
    );

    const updateResponse = useCallback(
        (id: string, response: string) => {
            setFormData((prev) => {
                return validate({
                    ...prev,
                    [id]: { ...prev[id], response },
                });
            });
        },
        [validate]
    );

    return (
        <Box
            sx={{
                overflowY: "auto",
            }}
        >
            <div className={styles.editor}>
                {/* <div className={styles.lineNumbers}>
                    {lines.map((line) => (
                        <div key={line} className={styles.lineNumber}>
                            {line + 1}
                        </div>
                    ))}
                </div> */}
                <form ref={form} onChange={debouncedSave} className="code">
                    {arts[round.domain].map((line) => (
                        <ASCIILine text={line} styles={styles} />
                    ))}
                    <code style={{ display: "block" }}></code>
                    {questions.map((question) => {
                        switch (question.type) {
                            case "stq":
                                return (
                                    <>
                                        <STQ
                                            key={question.id}
                                            question={question}
                                            updateResponse={updateResponse}
                                            triggerSave={debouncedSave}
                                            data={
                                                formData[question.id] as {
                                                    response: string;
                                                    error: {
                                                        message: string;
                                                        title: string;
                                                    } | null;
                                                }
                                            }
                                        />
                                        <code
                                            style={{ display: "block" }}
                                        ></code>
                                    </>
                                );
                            case "ltq":
                                return (
                                    <>
                                        <LTQ
                                            key={question.id}
                                            question={question}
                                            updateResponse={updateResponse}
                                            triggerSave={debouncedSave}
                                            data={
                                                formData[question.id] as {
                                                    response: string;
                                                    error: {
                                                        message: string;
                                                        title: string;
                                                    } | null;
                                                }
                                            }
                                        />
                                        <code
                                            style={{ display: "block" }}
                                        ></code>
                                    </>
                                );
                            case "mcq":
                                return (
                                    <>
                                        <MCQ
                                            key={question.id}
                                            question={question}
                                            updateResponse={updateResponse}
                                            triggerSave={debouncedSave}
                                            data={
                                                formData[question.id] as {
                                                    response: {
                                                        [key: string]: boolean;
                                                    };
                                                    error: {
                                                        message: string;
                                                        title: string;
                                                    } | null;
                                                }
                                            }
                                        />
                                        <code
                                            style={{ display: "block" }}
                                        ></code>
                                    </>
                                );
                            case "scq":
                                return (
                                    <>
                                        <SCQ
                                            key={question.id}
                                            question={question}
                                            updateResponse={updateResponse}
                                            triggerSave={debouncedSave}
                                            data={
                                                formData[question.id] as {
                                                    response: string;
                                                    error: {
                                                        message: string;
                                                        title: string;
                                                    } | null;
                                                }
                                            }
                                        />
                                        <code
                                            style={{ display: "block" }}
                                        ></code>
                                    </>
                                );
                        }
                    })}
                </form>
            </div>
        </Box>
    );
}

function ASCIILine({
    text,
    styles,
}: {
    text: string;
    styles: typeof styles_dark | typeof styles_light;
}) {
    return (
        <code style={{ display: "block" }}>
            <span className={styles.comment}>
                # <pre style={{ display: "inline" }}>{text}</pre>
            </span>
        </code>
    );
}
