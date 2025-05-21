// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { ChevronsLeft, ChevronsRight } from "lucide-react";
// import RadioQuestion from "../questions/RadioQuestion";
// import CheckboxQuestion from "../questions/CheckboxQuestion";
// import ButtonRadioQuestion from "../questions/ButtonRadioQuestion";
// import ConditionalButtonRadioQuestion from "../questions/ConditionalButtonRadioQuestion";
// import ButtonRadioWithInputQuestion from "../questions/ButtonRadioWithInputQuestion";
// import ConditionalButtoRadioQuestionWithMultipleInputs from "../questions/ConditionalButtoRadioQuestionWithMultipleInputs";
// import PrimaryCareProviderQuestion from "../questions/PrimaryCareProviderQuestion";
// import TermsAndConditions from "../questions/TermsAndConditions";
// import PatientInformation from "../questions/PatientInformation";
// import { submitFormData } from "../../utils/api.js";
// import ProgressBar from "../ui/CustomProgressbar.js";
// import ConsentAcknowledgement from "../questions/ConsentAndAcknowledgement.js";

// // const questions = [
// //   {
// //     id: 1,
// //     question: "What sex were you assigned at birth?",
// //     type: "button-radio-input",
// //     options: ["Male", "Female"],
// //   },
// //   {
// //     id: 2,
// //     question: "Do you experience any of the following?",
// //     type: "checkbox",
// //     options: [
// //       "Irregular or infrequent menstrual periods",
// //       "Excessive hair growth on the face, chest, and/or back",
// //       "Diagnosed with Polycystic Ovary Syndrome (PCOS)",
// //       "Insulin resistance",
// //       "Infertility",
// //       "None of the above",
// //       "Not sure",
// //     ],
// //   },
// //   {
// //     id: 3,
// //     question: "Are you (or could you be) pregnant?",
// //     type: "button-radio",
// //     options: ["Yes", "No", "Not Sure"],
// //   },
// //   {
// //     id: 4,
// //     question: "Are you currently breastfeeding?",
// //     type: "button-radio",
// //     options: ["Yes", "No", "Not Sure"],
// //   },

// //   {
// //     id: 5,
// //     question: "Is this the first time you are experiencing acne?",
// //     type: "button-radio",
// //     options: ["Yes", "No", "Not Sure"],
// //   },
// //   {
// //     id: 6,
// //     question: "What areas are affected?",
// //     type: "checkbox",
// //     options: ["Face", "Neck", "Chest", "Upper back", "Under arm", "Other"],
// //   },
// //   {
// //     id: 7,
// //     question: "Describe your acne",
// //     type: "checkbox",
// //     options: [
// //       "Whiteheads",
// //       "Blackheads",
// //       "Small red bumps with or without a white top in the centre",
// //       "Larger red and inflamed bumps",
// //       "Nodules or cysts",
// //       "Not sure",
// //       "Other",
// //     ],
// //   },
// //   {
// //     id: 8,
// //     question:
// //       "Are you experiencing any of the following symptoms? Select all that apply.",
// //     type: "checkbox",
// //     options: [
// //       "Fever (temperature higher than 38°C)",
// //       "Joint pain or stiffness",
// //       "Spider-like veins on the face",
// //       "Generalized redness and flushing of the face",
// //       "Eye irritation",
// //       "None of the above",
// //       "Not sure",
// //     ],
// //   },
// //   {
// //     id: 9,
// //     question:
// //       "Are you experiencing any of the following as a result of your acne?",
// //     type: "checkbox",
// //     options: [
// //       "Anxiety",
// //       "Lowered self-esteem",
// //       "Depression",
// //       "Emotional distress",
// //       "None of the above",
// //       "Not sure",
// //     ],
// //   },
// //   {
// //     id: 10,
// //     question: "Do you have a family history of acne?",
// //     type: "button-radio",
// //     options: ["Yes", "No", "Not Sure"],
// //   },
// //   {
// //     id: 11,
// //     question: "Do you use any skincare or cosmetic products?",
// //     type: "button-radio",
// //     options: ["Yes", "No", "Not Sure"],
// //   },

// //   {
// //     id: 12,
// //     question: "Have you tried any treatments to help with your acne symptoms?",
// //     type: "button-radio",
// //     options: ["Yes", "No", "Not Sure"],
// //   },
// //   {
// //     id: 13,
// //     question: "Did any of the treatments make your symptoms feel better?",
// //     type: "conditional-button-radio",
// //     options: [
// //       {
// //         value: "Yes",
// //         showsInput: true,
// //         label:
// //           "Please indicate which treatments made your symptoms feel better",
// //       },
// //       { value: "No", showsInput: false },
// //       { value: "Not Sure", showsInput: false },
// //     ],
// //   },
// //   {
// //     id: 14,
// //     question: "Did any of the treatments make your symptoms feel worse?",
// //     type: "conditional-button-radio",
// //     options: [
// //       {
// //         value: "Yes",
// //         showsInput: true,
// //         label: "Please indicate which treatments made your symptoms feel worse",
// //       },
// //       { value: "No", showsInput: false },
// //       { value: "Not Sure", showsInput: false },
// //     ],
// //   },
// //   {
// //     id: 15,
// //     question: "Did any of the treatments have no effect on your symptoms?",
// //     type: "conditional-button-radio",
// //     options: [
// //       {
// //         value: "Yes",
// //         showsInput: true,
// //         label:
// //           "Please indicate which treatments had no effect on your symptoms",
// //       },
// //       { value: "No", showsInput: false },
// //       { value: "Not Sure", showsInput: false },
// //     ],
// //   },

// //   {
// //     id: 16,
// //     question: "Do you have any allergies to medications?",
// //     type: "conditional-button-radio-inputs",
// //     options: [
// //       {
// //         value: "Yes",
// //         showsInput: true,
// //         label:
// //           "Please specify medication allergies and please list one allergy per field and click 'Add more' if needed.",
// //       },
// //       { value: "No", showsInput: false },
// //       { value: "Not Sure", showsInput: false },
// //     ],
// //   },
// //   {
// //     id: 17,
// //     question: "Have you started any new medications in the past month?",
// //     type: "conditional-button-radio",
// //     options: [
// //       {
// //         value: "Yes",
// //         showsInput: true,
// //         label: "Please specify the medication you recently",
// //       },
// //       { value: "No", showsInput: false },
// //       { value: "Not Sure", showsInput: false },
// //     ],
// //   },

// //   {
// //     id: 18,
// //     question: "Who is your primary care provider?",
// //     type: "primary-care-provider",
// //   },
// //   {
// //     id: 19,
// //     question: "Is there anything else we should know?",
// //     type: "conditional-button-radio",
// //     options: [
// //       {
// //         value: "Yes",
// //         showsInput: true,
// //         label: "Please explain",
// //       },
// //       { value: "No", showsInput: false },
// //       { value: "Not Sure", showsInput: false },
// //     ],
// //   },
// //   {
// //     id: 20,
// //     question: "Terms and Conditions",
// //     type: "terms-condition",
// //   },
// //   {
// //     id: 21,
// //     question: "Patient details",
// //     type: "patient-info",
// //   },

// //   // Add more questions here
// // ];
// const questions = [
//   {
//     id: 1,
//     question: "Sex assigned at birth?",
//     type: "button-radio-input",
//     options: ["Male", "Female"],
//   },
//   {
//     id: 2,
//     question: "Are you experiencing any of these conditions?",
//     type: "checkbox",
//     options: [
//       "Irregular or rare menstrual cycles",
//       "Unusual hair growth on face, chest, or back",
//       "Diagnosed with Polycystic Ovary Syndrome (PCOS)",
//       "Insulin sensitivity issues",
//       "Difficulty conceiving",
//       "None of the above",
//       "Uncertain",
//     ],
//   },
//   {
//     id: 3,
//     question: "Is there a possibility you might be pregnant?",
//     type: "button-radio",
//     options: ["Yes", "No", "Uncertain"],
//   },
//   {
//     id: 4,
//     question: "Are you currently nursing a baby?",
//     type: "button-radio",
//     options: ["Yes", "No", "Uncertain"],
//   },
//   {
//     id: 5,
//     question: "Is this your first time dealing with acne?",
//     type: "button-radio",
//     options: ["Yes", "No", "Uncertain"],
//   },
//   {
//     id: 6,
//     question: "Which areas are impacted by your acne?",
//     type: "checkbox",
//     options: ["Face", "Neck", "Chest", "Upper back", "Underarms", "Other"],
//   },
//   {
//     id: 7,
//     question: "How would you characterize your acne?",
//     type: "checkbox",
//     options: [
//       "Whiteheads",
//       "Blackheads",
//       "Small red bumps, with or without a white center",
//       "Larger, inflamed red bumps",
//       "Nodules or cysts",
//       "Uncertain",
//       "Other",
//     ],
//   },
//   {
//     id: 8,
//     question: "Are you noticing any of these symptoms? Choose all that apply.",
//     type: "checkbox",
//     options: [
//       "Fever (temperature above 38°C)",
//       "Joint discomfort or stiffness",
//       "Spider-like veins on the face",
//       "Widespread facial redness or flushing",
//       "Eye irritation",
//       "None of the above",
//       "Uncertain",
//     ],
//   },
//   {
//     id: 9,
//     question: "Are you facing any of these effects due to your acne?",
//     type: "checkbox",
//     options: [
//       "Anxiety",
//       "Reduced self-confidence",
//       "Depression",
//       "Emotional discomfort",
//       "None of the above",
//       "Uncertain",
//     ],
//   },
//   {
//     id: 10,
//     question: "Is acne common in your family?",
//     type: "button-radio",
//     options: ["Yes", "No", "Uncertain"],
//   },
//   {
//     id: 11,
//     question: "Do you use skincare or cosmetic products?",
//     type: "button-radio",
//     options: ["Yes", "No", "Uncertain"],
//   },
//   {
//     id: 12,
//     question: "Have you attempted any treatments for your acne symptoms?",
//     type: "button-radio",
//     options: ["Yes", "No", "Uncertain"],
//   },
//   {
//     id: 13,
//     question: "Did any treatments improve your acne symptoms?",
//     type: "conditional-button-radio",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label: "Please list the treatments that improved your symptoms",
//       },
//       { value: "No", showsInput: false },
//       { value: "Uncertain", showsInput: false },
//     ],
//   },
//   {
//     id: 14,
//     question: "Did any treatments worsen your acne symptoms?",
//     type: "conditional-button-radio",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label: "Please specify which treatments made your symptoms worse",
//       },
//       { value: "No", showsInput: false },
//       { value: "Uncertain", showsInput: false },
//     ],
//   },
//   {
//     id: 15,
//     question: "Did any treatments have no impact on your acne symptoms?",
//     type: "conditional-button-radio",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label:
//           "Please indicate which treatments had no effect on your symptoms",
//       },
//       { value: "No", showsInput: false },
//       { value: "Uncertain", showsInput: false },
//     ],
//   },
//   {
//     id: 16,
//     question: "Are you allergic to any medications?",
//     type: "conditional-button-radio-inputs",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label:
//           "Please list your medication allergies, one per field, and use 'Add more' if necessary",
//       },
//       { value: "No", showsInput: false },
//       { value: "Uncertain", showsInput: false },
//     ],
//   },
//   {
//     id: 17,
//     question: "Have you begun any new medications in the last 30 days?",
//     type: "conditional-button-radio",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label: "Please list the medications you recently started",
//       },
//       { value: "No", showsInput: false },
//       { value: "Uncertain", showsInput: false },
//     ],
//   },
//   {
//     id: 18,
//     question: "Who is your primary healthcare provider?",
//     type: "primary-care-provider",
//   },
//   {
//     id: 19,
//     question: "Is there any additional information we should know?",
//     type: "conditional-button-radio",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label: "Please provide details",
//       },
//       { value: "No", showsInput: false },
//       { value: "Uncertain", showsInput: false },
//     ],
//   },
//   {
//     id: 20,
//     question: "Terms and Conditions",
//     type: "terms-condition",
//   },
//   {
//     id: 21,
//     question: "Patient Information",
//     type: "patient-info",
//   },
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
//   const formName = "Acne";
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState<{
//     [key: number]: {
//       answer: string[];
//       nestedAnswers?: { question: string; answer: string[] }[];
//     };
//   }>({});
//   const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);

//   const [questionHistory, setQuestionHistory] = useState<number[]>([0]);

//   const dependencyMap: { [key: number]: (answer: string) => number | null } = {
//     1: (answer: string) => {
//       if (answer[0] === "Male") {
//         return 5; // directly jump onto question no5
//       }
//       if (answer[0] === "Female") {
//         return 2; // directly jump onto question no5
//       }

//       return null; //if ans is other than male proceed to question no 3
//     },

//     3: () => 4, // Always proceed to question 5 after question 4
//     4: () => 5,
//     5: () => 6,
//     10: () => 11,
//     11: () => 12,
//     12: () => 13,

//     13: (answer: string) => {
//       if (answer[0] === "Yes") {
//         return null; // Stay on the same question to allow input
//       }
//       return 14; // Proceed to question 9
//     },
//     14: (answer: string) => {
//       if (answer[0] === "Yes") {
//         return null; // Stay on the same question to allow input
//       }
//       return 15; // Proceed to question 9
//     },
//     15: (answer: string) => {
//       if (answer[0] === "Yes") {
//         return null; // Stay on the same question to allow input
//       }
//       return 16; // Proceed to question 9
//     },

//     16: (answer: string) => {
//       if (answer[0] === "Yes") {
//         return null; // Stay on the same question to allow input
//       }
//       return 17; // Proceed to question 9
//     },
//     17: (answer: string) => {
//       if (answer[0] === "Yes") {
//         return null; // Stay on the same question to allow input
//       }
//       return 18; // Proceed to question 9
//     },
//     19: (answer: string) => {
//       if (answer[0] === "Yes") {
//         return null; // Stay on the same question to allow input
//       }
//       return 20; // Proceed to question 9
//     },
//   };

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
//   };

//   const handlePrevious = () => {
//     if (questionHistory.length > 1) {
//       setQuestionHistory((prevHistory) => prevHistory.slice(0, -1));
//       setCurrentQuestionIndex(questionHistory[questionHistory.length - 2]);
//     }
//   };
//   const handleFinalSubmit = async () => {
//     // if (!patientInfo) {
//     //   alert("Please complete patient information.");
//     //   return;
//     // }

//     const questionnaireData = getQuestionsAndAnswers();
//     const finalData = {
//       questionnaire: questionnaireData,
//       patientInfo,
//       formName,
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

//           <ProgressBar progress={progress} />
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
//           {currentQuestion.type === "checkbox" && (
//             <CheckboxQuestion
//               question={currentQuestion.question}
//               options={currentQuestion.options as string[]}
//               onChange={(answers) =>
//                 handleAnswerChange(currentQuestionIndex, answers)
//               }
//               selectedAnswers={
//                 answers[currentQuestionIndex]?.answer as string[]
//               }
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

//           {currentQuestion.type === "conditional-button-radio-inputs" && (
//             <ConditionalButtoRadioQuestionWithMultipleInputs
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

//           {currentQuestion.type === "primary-care-provider" && (
//             <PrimaryCareProviderQuestion
//               question={currentQuestion.question}
//               answer={(answers[currentQuestionIndex]?.answer as string[]) || []}
//               onChange={(answer) =>
//                 handleAnswerChange(currentQuestionIndex, answer)
//               }
//             />
//           )}
//           {currentQuestion.type === "terms-condition" && (
//             <TermsAndConditions
//               question={currentQuestion.question}
//               onChange={(answer, nestedAnswers) =>
//                 handleAnswerChange(currentQuestionIndex, answer, nestedAnswers)
//               }
//             />
//           )}
//           {currentQuestion.type === "patient-info" && (
//             <PatientInformation
//               onChange={(info) => setPatientInfo(info)}
//               onSubmit={handleFinalSubmit}
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

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { ChevronsLeft, ChevronsRight } from "lucide-react";
// import RadioQuestion from "../questions/RadioQuestion";
// import CheckboxQuestion from "../questions/CheckboxQuestion";
// import ButtonRadioQuestion from "../questions/ButtonRadioQuestion";
// import ConditionalButtonRadioQuestion from "../questions/ConditionalButtonRadioQuestion";
// import ButtonRadioWithInputQuestion from "../questions/ButtonRadioWithInputQuestion";
// import ConditionalButtoRadioQuestionWithMultipleInputs from "../questions/ConditionalButtoRadioQuestionWithMultipleInputs";

// import PatientInformation from "../questions/PatientInfoAcneTest.js";
// import { submitFormData } from "../../utils/api.js";
// import ProgressBar from "../ui/CustomProgressbar.js";
// import ConsentAcknowledgement from "../questions/ConsentAndAcknowledgement.js";

// const questions = [
//   {
//     id: 1,
//     question: "Patient Information",
//     type: "patient-info",
//   },

//   {
//     id: 2,
//     question: "Do you have any known allergies to medications?",
//     type: "conditional-button-radio-inputs",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label: "Please list your medication allergies (if any)",
//       },
//       { value: "No", showsInput: false },
//       { value: "Not Sure", showsInput: false },
//     ],
//   },
//   {
//     id: 3,
//     question:
//       "Are you currently taking any prescription, over-the-counter, or herbal medications/supplements?",
//     type: "conditional-button-radio",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label: "Please list your current medications",
//       },
//       { value: "No", showsInput: false },
//       { value: "Not Sure", showsInput: false },
//     ],
//   },
//   {
//     id: 4,
//     question: "What is your current pregnancy or breastfeeding status? ",
//     type: "button-radio",
//     options: ["Not applicable", "Pregnant ", "Breastfeeding ", "Unsure"],
//   },
//   {
//     id: 5,
//     question: "Do you have a family physician or primary care provider?",
//     type: "conditional-button-radio",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label: "Please provide the physician's name",
//       },
//       { value: "No", showsInput: false },
//       { value: "Uncertain", showsInput: false },
//     ],
//   },
//   {
//     id: 6,
//     question: "Have you ever been diagnosed with acne before?",
//     type: "button-radio",
//     options: ["Yes", "No", "Not Sure"],
//   },

//   {
//     id: 7,
//     question: "Which areas of your body are currently affected by acne?",
//     type: "checkbox",
//     options: ["Face", "Neck", "Chest", "Upper back", "Underarms", "Other"],
//   },
//   {
//     id: 8,
//     question: "How would you describe your acne? ",
//     type: "checkbox",
//     options: [
//       "Whiteheads",
//       "Blackheads",
//       "Small red bumps, with or without a white center",
//       "Larger, inflamed red bumps",
//       "Nodules or cysts",
//       "Uncertain",
//       "Other",
//     ],
//   },
//   {
//     id: 9,
//     question: "Do you currently experience any of the following? ",
//     type: "checkbox",
//     options: [
//       "Irregular or infrequent periods",
//       "Excessive hair growth on face, chest or back",
//       "Diagnosed with PCOS",
//       "Insulin resistance",
//       "Infertility ",
//       "None of the above",
//       "Not sure",
//     ],
//   },
//   {
//     id: 10,
//     question: "What is your current pregnancy or breastfeeding status?",
//     type: "button-radio",
//     options: ["Not applicable", "Pregnant ", "Breastfeeding ", "Unsure"],
//   },
//   {
//     id: 11,
//     question:
//       "Are you currently experiencing any of the following additional symptoms?",
//     type: "checkbox",
//     options: [
//       "Fever  above 38°C",
//       "Joint discomfort or stiffness",
//       "Red or spider-like veins on face",
//       "Persistent facial flushing",
//       "Eye irritation",
//       "None of these",
//       "Uncertain",
//     ],
//   },
//   {
//     id: 12,
//     question: "Has your acne impacted your emotional well-being in any way?",
//     type: "checkbox",
//     options: [
//       "Anxiety",
//       "Low self-esteem",
//       "Depression",
//       "Emotional distress",
//       "None of these",
//       "Not Sure",
//     ],
//   },
//   {
//     id: 13,
//     question: "Do any of your immediate family members have a history of acne?",
//     type: "button-radio",
//     options: ["Yes", "No", "Not Sure"],
//   },
//   {
//     id: 14,
//     question: "Do you currently use any skincare or cosmetic products?",
//     type: "button-radio",
//     options: ["Yes", "No"],
//   },

//   {
//     id: 15,
//     question:
//       "Have you tried any treatments for your acne symptoms in the past?",
//     type: "conditional-button-radio",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label: "Please list the treatments that improved your symptoms",
//       },
//       { value: "No", showsInput: false },
//     ],
//   },
//   {
//     id: 16,
//     question: "Do you have any allergies to medications?",
//     type: "conditional-button-radio",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label: "Please list your medication allergies.",
//       },
//       { value: "No", showsInput: false },
//       { value: "Uncertain", showsInput: false },
//     ],
//   },

//   {
//     id: 17,
//     question:
//       "Is there anything else you’d like us to know about your condition?",
//     type: "conditional-button-radio",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label: "Please provide details",
//       },
//       { value: "No", showsInput: false },
//       { value: "Uncertain", showsInput: false },
//     ],
//   },
//   {
//     id: 20,
//     question: "Consent",
//     type: "consent",
//   },
// ];
// interface PatientInfo {
//   firstName: string;
//   lastName: string;
//   dateOfBirth: string;
//   sexAssignedAtBirth: string;
//   address: string;
//   city: string;
//   email: string;
//   phoneNumber: string;
//   contactMethod: string;
//   newPatient: string;
//   healthCardNumber?: string;
// }

// const Form: React.FC = () => {
//   const formName = "Acne";
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState<{
//     [key: number]: {
//       answer: string[];
//       nestedAnswers?: { question: string; answer: string[] }[];
//     };
//   }>({});
//   const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);

//   const [questionHistory, setQuestionHistory] = useState<number[]>([0]);

//   const dependencyMap: { [key: number]: (answer: string) => number | null } = {
//     // 1: (answer: string) => {
//     //   if (answer[0] === "Male") {
//     //     return 5; // directly jump onto question no5
//     //   }
//     //   if (answer[0] === "Female") {
//     //     return 2; // directly jump onto question no5
//     //   }
//     //   return null; //if ans is other than male proceed to question no 3
//     // },
//     // 3: () => 4, // Always proceed to question 5 after question 4
//     // 4: () => 5,
//     // 5: () => 6,
//     // 10: () => 11,
//     // 11: () => 12,
//     // 12: () => 13,
//     // 13: (answer: string) => {
//     //   if (answer[0] === "Yes") {
//     //     return null; // Stay on the same question to allow input
//     //   }
//     //   return 14; // Proceed to question 9
//     // },
//     // 14: (answer: string) => {
//     //   if (answer[0] === "Yes") {
//     //     return null; // Stay on the same question to allow input
//     //   }
//     //   return 15; // Proceed to question 9
//     // },
//     // 15: (answer: string) => {
//     //   if (answer[0] === "Yes") {
//     //     return null; // Stay on the same question to allow input
//     //   }
//     //   return 16; // Proceed to question 9
//     // },
//     // 16: (answer: string) => {
//     //   if (answer[0] === "Yes") {
//     //     return null; // Stay on the same question to allow input
//     //   }
//     //   return 17; // Proceed to question 9
//     // },
//     // 17: (answer: string) => {
//     //   if (answer[0] === "Yes") {
//     //     return null; // Stay on the same question to allow input
//     //   }
//     //   return 18; // Proceed to question 9
//     // },
//     // 19: (answer: string) => {
//     //   if (answer[0] === "Yes") {
//     //     return null; // Stay on the same question to allow input
//     //   }
//     //   return 20; // Proceed to question 9
//     // },
//   };

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
//     console.log(patientInfo, "patient info");

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
//   };

//   const handlePrevious = () => {
//     if (questionHistory.length > 1) {
//       setQuestionHistory((prevHistory) => prevHistory.slice(0, -1));
//       setCurrentQuestionIndex(questionHistory[questionHistory.length - 2]);
//     }
//   };
//   const handleFinalSubmit = async () => {
//     // if (!patientInfo) {
//     //   alert("Please complete patient information.");
//     //   return;
//     // }

//     const questionnaireData = getQuestionsAndAnswers();
//     const finalData = {
//       questionnaire: questionnaireData,
//       patientInfo,
//       formName,
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
//           <ProgressBar progress={progress} />
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
//           {currentQuestion.type === "checkbox" && (
//             <CheckboxQuestion
//               question={currentQuestion.question}
//               options={currentQuestion.options as string[]}
//               onChange={(answers) =>
//                 handleAnswerChange(currentQuestionIndex, answers)
//               }
//               selectedAnswers={
//                 answers[currentQuestionIndex]?.answer as string[]
//               }
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

//           {currentQuestion.type === "conditional-button-radio-inputs" && (
//             <ConditionalButtoRadioQuestionWithMultipleInputs
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

//           {currentQuestion.type === "terms-condition" && (
//             <ConsentAcknowledgement onSubmit={handleFinalSubmit} />
//           )}
//           {currentQuestion.type === "patient-info" && (
//             <PatientInformation onChange={(info) => setPatientInfo(info)} />
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

// import React, { useState, useRef } from "react";
// import { motion } from "framer-motion";
// import { ChevronsLeft, ChevronsRight } from "lucide-react";
// import RadioQuestion from "../questions/RadioQuestion";
// import CheckboxQuestion from "../questions/CheckboxQuestion";
// import ButtonRadioQuestion from "../questions/ButtonRadioQuestion";
// import ConditionalButtonRadioQuestion from "../questions/ConditionalButtonRadioQuestion";
// import ButtonRadioWithInputQuestion from "../questions/ButtonRadioWithInputQuestion";
// import ConditionalButtoRadioQuestionWithMultipleInputs from "../questions/ConditionalButtoRadioQuestionWithMultipleInputs";
// import PatientInformation from "../questions/PatientInfoAcneTest";
// import { submitFormData } from "../../utils/api";
// import ProgressBar from "../ui/CustomProgressbar";
// import ConsentAcknowledgement from "../questions/ConsentAndAcknowledgement";

// const questions = [
//   {
//     id: 1,
//     question: "Patient Information",
//     type: "patient-info",
//   },
//   {
//     id: 2,
//     question: "Do you have any known allergies to medications?",
//     type: "conditional-button-radio-inputs",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label: "Please list your medication allergies (if any)",
//       },
//       { value: "No", showsInput: false },
//       { value: "Not Sure", showsInput: false },
//     ],
//   },
//   {
//     id: 3,
//     question:
//       "Are you currently taking any prescription, over-the-counter, or herbal medications/supplements?",
//     type: "conditional-button-radio",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label: "Please list your current medications",
//       },
//       { value: "No", showsInput: false },
//       { value: "Not Sure", showsInput: false },
//     ],
//   },
//   {
//     id: 4,
//     question: "What is your current pregnancy or breastfeeding status? ",
//     type: "button-radio",
//     options: ["Not applicable", "Pregnant ", "Breastfeeding ", "Unsure"],
//   },
//   {
//     id: 5,
//     question: "Do you have a family physician or primary care provider?",
//     type: "conditional-button-radio",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label: "Please provide the physician's name",
//       },
//       { value: "No", showsInput: false },
//       { value: "Uncertain", showsInput: false },
//     ],
//   },
//   {
//     id: 6,
//     question: "Have you ever been diagnosed with acne before?",
//     type: "button-radio",
//     options: ["Yes", "No", "Not Sure"],
//   },
//   {
//     id: 7,
//     question: "Which areas of your body are currently affected by acne?",
//     type: "checkbox",
//     options: ["Face", "Neck", "Chest", "Upper back", "Underarms", "Other"],
//   },
//   {
//     id: 8,
//     question: "How would you describe your acne? ",
//     type: "checkbox",
//     options: [
//       "Whiteheads",
//       "Blackheads",
//       "Small red bumps, with or without a white center",
//       "Larger, inflamed red bumps",
//       "Nodules or cysts",
//       "Uncertain",
//       "Other",
//     ],
//   },
//   {
//     id: 9,
//     question: "Do you currently experience any of the following? ",
//     type: "checkbox",
//     options: [
//       "Irregular or infrequent periods",
//       "Excessive hair growth on face, chest or back",
//       "Diagnosed with PCOS",
//       "Insulin resistance",
//       "Infertility ",
//       "None of the above",
//       "Not sure",
//     ],
//   },
//   {
//     id: 10,
//     question: "What is your current pregnancy or breastfeeding status?",
//     type: "button-radio",
//     options: ["Not applicable", "Pregnant ", "Breastfeeding ", "Unsure"],
//   },
//   {
//     id: 11,
//     question:
//       "Are you currently experiencing any of the following additional symptoms?",
//     type: "checkbox",
//     options: [
//       "Fever above 38°C",
//       "Joint discomfort or stiffness",
//       "Red or spider-like veins on face",
//       "Persistent facial flushing",
//       "Eye irritation",
//       "None of these",
//       "Uncertain",
//     ],
//   },
//   {
//     id: 12,
//     question: "Has your acne impacted your emotional well-being in any way?",
//     type: "checkbox",
//     options: [
//       "Anxiety",
//       "Low self-esteem",
//       "Depression",
//       "Emotional distress",
//       "None of these",
//       "Not Sure",
//     ],
//   },
//   {
//     id: 13,
//     question: "Do any of your immediate family members have a history of acne?",
//     type: "button-radio",
//     options: ["Yes", "No", "Not Sure"],
//   },
//   {
//     id: 14,
//     question: "Do you currently use any skincare or cosmetic products?",
//     type: "button-radio",
//     options: ["Yes", "No"],
//   },
//   {
//     id: 15,
//     question:
//       "Have you tried any treatments for your acne symptoms in the past?",
//     type: "conditional-button-radio",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label: "Please list the treatments that improved your symptoms",
//       },
//       { value: "No", showsInput: false },
//     ],
//   },
//   {
//     id: 16,
//     question: "Do you have any allergies to medications?",
//     type: "conditional-button-radio",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label: "Please list your medication allergies.",
//       },
//       { value: "No", showsInput: false },
//       { value: "Uncertain", showsInput: false },
//     ],
//   },
//   {
//     id: 17,
//     question:
//       "Is there anything else you’d like us to know about your condition?",
//     type: "conditional-button-radio",
//     options: [
//       {
//         value: "Yes",
//         showsInput: true,
//         label: "Please provide details",
//       },
//       { value: "No", showsInput: false },
//       { value: "Uncertain", showsInput: false },
//     ],
//   },
//   {
//     id: 20,
//     question: "Consent",
//     type: "consent",
//   },
// ];

// interface PatientInfo {
//   firstName: string;
//   lastName: string;
//   dateOfBirth: string;
//   sexAssignedAtBirth: string;
//   address: string;
//   city: string;
//   email: string;
//   phoneNumber: string;
//   contactMethod: string;
//   newPatient: string;
//   healthCardNumber?: string;
// }

// const Form: React.FC = () => {
//   const formName = "Acne";
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState<{
//     [key: number]: {
//       answer: string[];
//       nestedAnswers?: { question: string; answer: string[] }[];
//     };
//   }>({});
//   const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
//   const [questionHistory, setQuestionHistory] = useState<number[]>([0]);
//   const patientInfoRef = useRef<{ validateForm: () => boolean }>(null);

//   const dependencyMap: { [key: number]: (answer: string) => number | null } = {
//     // Add dependency logic if needed
//   };

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
//     if (currentQuestionIndex === 0) {
//       if (!patientInfoRef.current?.validateForm()) {
//         alert("Please complete all required fields in patient information.");
//         return;
//       }
//     } else {
//       const currentAnswer = answers[currentQuestionIndex];
//       if (!currentAnswer?.answer) {
//         alert("Your response is required.");
//         return;
//       }
//     }

//     if (currentQuestionIndex < questions.length - 1) {
//       setQuestionHistory((prevHistory) => [
//         ...prevHistory,
//         currentQuestionIndex + 1,
//       ]);
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (questionHistory.length > 1) {
//       setQuestionHistory((prevHistory) => prevHistory.slice(0, -1));
//       setCurrentQuestionIndex(questionHistory[questionHistory.length - 2]);
//     }
//   };

//   const handleFinalSubmit = async () => {
//     if (!patientInfoRef.current?.validateForm()) {
//       alert("Please complete all required fields in patient information.");
//       setCurrentQuestionIndex(0);
//       return;
//     }

//     const questionnaireData = getQuestionsAndAnswers();
//     const finalData = {
//       questionnaire: questionnaireData,
//       patientInfo,
//       formName,
//     };

//     console.log("Data to be sent to backend:", finalData);

//     try {
//       const result = await submitFormData(finalData);
//       alert(result.message);
//     } catch (error) {
//       alert("Failed to submit form. Please try again.");
//       console.error("Submission error:", error);
//     }
//   };

//   const currentQuestion = questions[currentQuestionIndex];
//   const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
//   const isLastQuestion = currentQuestionIndex === questions.length - 1;

//   return (
//     <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-8 md:py-16">
//       <div className="w-full max-w-3xl mx-auto">
//         <div className="mb-8">
//           <ProgressBar progress={progress} />
//         </div>
//         <motion.div
//           key={currentQuestionIndex}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white p-8 rounded上门 rounded-2xl shadow-2xl"
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
//           {currentQuestion.type === "checkbox" && (
//             <CheckboxQuestion
//               question={currentQuestion.question}
//               options={currentQuestion.options as string[]}
//               onChange={(answers) =>
//                 handleAnswerChange(currentQuestionIndex, answers)
//               }
//               selectedAnswers={
//                 answers[currentQuestionIndex]?.answer as string[]
//               }
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
//           {currentQuestion.type === "conditional-button-radio-inputs" && (
//             <ConditionalButtoRadioQuestionWithMultipleInputs
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
//           {currentQuestion.type === "consent" && (
//             <ConsentAcknowledgement onSubmit={handleFinalSubmit} />
//           )}
//           {currentQuestion.type === "patient-info" && (
//             <PatientInformation
//               ref={patientInfoRef}
//               onChange={(info) => setPatientInfo(info)}
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
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import RadioQuestion from "../questions/RadioQuestion";
import CheckboxQuestion from "../questions/CheckboxQuestion";
import ButtonRadioQuestion from "../questions/ButtonRadioQuestion";
import ConditionalButtonRadioQuestion from "../questions/ConditionalButtonRadioQuestion";
import ButtonRadioWithInputQuestion from "../questions/ButtonRadioWithInputQuestion";
import ConditionalButtoRadioQuestionWithMultipleInputs from "../questions/ConditionalButtoRadioQuestionWithMultipleInputs";
import PatientInformation from "../questions/PatientInfoAcneTest";
import { submitFormData } from "../../utils/api";
import ProgressBar from "../ui/CustomProgressbar";
import ConsentAcknowledgement from "../questions/ConsentAndAcknowledgement";

const questions = [
  {
    id: 1,
    question: "Patient Information",
    type: "patient-info",
  },
  {
    id: 2,
    question: "Do you have any known allergies to medications?",
    type: "conditional-button-radio-inputs",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please list your medication allergies (if any)",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 3,
    question:
      "Are you currently taking any prescription, over-the-counter, or herbal medications/supplements?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please list your current medications",
      },
      { value: "No", showsInput: false },
      { value: "Not Sure", showsInput: false },
    ],
  },
  {
    id: 4,
    question: "What is your current pregnancy or breastfeeding status? ",
    type: "button-radio",
    options: ["Not applicable", "Pregnant ", "Breastfeeding ", "Unsure"],
  },
  {
    id: 5,
    question: "Do you have a family physician or primary care provider?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please provide the physician's name",
      },
      { value: "No", showsInput: false },
      { value: "Uncertain", showsInput: false },
    ],
  },
  {
    id: 6,
    question: "Have you ever been diagnosed with acne before?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 7,
    question: "Which areas of your body are currently affected by acne?",
    type: "checkbox",
    options: ["Face", "Neck", "Chest", "Upper back", "Underarms", "Other"],
  },
  {
    id: 8,
    question: "How would you describe your acne? ",
    type: "checkbox",
    options: [
      "Whiteheads",
      "Blackheads",
      "Small red bumps, with or without a white center",
      "Larger, inflamed red bumps",
      "Nodules or cysts",
      "Uncertain",
      "Other",
    ],
  },
  {
    id: 9,
    question: "Do you currently experience any of the following? ",
    type: "checkbox",
    options: [
      "Irregular or infrequent periods",
      "Excessive hair growth on face, chest or back",
      "Diagnosed with PCOS",
      "Insulin resistance",
      "Infertility ",
      "None of the above",
      "Not sure",
    ],
  },
  {
    id: 10,
    question: "What is your current pregnancy or breastfeeding status?",
    type: "button-radio",
    options: ["Not applicable", "Pregnant ", "Breastfeeding ", "Unsure"],
  },
  {
    id: 11,
    question:
      "Are you currently experiencing any of the following additional symptoms?",
    type: "checkbox",
    options: [
      "Fever above 38°C",
      "Joint discomfort or stiffness",
      "Red or spider-like veins on face",
      "Persistent facial flushing",
      "Eye irritation",
      "None of the above",
      "Uncertain",
    ],
  },
  {
    id: 12,
    question: "Has your acne impacted your emotional well-being in any way?",
    type: "checkbox",
    options: [
      "Anxiety",
      "Low self-esteem",
      "Depression",
      "Emotional distress",
      "None of the above",
      "Not Sure",
    ],
  },
  {
    id: 13,
    question: "Do any of your immediate family members have a history of acne?",
    type: "button-radio",
    options: ["Yes", "No", "Not Sure"],
  },
  {
    id: 14,
    question: "Do you currently use any skincare or cosmetic products?",
    type: "button-radio",
    options: ["Yes", "No"],
  },
  {
    id: 15,
    question:
      "Have you tried any treatments for your acne symptoms in the past?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please list the treatments that improved your symptoms",
      },
      { value: "No", showsInput: false },
    ],
  },
  {
    id: 16,
    question: "Do you have any allergies to medications?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please list your medication allergies.",
      },
      { value: "No", showsInput: false },
      { value: "Uncertain", showsInput: false },
    ],
  },
  {
    id: 17,
    question:
      "Is there anything else you’d like us to know about your condition?",
    type: "conditional-button-radio",
    options: [
      {
        value: "Yes",
        showsInput: true,
        label: "Please provide details",
      },
      { value: "No", showsInput: false },
      { value: "Uncertain", showsInput: false },
    ],
  },
  {
    id: 18,
    question: "Consent",
    type: "consent",
  },
];

interface PatientInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sexAssignedAtBirth: string;
  address: string;
  city: string;
  email: string;
  phoneNumber: string;
  contactMethod: string;
  newPatient: string;
  healthCardNumber?: string;
}

const Form: React.FC = () => {
  const formName = "Acne";
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{
    [key: number]: {
      answer: string[];
      nestedAnswers?: { question: string; answer: string[] }[];
    };
  }>({});
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
  const [questionHistory, setQuestionHistory] = useState<number[]>([0]);
  const patientInfoRef = useRef<{ validateForm: () => boolean }>(null);

  const dependencyMap: { [key: number]: (answer: string) => number | null } = {
    2: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 3; // Proceed to question 9
    },
    3: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 4; // Proceed to question 9
    },

    4: () => 5,
    5: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 6; // Proceed to question 9
    },
    6: () => 7,
    10: () => 11,
    13: () => 14,
    14: () => 15,

    15: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 16; // Proceed to question 9
    },
    16: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 17; // Proceed to question 9
    },
    17: (answer: string) => {
      if (answer[0] === "Yes") {
        return null; // Stay on the same question to allow input
      }
      return 18; // Proceed to question 9
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
    if (currentQuestionIndex === 0) {
      if (!patientInfoRef.current?.validateForm()) {
        alert("Please complete all required fields in patient information.");
        return;
      }
    } else {
      const currentAnswer = answers[currentQuestionIndex];
      if (!currentAnswer?.answer) {
        alert("Your response is required.");
        return;
      }
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
    const questionnaireData = getQuestionsAndAnswers();
    const finalData = {
      questionnaire: questionnaireData,
      patientInfo,
      formName,
    };

    console.log("Data to be sent to backend:", finalData);

    try {
      const result = await submitFormData(finalData);
      alert(result.message);
    } catch (error) {
      alert("Failed to submit form. Please try again.");
      console.error("Submission error:", error);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-8 md:py-16">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-8">
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
          {currentQuestion.type === "consent" && (
            <ConsentAcknowledgement onSubmit={handleFinalSubmit} />
          )}
          {currentQuestion.type === "patient-info" && (
            <PatientInformation
              ref={patientInfoRef}
              onChange={(info) => setPatientInfo(info)}
              patientInfo={patientInfo} // Pass patientInfo to persist data
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
