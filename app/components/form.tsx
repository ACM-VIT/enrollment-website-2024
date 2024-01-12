'use client';
import React, {useEffect, useRef} from 'react';
import saveForm from "@/app/actions/form";
import {useDebouncedCallback} from "use-debounce";
import {Prisma} from ".prisma/client";
import {Domain} from "@prisma/client";
import {STQ, LTQ} from "@/app/components/questions";
export function Form({questions, domain}: {
    questions: Prisma.QuestionGetPayload<{ include: { responses: true } }>[],
    domain: Domain
}) {
    const form = useRef(null);

    useEffect(() => {
        const formproxy = (form.current! as HTMLFormElement);

        return () => {
            formproxy.requestSubmit();
        }
    }, []);

    const debouncedSave = useDebouncedCallback(() => {
        // submit the form
        (form!.current! as HTMLFormElement).requestSubmit();
    }, 5000)
    return (
        <form action={saveForm.bind(null, domain)} ref={form}>
            {questions.map((question) => {
                    switch (question.type) {
                        case "stq":
                            return <STQ key={question.id} question={question} triggerSave={debouncedSave} />;
                        case "ltq":
                            return <LTQ key={question.id} question={question} triggerSave={debouncedSave} />;
                        default:
                            return <></>;
                    }
                }
            )}
        </form>
    );
}

