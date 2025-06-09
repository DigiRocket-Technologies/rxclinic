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
    question:
      "Have you ever been diagnosed with canker sores by healthcare professional before?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 5,
    question: "Is this your first canker sore?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 6,
    question: "Do your canker sores leave a scar?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 7,
    question: "Do your canker sores usually take more than 14 days to heal?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 8,
    question: "What symptoms are you experiencing?",
    type: "radio",
    options: ["Less than 14 days", "14 days or longer"],
  },
  {
    id: 9,
    question: "Describe the appearance of your canker sore(s):",
    type: "checkbox",
    options: [
      "Small (Less than 1cm in diameter)",
      "Round or oval in shape",
      "White, yellow, or grey in colour in the centre",
      "Raised, red border around each sore(s)",
      "Bleeding or swelling of the canker sore(s) or area they are located",
      "Other",
    ],
  },
  {
    id: 10,
    question:
      "Are any of your canker sores an irregular shape? (e.g., not round or oval).",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 11,
    question:
      "Do you have a lot of tiny canker sores that group together in one cluster?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 12,
    question: "How many canker scars do you currently have?",
    type: "radio",
    options: ["1-5", "6-10", "More than 10"],
  },
  {
    id: 13,
    question: "Where is your canker sore(s) located?",
    type: "checkbox",
    options: [
      "On or under the tongue",
      "Inside the cheek",
      "Inside the lips",
      "Floor of the mouth",
      "Roof of the mouth",
      "Gums",
      "Other",
    ],
  },
  {
    id: 14,
    question: "Is your canker sore(s) painful enough that you cannot eat?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 15,
    question:
      "Including this episode, have you had 6 or more episodes of canker sores in the past 12 months?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 16,
    question: "Do you smoke any tobacco/nicotine products?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 17,
    question: "Do you have any medical conditions?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 18,
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
    id: 19,
    question: "Do you suffer from Behcet's syndrome?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 20,
    question: "Do you have inflammatory bowel disease?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 21,
    question:
      "Are you currently taking any medication that suppresses your immune system?",
    type: "checkbox",
    options: [
      "Steroids",
      "Chemotherapy",
      "Biological agents",

      "None of the above",
      "Not sure",
    ],
  },
  {
    id: 22,
    question: "Have you tried anything to help with your canker sore(s) ",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 23,
    question: "Did any of the treatments make you feel better?",
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
    id: 24,
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
    id: 25,
    question: "Did any of the treatments make your symptoms stay the same?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label:
          "Please indicate which treatments make your symptoms stay the same",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },

  {
    id: 26,
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
    id: 27,
    question: "Who is your primary care provider?",
    type: "primary-care-provider",
  },
  {
    id: 28,
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
    id: 29,
    question: "Terms and Conditions",
    type: "terms-condition",
  },

  {
    id: 30,
    question: "Patient details",
    type: "patient-info",
  },
];

const Form: React.FC = () => {
  const formName = "Canker Sore";
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{
    [key: number]: {
      answer: string[];
      nestedAnswers?: { question: string; answer: string[] }[];
    };
  }>({});
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);

  const [questionHistory, setQuestionHistory] = useState<number[]>([0]);
  const navigate = useNavigate();

  const dependencyMap: { [key: number]: (answer: string) => number | null } = {
    1: (answer: string) => {
      if (answer[0] === "Female") {
        return 2; // Stay on the same question to allow input
      }
      return 4; // Proceed to question 13
    },
    2: () => 3,
    3: () => 4,
    4: (answer: string) => {
      if (answer[0] === "Yes") {
        return 6; // Stay on the same question to allow input
      }
      return 5; // Proceed to question 13
    },
    5: (answer: string) => {
      if (answer[0] === "Yes") {
        return 8; // Stay on the same question to allow input
      }
      return 6; // Proceed to question 13
    },
    6: () => 7,
    7: () => 8,
    8: () => 9,

    10: () => 11,
    11: () => 12,
    12: () => 13,
    14: () => 15,
    15: () => 16,
    16: () => 17,
    17: (answer: string) => {
      if (answer[0] === "No") {
        return 21; // Stay on the same question to allow input
      }
      return 18; // Proceed to question 15
    },
    19: () => 20,
    20: () => 21,

    22: (answer: string) => {
      if (answer[0] === "Yes") {
        return 23; // Stay on the same question to allow input
      }
      return 26; // Proceed to question 15
    },
    23: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 24; // Proceed to question 15
    },

    24: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 25; // Proceed to question 15
    },
    25: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 26; // Proceed to question 15
    },
    26: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 27; // Proceed to question 15
    },
    28: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 29; // Proceed to question 15
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

    console.log("Data to be sent to backend:", finalData);

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
          {currentQuestion.type === "number-input" && (
            <NumberInputQuestion
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
      </div>
    </div>
  );
};

export default Form;
