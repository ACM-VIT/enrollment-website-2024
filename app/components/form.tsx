'use client';
import React, {useRef} from 'react';
import saveForm from "@/app/actions/form";
import {useDebouncedCallback} from "use-debounce";
import {Question} from ".prisma/client";
import {Domain} from "@prisma/client";

export function Form({questions, domain}: { questions: Question[], domain: Domain }) {
    const triggerSave = useDebouncedCallback(() => {
        // submit the form
        (form!.current! as HTMLFormElement).requestSubmit();
    }, 5000)
    const form = useRef(null);
    return (
        <form action={saveForm.bind(null, domain)} ref={form}>
            {questions.map((question) => {
                    return (
                        <div key={question.id}>
                            <h1>{question.question}</h1>
                            <input type="text" name={question.id} onInput={triggerSave}/>
                        </div>
                    );
                }
            )}
        </form>
    );
}

