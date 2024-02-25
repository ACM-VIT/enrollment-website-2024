"use client";
import React, {useState, useEffect, createRef, useTransition, useCallback, useContext} from "react";
import saveForm from "@/app/actions/form";
import styles_light from "./questions_light.module.css";
import styles_dark from "./questions_dark.module.css";
import {useTheme} from "@mui/material";
import {useDebouncedCallback} from "use-debounce";
import {Prisma} from ".prisma/client";
import {Domain} from "@prisma/client";
import {STQ, LTQ, MCQ, SCQ} from "@/app/components/questions";
import {Box} from "@mui/system";
import PagesContext from "@/lib/PagesContext";


export function Form({
                         questions,
                         domain,
                     }: {
    questions: Prisma.QuestionGetPayload<{ include: { responses: true } }>[];
    domain: Domain;
}) {
    const [, startSave] = useTransition();
    const {setUnsavedChanges} = useContext(PagesContext);
    const [formData, setFormData] = useState<
        Record<
            string,
            {
                response: string | Record<string, boolean>;
                error: { message: string; title: string } | null;
            }
        >
    >(
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
                    error: null,
                },
            ])
        )
    );

    const [lastSaved, setLastSaved] = useState(formData);

    const form = createRef<HTMLFormElement>();

    const preventSave = useCallback(() => 'Warning here.....', [])


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
                const {current} = form;
                const boundingRect = current.getBoundingClientRect();
                const {height} = boundingRect;
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
        console.log(formData);
        startSave(() => {
            const temp = {...formData};
            saveForm(domain, temp).then((res) => {
                if (!res) alert("Error in saving");
                else setLastSaved({...temp});
            })
        });
    }, 5000);

    const updateResponse = useCallback((id: string, response: string) => {
            setFormData((prev) => {
                return validate({
                    ...prev,
                    [id]: {...prev[id], response},
                });
            });
        }, []
    )

    function validate(
        data: Record<
            string,
            {
                response: string | Record<string, boolean>;
                error: { message: string; title: string } | null;
            }
        >
    ) {
        return data;
    }

    return (
        <Box
            sx={{
                overflowY: "auto",
            }}
        >
            <div className={styles.editor}>
                <div className={styles.lineNumbers}>
                    {lines.map((line) => (
                        <div key={line} className={styles.lineNumber}>
                            {line + 1}
                        </div>
                    ))}
                </div>
                <form ref={form} onChange={debouncedSave}>
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
                                                    error: { message: string; title: string } | null;
                                                }
                                            }
                                        />
                                        <br/>
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
                                                    error: { message: string; title: string } | null;
                                                }
                                            }
                                        />
                                        <br/>
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
                                                    response: Record<string, boolean>;
                                                    error: { message: string; title: string } | null;
                                                }
                                            }
                                        />
                                        <br/>
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
                                                    response: Record<string, boolean>;
                                                    error: { message: string; title: string } | null;
                                                }
                                            }
                                        />
                                        <br/>
                                    </>
                                );
                        }
                    })}
                </form>
            </div>
        </Box>
    );
}
