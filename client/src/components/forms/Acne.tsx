import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import RadioQuestion from "../questions/RadioQuestion";
import CheckboxQuestion from "../questions/CheckboxQuestion";
import ButtonRadioQuestion from "../questions/ButtonRadioQuestion";
import ConditionalButtonRadioQuestion from "../questions/ConditionalButtonRadioQuestion";
import ButtonRadioWithInputQuestion from "../questions/ButtonRadioWithInputQuestion";
import ConditionalButtoRadioQuestionWithMultipleInputs from "../questions/ConditionalButtoRadioQuestionWithMultipleInputs";
import PatientInformation from "../questions/PatientInfoAcneTest";
import { submitFormData } from "../../utils/api";
import ProgressBar from "../ui/CustomProgressbar";
import ConsentAcknowledgement from "../questions/ConsentAndAcknowledgement";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    id: 1,
    question: "Patient Information",
    type: "patient-info",
  },
  {
    id: 2,
    question: "Do you have any known allergies to medications?",
    type: "conditional-button-radio-inputs",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please list your medication allergies (if any)",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 3,
    question:
      "Are you currently taking any prescription, over-the-counter, or herbal medications/supplements?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please list your current medications",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 4,
    question: "What is your current pregnancy or breastfeeding status? ",
    type: "button-radio",
    options: ["Not applicable", "Pregnant ", "Breastfeeding ", "Unsure"],
  },
  {
    id: 5,
    question: "Do you have a family physician or primary care provider?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please provide the physician's name",
      },
      { value: "No", showsInput: false },
      { value: "Uncertain", showsInput: false },
    ],
  },
  {
    id: 6,
    question: "Have you ever been diagnosed with acne before?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 7,
    question: "Which areas of your body are currently affected by acne?",
    type: "checkbox",
    options: ["Face", "Neck", "Chest", "Upper back", "Underarms", "Other"],
  },
  {
    id: 8,
    question: "How would you describe your acne? ",
    type: "checkbox",
    options: [
      "Whiteheads",
      "Blackheads",
      "Small red bumps, with or without a white center",
      "Larger, inflamed red bumps",
      "Nodules or cysts",
      "Uncertain",
      "Other",
    ],
  },
  {
    id: 9,
    question: "Do you currently experience any of the following? ",
    type: "checkbox",
    options: [
      "Irregular or infrequent periods",
      "Excessive hair growth on face, chest or back",
      "Diagnosed with PCOS",
      "Insulin resistance",
      "Infertility ",
      "None of the above",
      "Not sure",
    ],
  },
  {
    id: 10,
    question: "What is your current pregnancy or breastfeeding status?",
    type: "button-radio",
    options: ["Not applicable", "Pregnant ", "Breastfeeding ", "Unsure"],
  },
  {
    id: 11,
    question:
      "Are you currently experiencing any of the following additional symptoms?",
    type: "checkbox",
    options: [
      "Fever above 38°C",
      "Joint discomfort or stiffness",
      "Red or spider-like veins on face",
      "Persistent facial flushing",
      "Eye irritation",
      "None of the above",
      "Uncertain",
    ],
  },
  {
    id: 12,
    question: "Has your acne impacted your emotional well-being in any way?",
    type: "checkbox",
    options: [
      "Anxiety",
      "Low self-esteem",
      "Depression",
      "Emotional distress",
      "None of the above",
      "Not Sure",
    ],
  },
  {
    id: 13,
    question: "Do any of your immediate family members have a history of acne?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 14,
    question: "Do you currently use any skincare or cosmetic products?",
    type: "button-radio",
    options: ["Yes", "No"],
  },
  {
    id: 15,
    question:
      "Have you tried any treatments for your acne symptoms in the past?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please list the treatments that improved your symptoms",
      },
      { value: "No", showsInput: false },
    ],
  },
  {
    id: 16,
    question: "Do you have any allergies to medications?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please list your medication allergies.",
      },
      { value: "No", showsInput: false },
      { value: "Uncertain", showsInput: false },
    ],
  },
  {
    id: 17,
    question:
      "Is there anything else you’d like us to know about your condition?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please provide details",
      },
      { value: "No", showsInput: false },
      { value: "Uncertain", showsInput: false },
    ],
  },
  {
    id: 18,
    question: "Consent",
    type: "consent",
  },
];

interface PatientInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sexAssignedAtBirth: string;
  address: string;
  city: string;
  email: string;
  phoneNumber: string;
  contactMethod: string;
  newPatient: string;
  healthCardNumber?: string;
}

const Form: React.FC = () => {
  const formName = "Acne";
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{
    [key: number]: {
      answer: string[];
      nestedAnswers?: { question: string; answer: string[] }[];
    };
  }>({});
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
  const [questionHistory, setQuestionHistory] = useState<number[]>([0]);
  const patientInfoRef = useRef<{ validateForm: () => boolean }>(null);
  const navigate = useNavigate();

  const dependencyMap: { [key: number]: (answer: string) => number | null } = {
    2: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 3; // Proceed to question 9
    },
    3: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 4; // Proceed to question 9
    },

    4: () => 5,
    5: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 6; // Proceed to question 9
    },
    6: () => 7,
    10: () => 11,
    13: () => 14,
    14: () => 15,

    15: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 16; // Proceed to question 9
    },
    16: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 17; // Proceed to question 9
    },
    17: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 18; // Proceed to question 9
    },
  };

  const getQuestionsAndAnswers = () => {
    const result = [];
    questions.forEach((question, index) => {
      const answer = answers[index]?.answer;
      const nestedAnswers = answers[index]?.nestedAnswers;
      if (answer !== undefined) {
        const questionAnswerPair = {
          question: question.question,
          answer: answer,
        };
        if (nestedAnswers) {
          result.push([questionAnswerPair, ...nestedAnswers]);
        } else {
          result.push([questionAnswerPair]);
        }
      }
    });
    return result;
  };

  const handleAnswerChange = (
    index: number,
    answer: string | string[],
    nestedAnswers?: { question: string; answer: string[] }[]
  ) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [index]: {
        answer: Array.isArray(answer) ? answer : [answer],
        nestedAnswers,
      },
    }));

    const nextQuestionIndex = dependencyMap[questions[index].id]
      ? dependencyMap[questions[index].id](answer as string)
      : index + 1;

    if (nextQuestionIndex !== null) {
      setQuestionHistory((prevHistory) => [
        ...prevHistory,
        nextQuestionIndex - 1,
      ]);
      setCurrentQuestionIndex(
        nextQuestionIndex ? nextQuestionIndex - 1 : currentQuestionIndex
      );
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex === 0) {
      if (!patientInfoRef.current?.validateForm()) {
        alert("Please complete all required fields in patient information.");
        return;
      }
    } else {
      const currentAnswer = answers[currentQuestionIndex];
      if (!currentAnswer?.answer) {
        alert("Your response is required.");
        return;
      }
    }

    if (currentQuestionIndex < questions.length - 1) {
      setQuestionHistory((prevHistory) => [
        ...prevHistory,
        currentQuestionIndex + 1,
      ]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (questionHistory.length > 1) {
      setQuestionHistory((prevHistory) => prevHistory.slice(0, -1));
      setCurrentQuestionIndex(questionHistory[questionHistory.length - 2]);
    }
  };

  const handleFinalSubmit = async () => {
    const questionnaireData = getQuestionsAndAnswers();
    const finalData = {
      questionnaire: questionnaireData,
      patientInfo,
      formName,
    };

    try {
      const result = await submitFormData(finalData);
      toast.success(result.message, {
        position: "top-right",
      });
      navigate("/");
    } catch (error) {
      toast.error("Failed to submit form. Please try again.", {
        position: "top-right",
      });
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-8 md:py-16">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-8">
          <ProgressBar progress={progress} />
        </div>
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-2xl"
        >
          {currentQuestion.type === "radio" && (
            <RadioQuestion
              question={currentQuestion.question}
              options={currentQuestion.options as string[]}
              onChange={(answer) =>
                handleAnswerChange(currentQuestionIndex, answer)
              }
              selectedAnswer={answers[currentQuestionIndex]?.answer as string[]}
            />
          )}
          {currentQuestion.type === "checkbox" && (
            <CheckboxQuestion
              question={currentQuestion.question}
              options={currentQuestion.options as string[]}
              onChange={(answers) =>
                handleAnswerChange(currentQuestionIndex, answers)
              }
              selectedAnswers={
                answers[currentQuestionIndex]?.answer as string[]
              }
            />
          )}
          {currentQuestion.type === "button-radio" && (
            <ButtonRadioQuestion
              question={currentQuestion.question}
              options={currentQuestion.options as string[]}
              onChange={(answer) =>
                handleAnswerChange(currentQuestionIndex, answer)
              }
              selectedAnswer={answers[currentQuestionIndex]?.answer as string[]}
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
              onChange={(answer, nestedAnswers) =>
                handleAnswerChange(currentQuestionIndex, answer, nestedAnswers)
              }
              selectedAnswer={answers[currentQuestionIndex]?.answer as string[]}
              nestedAnswers={answers[currentQuestionIndex]?.nestedAnswers}
            />
          )}
          {currentQuestion.type === "conditional-button-radio-inputs" && (
            <ConditionalButtoRadioQuestionWithMultipleInputs
              question={currentQuestion.question}
              options={
                currentQuestion.options as {
                  value: string;
                  showsInput: boolean;
                  label?: string;
                }[]
              }
              onChange={(answer, nestedAnswers) =>
                handleAnswerChange(currentQuestionIndex, answer, nestedAnswers)
              }
              selectedAnswer={answers[currentQuestionIndex]?.answer as string[]}
              nestedAnswers={answers[currentQuestionIndex]?.nestedAnswers}
            />
          )}
          {currentQuestion.type === "button-radio-input" && (
            <ButtonRadioWithInputQuestion
              question={currentQuestion.question}
              options={currentQuestion.options as string[]}
              onChange={(answer) =>
                handleAnswerChange(currentQuestionIndex, answer)
              }
              selectedAnswer={
                answers[currentQuestionIndex]?.answer[0] as string
              }
            />
          )}
          {currentQuestion.type === "consent" && (
            <ConsentAcknowledgement onSubmit={handleFinalSubmit} />
          )}
          {currentQuestion.type === "patient-info" && (
            <PatientInformation
              ref={patientInfoRef}
              onChange={(info) => setPatientInfo(info)}
              patientInfo={patientInfo} // Pass patientInfo to persist data
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
            {!isLastQuestion && (
              <button
                onClick={handleNext}
                className="text-gray-600 hover:text-primary"
              >
                <div className="flex">
                  Next
                  <ChevronsRight />
                </div>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Form;
