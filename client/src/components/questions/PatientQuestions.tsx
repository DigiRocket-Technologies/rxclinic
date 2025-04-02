import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import PatientInformationVaccine, {
  PatientInformationVaccineRef,
} from "../questions/PatientInformationVaccine";
import ButtonRadioQuestion from "../questions/ButtonRadioQuestion";
import ConditionalButtonRadioQuestion from "../questions/ConditionalButtonRadioQuestion";
import PrimaryCareProviderQuestion from "../questions/PrimaryCareProviderQuestion";
import ConsentForInjection from "./ConsentForInjectionQuestion";

interface PatientInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  pronouns?: string;
  healthCardNumber?: string;
  hasHealthCard?: string;
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
    id: 3,
    question: "Patient Information",
    type: "patient-information-vaccine",
  },
  {
    id: 4,
    question: "What sex were you assigned at birth?",
    type: "button-radio-input",
    options: ["Male", "Female"],
  },
  {
    id: 5,
    question:
      "Do you have any allergies to food, medications, eggs, latex or vaccine/injection?",
    type: "conditional-button-radio",
    options: [
      { value: "Yes", showsInput: true, label: "Please specify" },
      { value: "No", showsInput: false },
      { value: "I Don't Know", showsInput: false },
    ],
  },
  {
    id: 6,
    question:
      "Have you ever had a serious reaction after receiving a vaccine/injection?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 7,
    question: "Have you received a vaccine/injection in the last 4 weeks?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 8,
    question: "Are you, or could you be pregnant?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 9,
    question:
      "Do you have any problems with your immune system or take medications which affect your immune system?",
    type: "conditional-button-radio",
    options: [
      { value: "Yes", showsInput: true, label: "Please specify" },
      { value: "No", showsInput: false },
      { value: "I Don't Know", showsInput: false },
    ],
  },
  {
    id: 10,
    question:
      "Do you have a long term health problem (heart disease, lung disease, asthma, kidney disease, anemia, or other blood disorders)?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 11,
    question:
      "Are you taking any medications that could affect blood clotting (e.g., blood thinners)?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 12,
    question:
      "Are you sick today (ie. fever > 39.5C, breathing problems, active infection)?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 13,
    question: "Who is your primary care provider?",
    type: "primary-care-provider",
  },
  { id: 14, question: "Consent for Injection", type: "consent-for-injection" },
  {
    id: 15,
    question: "Are you a current patient at this location?",
    type: "button-radio",
    options: ["Yes", "No"],
  },
  {
    id: 16,
    question:
      "I'm interested in learning more about transferring my medications to this pharmacy",
    type: "button-radio",
    options: ["Yes", "No"],
  },
];

interface PatientQuestionsProps {
  patientCount: number;
  onComplete: (data: {
    questionnaire: (AnswerPair | NestedAnswer)[][];
    patientInfo: PatientInfo[];
  }) => void;
}

const PatientQuestions: React.FC<PatientQuestionsProps> = ({
  patientCount,
  onComplete,
}) => {
  const [currentPatientIndex, setCurrentPatientIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{
    [key: number]: { answer: string[]; nestedAnswers?: NestedAnswer[] };
  }>({});
  const [patientInfoArray, setPatientInfoArray] = useState<PatientInfo[]>([]);
  const [questionnaireArray, setQuestionnaireArray] = useState<
    (AnswerPair | NestedAnswer)[][]
  >([]);
  const [questionHistory, setQuestionHistory] = useState<number[]>([0]);
  const patientInfoRef = useRef<PatientInformationVaccineRef>(null);

  const handleAnswerChange = (
    index: number,
    answer: string | string[],
    nestedAnswers?: NestedAnswer[]
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[index].id]: {
        answer: Array.isArray(answer) ? answer : [answer],
        nestedAnswers,
      },
    }));
  };

  const handlePatientInfoChange = (info: Partial<PatientInfo>) => {
    setPatientInfoArray((prev) => {
      const updated = [...prev];
      updated[currentPatientIndex] = {
        ...updated[currentPatientIndex],
        ...info,
      } as PatientInfo;
      return updated;
    });
  };

  // const handleNext = () => {
  //   const currentAnswer = answers[questions[currentQuestionIndex].id];
  //   if (currentQuestionIndex === 0 && !patientInfoRef.current?.validateForm()) {
  //     return; // Enforce Q3 validation
  //   }
  //   if (!currentAnswer?.answer && currentQuestionIndex !== 0) {
  //     alert("Your response is required.");
  //     return;
  //   }

  //   if (currentQuestionIndex < questions.length - 1) {
  //     setQuestionHistory((prev) => [...prev, currentQuestionIndex + 1]);
  //     setCurrentQuestionIndex(currentQuestionIndex + 1);
  //   } else {
  //     // End of Q16 for current patient
  //     const questionnaireData: (AnswerPair | NestedAnswer)[] = questions
  //       .map((q) => {
  //         const answerData = answers[q.id] || { answer: [] };
  //         const basePair: AnswerPair = {
  //           question: q.question,
  //           answer: answerData.answer,
  //         };
  //         return answerData.nestedAnswers
  //           ? [basePair, ...answerData.nestedAnswers]
  //           : [basePair];
  //       })
  //       .flat();

  //     setQuestionnaireArray((prev) => [...prev, questionnaireData]);

  //     if (currentPatientIndex < patientCount - 1) {
  //       setPatientInfoArray((prev) => {
  //         const updated = [...prev];
  //         if (!updated[currentPatientIndex])
  //           updated[currentPatientIndex] = {} as PatientInfo;
  //         return updated;
  //       });
  //       setAnswers({});
  //       setCurrentPatientIndex(currentPatientIndex + 1);
  //       setCurrentQuestionIndex(0);
  //       setQuestionHistory([0]);
  //     } else {
  //       onComplete({
  //         questionnaire: questionnaireArray.concat([questionnaireData]),
  //         patientInfo: patientInfoArray,
  //       });
  //     }
  //   }
  // };
  const handleNext = () => {
    const currentAnswer = answers[questions[currentQuestionIndex].id];
    if (currentQuestionIndex === 0 && !patientInfoRef.current?.validateForm()) {
      return;
    }
    if (!currentAnswer?.answer && currentQuestionIndex !== 0) {
      alert("Your response is required.");
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setQuestionHistory((prev) => [...prev, currentQuestionIndex + 1]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const questionnaireData: (AnswerPair | NestedAnswer)[] = questions
        .filter((q) => q.question !== "Patient Information") // Exclude Q3
        .map((q) => {
          const answerData = answers[q.id] || { answer: [] };
          const basePair: AnswerPair = {
            question: q.question,
            answer: answerData.answer,
          };
          return answerData.nestedAnswers
            ? [basePair, ...answerData.nestedAnswers]
            : [basePair];
        })
        .flat();

      setQuestionnaireArray((prev) => [...prev, questionnaireData]);

      if (currentPatientIndex < patientCount - 1) {
        setPatientInfoArray((prev) => {
          const updated = [...prev];
          if (!updated[currentPatientIndex])
            updated[currentPatientIndex] = {} as PatientInfo;
          return updated;
        });
        setAnswers({});
        setCurrentPatientIndex(currentPatientIndex + 1);
        setCurrentQuestionIndex(0);
        setQuestionHistory([0]);
      } else {
        onComplete({
          questionnaire: questionnaireArray.concat([questionnaireData]),
          patientInfo: patientInfoArray,
        });
      }
    }
  };
  const handlePrevious = () => {
    if (questionHistory.length > 1) {
      setQuestionHistory((prev) => prev.slice(0, -1));
      setCurrentQuestionIndex(questionHistory[questionHistory.length - 2]);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <motion.div
      key={`${currentPatientIndex}-${currentQuestionIndex}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {currentQuestion.type === "patient-information-vaccine" && (
        <PatientInformationVaccine
          ref={patientInfoRef}
          question={currentQuestion.question}
          onChange={handlePatientInfoChange}
          currentPatientIndex={currentPatientIndex}
          numPatients={patientCount}
          initialData={patientInfoArray[currentPatientIndex]}
        />
      )}
      {currentQuestion.type === "button-radio-input" && (
        <ButtonRadioQuestion
          question={currentQuestion.question}
          options={currentQuestion.options as string[]}
          onChange={(answer) =>
            handleAnswerChange(currentQuestionIndex, answer)
          }
          selectedAnswer={answers[currentQuestion.id]?.answer}
        />
      )}
      {currentQuestion.type === "conditional-button-radio" && (
        <ConditionalButtonRadioQuestion
          question={currentQuestion.question}
          options={
            currentQuestion.options as {
              value: string;
              showsInput: boolean;
              label?: string;
            }[]
          }
          onChange={(answer, nested) =>
            handleAnswerChange(currentQuestionIndex, answer, nested)
          }
          selectedAnswer={answers[currentQuestion.id]?.answer}
          nestedAnswers={answers[currentQuestion.id]?.nestedAnswers}
        />
      )}
      {currentQuestion.type === "button-radio" && (
        <ButtonRadioQuestion
          question={currentQuestion.question}
          options={currentQuestion.options as string[]}
          onChange={(answer) =>
            handleAnswerChange(currentQuestionIndex, answer)
          }
          selectedAnswer={answers[currentQuestion.id]?.answer}
        />
      )}

      {currentQuestion.type === "primary-care-provider" && (
        <PrimaryCareProviderQuestion
          question={currentQuestion.question}
          onChange={(answer) =>
            handleAnswerChange(currentQuestionIndex, answer)
          }
          answer={answers[currentQuestion.id]?.answer || []}
        />
      )}
      {currentQuestion.type === "consent-for-injection" && (
        <ConsentForInjection
          question={currentQuestion.question}
          onChange={(answer) =>
            handleAnswerChange(currentQuestionIndex, answer)
          }
          selectedAnswer={answers[currentQuestion.id]?.answer}
        />
      )}
      <div className="mt-6 flex justify-between">
        <button
          onClick={handlePrevious}
          className="text-gray-600 hover:text-gray-800 disabled:text-gray-400"
          disabled={questionHistory.length <= 1}
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
