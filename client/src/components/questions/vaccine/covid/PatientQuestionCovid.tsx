// import React, { useRef, useState } from "react";
// import { motion } from "framer-motion";
// import { ChevronsLeft, ChevronsRight } from "lucide-react";
// import PatientInfoCovidVaccine, {
//   PatientInformationVaccineRef,
// } from "../covid/PatientInfoCovidVaccine";
// import ButtonRadioQuestion from "../ButtonRadioVaccine";
// import PreviousVaccineDate from "./PreviousVaccineDate";

// interface PatientInfo {
//   firstName: string;
//   lastName: string;
//   age: number;
// }

// interface AnswerPair {
//   question: string;
//   answer: string[];
// }

// interface NestedAnswer {
//   question: string;
//   answer: string[];
// }

// const questions = [
//   {
//     id: 2,
//     question: "Patient Information",
//     type: "patient-information-vaccine",
//   },
//   {
//     id: 3,
//     question: "When was the date of your previous COVID-19 vaccine",
//     type: "button-date",
//     options: ["I do not remember", "I have not had a COVID-19 vaccine before"],
//   },
//   {
//     id: 4,
//     question: "Are you a current patient at this location?",
//     type: "button-radio",
//     options: ["Yes", "No"],
//   },
//   {
//     id: 5,
//     question:
//       "I'm interested in learning more about transferring my medications to this pharmacy",
//     type: "button-radio",
//     options: ["Yes", "No"],
//   },
// ];

// interface PatientQuestionsProps {
//   patientIndex: number;
//   patientCount: number;
//   formName: string;
//   initialAnswers: {
//     [questionId: number]: { answer: string[]; nestedAnswers?: NestedAnswer[] };
//   };
//   initialPatientInfo?: PatientInfo;
//   currentQuestionIndex: number;
//   onNext: (step: number) => void;
//   onPrevious: () => void;
//   onAnswerChange: (
//     questionId: number,
//     answer: string[],
//     nestedAnswers?: NestedAnswer[]
//   ) => void;
//   onPatientInfoChange: (info: Partial<PatientInfo>) => void;
//   onComplete: (data: {
//     questionnaire: (AnswerPair | NestedAnswer)[][];
//   }) => void;
// }

// const PatientQuestions: React.FC<PatientQuestionsProps> = ({
//   patientIndex,
//   patientCount,
//   formName,
//   initialAnswers,
//   initialPatientInfo,
//   currentQuestionIndex,
//   onNext,
//   onPrevious,
//   onAnswerChange,
//   onPatientInfoChange,
//   onComplete,
// }) => {
//   const patientInfoRef = useRef<PatientInformationVaccineRef>(null);
//   const [answers, setAnswers] = useState(initialAnswers);

//   const dependencyMap: { [key: number]: (answer: string[]) => number | null } =
//     {
//       //   4: (answer: string[]) => {
//       //     if (answer[0] === "Male") {
//       //       return 3; //index of that question
//       //     }
//       //     if (answer[0] === "Female") {
//       //       return 2;
//       //     }
//       //     return null;
//       //   },
//       //   3: () => 2,
//       //   //   6: (answer: string[]) => {
//       //   //     if (answer[0] === "Yes") {
//       //   //       return null;
//       //   //     }
//       //   //     return 4;
//       //   //   },
//       //   //   7: () => 5,
//       //   //   8: () => 6,
//       //   //   9: (answer: string[]) => {
//       //   //     if (answer[0] === "Yes") {
//       //   //       return null;
//       //   //     }
//       //   //     return 7;
//       //   //   },
//       //   //   10: () => 8,
//       //   //   11: () => 9,
//       //   //   12: () => 10,
//       //   4: (answer: string[]) => {
//       //     if (answer[0] === "Yes") {
//       //       return;
//       //     }
//       //     return 3;
//       //   },
//       //   //   14: () => 12,
//     };

//   // console.log(
//   //   `PatientQuestions Render - Patient: ${patientIndex}, Question Index: ${currentQuestionIndex}`
//   // );

//   const handleAnswerChangeLocal = (
//     index: number,
//     answer: string | string[],
//     nestedAnswers?: NestedAnswer[]
//   ) => {
//     const answerArray = Array.isArray(answer) ? answer : [answer];
//     setAnswers((prev) => ({
//       ...prev,
//       [questions[index].id]: { answer: answerArray, nestedAnswers },
//     }));
//     onAnswerChange(questions[index].id, answerArray, nestedAnswers);
//     // console.log(
//     //   `Answer Changed - Q${questions[index].id}, Answer: ${answerArray}`
//     // );

//     const nextIndex = dependencyMap[questions[index].id]?.(answerArray);
//     if (nextIndex !== null && nextIndex !== undefined && nextIndex !== index) {
//       const baseStep = 1 + patientIndex * 4;
//       const nextStep = baseStep + nextIndex;
//       console.log(
//         `Auto-Next: Q${questions[index].id} → Q${questions[nextIndex].id}, Step: ${nextStep}`
//       );
//       onNext(nextStep);
//     }
//   };

//   const handleNext = () => {
//     const currentAnswer = answers[questions[currentQuestionIndex].id];
//     if (currentQuestionIndex === 0 && !patientInfoRef.current?.validateForm()) {
//       console.log("Validation Failed at Q2");
//       return;
//     }
//     if (!currentAnswer?.answer && currentQuestionIndex !== 0) {
//       alert("Your response is required.");
//       console.log(`No Answer at Q${questions[currentQuestionIndex].id}`);
//       return;
//     }

//     const baseStep = 1 + patientIndex * 4;
//     const nextIndex =
//       dependencyMap[questions[currentQuestionIndex].id]?.(
//         currentAnswer?.answer ?? []
//       ) ?? currentQuestionIndex + 1;

//     if (nextIndex >= questions.length) {
//       const questionnaireData: (AnswerPair | NestedAnswer)[][] = questions
//         .filter((q) => q.question !== "Patient Information")
//         .map((q) => {
//           const answerData = answers[q.id] || { answer: [] };
//           const basePair: AnswerPair = {
//             question: q.question,
//             answer: answerData.answer,
//           };
//           return answerData.nestedAnswers
//             ? [basePair, ...answerData.nestedAnswers]
//             : [basePair];
//         });
//       console.log(
//         `Patient ${patientIndex + 1} Complete, Step: ${
//           baseStep + currentQuestionIndex
//         }`
//       );
//       onComplete({ questionnaire: questionnaireData });
//     } else {
//       const nextStep = baseStep + nextIndex;
//       console.log(
//         `Manual Next: Q${questions[currentQuestionIndex].id} → Q${questions[nextIndex].id}, Step: ${nextStep}`
//       );
//       onNext(nextStep);
//     }
//   };

//   const currentQuestion = questions[currentQuestionIndex];

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       {currentQuestion.type === "patient-information-vaccine" && (
//         <PatientInfoCovidVaccine
//           ref={patientInfoRef}
//           question={currentQuestion.question}
//           onChange={onPatientInfoChange}
//           currentPatientIndex={patientIndex}
//           numPatients={patientCount}
//           initialData={initialPatientInfo}
//         />
//       )}
//       {currentQuestion.type === "button-date" && (
//         <PreviousVaccineDate
//           question={currentQuestion.question}
//           options={currentQuestion.options as string[]}
//           onChange={(answer) =>
//             handleAnswerChangeLocal(currentQuestionIndex, answer)
//           }
//           selectedAnswer={answers[currentQuestion.id]?.answer[0] as string}
//           name={`${initialPatientInfo?.firstName || ""} ${
//             initialPatientInfo?.lastName || ""
//           }`}
//         />
//       )}

//       {currentQuestion.type === "button-radio" && (
//         <ButtonRadioQuestion
//           question={currentQuestion.question}
//           options={currentQuestion.options as string[]}
//           onChange={(answer) =>
//             handleAnswerChangeLocal(currentQuestionIndex, answer)
//           }
//           name={`${initialPatientInfo?.firstName || ""} ${
//             initialPatientInfo?.lastName || ""
//           }`}
//           selectedAnswer={answers[currentQuestion.id]?.answer}
//         />
//       )}

//       <div className="mt-6 flex justify-between">
//         <button
//           onClick={onPrevious}
//           className="text-gray-600 hover:text-gray-800 disabled:text-gray-400"
//           disabled={history.length <= 1}
//         >
//           <div className="flex">
//             <ChevronsLeft className="mr-2" />
//             Previous
//           </div>
//         </button>
//         <button
//           onClick={handleNext}
//           className="text-gray-600 hover:text-primary"
//         >
//           <div className="flex">
//             Next
//             <ChevronsRight />
//           </div>
//         </button>
//       </div>
//     </motion.div>
//   );
// };

// export default PatientQuestions;

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import PatientInfoCovidVaccine, {
  PatientInformationVaccineRef,
} from "../covid/PatientInfoCovidVaccine";
import ButtonRadioQuestion from "../ButtonRadioVaccine";
import PreviousVaccineDate from "./PreviousVaccineDate";

interface PatientInfo {
  firstName: string;
  lastName: string;
  age: number;
}

interface AnswerPair {
  question: string;
  answer: string[];
}

interface NestedAnswer {
  question: string;
  answer: string[];
}

const questions = [
  {
    id: 2,
    question: "Patient Information",
    type: "patient-information-vaccine",
  },
  {
    id: 3,
    question: "When was the date of your previous COVID-19 vaccine",
    type: "button-date",
    options: ["I do not remember", "I have not had a COVID-19 vaccine before"],
  },
  {
    id: 4,
    question: "Are you a current patient at this location?",
    type: "button-radio",
    options: ["Yes", "No"],
  },
  {
    id: 5,
    question:
      "I'm interested in learning more about transferring my medications to this pharmacy",
    type: "button-radio",
    options: ["Yes", "No"],
  },
];

interface PatientQuestionsProps {
  patientIndex: number;
  patientCount: number;
  formName: string;
  initialAnswers: {
    [questionId: number]: { answer: string[]; nestedAnswers?: NestedAnswer[] };
  };
  initialPatientInfo?: PatientInfo;
  currentQuestionIndex: number;
  onNext: (step: number) => void;
  onPrevious: () => void;
  onAnswerChange: (
    questionId: number,
    answer: string[],
    nestedAnswers?: NestedAnswer[]
  ) => void;
  onPatientInfoChange: (info: Partial<PatientInfo>) => void;
  onComplete: (data: {
    questionnaire: (AnswerPair | NestedAnswer)[][];
  }) => void;
}

const PatientQuestions: React.FC<PatientQuestionsProps> = ({
  patientIndex,
  patientCount,
  formName,
  initialAnswers,
  initialPatientInfo,
  currentQuestionIndex,
  onNext,
  onPrevious,
  onAnswerChange,
  onPatientInfoChange,
  onComplete,
}) => {
  const patientInfoRef = useRef<PatientInformationVaccineRef>(null);
  const [answers, setAnswers] = useState(initialAnswers);

  const dependencyMap: { [key: number]: (answer: string[]) => number | null } =
    {
      // 4: (answer) => {
      //   if (answer[0] === "No") {
      //     return 3; // Index of question ID 5
      //   }
      //   return null; // Skip to the end if "Yes"
      // },
    };

  const handleAnswerChangeLocal = (
    index: number,
    answer: string | string[],
    nestedAnswers?: NestedAnswer[]
  ) => {
    const answerArray = Array.isArray(answer) ? answer : [answer];
    setAnswers((prev) => ({
      ...prev,
      [questions[index].id]: { answer: answerArray, nestedAnswers },
    }));
    onAnswerChange(questions[index].id, answerArray, nestedAnswers);

    const nextIndex = dependencyMap[questions[index].id]?.(answerArray);
    if (nextIndex !== null && nextIndex !== undefined && nextIndex !== index) {
      const baseStep = 1 + patientIndex * 4;
      const nextStep = baseStep + nextIndex;
      console.log(
        `Auto-Next: Q${questions[index].id} → Q${
          questions[nextIndex]?.id || "End"
        }, Step: ${nextStep}`
      );
      onNext(nextStep);
    }
  };

  // const handleNext = () => {
  //   const currentAnswer = answers[questions[currentQuestionIndex].id];
  //   if (currentQuestionIndex === 0 && !patientInfoRef.current?.validateForm()) {
  //     console.log("Validation Failed at Q2");
  //     return;
  //   }
  //   if (!currentAnswer?.answer && currentQuestionIndex !== 0) {
  //     alert("Your response is required.");
  //     console.log(`No Answer at Q${questions[currentQuestionIndex].id}`);
  //     return;
  //   }

  //   const baseStep = 1 + patientIndex * 4;
  //   const nextIndex =
  //     dependencyMap[questions[currentQuestionIndex].id]?.(
  //       currentAnswer?.answer ?? []
  //     ) ?? currentQuestionIndex + 1;

  //   if (nextIndex >= questions.length) {
  //     const questionnaireData: (AnswerPair | NestedAnswer)[][] = questions
  //       .filter((q) => q.question !== "Patient Information")
  //       .map((q) => {
  //         const answerData = answers[q.id] || { answer: [] };
  //         const basePair: AnswerPair = {
  //           question: q.question,
  //           answer: answerData.answer,
  //         };
  //         return answerData.nestedAnswers
  //           ? [basePair, ...answerData.nestedAnswers]
  //           : [basePair];
  //       });
  //     console.log(
  //       `Patient ${patientIndex + 1} Complete, Step: ${
  //         baseStep + currentQuestionIndex
  //       }`
  //     );
  //     onComplete({ questionnaire: questionnaireData });
  //   } else {
  //     const nextStep = baseStep + nextIndex;
  //     console.log(
  //       `Manual Next: Q${questions[currentQuestionIndex].id} → Q${questions[nextIndex].id}, Step: ${nextStep}`
  //     );
  //     onNext(nextStep);
  //   }
  // };

  const handleNext = () => {
    const currentAnswer = answers[questions[currentQuestionIndex].id];
    if (currentQuestionIndex === 0 && !patientInfoRef.current?.validateForm()) {
      console.log("Validation Failed at Q2");
      return;
    }
    if (!currentAnswer?.answer && currentQuestionIndex !== 0) {
      alert("Your response is required.");
      console.log(`No Answer at Q${questions[currentQuestionIndex].id}`);
      return;
    }

    const baseStep = 1 + patientIndex * 4;
    const nextIndex =
      dependencyMap[questions[currentQuestionIndex].id]?.(
        currentAnswer?.answer ?? []
      ) ?? currentQuestionIndex + 1;

    if (nextIndex >= questions.length) {
      const questionnaireData: (AnswerPair | NestedAnswer)[][] = questions
        .filter((q) => q.question !== "Patient Information")
        .map((q) => {
          const answerData = answers[q.id] || { answer: [] };
          const basePair: AnswerPair = {
            question: q.question,
            answer: answerData.answer,
          };
          return answerData.nestedAnswers
            ? [basePair, ...answerData.nestedAnswers]
            : [basePair];
        });
      console.log(
        `Patient ${patientIndex + 1} Complete, Step: ${
          baseStep + currentQuestionIndex
        }`
      );
      onComplete({ questionnaire: questionnaireData });
    } else {
      const nextStep = baseStep + nextIndex;
      console.log(
        `Manual Next: Q${questions[currentQuestionIndex].id} → Q${questions[nextIndex].id}, Step: ${nextStep}`
      );
      onNext(nextStep);
    }
  };
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {currentQuestion.type === "patient-information-vaccine" && (
        <PatientInfoCovidVaccine
          ref={patientInfoRef}
          question={currentQuestion.question}
          onChange={onPatientInfoChange}
          currentPatientIndex={patientIndex}
          numPatients={patientCount}
          initialData={initialPatientInfo}
        />
      )}
      {currentQuestion.type === "button-date" && (
        <PreviousVaccineDate
          question={currentQuestion.question}
          options={currentQuestion.options as string[]}
          onChange={(answer) =>
            handleAnswerChangeLocal(currentQuestionIndex, answer)
          }
          selectedAnswer={answers[currentQuestion.id]?.answer[0] as string}
          name={`${initialPatientInfo?.firstName || ""} ${
            initialPatientInfo?.lastName || ""
          }`}
        />
      )}

      {currentQuestion.type === "button-radio" && (
        <ButtonRadioQuestion
          question={currentQuestion.question}
          options={currentQuestion.options as string[]}
          onChange={(answer) =>
            handleAnswerChangeLocal(currentQuestionIndex, answer)
          }
          name={`${initialPatientInfo?.firstName || ""} ${
            initialPatientInfo?.lastName || ""
          }`}
          selectedAnswer={answers[currentQuestion.id]?.answer}
        />
      )}

      <div className="mt-6 flex justify-between">
        <button
          onClick={onPrevious}
          className="text-gray-600 hover:text-gray-800 disabled:text-gray-400"
          disabled={history.length <= 1}
        >
          <div className="flex">
            <ChevronsLeft className="mr-2" />
            Previous
          </div>
        </button>
        <button
          onClick={handleNext}
          className="text-gray-600 hover:text-primary"
        >
          <div className="flex">
            Next
            <ChevronsRight />
          </div>
        </button>
      </div>
    </motion.div>
  );
};

export default PatientQuestions;
