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
import NumberInputQuestion from "../questions/NumberInputQuestion";
import TextInputQuestion from "../questions/TextInputQuestion";
import SliderQuestion from "../questions/Slider";
import CustomAlertDialog from "../questions/DialogBox";
import { submitFormData } from "../../utils/api.js";
import ProgressBar from "../ui/CustomProgressbar.js";

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
    question: "Which of the following symptoms are you experiencing?",
    type: "checkbox",
    options: [
      "Severe itching of vaginal areas",
      "“Curd-like” vaginal discharge",
      "Stinging or burning sensation",
      "None of the above",
    ],
  },
  {
    id: 5,
    question: "Are you experiencing any of the following additional symptoms?",
    type: "checkbox",
    options: [
      "Frothy or foamy discharge",
      "“Fishy” odour of vaginal discharge",
      "Unexplained vaginal bleeding",
      "Fever (temperature higher than 38°C), chills, or lack of energy",
      "Pain in the pelvic area",
      "None of the above",
    ],
  },
  {
    id: 6,
    question: "Are you experiencing any other symptoms not already mentioned?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please specify ",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 7,
    question:
      "Have you experienced similar symptoms before or been diagnosed with a vaginal yeast infection before?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 8,
    question:
      "If Yes to “Have you experienced similar symptoms before?”: How long ago did you experience similar symptoms",
    type: "radio",
    options: ["Within the past 2 months", "Over 2 months ago"],
  },
  {
    id: 9,
    question:
      "Do you have a history of STI's (sexually transmitted infections)?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 10,
    question:
      "Is this your third or more vaginal yeast infection in the past 12 months?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 11,
    question: "Do you have any medical conditions or are taking medications?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 12,
    question: "Do you have diabetes?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 13,
    question:
      "Do you have any medical conditions that may suppress your immune system?",
    type: "checkbox",
    options: [
      "HIV/AIDS",
      "Cancer",
      "Removal of Spleen",
      "Transplant",
      "Lupus",
      "Other",
      "None of the above",
      "I don't know",
    ],
  },
  {
    id: 14,
    question:
      "Are you currently taking any medication that suppresses your immune system?",
    type: "checkbox",
    options: [
      "Steroids",
      "Chemotherapy",
      "Biological agents",
      "Other",
      "None of the above",
      "I don't know",
    ],
  },
  {
    id: 15,
    question:
      "Have you tried any treatments in the past to help with similar symptoms?",
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
    id: 16,
    question: "Did any of the treatments make your symptoms feel better?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label:
          "Please indicate which treatments made your symptoms feel better",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 17,
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
    id: 18,
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
    id: 19,
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
    id: 20,
    question: "Who is your primary care provider?",
    type: "primary-care-provider",
  },
  {
    id: 21,
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
    id: 22,
    question: "Terms and Conditions",
    type: "terms-condition",
  },

  {
    id: 23,
    question: "Patient details",
    type: "patient-info",
  },
];

const Form: React.FC = () => {
  const formName = "Vaginal yeast infection";
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{
    [key: number]: {
      answer: string[];
      nestedAnswers?: { question: string; answer: string[] }[];
    };
  }>({});
  const [questionHistory, setQuestionHistory] = useState<number[]>([0]);
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);

  const dependencyMap: { [key: number]: (answer: string) => number | null } = {
    1: (answer: string) => {
      if (answer[0] === "Male") {
        // Logic for showing a dialog box will be added later
        setIsDialogOpen(true);
        return null; // Indicates no further questions
      }
      if (answer[0] === "Female") {
        return 2;
      }
      return null;
    },
    2: () => 3,
    3: () => 4,
    6: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 7; // Proceed to question 15
    },
    7: (answer: string) => {
      if (answer[0] === "Yes") {
        return 8; // Stay on the same question to allow input
      }
      return 9; // Proceed to question 15
    },
    8: () => 9,
    9: () => 10,
    10: () => 11,
    11: (answer: string) => {
      if (answer[0] === "No") {
        return 15; // Stay on the same question to allow input
      }
      return 12; // Proceed to question 15
    },
    12: () => 13,

    15: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 16; // Proceed to question 15
    },

    16: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 17; // Proceed to question 15
    },
    17: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 18; // Proceed to question 15
    },
    18: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 19; // Proceed to question 15
    },

    19: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 20; // Proceed to question 15
    },
    21: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 22; // Proceed to question 15
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
    const currentAnswer = answers[currentQuestionIndex];
    if (!currentAnswer?.answer[0]) {
      alert("Your response is required.");
      return;
    }
    if (currentQuestionIndex === 0 && answers[0]?.answer[0] === "Male") {
      setIsDialogOpen(true);
      //alert("You cannot proceed as you selected 'Male'.");
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
    // if (!patientInfo) {
    //   alert("Please complete patient information.");
    //   return;
    // }

    const questionnaireData = getQuestionsAndAnswers();
    const finalData = {
      questionnaire: questionnaireData,
      patientInfo,
      formName,
    };

    console.log("Data to be sent to backend:", finalData);

    try {
      const result = await submitFormData(finalData); // Call the reusable function
      alert(result.message); // Show success message from backend
    } catch (error) {
      alert("Failed to submit form. Please try again."); // Show error message
      console.error("Submission error:", error); // Log for debugging
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
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
          {currentQuestion.type === "number-input" && (
            <NumberInputQuestion
              question={currentQuestion.question}
              answer={(answers[currentQuestionIndex]?.answer as string[]) || []}
              onChange={(answer) =>
                handleAnswerChange(currentQuestionIndex, answer)
              }
            />
          )}
          {currentQuestion.type === "slider" && (
            <SliderQuestion
              question={currentQuestion.question}
              answer={(answers[currentQuestionIndex]?.answer as string[]) || []}
              onChange={(answer) =>
                handleAnswerChange(currentQuestionIndex, answer)
              }
            />
          )}
          {currentQuestion.type === "text-input" && (
            <TextInputQuestion
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
        <CustomAlertDialog
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          title="Unable to continue"
          description="Additional Assessment from a doctor is required."
        />
      </div>
    </div>
  );
};

export default Form;
