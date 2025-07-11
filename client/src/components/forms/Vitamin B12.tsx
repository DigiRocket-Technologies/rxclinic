import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import RadioQuestion from "../questions/vaccine/RadioQuestionVaccine.js";
import NumberOfPatientsQuestion from "../questions/vaccine/NumberOfPatientsQuestion.js";
import PatientQuestions from "../questions/vaccine/PatientQuestions";
import EmailPhoneInputQuestion from "../questions/vaccine/EmailPhoneInputQuestion";
import { submitVaccineForm } from "../../utils/api.js";
import ProgressBar from "../ui/CustomProgressbar.js";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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

// Part 1 Questions
const questionsPart1 = [
  {
    id: 1,
    question: "How many attendees",
    type: "button-radio",
    options: ["1", "2", "3", "4", "5"],
  },
  {
    id: 2,
    question: "Please describe the reason for your visit.",
    type: "radio",
    options: [
      "I want to receive a vaccine or learn more about Hepatitis A vaccine/injection",
      "I have a prescription for Hepatitis A vaccine/injection and require an appointment for administration",
    ],
  },
];

// Part 3 Questions
const questionsPart3 = [
  { id: 17, question: "Contact Information", type: "email-phone-input" },
];

const Form: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [history, setHistory] = useState<number[]>([0]);
  const [answers, setAnswers] = useState<{
    [patientIndex: number]: {
      [questionId: number]: {
        answer: string[];
        nestedAnswers?: NestedAnswer[];
      };
    };
  }>({});
  const [patientInfoArray, setPatientInfoArray] = useState<PatientInfo[]>([]);
  const [patientCount, setPatientCount] = useState<string>("1");
  const [questionnaireArray, setQuestionnaireArray] = useState<
    (AnswerPair | NestedAnswer)[][][]
  >([]);
  const navigate = useNavigate();

  const formName = "Vitamin B12 ";

  const totalSteps = 2 + 14 * parseInt(patientCount) + questionsPart3.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const getCurrentState = (step: number) => {
    if (step < 2) {
      return { phase: "part1" as const, patientIndex: -1, questionIndex: step };
    } else if (step < 2 + 14 * parseInt(patientCount)) {
      const patientIndex = Math.floor((step - 2) / 14);
      const questionIndex = (step - 2) % 14;
      return { phase: "part2" as const, patientIndex, questionIndex };
    } else {
      const questionIndex = step - (2 + 14 * parseInt(patientCount));
      return { phase: "part3" as const, patientIndex: -1, questionIndex };
    }
  };

  const { phase, patientIndex, questionIndex } = getCurrentState(currentStep);

  const handleAnswerChange = (
    questionId: number,
    answer: string | string[],
    patientIdx?: number,
    nestedAnswers?: NestedAnswer[]
  ) => {
    const answerArray = Array.isArray(answer) ? answer : [answer];
    if (patientIdx === undefined) {
      setAnswers((prev) => ({
        ...prev,
        [-1]: {
          ...(prev[-1] || {}),
          [questionId]: { answer: answerArray, nestedAnswers },
        },
      }));
      if (questionId === 1) setPatientCount(answer as string);
    } else {
      setAnswers((prev) => ({
        ...prev,
        [patientIdx]: {
          ...(prev[patientIdx] || {}),
          [questionId]: { answer: answerArray, nestedAnswers },
        },
      }));
    }
  };

  const handlePatientAnswerChange = (
    patientIdx: number,
    questionId: number,
    answer: string[],
    nestedAnswers?: NestedAnswer[]
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [patientIdx]: {
        ...(prev[patientIdx] || {}),
        [questionId]: { answer, nestedAnswers },
      },
    }));
  };

  const handlePatientInfoChange = (
    patientIdx: number,
    info: Partial<PatientInfo>
  ) => {
    setPatientInfoArray((prev) => {
      const updated = [...prev];
      updated[patientIdx] = {
        ...(updated[patientIdx] || {}),
        ...info,
      } as PatientInfo;
      return updated;
    });
  };

  const handleNext = (nextStep: number) => {
    if (
      phase === "part1" &&
      !answers[-1]?.[questionsPart1[questionIndex].id]?.answer
    ) {
      alert("Your response is required.");
      return;
    }
    setHistory((prev) => [...prev, nextStep]);
    setCurrentStep(nextStep);
  };

  const handlePrevious = () => {
    if (history.length <= 1) return;
    setHistory((prev) => prev.slice(0, -1));
    const prevStep = history[history.length - 2];
    setCurrentStep(prevStep);
  };

  const handlePatientComplete = (
    patientIdx: number,
    data: { questionnaire: (AnswerPair | NestedAnswer)[][] }
  ) => {
    setQuestionnaireArray((prev) => {
      const updated = [...prev];
      updated[patientIdx] = data.questionnaire;
      return updated;
    });

    if (patientIdx < parseInt(patientCount) - 1) {
      handleNext(2 + (patientIdx + 1) * 14);
    } else {
      handleNext(2 + 14 * parseInt(patientCount));
    }
  };

  const handleFormComplete = async (meetingDetails: {
    date: string;
    time: string;
  }) => {
    const finalData = {
      setup: {
        patientCount: answers[-1]?.[1]?.answer[0] || "1",
        "What brought you here today?": answers[-1]?.[2]?.answer[0] || "",
        formName,
      },
      questionnaire: questionnaireArray.map((patientAnswers) =>
        patientAnswers.filter(
          (subArray) => subArray[0].question !== "Patient Information"
        )
      ),
      patientInfo: patientInfoArray,
      contactInfo: {
        email:
          answers[-1]?.[17]?.nestedAnswers?.find(
            (na) => na.question === "Email"
          )?.answer[0] || "",
        phoneNumber:
          answers[-1]?.[17]?.nestedAnswers?.find(
            (na) => na.question === "Phone Number"
          )?.answer[0] || "",
        preferredMethod:
          answers[-1]?.[17]?.nestedAnswers?.find(
            (na) => na.question === "Preferred Contact Method"
          )?.answer[0] || "",
      },
      MeetingDetails: {
        date: meetingDetails.date,
        time: meetingDetails.time,
      },
    };

    try {
      const result = await submitVaccineForm(finalData);
      toast.success(result.message, {
        position: "top-right",
      });
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error) {
      toast.error("Failed to submit form. Please try again.", {
        position: "top-right",
      });
    }
  };

  const currentQuestionPart1 =
    phase === "part1" ? questionsPart1[questionIndex] : null;
  const currentQuestionPart3 =
    phase === "part3" ? questionsPart3[questionIndex] : null;

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-8 md:py-16">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-8">
          <ProgressBar progress={progress} />
        </div>
        <motion.div
          key={phase === "part2" ? patientIndex : phase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-2xl"
        >
          {phase === "part1" && currentQuestionPart1 && (
            <>
              {currentQuestionPart1.type === "button-radio" && (
                <NumberOfPatientsQuestion
                  question={currentQuestionPart1.question}
                  options={currentQuestionPart1.options as string[]}
                  onChange={(answer) =>
                    handleAnswerChange(currentQuestionPart1.id, answer)
                  }
                  selectedAnswer={
                    answers[-1]?.[currentQuestionPart1.id]?.answer as string[]
                  }
                />
              )}
              {currentQuestionPart1.type === "radio" && (
                <RadioQuestion
                  question={currentQuestionPart1.question}
                  options={currentQuestionPart1.options as string[]}
                  onChange={(answer) =>
                    handleAnswerChange(currentQuestionPart1.id, answer)
                  }
                  selectedAnswer={
                    answers[-1]?.[currentQuestionPart1.id]?.answer
                  }
                />
              )}
              <div className="mt-6 flex justify-between">
                <button
                  onClick={handlePrevious}
                  className="text-gray-600 hover:text-gray-800 disabled:text-gray-400"
                  disabled={history.length <= 1}
                >
                  <div className="flex">
                    <ChevronsLeft className="mr-2" />
                    Previous
                  </div>
                </button>
                <button
                  onClick={() => handleNext(currentStep + 1)}
                  className="text-gray-600 hover:text-primary"
                >
                  <div className="flex">
                    Next
                    <ChevronsRight />
                  </div>
                </button>
              </div>
            </>
          )}
          {phase === "part2" && (
            <PatientQuestions
              patientIndex={patientIndex}
              patientCount={parseInt(patientCount)}
              formName={formName}
              initialAnswers={answers[patientIndex] || {}}
              initialPatientInfo={patientInfoArray[patientIndex]}
              currentQuestionIndex={questionIndex}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onAnswerChange={(questionId, answer, nestedAnswers) =>
                handlePatientAnswerChange(
                  patientIndex,
                  questionId,
                  answer,
                  nestedAnswers
                )
              }
              onPatientInfoChange={(info) =>
                handlePatientInfoChange(patientIndex, info)
              }
              onComplete={(data) => handlePatientComplete(patientIndex, data)}
            />
          )}
          {phase === "part3" && currentQuestionPart3 && (
            <>
              {currentQuestionPart3.type === "email-phone-input" && (
                <EmailPhoneInputQuestion
                  question={currentQuestionPart3.question}
                  onChange={(answer, nestedAnswers) =>
                    handleAnswerChange(
                      currentQuestionPart3.id,
                      answer,
                      undefined,
                      nestedAnswers
                    )
                  }
                  onSubmit={handleFormComplete}
                  numberOfPatients={patientCount}
                  selectedAnswer={
                    answers[-1]?.[currentQuestionPart3.id]?.answer || []
                  }
                  nestedAnswers={
                    answers[-1]?.[currentQuestionPart3.id]?.nestedAnswers
                  }
                />
              )}
              <div className="mt-6 flex justify-between">
                <button
                  onClick={handlePrevious}
                  className="text-gray-600 hover:text-gray-800 disabled:text-gray-400"
                  disabled={history.length <= 1}
                >
                  <div className="flex">
                    <ChevronsLeft className="mr-2" />
                    Previous
                  </div>
                </button>
                {questionIndex < questionsPart3.length - 1 ? (
                  <button
                    onClick={() => handleNext(currentStep + 1)}
                    className="text-gray-600 hover:text-primary"
                  >
                    <div className="flex">
                      Next
                      <ChevronsRight />
                    </div>
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Form;
