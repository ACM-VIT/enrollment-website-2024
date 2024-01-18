"use client";

import React, { FormEvent, KeyboardEvent, useEffect, useRef } from "react";
import styles_light from "./questions_light.module.css";
import styles_dark from "./questions_dark.module.css";
import { useTheme } from "@mui/material";
import { Prisma } from "@prisma/client";

export const STQ = ({
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
}) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const theme = useTheme();

  const styles = theme.palette.mode === "light" ? styles_light : styles_dark;

  useEffect(() => {
    const span = spanRef.current!;
    span.textContent = data.response ?? "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.question}>
      <label htmlFor="name">
        <input
          type="text"
          name={question.id}
          hidden={true}
          value={data.response}
          readOnly={true}
        />
        <span className={styles.print}>print</span>
        <span className={styles.bracket}>(</span>
        <span className={styles.questioneach}>
          &quot;{question.question}&quot;
        </span>
        <span className={styles.bracket}>)</span>
      </label>
      <span className={styles.variable}>{question.varName}</span>=&quot;
      <span
        ref={spanRef}
        className={styles.textBox}
        onInput={(event: FormEvent) => {
          updateResponse(
            question.id,
            (event.target as HTMLSpanElement).textContent ?? ""
          );
          triggerSave();
        }}
        onKeyDown={(event: KeyboardEvent) => {
          if (event.key === "Enter") {
            event.preventDefault();
          }
        }}
        contentEditable="true"
      ></span>
      &quot;
    </div>
  );
};

export const LTQ = ({
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
}) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const theme = useTheme();

  const styles = theme.palette.mode === "light" ? styles_light : styles_dark;

  useEffect(() => {
    const span = spanRef.current!;
    span.textContent = data.response ?? "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.question}>
      <label htmlFor="name">
        <input
          type="text"
          name={question.id}
          hidden={true}
          value={data.response}
          readOnly={true}
        />
        <span className={styles.print}>print</span>
        <span className={styles.bracket}>(</span>
        <span className={styles.questioneach}>
          &quot;{question.question}&quot;
        </span>
        <span className={styles.bracket}>)</span>
      </label>
      <span className={styles.variable}>{question.varName}</span>=&quot;
      <span
        ref={spanRef}
        className={styles.textBox}
        onInput={(event: FormEvent) => {
          updateResponse(
            question.id,
            (event.target as HTMLSpanElement).textContent ?? ""
          );
          triggerSave();
        }}
        contentEditable="true"
      ></span>
      &quot;
    </div>
  );
};

export const MCQ = ({
  question,
  data,
  updateResponse,
  triggerSave,
}: {
  question: Prisma.QuestionGetPayload<{ include: { responses: true } }>;
  triggerSave: Function;
  updateResponse: Function;
  data: {
    response: Record<string, boolean>;
    error: { message: string } | null;
  };
}) => {
  const theme = useTheme();

  const styles = theme.palette.mode === "light" ? styles_light : styles_dark;

  const handleChange = (event: any) => {
    const { name, checked } = event.target;
    updateResponse(question.id, { ...data.response, [name]: checked });
    triggerSave();
  };

  return (
    <div className={styles.question}>
      <label htmlFor={question.id}>
        <span className={styles.print}>print</span>
        <span className={styles.bracket}>(</span>
        <span className={styles.questioneach}>
          &quot;{question.question}&quot;
        </span>
        <span className={styles.bracket}>)</span>
      </label>
      <br />
      <div className={styles.checkboxContainer}>
        <span>
          <span className={styles.variable}>{question.varName}</span>=
          <span className={styles.bracket}>&#123;</span>
        </span>
        {question.options.map((option) => (
          <label htmlFor={option} key={option}>
            <span className={styles.questioneach}>
              &nbsp;&nbsp;&nbsp;&quot;{option}
            </span>
            &quot;:&nbsp;
            <input
              hidden={true}
              type="checkbox"
              id={option}
              name={option}
              checked={data.response[option]}
              onChange={handleChange}
            />
            <span className={styles.toggle}>
              {data.response[option].toString()}
            </span>
            ,
          </label>
        ))}
        <span className={styles.bracket}>&#125;</span>
      </div>
    </div>
  );
};

export const SCQ = ({
  question,
  data,
  updateResponse,
  triggerSave,
}: {
  question: Prisma.QuestionGetPayload<{ include: { responses: true } }>;
  triggerSave: Function;
  updateResponse: Function;
  data: {
    response: Record<string, boolean>;
    error: { message: string } | null;
  };
}) => {
  const theme = useTheme();

  const styles = theme.palette.mode === "light" ? styles_light : styles_dark;

  const handleChange = (event: any) => {
    const { id, checked } = event.target;
    updateResponse(question.id, {
      ...Object.fromEntries(question.options.map((i) => [i, false])),
      [id]: checked,
    });
    triggerSave();
  };

  return (
    <div className={styles.question}>
      <label htmlFor={question.id}>
        <span className={styles.print}>print</span>
        <span className={styles.bracket}>(</span>
        <span className={styles.questioneach}>
          &quot;{question.question}&quot;
        </span>
        <span className={styles.bracket}>)</span>
      </label>
      <br />
      <div className={styles.checkboxContainer}>
        <span>
          <span className={styles.variable}>{question.varName}</span>=
          <span className={styles.bracket}>&#123;</span>
        </span>
        {question.options.map((option) => (
          <label htmlFor={option} key={option}>
            <span className={styles.questioneach}>
              &nbsp;&nbsp;&nbsp;&quot;{option}
            </span>
            &quot;:&nbsp;
            <input
              hidden={true}
              type="radio"
              id={option}
              name={question.id}
              checked={data.response[option]}
              onChange={handleChange}
            />
            <span className={styles.toggle}>
              {data.response[option].toString()}
            </span>
            ,
          </label>
        ))}
        <span className={styles.bracket}>&#125;</span>
      </div>
    </div>
  );
};
