import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import RadioQuestion from "../questions/RadioQuestion";
import CheckboxQuestion from "../questions/CheckboxQuestion";
import ButtonRadioQuestion from "../questions/ButtonRadioQuestion";
import ConditionalButtonRadioQuestion from "../questions/ConditionalButtonRadioQuestion";
import ButtonRadioWithInputQuestion from "../questions/ButtonRadioWithInputQuestion";
import ConditionalButtoRadioQuestionWithMultipleInputs from "../questions/ConditionalButtoRadioQuestionWithMultipleInputs";
import PrimaryCareProviderQuestion from "../questions/PrimaryCareProviderQuestion";
import TermsAndConditions from "../questions/TermsAndConditions";
import PatientInformation from "../questions/PatientInformation";
import { submitFormData } from "../../utils/api.js";
import ProgressBar from "../ui/CustomProgressbar.js";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface PatientInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  city: string;
  email: string;
  phoneNumber: string;
  pronouns?: string;
  contactMethod: string;
  newPatient: string;
  healthCardNumber?: string;
  hasHealthCard?: string;
  interestedInTransfer?: string;
}

const questions = [
  {
    id: 1,
    question: "What sex were you assigned at birth?",
    type: "button-radio-input",
    options: ["Male", "Female"],
    note: "This question is required for clinical assessment and reimbursement purposes. If none of the above please specify",
  },
  {
    id: 2,
    question: "Are you (or could you be) pregnant?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 3,
    question: "Are you currently breastfeeding?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },

  {
    id: 4,
    question: "Were you bitten or stung by an insect?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 5,
    question:
      "Were you stung multiple times by a bee, wasp or other stinging insect?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },

  {
    id: 6,
    question:
      "Besides an insect, do you recall coming into contact with anything that might have caused the rash?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please specify",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },

  {
    id: 7,
    question: "What symptoms are you experiencing ?",
    type: "checkbox",
    options: [
      "A rash or bump on the skin",
      "Swelling",
      "Redness or a small rash",
      "Itching",
      "None of the above",
    ],
  },
  {
    id: 8,
    question: "Do you have any of the following symptoms?",
    type: "checkbox",
    options: [
      "Fever (temperature higher than 38°C), chills or lack of energy",
      "Nausea and vomiting",
      "Affected area is warm to touch",
      "Affected area have discharge or pus",
      "None of the above",
    ],
  },

  {
    id: 9,
    question:
      "Do you have any other symptoms not mentioned in the last question?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please explain",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },

  {
    id: 10,
    question:
      "Have you tried any treatments (eg creams, medication) for your symptoms?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 11,
    question: "Did any of the treatments make your symptoms feel better?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please indicate which treatments helped",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 12,
    question: "Did any of the treatments make your symptoms feel worse?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please indicate which treatments made your symptoms feel worse",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 13,
    question: "Did any of the treatments have no effect on your symptoms?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label:
          "Please indicate which treatments had no effect on your symptoms",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },

  {
    id: 14,
    question: "Do you have any allergies to medications?",
    type: "conditional-button-radio-inputs",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label:
          "Please specify medication allergies and please list one allergy per field and click 'Add more' if needed.",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 15,
    question: "Have you started any new medications in the past month?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please specify the medication you recently",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 16,
    question: "Is there anything else we should know?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please explain",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 17,
    question: "Who is your primary care provider?",
    type: "primary-care-provider",
  },
  {
    id: 18,
    question: "Terms and Conditions",
    type: "terms-condition",
  },
  {
    id: 19,
    question: "Patient details",
    type: "patient-info",
  },

  // Add more questions here
];

const Form: React.FC = () => {
  const formName = "Insect bites and hives";
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{
    [key: number]: {
      answer: string[];
      nestedAnswers?: { question: string; answer: string[] }[];
    };
  }>({});
  const [questionHistory, setQuestionHistory] = useState<number[]>([0]);
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
  const navigate = useNavigate();

  const dependencyMap: { [key: number]: (answer: string) => number | null } = {
    1: (answer: string) => {
      if (answer[0] === "Male") {
        return 4; // directly jump onto question no5
      }
      if (answer[0] === "Female") {
        return 2; // directly jump onto question no5
      }

      return null; //if ans is other than male proceed to question no 3
    },
    2: () => 3, // Always proceed to question 4 after question 3

    3: () => 4, // Always proceed to question 5 after question 4
    4: (answer: string) => {
      if (answer[0] === "Yes") {
        return 5; // Stay on the same question to allow input
      }
      return 6; // Proceed to question 9
    },
    5: () => 6,

    6: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 7; // Proceed to question 9
    },
    9: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 10; // Proceed to question 9
    },
    10: (answer: string) => {
      if (answer[0] === "No") {
        return 14; // Stay on the same question to allow input
      }
      return 11; // Proceed to question 9
    },

    11: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 12; // Proceed to question 9
    },
    12: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 13; // Proceed to question 9
    },
    13: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 14; // Proceed to question 9
    },
    14: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 15; // Proceed to question 9
    },
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
    //22 to 23 manual navigation
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
    const currentAnswer = answers[currentQuestionIndex];
    if (!currentAnswer?.answer) {
      alert("Your response is required.");
      return;
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

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleFinalSubmit = async () => {
    if (!patientInfo) {
      alert(
        "Please make sure information is correctPlease ensure the accuracy of the information before submitting."
      );
      return;
    }

    const questionnaireData = getQuestionsAndAnswers();
    const finalData = {
      questionnaire: questionnaireData,
      patientInfo,
      formName,
    };

    //console.log("Data to be sent to backend:", finalData);

    try {
      const result = await submitFormData(finalData);
      toast.success(result.message, {
        position: "top-right",
      });
      navigate("/");

      //alert(result.message);
    } catch (error) {
      //alert("Failed to submit form. Please try again.");
      toast.error("Failed to submit form. Please try again.", {
        position: "top-right",
      });

      console.error("Submission error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-8 md:py-16">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-8">
          {/* progress bar */}
          {/* <div className="bg-gray-200 h-3 w-full rounded-full overflow-hidden">
            <motion.div
              className="h-3 bg-primary rounded-full transition-width duration-200 ease-in-out"
              style={{ width: `${progress}%` }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
            />
          </div> */}
          <ProgressBar progress={progress} />
        </div>
        {/* questions content */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-2xl"
        >
          {/* Render question components based on type */}
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

          {currentQuestion.type === "primary-care-provider" && (
            <PrimaryCareProviderQuestion
              question={currentQuestion.question}
              answer={(answers[currentQuestionIndex]?.answer as string[]) || []}
              onChange={(answer) =>
                handleAnswerChange(currentQuestionIndex, answer)
              }
            />
          )}
          {currentQuestion.type === "terms-condition" && (
            <TermsAndConditions
              question={currentQuestion.question}
              onChange={(answer, nestedAnswers) =>
                handleAnswerChange(currentQuestionIndex, answer, nestedAnswers)
              }
            />
          )}
          {currentQuestion.type === "patient-info" && (
            <PatientInformation
              onChange={(info) => setPatientInfo(info)}
              onSubmit={handleFinalSubmit}
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
