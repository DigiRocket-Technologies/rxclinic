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
import TextInputQuestion from "../questions/TextInputQuestion";
import WeightInputQuestion from "../questions/WeightQuestion";
import DateInputQuestion from "../questions/DateInputQuestion";
import PhoneNumberQuestion from "../questions/PhoneNumberQuestion";
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
    note: "This question is required for clinical assessment and reimbursement purposes. If none of the above please specify",
  },
  {
    id: 3,
    type: "date-input",
    question: "What is your date of birth?",
  },

  {
    id: 4,
    question:
      "Are you (or could be) pregnant or have you recently given birth in the last month?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 5,
    question: "Are you currently breastfeeding?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 6,
    question: "What is your weight?",
    type: "weight-input",
  },
  {
    id: 7,
    question: "Are you experiencing any symptoms of influenza?",
    type: "radio",
    options: [
      "Yes",
      "Not sure",
      "No symptoms. I’m looking for preventative treatment.",
    ],
  },

  {
    id: 8,
    question: "What symptoms are you experiencing? Check all that may apply.",
    type: "checkbox",
    options: [
      "Fever (temperature higher than 38°C) and/or chills",
      "Headache",
      "Muscle ache",
      "Joint pain",
      "Fatigue",
      "Cough",
      "Sore throat",
      "Runny nose or nasal congestion",
      "Loss of taste and/or smell",
      "Nausea",
      "Vomiting",
      "Diarrhea",
      "None of the above",
    ],
  },
  {
    id: 9,
    question:
      "What symptoms are you experiencing? (continued) Check all that may apply.",
    type: "checkbox",
    options: [
      "Chest pain",
      "Shortness of breath",
      "Dizziness",
      "Vision changes",
      "Numbness of tingling",
      "Fever > 40.5°C or fever > 38°C for over 72 hours",
      "Confusion",
      "Fever or cough that improves but then returns or worsens",
      "Severe abdominal pain",
      "Not urinating",
      "Seizure",
      "Rash",
      "None of the above",
      "Other",
    ],
  },

  {
    id: 10,
    question: "When did the symptoms first start?",
    type: "radio",
    options: ["Less than 2 days ago", "More than 2 days ago", "Not sure"],
  },

  {
    id: 11,
    question: "Have you recently tested positive for Influenza A or B?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 12,
    question: "Have you recently tested positive for COVID-19?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 13,
    question:
      "Have you been given documented instructions to receive preventative treatment for influenza due to an outbreak?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 14,
    question: "Do you have any of the following medical conditions?",
    type: "checkbox",
    options: [
      "Kidney disease",
      "Heart disease",
      "Anemia",
      "Diabetes",
      "Obesity",
      "Liver disease",
      "Lung disease",
      "Brain,spine or nerve disorder",
      "Obesity (BMI≥40)",
      "None of the above",
      "I dont't know",
    ],
  },
  {
    id: 15,
    question:
      "Do you have any medical conditions that suppress the immune system? Check all that apply:",
    type: "checkbox",
    options: [
      "Cancer",
      "HIV/AIDS",
      "Removal of speen",
      "Transplant",
      "Autoimmune disorder",
      "None of the above",
      "Other",
      "Not sure",
    ],
  },
  {
    id: 16,
    question:
      "Are you taking any of the following medications that can suppress the immune system?",
    type: "checkbox",
    options: [
      "Chemotherapy",
      "Biologics",
      "Corticosteroids",
      "Cyclosporine",
      "Tacrolimus",
      "Mycophenolate",
      "Methotrexate",
      "Azathioprine",
      "None of the above",
      "Other",
      "Not sure",
    ],
  },

  {
    id: 17,
    question: "Do you have any allergies ?",
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
    id: 18,
    question: "Who is your primary care provider?",
    type: "primary-care-provider",
  },
  {
    id: 19,
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
    id: 20,
    question: "Terms and Conditions",
    type: "terms-condition",
  },
  {
    id: 21,
    question: "Patient details",
    type: "patient-info",
  },

  // Add more questions here
];

const Form: React.FC = () => {
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
      if (answer[0] === "In-person") {
        return 2; // directly jump onto question n
      }
      return null; //if ans is other than male proceed to question no 3
    },
    2: (answer: string) => {
      if (answer[0] === "Male") {
        return 3; // directly jump onto question no5
      }
      if (answer[0] === "Female") {
        return 3; // directly jump onto question no5
      }

      return null; //if ans is other than male proceed to question no 3
    },

    4: () => 5,
    5: () => 6,

    7: (answer: string) => {
      if (
        answer[0] === "No symptoms. I’m looking for preventative treatment."
      ) {
        return 13; // if answer is no than directly move onto question no 20
      }

      return 8; // Proceed to next question
    },
    10: () => 11,
    11: () => 12,
    12: () => 13,
    13: () => 14,
    17: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // if answer is no than directly move onto question no 20
      }

      return 18; // Proceed to next question
    },

    19: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // if answer is no than directly move onto question no 20
      }

      return 20; // Proceed to next question
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
    if (
      currentQuestionIndex === 0 &&
      answers[0]?.answer[0] === "Phone Call" &&
      answers[0]?.answer[1] === ""
    ) {
      alert("Valid phone number is required");
      return;
    }
    if (
      currentQuestionIndex === 0 &&
      answers[0]?.answer[0] === "Phone Call" &&
      answers[0]?.answer[1] === ""
    ) {
      alert("Valid phone number is required");
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
          {currentQuestion.type === "text-input" && (
            <TextInputQuestion
              question={currentQuestion.question}
              answer={(answers[currentQuestionIndex]?.answer as string[]) || []}
              onChange={(answer) =>
                handleAnswerChange(currentQuestionIndex, answer)
              }
            />
          )}
          {currentQuestion.type === "weight-input" && (
            <WeightInputQuestion
              question={currentQuestion.question}
              answer={(answers[currentQuestionIndex]?.answer as string[]) || []}
              onChange={(answer) =>
                handleAnswerChange(currentQuestionIndex, answer)
              }
            />
          )}
          {currentQuestion.type === "date-input" && (
            <DateInputQuestion
              question={currentQuestion.question}
              answer={(answers[currentQuestionIndex]?.answer as string[]) || []}
              onChange={(answer) =>
                handleAnswerChange(currentQuestionIndex, answer)
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
