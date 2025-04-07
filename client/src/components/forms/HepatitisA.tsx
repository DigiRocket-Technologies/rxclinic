// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { ChevronsLeft, ChevronsRight } from "lucide-react";
// import RadioQuestion from "../questions/RadioQuestion";
// import ButtonRadioQuestion from "../questions/ButtonRadioQuestion";
// import ConditionalButtonRadioQuestion from "../questions/ConditionalButtonRadioQuestion";
// import ButtonRadioWithInputQuestion from "../questions/ButtonRadioWithInputQuestion";
// import PrimaryCareProviderQuestion from "../questions/PrimaryCareProviderQuestion";
// import { submitFormData } from "../../utils/api.js";
// import EmailPhoneInputQuestion from "./EmailPhoneInputQuestion.js";
// import ConsentForInjectionQuestion from "../questions/ConsentForInjectionQuestion.js";

// const questions = [
//   {
//     //first question update for no of people
//     id: 1,
//     question: "What sex were you assigned at birth?",
//     type: "button-radio",
//     options: ["Male", "Female"],
//   },
//   {
//     id: 2,
//     question: "What brought you here today?",
//     type: "radio",
//     options: [
//       "I want to receive a vaccine or learn more about Hepatitis A vaccine/injection",
//       "I have a prescription for Hepatitis A vaccine/injection and require an appointment for administration",
//     ],
//   },

//   {
//     //this question update for patient info
//     id: 3,
//     question: "What sex were you assigned at birth?",
//     type: "button-radio",
//     options: ["Male", "Female"],
//   },
//   {
//     id: 4,
//     question: "What sex were you assigned at birth?",
//     type: "button-radio-input",
//     options: ["Male", "Female"],
//   },
//   {
//     id: 5,
//     question:
//       "Do you have any allergies to food, medications, eggs, latex or vaccine/injection?",
//     type: "conditional-button-radio",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label: "Please specify",
//       },
//       { value: "No", showsInput: false },
//       { value: "I Don't Know", showsInput: false },
//     ],
//   },
//   {
//     id: 6,
//     question:
//       "Have you ever had a serious reaction after receiving a vaccine/injection?",
//     type: "button-radio",
//     options: ["Yes", "No", "Not Sure"],
//   },
//   {
//     id: 7,
//     question: "Have you received a vaccine/injection in the last 4 weeks?",
//     type: "button-radio",
//     options: ["Yes", "No", "Not Sure"],
//   },
//   {
//     id: 8,
//     question: "Are you, or could you be pregnant?",
//     type: "button-radio",
//     options: ["Yes", "No", "Not Sure"],
//   },
//   {
//     id: 9,
//     question:
//       "Do you have any problems with your immune system or take medications which affect your immune system?",
//     type: "conditional-button-radio",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label: "Please specify",
//       },
//       { value: "No", showsInput: false },
//       { value: "I Don't Know", showsInput: false },
//     ],
//   },
//   {
//     id: 10,
//     question:
//       "Do you have a long term health problem (heart disease, lung disease, asthma, kidney disease, anemia, or other blood disorders)?",
//     type: "button-radio",
//     options: ["Yes", "No", "Not Sure"],
//   },
//   {
//     id: 11,
//     question:
//       "Are you taking any medications that could affect blood clotting (e.g., blood thinners)?",
//     type: "button-radio",
//     options: ["Yes", "No", "Not Sure"],
//   },
//   {
//     id: 12,
//     question:
//       "Are you sick today (ie. fever > 39.5C, breathing problems, active infection)?",
//     type: "button-radio",
//     options: ["Yes", "No", "Not Sure"],
//   },
//   {
//     id: 13,
//     question: "Who is your primary care provider?",
//     type: "primary-care-provider",
//   },
//   {
//     id: 14,
//     question: "Consent for Injection",
//     type: "consent-for-injection",
//   },
//   {
//     id: 15,
//     question: "Are you a current patient at this location?",
//     type: "button-radio",
//     options: ["Yes", "No"],
//   },
//   {
//     id: 16,
//     question:
//       "I'm interested in learning more about transferring my medications to this pharmacy",
//     type: "button-radio",
//     options: ["Yes", "No"],
//   },
//   {
//     id: 17,
//     question: "Contact Information",
//     type: "contact-info",
//   },

//   // Add more questions here
// ];
// interface PatientInfo {
//   firstName: string;
//   lastName: string;
//   dateOfBirth: string;
//   address: string;
//   city: string;
//   email: string;
//   phoneNumber: string;
//   pronouns?: string;
//   contactMethod: string;
//   newPatient: string;
//   healthCardNumber?: string;
//   hasHealthCard?: string;
//   interestedInTransfer?: string;
// }

// const Form: React.FC = () => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState<{
//     [key: number]: {
//       answer: string[];
//       nestedAnswers?: { question: string; answer: string[] }[];
//     };
//   }>({});
//   const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);

//   const [questionHistory, setQuestionHistory] = useState<number[]>([0]);

//   const dependencyMap: { [key: number]: (answer: string) => number | null } =
//     {};

//   const getQuestionsAndAnswers = () => {
//     const result = [];
//     questions.forEach((question, index) => {
//       const answer = answers[index]?.answer;
//       const nestedAnswers = answers[index]?.nestedAnswers;
//       if (answer !== undefined) {
//         const questionAnswerPair = {
//           question: question.question,
//           answer: answer,
//         };
//         if (nestedAnswers) {
//           result.push([questionAnswerPair, ...nestedAnswers]);
//         } else {
//           result.push([questionAnswerPair]);
//         }
//       }
//     });
//     return result;
//   };

//   const handleAnswerChange = (
//     index: number,
//     answer: string | string[],
//     nestedAnswers?: { question: string; answer: string[] }[]
//   ) => {
//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [index]: {
//         answer: Array.isArray(answer) ? answer : [answer],
//         nestedAnswers,
//       },
//     }));

//     const nextQuestionIndex = dependencyMap[questions[index].id]
//       ? dependencyMap[questions[index].id](answer as string)
//       : index + 1;

//     if (nextQuestionIndex !== null) {
//       setQuestionHistory((prevHistory) => [
//         ...prevHistory,
//         nextQuestionIndex - 1,
//       ]);
//       setCurrentQuestionIndex(
//         nextQuestionIndex ? nextQuestionIndex - 1 : currentQuestionIndex
//       );
//     }
//   };

//   const handleNext = () => {
//     const currentAnswer = answers[currentQuestionIndex];
//     if (!currentAnswer?.answer) {
//       alert("Your response is required.");
//       return;
//     }
//     if (currentQuestionIndex < questions.length - 1) {
//       setQuestionHistory((prevHistory) => [
//         ...prevHistory,
//         currentQuestionIndex + 1,
//       ]);

//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//     const he = getQuestionsAndAnswers();
//     console.log(he, "hello");
//   };

//   const handlePrevious = () => {
//     if (questionHistory.length > 1) {
//       setQuestionHistory((prevHistory) => prevHistory.slice(0, -1));
//       setCurrentQuestionIndex(questionHistory[questionHistory.length - 2]);
//     }
//   };
//   const handleFinalSubmit = async () => {
//     if (!patientInfo) {
//       alert("Please complete patient information.");
//       return;
//     }

//     const questionnaireData = getQuestionsAndAnswers();
//     const finalData = {
//       questionnaire: questionnaireData,
//       patientInfo,
//     };

//     console.log("Data to be sent to backend:", finalData);

//     try {
//       const result = await submitFormData(finalData); // Call the reusable function
//       alert(result.message); // Show success message from backend
//     } catch (error) {
//       alert("Failed to submit form. Please try again."); // Show error message
//       console.error("Submission error:", error); // Log for debugging
//     }
//   };

//   const currentQuestion = questions[currentQuestionIndex];
//   const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
//   const isLastQuestion = currentQuestionIndex === questions.length - 1;

//   return (
//     <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-8 md:py-16">
//       <div className="w-full max-w-3xl mx-auto">
//         <div className="mb-8">
//           {/* progress bar */}
//           <div className="bg-gray-200 h-3 w-full rounded-full overflow-hidden">
//             <motion.div
//               className="h-3 bg-primary rounded-full transition-width duration-200 ease-in-out"
//               style={{ width: `${progress}%` }}
//               initial={{ width: "0%" }}
//               animate={{ width: `${progress}%` }}
//             />
//           </div>
//         </div>
//         {/* questions content */}
//         <motion.div
//           key={currentQuestionIndex}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white p-8 rounded-2xl shadow-2xl"
//         >
//           {/* Render question components based on type */}
//           {currentQuestion.type === "radio" && (
//             <RadioQuestion
//               question={currentQuestion.question}
//               options={currentQuestion.options as string[]}
//               onChange={(answer) =>
//                 handleAnswerChange(currentQuestionIndex, answer)
//               }
//               selectedAnswer={answers[currentQuestionIndex]?.answer as string[]}
//             />
//           )}

//           {currentQuestion.type === "button-radio" && (
//             <ButtonRadioQuestion
//               question={currentQuestion.question}
//               options={currentQuestion.options as string[]}
//               onChange={(answer) =>
//                 handleAnswerChange(currentQuestionIndex, answer)
//               }
//               selectedAnswer={answers[currentQuestionIndex]?.answer as string[]}
//             />
//           )}
//           {currentQuestion.type === "conditional-button-radio" && (
//             <ConditionalButtonRadioQuestion
//               question={currentQuestion.question}
//               options={
//                 currentQuestion.options as {
//                   value: string;
//                   showsInput: boolean;
//                   label?: string;
//                 }[]
//               }
//               onChange={(answer, nestedAnswers) =>
//                 handleAnswerChange(currentQuestionIndex, answer, nestedAnswers)
//               }
//               selectedAnswer={answers[currentQuestionIndex]?.answer as string[]}
//               nestedAnswers={answers[currentQuestionIndex]?.nestedAnswers}
//             />
//           )}

//           {currentQuestion.type === "button-radio-input" && (
//             <ButtonRadioWithInputQuestion
//               question={currentQuestion.question}
//               options={currentQuestion.options as string[]}
//               onChange={(answer) =>
//                 handleAnswerChange(currentQuestionIndex, answer)
//               }
//               selectedAnswer={
//                 answers[currentQuestionIndex]?.answer[0] as string
//               }
//             />
//           )}
//           {currentQuestion.type === "contact-info" && (
//             <EmailPhoneInputQuestion
//               question={currentQuestion.question}
//               onChange={(answer, nestedAnswers) => {
//                 handleAnswerChange(currentQuestionIndex, answer, nestedAnswers);
//               }}
//               selectedAnswer={answers[currentQuestionIndex]?.answer as string[]}
//               nestedAnswers={answers[currentQuestionIndex]?.nestedAnswers}
//             />
//           )}

//           {currentQuestion.type === "primary-care-provider" && (
//             <PrimaryCareProviderQuestion
//               question={currentQuestion.question}
//               answer={(answers[currentQuestionIndex]?.answer as string[]) || []}
//               onChange={(answer) =>
//                 handleAnswerChange(currentQuestionIndex, answer)
//               }
//             />
//           )}
//           {currentQuestion.type === "consent-for-injection" && (
//             <ConsentForInjectionQuestion
//               question={currentQuestion.question}
//               onChange={(answer, nestedAnswers) => {
//                 handleAnswerChange(currentQuestionIndex, answer, nestedAnswers);
//               }}
//               selectedAnswer={answers[currentQuestionIndex]?.answer as string[]}
//               nestedAnswers={answers[currentQuestionIndex]?.nestedAnswers}
//             />
//           )}

//           <div className="mt-6 flex justify-between">
//             <button
//               onClick={handlePrevious}
//               className="text-gray-600 hover:text-gray-800 disabled:text-gray-400"
//               disabled={questionHistory.length <= 1}
//             >
//               <div className="flex">
//                 <ChevronsLeft className="mr-2" />
//                 Previous
//               </div>
//             </button>
//             {!isLastQuestion && (
//               <button
//                 onClick={handleNext}
//                 className="text-gray-600 hover:text-primary"
//               >
//                 <div className="flex">
//                   Next
//                   <ChevronsRight />
//                 </div>
//               </button>
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Form;

//second code

// import React, { useRef, useState } from "react";
// import { motion } from "framer-motion";
// import { ChevronsLeft, ChevronsRight } from "lucide-react";
// import RadioQuestion from "../questions/RadioQuestion";
// import ButtonRadioQuestion from "../questions/ButtonRadioQuestion";
// import ConditionalButtonRadioQuestion from "../questions/ConditionalButtonRadioQuestion";
// import ButtonRadioWithInputQuestion from "../questions/ButtonRadioWithInputQuestion";
// import PrimaryCareProviderQuestion from "../questions/PrimaryCareProviderQuestion";
// import PatientInformationVaccine from "../questions/PatientInformationVaccine"; // Import the new component
// import { submitFormData } from "../../utils/api.js";
// import EmailPhoneInputQuestion from "./EmailPhoneInputQuestion.js";
// import ConsentForInjectionQuestion from "../questions/ConsentForInjectionQuestion.js";
// import NumberOfPatientsQuestion from "../questions/NumberOfPatientsQuestion";
// // ... (questions array remains the same, with updated id: 3 as shown above)
// const questions = [
//   {
//     id: 1,
//     question: "How many people are booking an appointment?",
//     type: "number-of-patients",
//     options: ["1", "2", "3", "4", "5"],
//   },
//   {
//     id: 2,
//     question: "What brought you here today?",
//     type: "radio",
//     options: [
//       "I want to receive a vaccine or learn more about Hepatitis A vaccine/injection",
//       "I have a prescription for Hepatitis A vaccine/injection and require an appointment for administration",
//     ],
//   },

//   {
//     id: 3,
//     question: "Patient Inforation",
//     type: "patient-information-vaccine",
//   },
//   {
//     id: 4,
//     question: "What sex were you assigned at birth?",
//     type: "button-radio-input",
//     options: ["Male", "Female"],
//   },
//   {
//     id: 5,
//     question:
//       "Do you have any allergies to food, medications, eggs, latex or vaccine/injection?",
//     type: "conditional-button-radio",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label: "Please specify",
//       },
//       { value: "No", showsInput: false },
//       { value: "I Don't Know", showsInput: false },
//     ],
//   },
//   {
//     id: 6,
//     question:
//       "Have you ever had a serious reaction after receiving a vaccine/injection?",
//     type: "button-radio",
//     options: ["Yes", "No", "Not Sure"],
//   },
//   {
//     id: 7,
//     question: "Have you received a vaccine/injection in the last 4 weeks?",
//     type: "button-radio",
//     options: ["Yes", "No", "Not Sure"],
//   },
//   {
//     id: 8,
//     question: "Are you, or could you be pregnant?",
//     type: "button-radio",
//     options: ["Yes", "No", "Not Sure"],
//   },
//   {
//     id: 9,
//     question:
//       "Do you have any problems with your immune system or take medications which affect your immune system?",
//     type: "conditional-button-radio",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label: "Please specify",
//       },
//       { value: "No", showsInput: false },
//       { value: "I Don't Know", showsInput: false },
//     ],
//   },
//   {
//     id: 10,
//     question:
//       "Do you have a long term health problem (heart disease, lung disease, asthma, kidney disease, anemia, or other blood disorders)?",
//     type: "button-radio",
//     options: ["Yes", "No", "Not Sure"],
//   },
//   {
//     id: 11,
//     question:
//       "Are you taking any medications that could affect blood clotting (e.g., blood thinners)?",
//     type: "button-radio",
//     options: ["Yes", "No", "Not Sure"],
//   },
//   {
//     id: 12,
//     question:
//       "Are you sick today (ie. fever > 39.5C, breathing problems, active infection)?",
//     type: "button-radio",
//     options: ["Yes", "No", "Not Sure"],
//   },
//   {
//     id: 13,
//     question: "Who is your primary care provider?",
//     type: "primary-care-provider",
//   },
//   {
//     id: 14,
//     question: "Consent for Injection",
//     type: "consent-for-injection",
//   },
//   {
//     id: 15,
//     question: "Are you a current patient at this location?",
//     type: "button-radio",
//     options: ["Yes", "No"],
//   },
//   {
//     id: 16,
//     question:
//       "I'm interested in learning more about transferring my medications to this pharmacy",
//     type: "button-radio",
//     options: ["Yes", "No"],
//   },
//   {
//     id: 17,
//     question: "Contact Information",
//     type: "contact-info",
//   },

//   // Add more questions here
// ];
// interface PatientInfo {
//   firstName: string;
//   lastName: string;
//   dateOfBirth: string;
//   address: string;
//   pronouns?: string;
//   healthCardNumber?: string;
//   hasHealthCard?: string;
//   contactMethod?: string;
//   newPatient?: string;
//   interestedInTransfer?: string;
// }

// const Form: React.FC = () => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState<{
//     [key: number]: {
//       answer: string[];
//       nestedAnswers?: { question: string; answer: string[] }[];
//     };
//   }>({});
//   const [patientInfos, setPatientInfos] = useState<PatientInfo[]>([]);
//   const [numPatients, setNumPatients] = useState<number>(0);
//   const [currentPatientIndex, setCurrentPatientIndex] = useState<number>(0);
//   const [questionHistory, setQuestionHistory] = useState<number[]>([0]);
//   const [patientInfoValid, setPatientInfoValid] = useState<boolean>(true); // Track validation state
//   const patientInfoRef = useRef<{ validateForm: () => boolean }>(null);
//   const dependencyMap: { [key: number]: (answer: string) => number | null } =
//     {};

//   const getQuestionsAndAnswers = () => {
//     const result = [];
//     questions.forEach((question, index) => {
//       const answer = answers[index]?.answer;
//       const nestedAnswers = answers[index]?.nestedAnswers;
//       if (answer !== undefined) {
//         const questionAnswerPair = {
//           question: question.question,
//           answer: answer,
//         };
//         if (nestedAnswers) {
//           result.push([questionAnswerPair, ...nestedAnswers]);
//         } else {
//           result.push([questionAnswerPair]);
//         }
//       }
//     });
//     return result;
//   };

//   const handleAnswerChange = (
//     index: number,
//     answer: string | string[],
//     nestedAnswers?: { question: string; answer: string[] }[]
//   ) => {
//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [index]: {
//         answer: Array.isArray(answer) ? answer : [answer],
//         nestedAnswers,
//       },
//     }));
//     if (index === 0) {
//       setNumPatients(parseInt(answer as string, 10));
//       // Initialize patientInfos array based on numPatients
//       setPatientInfos(Array(parseInt(answer as string, 10)).fill({}));
//     }
//   };

//   const handlePatientInfoChange = (
//     index: number,
//     info: Partial<PatientInfo>
//   ) => {
//     setPatientInfos((prev) => {
//       const updated = [...prev];
//       updated[index] = { ...updated[index], ...info };
//       return updated;
//     });
//   };

//   const handleNext = () => {
//     const currentAnswer = answers[currentQuestionIndex];
//     if (currentQuestionIndex !== 2 && !currentAnswer?.answer) {
//       alert("Your response is required.");
//       return;
//     }
//     if (currentQuestionIndex === 2) {
//       const isValid = patientInfoRef.current?.validateForm();
//       setPatientInfoValid(isValid || false);
//       if (!isValid) return;
//     }
//     if (currentQuestionIndex < questions.length - 1) {
//       setQuestionHistory((prevHistory) => [
//         ...prevHistory,
//         currentQuestionIndex + 1,
//       ]);
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//     const he = getQuestionsAndAnswers();
//     console.log(he, "hello");
//   };

//   const handlePrevious = () => {
//     if (questionHistory.length > 1) {
//       setQuestionHistory((prevHistory) => prevHistory.slice(0, -1));
//       setCurrentQuestionIndex(questionHistory[questionHistory.length - 2]);
//     }
//   };

//   const currentQuestion = questions[currentQuestionIndex];
//   const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
//   const isLastQuestion = currentQuestionIndex === questions.length - 1;

//   return (
//     <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-8 md:py-16">
//       <div className="w-full max-w-3xl mx-auto">
//         <div className="mb-8">
//           <div className="bg-gray-200 h-3 w-full rounded-full overflow-hidden">
//             <motion.div
//               className="h-3 bg-primary rounded-full transition-width duration-200 ease-in-out"
//               style={{ width: `${progress}%` }}
//               initial={{ width: "0%" }}
//               animate={{ width: `${progress}%` }}
//             />
//           </div>
//         </div>
//         <motion.div
//           key={currentQuestionIndex}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white p-8 rounded-2xl shadow-2xl"
//         >
//           {currentQuestion.type === "radio" && (
//             <RadioQuestion
//               question={currentQuestion.question}
//               options={currentQuestion.options as string[]}
//               onChange={(answer) =>
//                 handleAnswerChange(currentQuestionIndex, answer)
//               }
//               selectedAnswer={answers[currentQuestionIndex]?.answer as string[]}
//             />
//           )}
//           {currentQuestion.type === "button-radio" && (
//             <ButtonRadioQuestion
//               question={currentQuestion.question}
//               options={currentQuestion.options as string[]}
//               onChange={(answer) =>
//                 handleAnswerChange(currentQuestionIndex, answer)
//               }
//               selectedAnswer={answers[currentQuestionIndex]?.answer as string[]}
//             />
//           )}
//           {currentQuestion.type === "conditional-button-radio" && (
//             <ConditionalButtonRadioQuestion
//               question={currentQuestion.question}
//               options={
//                 currentQuestion.options as {
//                   value: string;
//                   showsInput: boolean;
//                   label?: string;
//                 }[]
//               }
//               onChange={(answer, nestedAnswers) =>
//                 handleAnswerChange(currentQuestionIndex, answer, nestedAnswers)
//               }
//               selectedAnswer={answers[currentQuestionIndex]?.answer as string[]}
//               nestedAnswers={answers[currentQuestionIndex]?.nestedAnswers}
//             />
//           )}
//           {currentQuestion.type === "button-radio-input" && (
//             <ButtonRadioWithInputQuestion
//               question={currentQuestion.question}
//               options={currentQuestion.options as string[]}
//               onChange={(answer) =>
//                 handleAnswerChange(currentQuestionIndex, answer)
//               }
//               selectedAnswer={
//                 answers[currentQuestionIndex]?.answer[0] as string
//               }
//             />
//           )}
//           {currentQuestion.type === "contact-info" && (
//             <EmailPhoneInputQuestion
//               question={currentQuestion.question}
//               onChange={(answer, nestedAnswers) => {
//                 handleAnswerChange(currentQuestionIndex, answer, nestedAnswers);
//               }}
//               selectedAnswer={answers[currentQuestionIndex]?.answer as string[]}
//               nestedAnswers={answers[currentQuestionIndex]?.nestedAnswers}
//             />
//           )}
//           {currentQuestion.type === "primary-care-provider" && (
//             <PrimaryCareProviderQuestion
//               question={currentQuestion.question}
//               answer={(answers[currentQuestionIndex]?.answer as string[]) || []}
//               onChange={(answer) =>
//                 handleAnswerChange(currentQuestionIndex, answer)
//               }
//             />
//           )}
//           {currentQuestion.type === "consent-for-injection" && (
//             <ConsentForInjectionQuestion
//               question={currentQuestion.question}
//               onChange={(answer, nestedAnswers) => {
//                 handleAnswerChange(currentQuestionIndex, answer, nestedAnswers);
//               }}
//               selectedAnswer={answers[currentQuestionIndex]?.answer as string[]}
//               nestedAnswers={answers[currentQuestionIndex]?.nestedAnswers}
//             />
//           )}
//           {currentQuestion.type === "patient-information-vaccine" && (
//             <PatientInformationVaccine
//               ref={patientInfoRef} // Pass the ref
//               question={currentQuestion.question}
//               onChange={(info) =>
//                 handlePatientInfoChange(currentPatientIndex, info)
//               }
//               currentPatientIndex={currentPatientIndex}
//               numPatients={numPatients}
//               initialData={patientInfos[currentPatientIndex]}
//             />
//           )}
//           {currentQuestion.type === "number-of-patients" && (
//             <NumberOfPatientsQuestion
//               question={currentQuestion.question}
//               onChange={(answer) =>
//                 handleAnswerChange(currentQuestionIndex, answer)
//               }
//               selectedAnswer={answers[currentQuestionIndex]?.answer?.[0]}
//             />
//           )}

//           <div className="mt-6 flex justify-between">
//             <button
//               onClick={handlePrevious}
//               className="text-gray-600 hover:text-gray-800 disabled:text-gray-400"
//               disabled={questionHistory.length <= 1}
//             >
//               <div className="flex">
//                 <ChevronsLeft className="mr-2" />
//                 Previous
//               </div>
//             </button>
//             {!isLastQuestion && (
//               <button
//                 onClick={handleNext}
//                 className="text-gray-600 hover:text-primary"
//               >
//                 <div className="flex">
//                   Next
//                   <ChevronsRight />
//                 </div>
//               </button>
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Form;

// last perfect  form

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { ChevronsLeft, ChevronsRight } from "lucide-react";
// import RadioQuestion from "../questions/RadioQuestion";
// import PatientQuestions from "../questions/PatientQuestions"; // New Part 2 component
// import ButtonRadioQuestion from "../questions/ButtonRadioQuestion";

// interface PatientInfo {
//   firstName: string;
//   lastName: string;
//   dateOfBirth: string;
//   address: string;
//   pronouns?: string;
//   healthCardNumber?: string;
//   hasHealthCard?: string;
// }
// interface AnswerPair {
//   question: string;
//   answer: string[];
// }

// interface NestedAnswer {
//   question: string;
//   answer: string[];
// }

// const questions = [
//   {
//     id: 1,
//     question: "How many people are booking an appointment?",
//     type: "button-radio",
//     options: ["1", "2", "3", "4", "5"],
//   },
//   {
//     id: 2,
//     question: "What brought you here today?",
//     type: "radio",
//     options: [
//       "I want to receive a vaccine or learn more about Hepatitis A vaccine/injection",
//       "I have a prescription for Hepatitis A vaccine/injection and require an appointment for administration",
//     ],
//   },
//   // Q3–Q17 handled in PatientQuestions
// ];

// const Form: React.FC = () => {
//   const [currentPhase, setCurrentPhase] = useState<"part1" | "part2">("part1");
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState<{
//     [key: number]: { answer: string[] };
//   }>({});
//   const [patientCount, setPatientCount] = useState<string>("1");
//   const [patientData, setPatientData] = useState<{
//     // questionnaire: (AnswerPair | NestedAnswer)[][];
//     questionnaire: (AnswerPair | NestedAnswer)[][][];
//     patientInfo: PatientInfo[];
//   } | null>(null);
//   const [questionHistory, setQuestionHistory] = useState<number[]>([0]);
//   const formName = "Hepatitis A";
//   const totalSteps = 2 + 14 * parseInt(patientCount); // Q1–Q2 + Q3–Q16 per patient
//   const progress =
//     currentPhase === "part1"
//       ? ((currentQuestionIndex + 1) / totalSteps) * 100
//       : ((2 + patientData?.questionnaire.length * 14) / totalSteps) * 100;

//   const handleAnswerChange = (index: number, answer: string | string[]) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [index]: { answer: Array.isArray(answer) ? answer : [answer] },
//     }));
//     if (index === 0) setPatientCount(answer as string);
//   };

//   const handleNext = () => {
//     const currentAnswer = answers[currentQuestionIndex];
//     if (!currentAnswer?.answer) {
//       alert("Your response is required.");
//       return;
//     }
//     if (currentQuestionIndex === 1) {
//       setCurrentPhase("part2");
//     } else {
//       setQuestionHistory((prev) => [...prev, currentQuestionIndex + 1]);
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (questionHistory.length > 1) {
//       setQuestionHistory((prev) => prev.slice(0, -1));
//       setCurrentQuestionIndex(questionHistory[questionHistory.length - 2]);
//     }
//   };

//   // const handlePart2Complete = (data: {
//   //   questionnaire: AnswerPair[][];
//   //   patientInfo: PatientInfo[];
//   // }) => {
//   //   setPatientData(data);
//   //   const filteredQuestionnaire = data.questionnaire.map((patientAnswers) =>
//   //     patientAnswers.filter(
//   //       (answer) => answer.question !== "Patient Information"
//   //     )
//   //   );
//   //   console.log("Final Data:", {
//   //     setup: {
//   //       patientCount: answers[0].answer[0],
//   //       "What brought you here today?": answers[1].answer[0],
//   //       name: "Hepatitis A Vaccine Form", // Hardcoded for now, adjust as needed
//   //     },
//   //     questionnaire: filteredQuestionnaire,
//   //     patientInfo: data.patientInfo,
//   //   });
//   // };
//   const handlePart2Complete = (data: {
//     questionnaire: (AnswerPair | NestedAnswer)[][][];
//     patientInfo: PatientInfo[];
//   }) => {
//     setPatientData(data);
//     const filteredQuestionnaire = data.questionnaire.map((patientAnswers) =>
//       patientAnswers.filter(
//         (subArray) => subArray[0].question !== "Patient Information"
//       )
//     );
//     console.log("Final Data:", {
//       setup: {
//         patientCount: answers[0].answer[0],
//         "What brought you here today?": answers[1].answer[0],
//         name: "Hepatitis A Vaccine Form",
//       },
//       questionnaire: filteredQuestionnaire,
//       patientInfo: data.patientInfo,
//     });
//   };
//   const currentQuestion = questions[currentQuestionIndex];

//   return (
//     <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-8 md:py-16">
//       <div className="w-full max-w-3xl mx-auto">
//         <div className="mb-8">
//           <div className="bg-gray-200 h-3 w-full rounded-full overflow-hidden">
//             <motion.div
//               className="h-3 bg-primary rounded-full"
//               initial={{ width: "0%" }}
//               animate={{ width: `${progress}%` }}
//               transition={{ duration: 0.5 }}
//             />
//           </div>
//         </div>
//         <motion.div
//           key={currentPhase + currentQuestionIndex}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white p-8 rounded-2xl shadow-2xl"
//         >
//           {currentPhase === "part1" && (
//             <>
//               {currentQuestion.type === "button-radio" && (
//                 <ButtonRadioQuestion
//                   question={currentQuestion.question}
//                   options={currentQuestion.options as string[]}
//                   onChange={(answer) =>
//                     handleAnswerChange(currentQuestionIndex, answer)
//                   }
//                   selectedAnswer={
//                     answers[currentQuestionIndex]?.answer as string[]
//                   }
//                 />
//               )}
//               {currentQuestion.type === "radio" && (
//                 <RadioQuestion
//                   question={currentQuestion.question}
//                   options={currentQuestion.options as string[]}
//                   onChange={(answer) =>
//                     handleAnswerChange(currentQuestionIndex, answer)
//                   }
//                   selectedAnswer={answers[currentQuestionIndex]?.answer}
//                 />
//               )}
//               <div className="mt-6 flex justify-between">
//                 <button
//                   onClick={handlePrevious}
//                   className="text-gray-600 hover:text-gray-800 disabled:text-gray-400"
//                   disabled={questionHistory.length <= 1}
//                 >
//                   <div className="flex">
//                     <ChevronsLeft className="mr-2" />
//                     Previous
//                   </div>
//                 </button>
//                 <button
//                   onClick={handleNext}
//                   className="text-gray-600 hover:text-primary"
//                 >
//                   <div className="flex">
//                     Next
//                     <ChevronsRight />
//                   </div>
//                 </button>
//               </div>
//             </>
//           )}
//           {currentPhase === "part2" && (
//             <PatientQuestions
//               patientCount={parseInt(patientCount)}
//               onComplete={handlePart2Complete}
//               formName={formName}
//             />
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Form;

//best version till now rendering also working
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { ChevronsLeft, ChevronsRight } from "lucide-react";
// import RadioQuestion from "../questions/RadioQuestion";
// import ButtonRadioQuestion from "../questions/ButtonRadioQuestion";
// import PatientQuestions from "../questions/PatientQuestions";

// interface PatientInfo {
//   firstName: string;
//   lastName: string;
//   dateOfBirth: string;
//   address: string;
//   pronouns?: string;
//   healthCardNumber?: string;
//   hasHealthCard?: string;
// }

// interface AnswerPair {
//   question: string;
//   answer: string[];
// }

// interface NestedAnswer {
//   question: string;
//   answer: string[];
// }

// const questionsPart1 = [
//   {
//     id: 1,
//     question: "How many people are booking an appointment?",
//     type: "button-radio",
//     options: ["1", "2", "3", "4", "5"],
//   },
//   {
//     id: 2,
//     question: "What brought you here today?",
//     type: "radio",
//     options: [
//       "I want to receive a vaccine or learn more about Hepatitis A vaccine/injection",
//       "I have a prescription for Hepatitis A vaccine/injection and require an appointment for administration",
//     ],
//   },
// ];

// const Form: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [history, setHistory] = useState<number[]>([0]);
//   const [answers, setAnswers] = useState<{
//     [patientIndex: number]: {
//       [questionId: number]: {
//         answer: string[];
//         nestedAnswers?: NestedAnswer[];
//       };
//     };
//   }>({});
//   const [patientInfoArray, setPatientInfoArray] = useState<PatientInfo[]>([]);
//   const [patientCount, setPatientCount] = useState<string>("1");
//   const [questionnaireArray, setQuestionnaireArray] = useState<
//     (AnswerPair | NestedAnswer)[][][]
//   >([]);
//   const formName = "Hepatitis A Vaccine Form";

//   const totalSteps = 2 + 14 * parseInt(patientCount);
//   const progress = ((currentStep + 1) / totalSteps) * 100;

//   const getCurrentState = (step: number) => {
//     if (step < 2) {
//       return { phase: "part1" as const, patientIndex: -1, questionIndex: step };
//     } else {
//       const patientIndex = Math.floor((step - 2) / 14);
//       const questionIndex = (step - 2) % 14;
//       return { phase: "part2" as const, patientIndex, questionIndex };
//     }
//   };

//   const { phase, patientIndex, questionIndex } = getCurrentState(currentStep);

//   const handleAnswerChange = (
//     questionId: number,
//     answer: string | string[],
//     patientIdx?: number
//   ) => {
//     if (patientIdx === undefined) {
//       setAnswers((prev) => ({
//         ...prev,
//         [-1]: {
//           ...(prev[-1] || {}),
//           [questionId]: { answer: Array.isArray(answer) ? answer : [answer] },
//         },
//       }));
//       if (questionId === 1) setPatientCount(answer as string);
//     } else {
//       setAnswers((prev) => ({
//         ...prev,
//         [patientIdx]: {
//           ...(prev[patientIdx] || {}),
//           [questionId]: { answer: Array.isArray(answer) ? answer : [answer] },
//         },
//       }));
//     }
//   };

//   const handlePatientAnswerChange = (
//     patientIdx: number,
//     questionId: number,
//     answer: string[],
//     nestedAnswers?: NestedAnswer[]
//   ) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [patientIdx]: {
//         ...(prev[patientIdx] || {}),
//         [questionId]: { answer, nestedAnswers },
//       },
//     }));
//   };

//   const handlePatientInfoChange = (
//     patientIdx: number,
//     info: Partial<PatientInfo>
//   ) => {
//     setPatientInfoArray((prev) => {
//       const updated = [...prev];
//       updated[patientIdx] = {
//         ...(updated[patientIdx] || {}),
//         ...info,
//       } as PatientInfo;
//       return updated;
//     });
//   };

//   const handleNext = (nextStep: number) => {
//     if (
//       phase === "part1" &&
//       !answers[-1]?.[questionsPart1[questionIndex].id]?.answer
//     ) {
//       alert("Your response is required.");
//       return;
//     }
//     setHistory((prev) => [...prev, nextStep]);
//     setCurrentStep(nextStep);
//     // console.log(
//     //   `Form.tsx - Next Step: ${nextStep}, Patient: ${patientIndex}, Question Index: ${questionIndex}`
//     // );
//   };

//   const handlePrevious = () => {
//     if (history.length <= 1) return;
//     setHistory((prev) => prev.slice(0, -1));
//     const prevStep = history[history.length - 2];
//     setCurrentStep(prevStep);
//     // console.log(`Form.tsx - Previous Step: ${prevStep}`);
//   };

//   const handlePatientComplete = (
//     patientIdx: number,
//     data: { questionnaire: (AnswerPair | NestedAnswer)[][] }
//   ) => {
//     setQuestionnaireArray((prev) => {
//       const updated = [...prev];
//       updated[patientIdx] = data.questionnaire;
//       return updated;
//     });

//     if (patientIdx < parseInt(patientCount) - 1) {
//       handleNext(2 + (patientIdx + 1) * 14); // Next patient’s Q3
//     } else {
//       const filteredQuestionnaire = questionnaireArray
//         .concat([data.questionnaire])
//         .map((patientAnswers) =>
//           patientAnswers.filter(
//             (subArray) => subArray[0].question !== "Patient Information"
//           )
//         );
//       console.log("Final Data:", {
//         setup: {
//           patientCount: answers[-1]?.[1]?.answer[0] || "1",
//           "What brought you here today?": answers[-1]?.[2]?.answer[0] || "",
//           name: formName,
//         },
//         questionnaire: filteredQuestionnaire,
//         patientInfo: patientInfoArray,
//       });
//     }
//   };

//   const currentQuestion =
//     phase === "part1" ? questionsPart1[questionIndex] : null;

//   return (
//     <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-8 md:py-16">
//       <div className="w-full max-w-3xl mx-auto">
//         <div className="mb-8">
//           <div className="bg-gray-200 h-3 w-full rounded-full overflow-hidden">
//             <motion.div
//               className="h-3 bg-primary rounded-full"
//               initial={{ width: "0%" }}
//               animate={{ width: `${progress}%` }}
//               transition={{ duration: 0.5 }}
//             />
//           </div>
//         </div>
//         <motion.div
//           key={patientIndex} // Stable key per patient, not per step
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white p-8 rounded-2xl shadow-2xl"
//         >
//           {phase === "part1" && currentQuestion && (
//             <>
//               {currentQuestion.type === "button-radio" && (
//                 <ButtonRadioQuestion
//                   question={currentQuestion.question}
//                   options={currentQuestion.options as string[]}
//                   onChange={(answer) =>
//                     handleAnswerChange(currentQuestion.id, answer)
//                   }
//                   selectedAnswer={
//                     answers[-1]?.[currentQuestion.id]?.answer as string[]
//                   }
//                 />
//               )}
//               {currentQuestion.type === "radio" && (
//                 <RadioQuestion
//                   question={currentQuestion.question}
//                   options={currentQuestion.options as string[]}
//                   onChange={(answer) =>
//                     handleAnswerChange(currentQuestion.id, answer)
//                   }
//                   selectedAnswer={answers[-1]?.[currentQuestion.id]?.answer}
//                 />
//               )}
//               <div className="mt-6 flex justify-between">
//                 <button
//                   onClick={handlePrevious}
//                   className="text-gray-600 hover:text-gray-800 disabled:text-gray-400"
//                   disabled={history.length <= 1}
//                 >
//                   <div className="flex">
//                     <ChevronsLeft className="mr-2" />
//                     Previous
//                   </div>
//                 </button>
//                 <button
//                   onClick={() => handleNext(currentStep + 1)}
//                   className="text-gray-600 hover:text-primary"
//                 >
//                   <div className="flex">
//                     Next
//                     <ChevronsRight />
//                   </div>
//                 </button>
//               </div>
//             </>
//           )}
//           {phase === "part2" && (
//             <PatientQuestions
//               patientIndex={patientIndex}
//               patientCount={parseInt(patientCount)}
//               formName={formName}
//               initialAnswers={answers[patientIndex] || {}}
//               initialPatientInfo={patientInfoArray[patientIndex]}
//               currentQuestionIndex={questionIndex} // Pass from Form.tsx
//               onNext={handleNext}
//               onPrevious={handlePrevious}
//               onAnswerChange={(questionId, answer, nestedAnswers) =>
//                 handlePatientAnswerChange(
//                   patientIndex,
//                   questionId,
//                   answer,
//                   nestedAnswers
//                 )
//               }
//               onPatientInfoChange={(info) =>
//                 handlePatientInfoChange(patientIndex, info)
//               }
//               onComplete={(data) => handlePatientComplete(patientIndex, data)}
//             />
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Form;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import RadioQuestion from "../questions/RadioQuestion";
import ButtonRadioQuestion from "../questions/ButtonRadioQuestion";
import PatientQuestions from "../questions/PatientQuestions";
import EmailPhoneInputQuestion from "../questions/vaccine/EmailPhoneInputQuestion"; // Adjust path as needed

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
    question: "How many people are booking an appointment?",
    type: "button-radio",
    options: ["1", "2", "3", "4", "5"],
  },
  {
    id: 2,
    question: "What brought you here today?",
    type: "radio",
    options: [
      "I want to receive a vaccine or learn more about Hepatitis A vaccine/injection",
      "I have a prescription for Hepatitis A vaccine/injection and require an appointment for administration",
    ],
  },
];

// Part 3 Questions (flexible, starting with Email/Phone)
const questionsPart3 = [
  { id: 17, question: "Contact Information", type: "email-phone-input" },
  // Add more questions here as needed, e.g.:
  // { id: 18, question: "Another question", type: "radio", options: ["Yes", "No"] },
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
  const formName = "Hepatitis A Vaccine Form";

  // Total steps: Part 1 (2) + Part 2 (14 per patient) + Part 3 (flexible, currently 1)
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
    if (phase === "part3") {
      const currentQuestion = questionsPart3[questionIndex];
      const currentAnswer = answers[-1]?.[currentQuestion.id];
      if (currentQuestion.type === "email-phone-input") {
        const emailValid = currentAnswer?.nestedAnswers
          ?.find((na) => na.question === "Email")
          ?.answer[0]?.includes("@");
        const phoneValid =
          currentAnswer?.nestedAnswers?.find(
            (na) => na.question === "Phone Number"
          )?.answer[0]?.length > 0;
        if (!emailValid && !phoneValid) {
          alert("Please provide at least an email or phone number.");
          return;
        }
      }
    }
    setHistory((prev) => [...prev, nextStep]);
    setCurrentStep(nextStep);
    console.log(
      `Form.tsx - Next Step: ${nextStep}, Phase: ${phase}, Patient: ${patientIndex}, Question Index: ${questionIndex}`
    );
  };

  const handlePrevious = () => {
    if (history.length <= 1) return;
    setHistory((prev) => prev.slice(0, -1));
    const prevStep = history[history.length - 2];
    setCurrentStep(prevStep);
    console.log(`Form.tsx - Previous Step: ${prevStep}`);
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
      handleNext(2 + (patientIdx + 1) * 14); // Next patient’s Q3
    } else {
      handleNext(2 + 14 * parseInt(patientCount)); // First question of Part 3
    }
  };

  const handleFormComplete = () => {
    const filteredQuestionnaire = questionnaireArray.map((patientAnswers) =>
      patientAnswers.filter(
        (subArray) => subArray[0].question !== "Patient Information"
      )
    );
    console.log("Final Data:", {
      setup: {
        patientCount: answers[-1]?.[1]?.answer[0] || "1",
        "What brought you here today?": answers[-1]?.[2]?.answer[0] || "",
        name: formName,
      },
      questionnaire: filteredQuestionnaire,
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
    });
  };

  const currentQuestionPart1 =
    phase === "part1" ? questionsPart1[questionIndex] : null;
  const currentQuestionPart3 =
    phase === "part3" ? questionsPart3[questionIndex] : null;

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-8 md:py-16">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="bg-gray-200 h-3 w-full rounded-full overflow-hidden">
            <motion.div
              className="h-3 bg-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        <motion.div
          key={phase === "part2" ? patientIndex : phase} // Stable key per phase or patient
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-2xl"
        >
          {phase === "part1" && currentQuestionPart1 && (
            <>
              {currentQuestionPart1.type === "button-radio" && (
                <ButtonRadioQuestion
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
                  selectedAnswer={
                    answers[-1]?.[currentQuestionPart3.id]?.answer || []
                  }
                  nestedAnswers={
                    answers[-1]?.[currentQuestionPart3.id]?.nestedAnswers
                  }
                />
              )}
              {/* Add more question types here as needed */}
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
                  onClick={() =>
                    questionIndex < questionsPart3.length - 1
                      ? handleNext(currentStep + 1)
                      : handleFormComplete()
                  }
                  className="text-gray-600 hover:text-primary"
                >
                  <div className="flex">
                    {questionIndex < questionsPart3.length - 1
                      ? "Next"
                      : "Submit"}
                    <ChevronsRight />
                  </div>
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Form;
