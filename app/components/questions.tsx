"use client";

import React, {FormEvent, KeyboardEvent, useEffect, useRef, useState} from "react";
import styles_light from "./questions_light.module.css";
import styles_dark from "./questions_dark.module.css";
import {useTheme} from "@mui/material";
import {Prisma} from "@prisma/client";


export const STQ = ({question, triggerSave}: {
    question: Prisma.QuestionGetPayload<{ include: { responses: true } }>,
    triggerSave: Function
}) => {
    const [value, setValue] = useState(question.responses[0]?.response ?? "");

    const spanRef = useRef<HTMLSpanElement>(null);
    const theme = useTheme();

    const styles = theme.palette.mode === "light" ? styles_light : styles_dark;

    useEffect(() => {
        const span = spanRef.current!;
        span.textContent = question.responses[0]?.response ?? "";
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (<div className={styles.question}>
            <label htmlFor="name">
                <input type="text" name={question.id} hidden={true} value={value}/>
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
                    setValue((event.target as HTMLSpanElement).textContent ?? "");
                    triggerSave();
                }}
                onKeyDown={(event: KeyboardEvent) => {
                    if (event.key === "Enter") {
                        event.preventDefault();
                    }
                }}
                contentEditable="true"
                defaultValue={value}
            ></span>
            &quot;
        </div>
    );
}

export const LTQ = ({question, triggerSave}: {
    question: Prisma.QuestionGetPayload<{ include: { responses: true } }>,
    triggerSave: Function
}) => {
    const [value, setValue] = useState(question.responses[0]?.response ?? "");

    const spanRef = useRef<HTMLSpanElement>(null);
    const theme = useTheme();

    const styles = theme.palette.mode === "light" ? styles_light : styles_dark;

    useEffect(() => {
        const span = spanRef.current!;
        span.textContent = question.responses[0]?.response ?? "";
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (<div className={styles.question}>
            <label htmlFor="name">
                <input type="text" name={question.id} hidden={true} value={value}/>
                <span className={styles.print}>print</span>
                <span className={styles.bracket}>(</span>
                <span className={styles.questioneach}>
        &quot;{question.question}&quot;
      </span>
                <span className={styles.bracket}>)</span>
            </label>
            <span className={styles.variable}>{question.varName}</span>=&quot;&quot;&quot;
            <span
                ref={spanRef}
                className={styles.textBox}
                onInput={(event: FormEvent) => {
                    setValue((event.target as HTMLSpanElement).textContent ?? "");
                    triggerSave();
                }}
                contentEditable="true"
                defaultValue={value}
            ></span>
            &quot;&quot;&quot;
        </div>
    );
}

// TODO mcq, scq

// export const PythonForm = () => {
//   const theme = useTheme();
//   const styles = theme.palette.mode === "light" ? styles_light : styles_dark;

//   const initialInterests = {
//     devops: false,
//     backendDevelopment: false,
//     frontendDevelopment: false,
//     dataScience: false,
//     machineLearning: false,
//   };

//   const initialGenders = {
//     male: false,
//     female: false,
//     other: false,
//   };

//   const [interests, setInterests] = useState(initialInterests);

//   const [gender, setGender] = useState(initialGenders);


//   const nameChangeHandler = ;
//   const handleChangeInterests = (event: any) => {
//     const { name, checked } = event.target;
//     setInterests({ ...interests, [name]: checked });
//   };

//   const handleChangeGender = (event: any) => {
//     const { name, checked } = event.target;
//     setGender({ ...initialGenders, [name]: checked });
//   };

//   const handleSubmit = (event: any) => {
//     event.preventDefault();
//     console.log({ name, interests });
//     // Submit form data here
//   };

//   return (
//     <form className={styles.pythonForm} onSubmit={handleSubmit}>
//       <h2>Python Form</h2>

//       {/* Question 1 */}

//       {/* Question 2 */}


//       {/* Question 3 */}

//       <div className={styles.question}>
//         <label htmlFor="interests">
//           <span className={styles.print}>print</span>
//           <span className={styles.bracket}>(</span>
//           <span className={styles.questioneach}>
//             &quot;Q3: What are your fields of interest?&quot;
//           </span>
//           <span className={styles.bracket}>)</span>
//         </label>
//         <br></br>
//         <div className={styles.checkboxContainer}>
//           <span>
//             <span className={styles.variable}>interests</span>=
//             <span className={styles.bracket}>&#123;</span>
//           </span>
//           <label htmlFor="devops">
//             <span className={styles.questioneach}>
//               &nbsp;&nbsp;&nbsp;&quot;DevOps
//             </span>
//             &quot;:
//             <input
//               hidden={true}
//               type="checkbox"
//               id="devops"
//               name="devops"
//               checked={interests.devops}
//               onChange={handleChangeInterests}
//             />
//             <span className={styles.toggle}>{interests.devops.toString()}</span>
//             ,
//           </label>
//           <label htmlFor="backendDevelopment">
//             <span className={styles.questioneach}>
//               &nbsp;&nbsp;&nbsp;&quot;Backend
//             </span>
//             &quot;:
//             <input
//               hidden={true}
//               type="checkbox"
//               id="backendDevelopment"
//               name="backendDevelopment"
//               checked={interests.backendDevelopment}
//               onChange={handleChangeInterests}
//             />
//             <span className={styles.toggle}>
//               {interests.backendDevelopment.toString()}
//             </span>
//             ,
//           </label>
//           <label htmlFor="frontendDevelopment">
//             <span className={styles.questioneach}>
//               &nbsp;&nbsp;&nbsp;&quot;Frontend
//             </span>
//             &quot;:
//             <input
//               hidden={true}
//               type="checkbox"
//               id="frontendDevelopment"
//               name="frontendDevelopment"
//               checked={interests.frontendDevelopment}
//               onChange={handleChangeInterests}
//             />
//             <span className={styles.toggle}>
//               {interests.frontendDevelopment.toString()}
//             </span>
//           </label>
//           <span className={styles.bracket}>&#125;</span>
//         </div>
//       </div>

//       {/* Question 4 */}

//       <div className={styles.question}>
//         <label htmlFor="interests">
//           <span className={styles.print}>print</span>
//           <span className={styles.bracket}>(</span>
//           <span className={styles.questioneach}>
//             &quot;Q4: What is your gender?&quot;
//           </span>
//           <span className={styles.bracket}>)</span>
//         </label>
//         <br></br>
//         <div className={styles.checkboxContainer}>
//           <span>
//             <span className={styles.variable}>Gender</span>=
//             <span className={styles.bracket}>&#123;</span>
//           </span>
//           <label htmlFor="male">
//             <span className={styles.questioneach}>
//               &nbsp;&nbsp;&nbsp;&quot;Male
//             </span>
//             &quot;:
//             <input
//               hidden={true}
//               type="checkbox"
//               id="male"
//               name="male"
//               checked={gender.male}
//               onChange={handleChangeGender}
//             />
//             <span className={styles.toggle}>{gender.male.toString()}</span>,
//           </label>
//           <label htmlFor="female">
//             <span className={styles.questioneach}>
//               &nbsp;&nbsp;&nbsp;&quot;Female
//             </span>
//             &quot;:
//             <input
//               hidden={true}
//               type="checkbox"
//               id="female"
//               name="female"
//               checked={gender.female}
//               onChange={handleChangeGender}
//             />
//             <span className={styles.toggle}>{gender.female.toString()}</span>,
//           </label>
//           <label htmlFor="other">
//             <span className={styles.questioneach}>
//               &nbsp;&nbsp;&nbsp;&quot;Other
//             </span>
//             &quot;:
//             <input
//               hidden={true}
//               type="checkbox"
//               id="other"
//               name="other"
//               checked={gender.other}
//               onChange={handleChangeGender}
//             />
//             <span className={styles.toggle}>{gender.other.toString()}</span>
//           </label>
//           <span className={styles.bracket}>&#125;</span>
//         </div>
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default PythonForm;
