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
import PhoneNumberQuestion from "../questions/PhoneNumberQuestion";
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
    question: "How would you prefer to attend the appointment?",
    type: "phone-number",
    options: [
      { value: "In-person", showsInput: false },
      { value: "Phone Call", showsInput: true },
    ],
  },
  {
    id: 2,
    question: "What sex were you assigned at birth?",
    type: "button-radio-input",
    options: ["Male", "Female"],
  },
  {
    id: 3,
    question:
      "Are you currently pregnant or is there a possibility you might be?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 4,
    question: "Are you breastfeeding at the moment?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 5,
    question: "Have you previously been diagnosed with hemorrhoids?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 6,
    question: "Are you 50 years old or older?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 7,
    question: "How would you describe your current bowel movement frequency?",
    type: "radio",
    options: [
      "More bowel movements than usual",
      "Fewer bowel movements than usual",
      "About the same as usual",
    ],
  },
  {
    id: 8,
    question: "Do you currently have any of the following symptoms?",
    type: "checkbox",
    options: [
      "Dark red blood or blood mixed with stools",
      "Black or tarry stools",
      "Severe rectal pain",
      "Swelling or a lump in the rectal area",
      "Unexplained weight loss",
      "None of the above",
    ],
  },
  {
    id: 9,
    question: "Do you have any symptoms not listed above?",
    type: "conditional-button-radio-inputs",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please describe the additional symptoms, one per field.",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 10,
    question:
      "Do you or any family members have a history of colorectal cancer or polyps?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 11,
    question:
      "Do you or any family members have a history of inflammatory bowel disease (IBD)?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 12,
    question:
      "Have you used any treatments (e.g., creams, medications) for these symptoms?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 13,
    question: "Have any treatments improved your symptoms?",
    type: "conditional-button-radio-inputs",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "List the treatments that helped.",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 14,
    question: "Have any treatments made your symptoms worse?",
    type: "conditional-button-radio-inputs",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "List the treatments that worsened your symptoms.",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 15,
    question: "Have any treatments had no effect on your symptoms?",
    type: "conditional-button-radio-inputs",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "List the treatments that had no effect.",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 16,
    question: "Do you have any known allergies to medications?",
    type: "conditional-button-radio-inputs",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label:
          "List one medication allergy per field. Click 'Add more' if needed.",
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
    question: "Is there anything else you’d like to share with us?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please provide additional information.",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 19,
    question: "Terms and Conditions",
    type: "terms-condition",
  },
  {
    id: 20,
    question: "Patient Information",
    type: "patient-info",
  },
];

const Form: React.FC = () => {
  const formName = "Hemmoroids";
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
      if (answer[0] === "Phone Call") {
        return null; // directly jump onto question no5
      }

      return 2; //if ans is other than male proceed to question no 3
    },
    2: (answer: string) => {
      if (answer[0] === "Male") {
        return 5;
      }
      if (answer[0] === "Female") {
        return 3;
      }
      return null;
    },
    3: () => 4,
    4: () => 5,
    5: () => 6, //always proceed to question 6 after 5
    6: () => 7,
    7: () => 8,
    9: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 10; // Proceed to question 13
    },
    10: () => 11,
    11: () => 12,
    12: (answer: string) => {
      if (answer[0] === "Yes") {
        return 13; // Stay on the same question to allow input
      }
      return 16; // Proceed to question 13
    },
    13: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 14; // Proceed to question 15
    },
    14: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 15; // Proceed to question 15
    },
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
    18: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 19; // Proceed to question 15
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
          {currentQuestion.type === "phone-number" && (
            <PhoneNumberQuestion
              question={currentQuestion.question}
              options={
                currentQuestion.options as {
                  value: string;
                  showsInput: boolean;
                }[]
              }
              onChange={(answer) =>
                handleAnswerChange(currentQuestionIndex, answer)
              }
              selectedAnswer={answers[currentQuestionIndex]?.answer as string[]}
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
