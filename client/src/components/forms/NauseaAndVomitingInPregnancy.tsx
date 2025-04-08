import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import RadioQuestion from "../questions/RadioQuestion";
import CheckboxQuestion from "../questions/CheckboxQuestion";
import ButtonRadioQuestion from "../questions/ButtonRadioQuestion";
import ConditionalButtonRadioQuestion from "../questions/ConditionalButtonRadioQuestion";
import ButtonRadioWithInputQuestion from "../questions/ButtonRadioWithInputQuestion";
import PrimaryCareProviderQuestion from "../questions/PrimaryCareProviderQuestion";
import CustomAlertDialog from "../questions/DialogBox";
import PatientInformation from "../questions/PatientInformation";
import { submitFormData } from "../../utils/api.js";

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
    question: "Are you currently breastfeeding?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 3,
    question: "Is this your first pregnancy?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },

  {
    id: 4,
    question:
      "Have you experienced nausea and/or vomiting in your previous pregnancy or pregnancies?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 5,
    question: "How far are you in your pregnancy?",
    type: "radio",
    options: [
      "First trimester (Week 1-13)",
      "Second trimester (Week 14-27)",
      "Third trimester (Week 28-40)",
      "Not Sure",
    ],
  },

  {
    id: 6,
    question: "When did your symptoms start?",
    type: "radio",
    options: [
      "First trimester (Week 1-13)",
      "Second trimester (Week 14-27)",
      "Third trimester (Week 28-40)",
      "Not Sure",
    ],
  },
  {
    id: 7,
    question:
      "Are you currently taking iron-containing vitamins or prenatal supplements?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please specify how you take it",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 8,
    question:
      "Are you experiencing any of the following symptoms of dehydration?",
    type: "checkbox",
    options: [
      "Urinating much less than normal",
      "Persistent light-headness or feeling faint",
      "Inability to keep food or drinks down for 12h or more",
      "Weight loss of more than 5 pounds",
      "None of the above",
      "Not sure",
    ],
  },
  {
    id: 9,
    question: "Are you experiencing any of these symptoms?",
    type: "checkbox",
    options: [
      "Stomach or pelvic pain",
      "Fever (temperature higher than 38°C)",
      "Changes in bowel movements",
      "Blood in the vomit",
      "None of the above",
    ],
  },
  {
    id: 10,
    question: "Do you have diabetes?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 11,
    question:
      "On average in a day, for how long do you feel nauseated or sick to your stomach?",
    type: "radio",
    options: ["Not at all", "1h or less", "2-3h", "4-6h", "More than 6h"],
  },
  {
    id: 12,
    question: "On average in a day, how many times do you vomit or throw up?",
    type: "radio",
    options: [
      "None",
      "1-2 times a day",
      "3-4 times a day",
      "5-6 times a day",
      "7 or more times a day",
    ],
  },
  {
    id: 13,
    question:
      "On average in a day, how many times do you have retching or dry heaves without bringing anything up?",
    type: "radio",
    options: [
      "None",
      "1-2 times a day",
      "3-4 times a day",
      "5-6 times a day",
      "7 or more times a day",
    ],
  },
  {
    id: 14,
    question:
      "Have you tried any treatments to help with your symptoms of nausea and/or vomiting?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 15,
    question: "Did any of the treatments make your symptoms feel better?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please provide more details",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 16,
    question: "Did any of the treatments make your symptoms feel worse?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please provide more details",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 17,
    question: "Did any of the treatments have no effect on your symptoms?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please provide more details",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 18,
    question: "Do you have any allergies to medications?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please provide more details",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 19,
    question: "Who is your primary care provider?",
    type: "primary-care-provider",
  },
  {
    id: 20,
    question: "Patient details",
    type: "patient-info",
  },

  // Add more questions here
];

const Form: React.FC = () => {
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
    2: () => 3, // Always proceed to question 3 after question 2
    3: (answer: string) => {
      if (answer[0] === "Yes") {
        return 5; // Jump to question 5
      }
      return 4; // Proceed to question 4
    },
    4: () => 5, // Always proceed to question 5 after question 4
    5: () => 6, //always proceed to question 6 after 5
    6: () => 7,
    7: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 8; // Proceed to question 8 for "No" or "Not Sure"
    },
    //No entries for question for 8-9 as they are checkbox type and user need to manually go to next question
    //from 9-12 question just goes straight in sequence no matter the answer is
    10: () => 11,
    11: () => 12,
    12: () => 13,
    13: () => 14,
    14: (answer: string) => {
      if (answer[0] === "No") {
        return 18; // Jump to question 8
      }
      return 15; // Proceed to question 15 for "Yes" or "Not Sure"
    },
    15: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 16; // Proceed to question 19 for "No" or "Not Sure"
    },
    16: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 17; // Proceed to question 19 for "No" or "Not Sure"
    },
    17: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 18; // Proceed to question 19 for "No" or "Not Sure"
    },
    18: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 19; // Proceed to question 19 for "No" or "Not Sure"
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
          <div className="bg-gray-200 h-3 w-full rounded-full overflow-hidden">
            <motion.div
              className="h-3 bg-primary rounded-full transition-width duration-200 ease-in-out"
              style={{ width: `${progress}%` }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
            />
          </div>
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
          description="Pharmacists can only prescribe for nausea and vomiting in pregnancy."
        />
      </div>
    </div>
  );
};

export default Form;
