"use client";

import React, {
    FormEvent,
    KeyboardEvent,
    useCallback,
    useEffect,
    useRef,
} from "react";
import styles_light from "./questions_light.module.css";
import styles_dark from "./questions_dark.module.css";
import { useTheme } from "@mui/material";
import { Prisma } from "@prisma/client";
import { FormErrorWrapper } from "@/app/components/formErrorWrapper";

function Comment({
                     text,
                     styles,
                 }: {
    text: string;
    styles: typeof styles_dark | typeof styles_light;
}) {
    return (
        <code style={{ display: "block" }}>
            <span className={styles.comment}># {text}</span>
        </code>
    );
}

function PrintLine({
                       text,
                       styles,
                   }: {
    text: string;
    styles: typeof styles_dark | typeof styles_light;
}) {
    return (
        <code style={{ display: "block" }}>
            <span className={styles.print}>print</span>
            <span className={styles.bracket}>(</span>
            <span className={styles.questioneach}>&quot;{text}&quot;</span>
            <span className={styles.bracket}>)</span>
        </code>
    );
}

function InputLines({
                        variable,
                        data,
                        updateResponse,
                        triggerSave,
                        questionId,
                        options,
                        styles,
                        type,
                    }: {
    variable: string;
    styles: typeof styles_dark | typeof styles_light;
    type: "stq" | "ltq" | "mcq" | "scq";
    questionId: string;
    options: string[] | undefined;
    data: any;
    updateResponse: Function;
    triggerSave: Function;
}) {
    const spanRef = useRef<HTMLSpanElement>(null);

    return (
        <FormErrorWrapper error={data.error} spanRef={spanRef}>
            <code key={"q" + questionId} style={{ display: "block" }} onClick={()=>{
                if (spanRef.current) spanRef.current.focus( {preventScroll: true} );
            }}>
                <span className={styles.variable}>{variable}</span>
                &nbsp;=&nbsp;
                {type === "stq" && (
                    <ST_input
                        initialValue={data.response}
                        styles={styles}
                        updateResponse={updateResponse}
                        triggerSave={triggerSave}
                        questionId={questionId}
                        spanRef={spanRef}
                    />
                )}
                {type === "ltq" && (
                    <LT_input
                        initialValue={data.response}
                        styles={styles}
                        updateResponse={updateResponse}
                        triggerSave={triggerSave}
                        questionId={questionId}
                        spanRef={spanRef}
                    />
                )}
                {type === "mcq" && (
                    <span className={styles.bracket}>&#123;</span>
                )}
                {type === "scq" && (
                    <span className={styles.bracket}>&#123;</span>
                )}
            </code>
            {type === "mcq" && (
                <MCQ_input
                    response={data.response}
                    updateResponse={updateResponse}
                    triggerSave={triggerSave}
                    questionId={questionId}
                    options={options!}
                    styles={styles}
                />
            )}
            {type === "scq" && (
                <SCQ_input
                    response={data.response}
                    updateResponse={updateResponse}
                    triggerSave={triggerSave}
                    questionId={questionId}
                    options={options!}
                    styles={styles}
                />
            )}
            {type === "mcq" && (
                <code style={{ display: "block" }} key={"bc"}>
                    <span className={styles.bracket}>&#125;</span>
                </code>
            )}
            {type === "scq" && (
                <code style={{ display: "block" }} key={"bc"}>
                    <span className={styles.bracket}>&#125;</span>
                </code>
            )}
        </FormErrorWrapper>
    );
}

function ST_input({
                      initialValue,
                      styles,
                      questionId,
                      triggerSave,
                      updateResponse,
                      spanRef,
                  }: {
    initialValue: string;
    styles: typeof styles_dark | typeof styles_light;
    updateResponse: Function;
    triggerSave: Function;
    questionId: string;
    spanRef: React.RefObject<HTMLSpanElement>;
}) {
    const handleInput = useCallback((event: FormEvent) => {
        const isFocused = document.activeElement === spanRef.current;
        updateResponse(
            questionId,
            (event.target as HTMLSpanElement).textContent ?? "",
            isFocused
        );
        triggerSave();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    }, []);

    useEffect(() => {
        const span = spanRef.current!;
        span.textContent = initialValue ?? "";
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [
        '"',
        <span
            key={"span" + questionId + "123"}
            ref={spanRef}
            className={styles.textBox}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            contentEditable="true"
        ></span>,
        '"',
    ];
}

function LT_input({
                      initialValue,
                      styles,
                      updateResponse,
                      triggerSave,
                      questionId,
                      spanRef,
                  }: {
    initialValue: string;
    styles: typeof styles_dark | typeof styles_light;
    updateResponse: Function;
    triggerSave: Function;
    questionId: string;
    spanRef: React.RefObject<HTMLSpanElement>;
}) {
    const handleInput = useCallback((event: FormEvent) => {
        const isFocused = document.activeElement === spanRef.current;
        updateResponse(
            questionId,
            (event.target as HTMLSpanElement).textContent ?? "",
            isFocused
        );
        triggerSave();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const span = spanRef.current!;
        span.textContent = initialValue ?? "";
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [
        '""" ',
        <span
            key={"span"}
            ref={spanRef}
            className={styles.textBox}
            onInput={handleInput}
            contentEditable="true"
        ></span>,
        ' """',
    ];
}

function MCQ_input({
                       response,
                       updateResponse,
                       triggerSave,
                       questionId,
                       options,
                       styles,
                   }: {
    response: { [key: string]: boolean };
    styles: typeof styles_dark | typeof styles_light;
    updateResponse: Function;
    triggerSave: Function;
    questionId: string;
    options: string[];
}) {
    const handleChange = (event: any) => {
        const { id, checked } = event.target;
        updateResponse(questionId, { ...response, [id]: checked }, false);
        console.log(response, id, checked);
        triggerSave();
    };

    return options?.map((option) => (
        <code key={option} style={{ display: "block" }}>
            <label className={styles.questionlabel} htmlFor={(option + questionId)}>
                <span className={styles.questioneach}>
                    &nbsp;&nbsp;&nbsp;&quot;{option}
                </span>
                &quot;:&nbsp;
                <input
                    hidden={true}
                    type="checkbox"
                    id={option + questionId}
                    name={option + questionId}
                    checked={response[option + questionId]}
                    onChange={handleChange}
                />
                <span className={styles.toggle}>
                    {Boolean(response[(option + questionId)]).toString()}
                </span>
                ,
            </label>
        </code>
    ));
}

function SCQ_input({
                       response,
                       updateResponse,
                       triggerSave,
                       questionId,
                       options,
                       styles,
                   }: {
    response: string | null | undefined;
    styles: typeof styles_dark | typeof styles_light;
    updateResponse: Function;
    triggerSave: Function;
    questionId: string;
    options: string[];
}) {
    const handleChange = useCallback((event: any) => {
        updateResponse(questionId, event.target.id, false);
        console.log(event.target.id);
        triggerSave();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return options?.map((option) => (
        <code key={option} style={{ display: "block" }}>
            <label className={styles.questionlabel} htmlFor={(option + questionId)}>
                <span className={styles.questioneach}>
                    &nbsp;&nbsp;&nbsp;&quot;{option}
                </span>
                &quot;:&nbsp;
                <input
                    hidden={true}
                    type="radio"
                    id={option + questionId}
                    name={questionId}
                    checked={response === (option + questionId)}
                    onChange={handleChange}
                />
                <span className={styles.toggle}>
                    {(response === (option + questionId)).toString()}
                </span>
                ,
            </label>
        </code>
    ));
}

export function STQ({
                        question,
                        data,
                        updateResponse,
                        triggerSave,
                    }: {
    question: Prisma.QuestionGetPayload<{ include: { responses: true } }>;
    triggerSave: Function;
    updateResponse: Function;
    data: {
        response: string;
        error: { message: string } | null;
    };
}) {
    const theme = useTheme();
    const styles = theme.palette.mode === "light" ? styles_light : styles_dark;

    return (
        <>
            <PrintLine text={question.question} styles={styles} />
            {question.helpText && (
                <Comment text={question.helpText} styles={styles} />
            )}
            <InputLines
                variable={question.varName}
                data={data}
                updateResponse={updateResponse}
                triggerSave={triggerSave}
                questionId={question.id}
                options={undefined}
                styles={styles}
                type={"stq"}
            />
        </>
    );
}

export function LTQ({
                        question,
                        data,
                        updateResponse,
                        triggerSave,
                    }: {
    question: Prisma.QuestionGetPayload<{ include: { responses: true } }>;
    triggerSave: Function;
    updateResponse: Function;
    data: {
        response: string;
        error: { message: string } | null;
    };
}) {
    const theme = useTheme();
    const styles = theme.palette.mode === "light" ? styles_light : styles_dark;

    return (
        <>
            <PrintLine text={question.question} styles={styles} />
            {question.helpText && (
                <Comment text={question.helpText} styles={styles} />
            )}
            <InputLines
                variable={question.varName}
                data={data}
                updateResponse={updateResponse}
                triggerSave={triggerSave}
                questionId={question.id}
                options={undefined}
                styles={styles}
                type={"ltq"}
            />
        </>
    );
}

export function MCQ({
                        question,
                        data,
                        updateResponse,
                        triggerSave,
                    }: {
    question: Prisma.QuestionGetPayload<{ include: { responses: true } }>;
    triggerSave: Function;
    updateResponse: Function;
    data: {
        response: { [key: string]: boolean };
        error: { message: string } | null;
    };
}) {
    const theme = useTheme();
    const styles = theme.palette.mode === "light" ? styles_light : styles_dark;

    return (
        <>
            <PrintLine text={question.question} styles={styles} />
            {question.helpText && (
                <Comment text={question.helpText} styles={styles} />
            )}
            <InputLines
                variable={question.varName}
                data={data}
                updateResponse={updateResponse}
                triggerSave={triggerSave}
                questionId={question.id}
                options={question.options}
                styles={styles}
                type={"mcq"}
            />
        </>
    );
}

export function SCQ({
                        question,
                        data,
                        updateResponse,
                        triggerSave,
                    }: {
    question: Prisma.QuestionGetPayload<{ include: { responses: true } }>;
    triggerSave: Function;
    updateResponse: Function;
    data: {
        response: string;
        error: { message: string; title: string } | null;
    };
}) {
    const theme = useTheme();
    const styles = theme.palette.mode === "light" ? styles_light : styles_dark;

    return (
        <>
            <PrintLine text={question.question} styles={styles} />
            {question.helpText && (
                <Comment text={question.helpText} styles={styles} />
            )}
            <InputLines
                variable={question.varName}
                data={data}
                updateResponse={updateResponse}
                triggerSave={triggerSave}
                questionId={question.id}
                options={question.options}
                styles={styles}
                type={"scq"}
            />
        </>
    );
}
