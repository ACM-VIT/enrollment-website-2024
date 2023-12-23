"use client";

import React, { useEffect, useState } from "react";
import styles from "./questions_light.module.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialDark,
  materialLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const PythonForm = () => {
  const [name, setName] = useState("");
  const initialInterests = {
    devops: false,
    backendDevelopment: false,
    frontendDevelopment: false,
    dataScience: false,
    machineLearning: false,
  };

  const initialGenders = {
    male: false,
    female: false,
    other: false,
  };

  const [interests, setInterests] = useState(initialInterests);

  const [gender, setGender] = useState(initialGenders);

  const enterPressHandler = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const nameChangeHandler = (event: any) => {
    setName(event.target.textContent);
  };
  const handleChangeInterests = (event: any) => {
    const { name, checked } = event.target;
    setInterests({ ...interests, [name]: checked });
  };

  const handleChangeGender = (event: any) => {
    const { name, checked } = event.target;
    setGender({ ...initialGenders, [name]: checked });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log({ name, interests });
    // Submit form data here
  };

  return (
    <form className={styles.pythonForm} onSubmit={handleSubmit}>
      <h2>Python Form</h2>

      {/* Question 1 */}

      <div className={styles.question}>
        <label htmlFor="name">
          <span className={styles.print}>print</span>
          <span className={styles.bracket}>(</span>
          <span className={styles.questioneach}>
            &quot;Q1: What is your name?&quot;
          </span>
          <span className={styles.bracket}>)</span>
        </label>
        <span className={styles.variable}>name</span>=&quot;
        <span
          id="nmeInput"
          className={styles.textBox}
          onInput={nameChangeHandler}
          onKeyDown={enterPressHandler}
          contentEditable="true"
        />
        &quot;
      </div>

      {/* Question 2 */}

      <div className={styles.question}>
        <label htmlFor="answer">
          <span className={styles.print}>print</span>
          <span className={styles.bracket}>(</span>
          <span className={styles.questioneach}>
            &quot;Q2: Long Answer Question?&quot;
          </span>
          <span className={styles.bracket}>)</span>
        </label>
        <span className={styles.variable}>answer</span>=&quot;
        <span
          className={styles.textBox}
          onInput={nameChangeHandler}
          contentEditable="true"
        />
        &quot;
      </div>

      {/* Question 3 */}

      <div className={styles.question}>
        <label htmlFor="interests">
          <span className={styles.print}>print</span>
          <span className={styles.bracket}>(</span>
          <span className={styles.questioneach}>
            &quot;Q3: What are your fields of interest?&quot;
          </span>
          <span className={styles.bracket}>)</span>
        </label>
        <br></br>
        <div className={styles.checkboxContainer}>
          <span>
            <span className={styles.variable}>interests</span>=
            <span className={styles.bracket}>&#123;</span>
          </span>
          <label htmlFor="devops">
            <span className={styles.questioneach}>
              &nbsp;&nbsp;&nbsp;&quot;DevOps
            </span>
            &quot;:
            <input
              hidden={true}
              type="checkbox"
              id="devops"
              name="devops"
              checked={interests.devops}
              onChange={handleChangeInterests}
            />
            <span className={styles.toggle}>{interests.devops.toString()}</span>
            ,
          </label>
          <label htmlFor="backendDevelopment">
            <span className={styles.questioneach}>
              &nbsp;&nbsp;&nbsp;&quot;Backend
            </span>
            &quot;:
            <input
              hidden={true}
              type="checkbox"
              id="backendDevelopment"
              name="backendDevelopment"
              checked={interests.backendDevelopment}
              onChange={handleChangeInterests}
            />
            <span className={styles.toggle}>
              {interests.backendDevelopment.toString()}
            </span>
            ,
          </label>
          <label htmlFor="frontendDevelopment">
            <span className={styles.questioneach}>
              &nbsp;&nbsp;&nbsp;&quot;Frontend
            </span>
            &quot;:
            <input
              hidden={true}
              type="checkbox"
              id="frontendDevelopment"
              name="frontendDevelopment"
              checked={interests.frontendDevelopment}
              onChange={handleChangeInterests}
            />
            <span className={styles.toggle}>
              {interests.frontendDevelopment.toString()}
            </span>
          </label>
          <span className={styles.bracket}>&#125;</span>
        </div>
      </div>

      {/* Question 4 */}

      <div className={styles.question}>
        <label htmlFor="interests">
          <span className={styles.print}>print</span>
          <span className={styles.bracket}>(</span>
          <span className={styles.questioneach}>
            &quot;Q4: What is your gender?&quot;
          </span>
          <span className={styles.bracket}>)</span>
        </label>
        <br></br>
        <div className={styles.checkboxContainer}>
          <span>
            <span className={styles.variable}>Gender</span>=
            <span className={styles.bracket}>&#123;</span>
          </span>
          <label htmlFor="male">
            <span className={styles.questioneach}>
              &nbsp;&nbsp;&nbsp;&quot;Male
            </span>
            &quot;:
            <input
              hidden={true}
              type="checkbox"
              id="male"
              name="male"
              checked={gender.male}
              onChange={handleChangeGender}
            />
            <span className={styles.toggle}>{gender.male.toString()}</span>,
          </label>
          <label htmlFor="female">
            <span className={styles.questioneach}>
              &nbsp;&nbsp;&nbsp;&quot;Female
            </span>
            &quot;:
            <input
              hidden={true}
              type="checkbox"
              id="female"
              name="female"
              checked={gender.female}
              onChange={handleChangeGender}
            />
            <span className={styles.toggle}>{gender.female.toString()}</span>,
          </label>
          <label htmlFor="other">
            <span className={styles.questioneach}>
              &nbsp;&nbsp;&nbsp;&quot;Other
            </span>
            &quot;:
            <input
              hidden={true}
              type="checkbox"
              id="other"
              name="other"
              checked={gender.other}
              onChange={handleChangeGender}
            />
            <span className={styles.toggle}>{gender.other.toString()}</span>
          </label>
          <span className={styles.bracket}>&#125;</span>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PythonForm;
