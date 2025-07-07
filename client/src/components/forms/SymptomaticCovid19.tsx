import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import NumberOfPatientsQuestion from "../questions/vaccine/NumberOfPatientsQuestion";
import PatientInfo, {
  PatientInformationCovidRef,
} from "../questions/symptomaticCovid19/PatientInfo";
import EmailPhoneInputQuestion from "../questions/vaccine/EmailPhoneInputQuestion";
import EligibilityCriteriaQuestion from "../questions/symptomaticCovid19/EligibilityCriteria";
import ConsentQuestion from "../questions/symptomaticCovid19/ConsentForm";
import { submitSymptomaticCovid } from "../../utils/api";
import ProgressBar from "../ui/CustomProgressbar";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface PatientInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  healthCardNumber: string;
  address: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  reasonForVisit: string;
  isPregnant: string;
  hasSymptoms: string;
  hadContact: string;
  vaccinationStatus: string;
  hasHealthCard?: string;
}

interface NestedAnswer {
  question: string;
  answer: string[];
}

const questionsPart1 = [
  {
    id: 1,
    question: "Are you eligible for a COVID-19 test?",
    type: "eligibility-criteria",
  },
  {
    id: 2,
    question: "How many attendees (upto 5)",
    type: "button-radio",
    options: ["1", "2", "3", "4", "5"],
  },
];

const questionsPart3 = [
  { id: 6, question: "Consent to Share Information ?", type: "consent" },
  { id: 7, question: "Contact Information", type: "email-phone-input" },
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
  const navigate = useNavigate();

  const formName = "Symptomatic COVID-19";
  const patientRefs = useRef<(PatientInformationCovidRef | null)[]>([]);

  // Total steps: 2 (part1) + N patients (part2) + 2 (part3)
  const totalSteps = 2 + parseInt(patientCount) + questionsPart3.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const getCurrentState = (step: number) => {
    if (step < 2) {
      return { phase: "part1" as const, patientIndex: -1, questionIndex: step };
    } else if (step < 2 + parseInt(patientCount)) {
      const patientIndex = step - 2;
      return { phase: "part2" as const, patientIndex, questionIndex: 0 };
    } else {
      const questionIndex = step - (2 + parseInt(patientCount));
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
      if (questionId === 2) {
        setPatientCount(answer as string);
        // Resize patientInfoArray and patientRefs
        setPatientInfoArray((prev) =>
          prev.slice(0, parseInt(answer as string))
        );
        patientRefs.current = patientRefs.current.slice(
          0,
          parseInt(answer as string)
        );
      }
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

  const handleSubmit = async (meetingDetails: {
    date: string;
    time: string;
  }) => {
    console.log("final submit hit");
    const finalData = {
      setup: {
        patientCount: answers[-1]?.[2]?.answer[0] || "1",
        formName,
      },
      questionnaire: [
        {
          question: "Are you eligible for a COVID-19 test?",
          answer: [answers[-1]?.[1]?.answer?.[0] || ""],
        },
        {
          question: "Consent to Share Information ?",
          answer: [answers[-1]?.[6]?.answer?.[0] || ""],
        },
      ],

      patientInfo: patientInfoArray,
      contactInfo: {
        email:
          answers[-1]?.[7]?.nestedAnswers?.find((na) => na.question === "Email")
            ?.answer[0] || "",
        phoneNumber:
          answers[-1]?.[7]?.nestedAnswers?.find(
            (na) => na.question === "Phone Number"
          )?.answer[0] || "",
        preferredMethod:
          answers[-1]?.[7]?.nestedAnswers?.find(
            (na) => na.question === "Preferred Contact Method"
          )?.answer[0] || "",
        consent: answers[-1]?.[6]?.answer[0] || "",
      },
      MeetingDetails: {
        date: meetingDetails.date,
        time: meetingDetails.time,
      },
    };
    try {
      //console.log(finalData, "finaldata");
      const result = await submitSymptomaticCovid(finalData);
      toast.success(result.message, {
        position: "top-right",
      });
      setTimeout(() => {
        navigate("/");
      }, 5000);

      //alert(result.message);
    } catch (error) {
      //alert("Failed to submit form. Please try again.");
      toast.error("Failed to submit form. Please try again.", {
        position: "top-right",
      });

      console.error("Submission error:", error);
    }
  };

  const handleNext = (nextStep: number) => {
    console.log(patientInfoArray, "answers");
    if (
      phase === "part1" &&
      !answers[-1]?.[questionsPart1[questionIndex].id]?.answer?.length
    ) {
      alert("Please provide a response.");
      return;
    }
    if (
      phase === "part1" &&
      questionsPart1[questionIndex].type === "eligibility-criteria" &&
      answers[-1]?.[questionsPart1[questionIndex].id]?.answer[0] === "No"
    ) {
      alert("This service is only for those eligible for a COVID-19 test.");
      return;
    }
    if (phase === "part2") {
      const patientRef = patientRefs.current[patientIndex];
      if (patientRef && !patientRef.validateForm()) {
        alert("Please fill out all required fields correctly.");
        return;
      }
    }
    if (phase === "part3" && questionsPart3[questionIndex].type === "consent") {
      const consentGiven = answers[-1]?.[6]?.answer[0] === "Yes";
      if (!consentGiven) {
        alert("Consent is required to proceed.");
        return;
      }
    }
    setHistory((prev) => [...prev, nextStep]);
    setCurrentStep(nextStep);
  };

  const handlePrevious = () => {
    console.log(answers, "answers");
    if (history.length <= 1) return;
    setHistory((prev) => prev.slice(0, -1));
    setCurrentStep(history[history.length - 2]);
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
          key={phase === "part2" ? `patient-${patientIndex}` : phase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-2xl"
        >
          {phase === "part1" && currentQuestionPart1 && (
            <>
              {currentQuestionPart1.type === "eligibility-criteria" && (
                <EligibilityCriteriaQuestion
                  question={currentQuestionPart1.question}
                  onChange={(answer) =>
                    handleAnswerChange(currentQuestionPart1.id, answer)
                  }
                  selectedAnswer={
                    answers[-1]?.[currentQuestionPart1.id]?.answer || []
                  }
                />
              )}
              {currentQuestionPart1.type === "button-radio" && (
                <NumberOfPatientsQuestion
                  question={currentQuestionPart1.question}
                  options={currentQuestionPart1.options}
                  onChange={(answer) =>
                    handleAnswerChange(currentQuestionPart1.id, answer)
                  }
                  selectedAnswer={
                    answers[-1]?.[currentQuestionPart1.id]?.answer || []
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
            <>
              <PatientInfo
                ref={(el) => (patientRefs.current[patientIndex] = el)}
                question="Patient Information"
                onChange={(info) => handlePatientInfoChange(patientIndex, info)}
                currentPatientIndex={patientIndex}
                numPatients={parseInt(patientCount)}
                initialData={patientInfoArray[patientIndex]}
              />
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
                    {patientIndex < parseInt(patientCount) - 1
                      ? "Next Patient"
                      : "Next"}
                    <ChevronsRight />
                  </div>
                </button>
              </div>
            </>
          )}
          {phase === "part3" && currentQuestionPart3 && (
            <>
              {currentQuestionPart3.type === "consent" && (
                <ConsentQuestion
                  question={currentQuestionPart3.question}
                  onChange={(answer) =>
                    handleAnswerChange(currentQuestionPart3.id, answer)
                  }
                  selectedAnswer={
                    answers[-1]?.[currentQuestionPart3.id]?.answer || []
                  }
                />
              )}
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
                  onSubmit={handleSubmit}
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
                {questionIndex < questionsPart3.length - 1 && (
                  <button
                    onClick={() => handleNext(currentStep + 1)}
                    className="text-gray-600 hover:text-primary"
                  >
                    <div className="flex">
                      Next
                      <ChevronsRight />
                    </div>
                  </button>
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
