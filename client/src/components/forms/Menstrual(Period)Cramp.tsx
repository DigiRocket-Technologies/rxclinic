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
    question: "Where would you like the appointment to take place?",
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
    question: "Are you (or could you be) pregnant?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 4,
    question: "Are you currently breastfeeding?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 5,
    question:
      "Have you been officially diagnosed with dysmenorrhea (painful periods) before?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 6,
    question:
      "Please rate your pain on a scale of 1-10. (1 being no pain and 10 being the worst possible pain).",
    type: "slider",
  },
  {
    id: 7,
    question: "Where are you experiencing pain?",
    type: "checkbox",
    options: [
      "Lower stomach",
      "Lower back",
      "Inner thighs",
      "Other",
      "None of the above",
    ],
  },
  {
    id: 8,
    question: "When does your pain usually start?",
    type: "radio",
    options: [
      "A few hours before or just after beginning of your period",
      "During the first three days of your periods",
      "After the first three days of your period",
      "Other",
    ],
  },
  {
    id: 9,
    question: "How long does the pain usually last for?",
    type: "radio",
    options: ["1-2 days", "2-3 days", "More than 3 days"],
  },
  {
    id: 10,
    question: "When did you first start experiencing painful periods?",
    type: "radio",
    options: [
      "During the first 2 years of my first period in my life",
      "More than 2 years after the first period in my life",
      "This is my first time having a painful period",
      "Other",
    ],
  },
  {
    id: 11,
    question: "Are most of your periods painful?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 12,
    question: "Has your pain been getting worse with each period?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 13,
    question:
      "Did you get your first period in your life within the last 6 months?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 14,
    question: "Are you using any form of birth control?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please specify what birth control you are using",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 15,
    question: "Have you had an IUD inserted within the past 6 months?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 16,
    question: "Are you experiencing any of these symptoms?",
    type: "checkbox",
    options: [
      "Nausea or vomiting",
      "Tiredness",
      "Diarrhea",
      "Headache",
      "Other",
      "None of the above",
    ],
  },
  {
    id: 17,
    question: "Do any of these describe your period flow?",
    type: "checkbox",
    options: [
      "I am bleeding heavier than usual",
      "I am bleeding longer than usual",
      "I am spotting or bleeding in between my periods",
      "None of the above",
    ],
  },
  {
    id: 18,
    question: "Are you experiencing any of these symptoms?",
    type: "checkbox",
    options: [
      "Fever (temperature higher than 38°C) or chills",
      "Unusual vaginal discharge",
      "Painful intercourse",
      "A lump or tenderness around your pelvic area",
      "None of the above",
    ],
  },
  {
    id: 19,
    question: "Are you experiencing any other symptoms?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please note any additional symptoms you may have",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 20,
    question:
      "Do you have a history of any of the following medical conditions?",
    type: "checkbox",
    options: [
      "Endometriosis",
      "Pelvic inflammatory disease",
      "Ovarian cysts",
      "Irritable bowel syndrome (IBS) or Inflammatory bowel disease (IBD)",
      "None of the above",
      "I am not sure",
    ],
  },
  {
    id: 21,
    question:
      "Do you have a history of any of the following medical conditions?",
    type: "checkbox",
    options: [
      "Poor kidney function",
      "Bleeding disorder",
      "High blood pressure",
      "History of heart attack or stroke",
      "Any other heart conditions",
      "None of the above",
      "I am not sure",
    ],
  },
  {
    id: 22,
    question: "Are you taking any blood thinners?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 23,
    question:
      "Have you tried any medications or treatments for your period pain? ",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 24,
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
    id: 25,
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
    id: 26,
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
    id: 27,
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
    id: 28,
    question: "Who is your primary care provider?",
    type: "primary-care-provider",
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
  const formName = "Menstrual (Period) Cramps";
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
        // Logic for showing a dialog box will be added later
        setIsDialogOpen(true);
        return null; // Indicates no further questions
      }
      if (answer[0] === "Female") {
        return 3;
      }
      return null;
    },
    3: () => 4,
    4: () => 5,

    5: () => 6,

    8: () => 9,
    9: () => 10,
    10: () => 11,
    11: () => 12,
    12: () => 13,
    13: () => 14,
    14: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 15; // Proceed to question 15
    },
    15: () => 16,
    19: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 20; // Proceed to question 15
    },

    22: () => 23,

    23: (answer: string) => {
      if (answer[0] === "Yes") {
        return 24; // Stay on the same question to allow input
      }
      return 27; // Proceed to question 15
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
    27: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 28; // Proceed to question 15
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
    if (currentQuestionIndex === 1 && answers[1]?.answer[0] === "Male") {
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
          description="Please follow up with a doctor for your symptoms"
        />
      </div>
    </div>
  );
};

export default Form;
