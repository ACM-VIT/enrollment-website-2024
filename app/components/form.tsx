'use client';
import React, {useState, useEffect, createRef, useTransition} from 'react';
import saveForm from "@/app/actions/form";
import styles_light from "./questions_light.module.css";
import styles_dark from "./questions_dark.module.css";
import {useTheme} from "@mui/material";
import {useDebouncedCallback} from "use-debounce";
import {Prisma} from ".prisma/client";
import {Domain} from "@prisma/client";
import {STQ, LTQ, MCQ, SCQ} from "@/app/components/questions";

export function Form({questions, domain}: {
    questions: Prisma.QuestionGetPayload<{ include: { responses: true } }>[],
    domain: Domain
}) {
    const [, startSave] = useTransition();
    const [formData, setFormData] = useState<Record<string, {
        response: string | Record<string, boolean>,
        error: { message: string, title: string } | null
    }>>(Object.fromEntries(questions.map((question) => [question.id, {
        response: question.responses[0]?.response ? JSON.parse(question.responses[0]?.response) : ['stq', 'ltq'].includes(question.type) ? '' : Object.fromEntries(question.options.map((option) => [option, false])),
        error: null
    }])));

    const form = createRef<HTMLFormElement>();
    const [lines, setLines] = useState<number[]>([]);
    useEffect(() => {
        if (!form.current) return;
        const resizeObserver = new ResizeObserver(() => {
            if (form.current) {
                const {current} = form
                const boundingRect = current.getBoundingClientRect()
                const {height} = boundingRect
                const lineHeight = 21;
                const numLines = Math.floor(height / lineHeight);
                const lines = Array.from(Array(numLines).keys());
                setLines(lines);
            }
        });
        resizeObserver.observe(form.current);
        return () => resizeObserver.disconnect();
    }, [form])

    const theme = useTheme();
    const styles = theme.palette.mode === "light" ? styles_light : styles_dark;

    // useEffect(() => {
    //     // const formproxy = (form.current! as HTMLFormElement);
    //
    //     return () => {
    //         // formproxy.requestSubmit();
    //         saveForm(domain, formData).then(res => {
    //             if (!res) alert('Error in saving');
    //         })
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    const debouncedSave = useDebouncedCallback(() => {
        // submit the form
        // (form!.current! as HTMLFormElement).requestSubmit();
        console.log(formData);
        startSave(() => saveForm(domain, formData).then(res => {
            if (!res) alert('Error in saving');
        }));
    }, 5000)

    function updateResponse(id: string, response: string) {
        setFormData((prev) => {
            return validate({
                ...prev,
                [id]: {...prev[id], response},
            })
        })
    }

    function validate(data: Record<string, {
        response: string | Record<string, boolean>,
        error: { message: string, title: string } | null
    }>) {
        return data
    }

    return (
        <>
            <div className={styles.editor}>
                <div className={styles.lineNumbers}>
                    {lines.map((line) => (
                        <div key={line} className={styles.lineNumber}>{line + 1}</div>
                    ))}
                </div>
                <form ref={form} onChange={debouncedSave}>
                    {questions.map((question) => {
                        switch (question.type) {
                            case "stq":
                                return <STQ key={question.id} question={question} updateResponse={updateResponse} triggerSave={debouncedSave}
                                            data={formData[question.id] as {
                                                response: string,
                                                error: { message: string, title: string } | null
                                            }}/>;
                            case "ltq":
                                return <LTQ key={question.id} question={question} updateResponse={updateResponse} triggerSave={debouncedSave}
                                            data={formData[question.id] as {
                                                response: string,
                                                error: { message: string, title: string } | null
                                            }}/>;
                            case "mcq":
                                return <MCQ key={question.id} question={question} updateResponse={updateResponse} triggerSave={debouncedSave}
                                            data={formData[question.id] as {
                                                response: Record<string, boolean>,
                                                error: { message: string, title: string } | null
                                            }}/>;
                            case "scq":
                                return <SCQ key={question.id} question={question} updateResponse={updateResponse} triggerSave={debouncedSave}
                                            data={formData[question.id] as {
                                                response: Record<string, boolean>,
                                                error: { message: string, title: string } | null
                                            }}/>;
                        }
                    })}
                </form>
            </div>
        </>
    );
}

