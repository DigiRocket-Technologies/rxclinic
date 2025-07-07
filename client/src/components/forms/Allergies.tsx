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
import PhoneNumberQuestion from "../questions/PhoneNumberQuestion";
import { submitFormData } from "../../utils/api.js";
import ProgressBar from "../ui/CustomProgressbar.js";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
// Patient info type
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

// Your questions array (unchanged for brevity)
// const questions = [
//   {
//     id: 1,
//     question: "Where would you like the appointment to take place?",
//     type: "phone-number",
//     options: [
//       { value: "In-person", showsInput: false },
//       { value: "Phone Call", showsInput: true },
//     ],
//   },
//   {
//     id: 2,
//     question: "What sex were you assigned at birth?",
//     type: "button-radio-input",
//     options: ["Male", "Female"],
//   },
//   {
//     id: 3,
//     question: "Are you (or could you be) pregnant?",
//     type: "button-radio",
//     options: ["Yes", "No", "Not Sure"],
//   },
//   {
//     id: 4,
//     question: "Are you currently breastfeeding?",
//     type: "button-radio",
//     options: ["Yes", "No", "Not Sure"],
//   },
//   {
//     id: 5,
//     question: "What symptoms are you experiencing?",
//     type: "checkbox",
//     options: [
//       "Sneezing",
//       "An itchy nose, mouth or throat",
//       "A runny or stuffy nose",
//       "Itchy or watery eyes",
//       "None of the above",
//     ],
//   },
//   {
//     id: 6,
//     question: "Are there any other symptoms you are experiencing?",
//     type: "checkbox",
//     options: [
//       "Fever (temperature greater than 38 °C)",
//       "Sore throat",
//       "Pain or tenderness near your eyes or cheeks",
//       "Greenish or yellow colored mucus from your nose",
//       "None of the above",
//     ],
//   },
//   {
//     id: 7,
//     question:
//       "Do you have any other symptoms not mentioned in the last question?",
//     type: "conditional-button-radio",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label: "Please explain",
//       },
//       { value: "No", showsInput: false },
//       { value: "Not Sure", showsInput: false },
//     ],
//   },
//   {
//     id: 8,
//     question: "Are your symptoms present in only one nostril?",
//     type: "button-radio",
//     options: ["Yes", "No", "Not Sure"],
//   },
//   {
//     id: 9,
//     question: "Do you know what triggers your allergy symptoms?",
//     type: "conditional-button-radio",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label: "What are your triggers?",
//       },
//       { value: "No", showsInput: false },
//       { value: "Not Sure", showsInput: false },
//     ],
//   },
//   {
//     id: 10,
//     question: "Are your symptoms present for 4 or more days per week?",
//     type: "button-radio",
//     options: ["Yes", "No", "Not Sure"],
//   },
//   {
//     id: 11,
//     question: "Have your symptoms lasted for 4 or more weeks?",
//     type: "button-radio",
//     options: ["Yes", "No", "Not Sure"],
//   },
//   {
//     id: 12,
//     question:
//       "Are your symptoms making it difficult to perform your normal activities and sleep normally?",
//     type: "button-radio",
//     options: ["Yes", "No", "Not Sure"],
//   },
//   {
//     id: 13,
//     question: "Do you have any of the following medical conditions?",
//     type: "checkbox",
//     options: [
//       "Asthma",
//       "History of sinus infections",
//       "History of ear infections",
//       "None of the above",
//       "I don't know",
//     ],
//   },
//   {
//     id: 14,
//     question: "Have you tried any treatments for your symptoms?",
//     type: "button-radio",
//     options: ["Yes", "No", "Not Sure"],
//   },
//   {
//     id: 15,
//     question: "Did any of the treatments make your symptoms feel better?",
//     type: "conditional-button-radio",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label:
//           "Please indicate which treatments made your symptoms feel better",
//       },
//       { value: "No", showsInput: false },
//       { value: "Not Sure", showsInput: false },
//     ],
//   },
//   {
//     id: 16,
//     question: "Did any of the treatments make your symptoms feel worse?",
//     type: "conditional-button-radio",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label: "Please indicate which treatments made your symptoms feel worse",
//       },
//       { value: "No", showsInput: false },
//       { value: "Not Sure", showsInput: false },
//     ],
//   },
//   {
//     id: 17,
//     question: "Did any of the treatments had no effect on your symptoms?",
//     type: "conditional-button-radio",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label:
//           "Please indicate which treatments have no effect on your symptoms",
//       },
//       { value: "No", showsInput: false },
//       { value: "Not Sure", showsInput: false },
//     ],
//   },
//   {
//     id: 18,
//     question: "Do you have any allergies to medications?",
//     type: "conditional-button-radio-inputs",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label:
//           "Please specify medication allergies and please list one allergy per field and click 'Add more' if needed.",
//       },
//       { value: "No", showsInput: false },
//       { value: "Not Sure", showsInput: false },
//     ],
//   },
//   {
//     id: 19,
//     question: "Have you started any new medications in the past month?",
//     type: "conditional-button-radio-inputs",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label: "Please specify the medication you recently started",
//       },
//       { value: "No", showsInput: false },
//       { value: "Not Sure", showsInput: false },
//     ],
//   },
//   {
//     id: 20,
//     question: "Who is your primary care provider?",
//     type: "primary-care-provider",
//   },
//   {
//     id: 21,
//     question: "Is there anything else we should know?",
//     type: "conditional-button-radio",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label: "Please explain",
//       },
//       { value: "No", showsInput: false },
//       { value: "Not Sure", showsInput: false },
//     ],
//   },
//   {
//     id: 22,
//     question: "Terms and Conditions",
//     type: "terms-condition",
//   },
//   {
//     id: 23,
//     question: "Patient details",
//     type: "patient-info",
//   },
//   // Add more questions here
// ];

const questions = [
  {
    id: 1,
    question: "How would you like to attend your appointment?",
    type: "phone-number",
    options: [
      { value: "In-person", showsInput: false },
      { value: "Phone Call", showsInput: true },
    ],
  },
  {
    id: 2,
    question: "What sex was recorded on your birth certificate?",
    type: "button-radio-input",
    options: ["Male", "Female"],
  },
  {
    id: 3,
    question: "Is there a possibility that you are pregnant?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 4,
    question: "Are you currently nursing a child?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 5,
    question: "Which of the following symptoms are affecting you?",
    type: "checkbox",
    options: [
      "Frequent sneezing",
      "Irritation in the nose, throat, or mouth",
      "Blocked or runny nose",
      "Eyes that are itchy or watery",
      "None of the above",
    ],
  },
  {
    id: 6,
    question: "Do you have any of these other health symptoms?",
    type: "checkbox",
    options: [
      "Temperature above 38°C",
      "Scratchy or sore throat",
      "Discomfort around the cheeks or eyes",
      "Thick yellow or green nasal discharge",
      "None of the above",
    ],
  },
  {
    id: 7,
    question: "Are there any symptoms not listed that you're dealing with?",
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
    id: 8,
    question: "Do your symptoms only occur on one side of the nose?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 9,
    question: "Are you aware of anything that causes your symptoms to start?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "What are your known triggers?",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 10,
    question: "Do your symptoms occur at least 4 days during the week?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 11,
    question: "Have your symptoms lasted longer than 4 weeks?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 12,
    question:
      "Are your symptoms interfering with your daily routine or sleep patterns?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 13,
    question: "Do you have any of the following medical histories?",
    type: "checkbox",
    options: [
      "Asthma",
      "Recurring sinus issues",
      "Chronic ear infections",
      "None of the above",
      "I don't know",
    ],
  },
  {
    id: 14,
    question: "Have you used any methods to manage your symptoms?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 15,
    question: "Did any of the methods you tried provide relief?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "List treatments that helped improve your condition",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 16,
    question: "Did any treatments you tried worsen your symptoms?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Mention any treatments that had a negative effect",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 17,
    question: "Did any treatments you tried make no noticeable difference?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Which treatments showed no results?",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 18,
    question:
      "Do you have allergies to any prescribed or over-the-counter drugs?",
    type: "conditional-button-radio-inputs",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label:
          "Specify the medication allergies. List one per field, and click 'Add more' if needed.",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 19,
    question:
      "Have you begun taking any new medications within the last month?",
    type: "conditional-button-radio-inputs",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Name the new medications you've started recently",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 20,
    question: "Who is your current primary care doctor or provider?",
    type: "primary-care-provider",
  },
  {
    id: 21,
    question: "Is there anything else you feel we should be aware of?",
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
    question: "Review and agree to our terms of service",
    type: "terms-condition",
  },
  {
    id: 23,
    question: "Provide your personal and contact details",
    type: "patient-info",
  },
];

const Form: React.FC = () => {
  const formName = "Allergies";

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

  // Dependency map (unchanged for brevity)
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
    7: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 8; // Proceed to question 8
    },
    8: () => 9,
    9: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 10; // Proceed to question 16
    },
    10: () => 11,
    11: () => 12,
    12: () => 13,

    14: (answer: string) => {
      if (answer[0] === "No") {
        return 18; // Stay on the same question to allow input
      }
      return 15; // Proceed to question 16
    },
    15: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 16; // Proceed to question 16
    },
    16: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 17; // Proceed to question 17
    },
    17: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 18; // Proceed to question 18
    },
    18: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 19; // Proceed to question 19
    },
    19: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 20; // Proceed to question 20
    },
    21: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 22; // Proceed to question 22
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
      const result = await submitFormData(finalData); // Call the reusable function

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
          {currentQuestion.type === "number-input" && (
            <NumberInputQuestion
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
