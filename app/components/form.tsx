'use client';
import React, {useEffect, useRef} from 'react';
import saveForm from "@/app/actions/form";
import {useDebouncedCallback} from "use-debounce";
import {Question, Prisma} from ".prisma/client";
import {Domain} from "@prisma/client";

export function Form({questions, domain}: {
    questions: Prisma.QuestionGetPayload<{ include: { responses: true } }>[],
    domain: Domain
}) {
    const form = useRef(null);

    useEffect(() => {

        return () => {
            // submit the form
            (form!.current! as HTMLFormElement)?.requestSubmit();
        }
    }, []);

    const debouncedSave = useDebouncedCallback(() => {
        // submit the form
        (form!.current! as HTMLFormElement).requestSubmit();
    }, 5000)
    return (
        <form action={saveForm.bind(null, domain)} ref={form}>
            {questions.map((question) => {
                    return (
                        <div key={question.id}>
                            <h1>{question.question}</h1>
                            <input type="text" name={question.id} onInput={debouncedSave}
                                   defaultValue={question.responses[0]?.response ?? ''}/>
                        </div>
                    );
                }
            )}
        </form>
    );
}

