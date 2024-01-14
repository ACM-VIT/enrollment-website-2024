"use client";
import React, { useState, useEffect, createRef } from "react";
import saveForm from "@/app/actions/form";
import styles_light from "./questions_light.module.css";
import styles_dark from "./questions_dark.module.css";
import { useTheme } from "@mui/material";
import { useDebouncedCallback } from "use-debounce";
import { Prisma } from ".prisma/client";
import { Domain } from "@prisma/client";
import { STQ, LTQ } from "@/app/components/questions";
import { FormErrorWrapper } from "./formErrorWrapper";

export function Form({
  questions,
  domain,
}: {
  questions: Prisma.QuestionGetPayload<{ include: { responses: true } }>[];
  domain: Domain;
}) {
  const form = createRef<HTMLFormElement>();
  const [lines, setLines] = useState<number[]>([]);
  useEffect(() => {
    if (!form.current) return;
    const resizeObserver = new ResizeObserver(() => {
      if (form.current) {
        const { current } = form;
        const boundingRect = current.getBoundingClientRect();
        const { width, height } = boundingRect;
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

  useEffect(() => {
    const formproxy = form.current! as HTMLFormElement;

    return () => {
      formproxy.requestSubmit();
    };
  }, []);
  const debouncedSave = useDebouncedCallback(() => {
    // submit the form
    (form!.current! as HTMLFormElement).requestSubmit();
  }, 5000);
  return (
    <>
      <div className={styles.editor}>
        <div className={styles.lineNumbers}>
          {lines.map((line) => (
            <div key={line} className={styles.lineNumber}>
              {line + 1}
            </div>
          ))}
        </div>
        <form action={saveForm.bind(null, domain)} ref={form}>
          {questions.map((question) => {
            switch (question.type) {
              case "stq":
                return (
                  <STQ
                    key={question.id}
                    question={question}
                    triggerSave={debouncedSave}
                  />
                );
              case "ltq":
                return (
                  <LTQ
                    key={question.id}
                    question={question}
                    triggerSave={debouncedSave}
                  />
                );
              default:
                return <></>;
            }
          })}
        </form>
      </div>
    </>
  );
}
