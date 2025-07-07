import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import PatientInformationVaccine, {
  PatientInformationVaccineRef,
} from "./PatientInformationVaccine";
import ButtonRadioQuestion from "./ButtonRadioVaccine";
import ConditionalButtonRadioQuestion from "./ConditionalButtonRadioVaccine";
import PrimaryCareProviderQuestion from "./PrimaryCareProviderVaccine";
import ConsentForInjection from "./ConsentForInjectionQuestion";
import ButtonRadioWithInputQuestion from "./GenderQuestionVaccine";

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
    question: "Patient Informatioon",
    type: "patient-information-vaccine",
  },
  {
    id: 4,
    question: "What was your sex assigned at birth?",
    type: "button-radio-input",
    options: ["Male", "Female"],
  },
  {
    id: 5,
    question:
      "Are you currently pregnant or is there a possibility you might be?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 6,
    question:
      "Do you have any known allergies to food, medications, eggs, latex, or any vaccines/injections?",
    type: "conditional-button-radio",
    options: [
      { value: "Yes", showsInput: true, label: "Please specify" },
      { value: "No", showsInput: false },
      { value: "I Don't Know", showsInput: false },
    ],
  },
  {
    id: 7,
    question:
      "Have you ever experienced a severe reaction after a vaccine or injection?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 8,
    question:
      "Have you had any vaccines or injections within the past 4 weeks?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 9,
    question:
      "Do you have a weakened immune system or take medication that affects it?",
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
      "Do you live with any chronic health conditions such as heart, lung, kidney disease, asthma, anemia, or blood disorders?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 11,
    question:
      "Are you currently taking any medication that may interfere with blood clotting (e.g., blood thinners)?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 12,
    question:
      "Are you currently feeling unwell? (e.g., high fever over 39.5°C, trouble breathing, or signs of infection)",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 13,
    question: "Are you an existing patient at this pharmacy?",
    type: "button-radio",
    options: ["Yes", "No"],
  },
  {
    id: 14,
    question:
      "Would you like to know more about transferring your prescriptions to this pharmacy?",
    type: "button-radio",
    options: ["Yes", "No"],
  },
  {
    id: 15,
    question: "Who is your main healthcare provider?",
    type: "primary-care-provider",
  },
  {
    id: 16,
    question: "Injection Consent",
    type: "consent-for-injection",
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
      4: (answer: string[]) => {
        if (answer[0] === "Male") {
          return 3; //index of that question
        }
        if (answer[0] === "Female") {
          return 2;
        }

        return null;
      },
      5: () => 3,
      6: (answer: string[]) => {
        if (answer[0] === "Yes") {
          return null;
        }
        return 4;
      },
      7: () => 5,
      8: () => 6,
      9: (answer: string[]) => {
        if (answer[0] === "Yes") {
          return null;
        }
        return 7;
      },
      10: () => 8,
      11: () => 9,
      12: () => 10,
      13: (answer: string[]) => {
        if (answer[0] === "Yes") {
          return 12;
        }
        return 11;
      },
      14: () => 12,
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
      const baseStep = 2 + patientIndex * 14;
      const nextStep = baseStep + nextIndex;

      onNext(nextStep);
    }
  };

  const handleNext = () => {
    const currentAnswer = answers[questions[currentQuestionIndex].id];
    if (currentQuestionIndex === 0 && !patientInfoRef.current?.validateForm()) {
      return;
    }
    if (!currentAnswer?.answer && currentQuestionIndex !== 0) {
      alert("Your response is required.");

      return;
    }

    const baseStep = 2 + patientIndex * 14;
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

      onComplete({ questionnaire: questionnaireData });
    } else {
      const nextStep = baseStep + nextIndex;

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
        <PatientInformationVaccine
          ref={patientInfoRef}
          question={currentQuestion.question}
          onChange={onPatientInfoChange}
          currentPatientIndex={patientIndex}
          numPatients={patientCount}
          initialData={initialPatientInfo}
        />
      )}
      {currentQuestion.type === "button-radio-input" && (
        <ButtonRadioWithInputQuestion
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
          name={`${initialPatientInfo?.firstName || ""} ${
            initialPatientInfo?.lastName || ""
          }`}
          onChange={(answer, nested) =>
            handleAnswerChangeLocal(currentQuestionIndex, answer, nested)
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
            handleAnswerChangeLocal(currentQuestionIndex, answer)
          }
          name={`${initialPatientInfo?.firstName || ""} ${
            initialPatientInfo?.lastName || ""
          }`}
          selectedAnswer={answers[currentQuestion.id]?.answer}
        />
      )}
      {currentQuestion.type === "primary-care-provider" && (
        <PrimaryCareProviderQuestion
          question={currentQuestion.question}
          onChange={(answer) =>
            handleAnswerChangeLocal(currentQuestionIndex, answer)
          }
          name={`${initialPatientInfo?.firstName || ""} ${
            initialPatientInfo?.lastName || ""
          }`}
          answer={answers[currentQuestion.id]?.answer || []}
        />
      )}
      {currentQuestion.type === "consent-for-injection" && (
        <ConsentForInjection
          question={currentQuestion.question}
          onChange={(answer) =>
            handleAnswerChangeLocal(currentQuestionIndex, answer)
          }
          name={`${initialPatientInfo?.firstName || ""} ${
            initialPatientInfo?.lastName || ""
          }`}
          selectedAnswer={answers[currentQuestion.id]?.answer || []}
          formName={formName}
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
