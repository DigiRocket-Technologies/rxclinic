// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import PhoneInput from "react-phone-number-input";
// import { parsePhoneNumberFromString } from "libphonenumber-js";
// import "react-phone-number-input/style.css";
// import { PopupButton, useCalendlyEventListener } from "react-calendly";

// interface EmailPhoneInputQuestionProps {
//   question: string;
//   onChange: (
//     answer: string[],
//     nestedAnswers?: { question: string; answer: string[] }[]
//   ) => void;
//   selectedAnswer: string[];
//   nestedAnswers?: { question: string; answer: string[] }[];
//   numberOfPatients: string; // New prop for number of patients
// }

// const EmailPhoneInputQuestion: React.FC<EmailPhoneInputQuestionProps> = ({
//   question,
//   onChange,
//   selectedAnswer = [],
//   nestedAnswers = [],
//   numberOfPatients,
// }) => {
//   //Calendly stuff
//   // Array of Calendly links for 1 to 5 patients (index 0 = 1 patient, index 1 = 2 patients, etc.)
//   const calendlyLinks = [
//     "https://calendly.com/gagandeepsethi-7895/schedule-meeting",
//     "https://calendly.com/gagandeepsethi-7895/schedule-meeting-2-patients",
//     "https://calendly.com/gagandeepsethi-7895/schedule-meeting-3-patients",
//     "https://calendly.com/gagandeepsethi-7895/schedule-meeting-4-patients",
//     "https://calendly.com/gagandeepsethi-7895/schedule-meeting-5-patients",
//   ];
//   const fetchEventDetails = async (eventUri) => {
//     try {
//       const response = await fetch(eventUri, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzQ0MjkwNjg3LCJqdGkiOiI3ZjRjZmYzYy1mZjA4LTRjY2UtOTMwMi1mMDRiZDMxZTI2ZDgiLCJ1c2VyX3V1aWQiOiIxN2E5NTEwMy05Njg4LTRmOGEtOTVjMy04YzQxNTY4OGM1YTcifQ.1n8QMM0VjHOD_P0aovtca4BtI9S3-HRD-SnDsNt_Hvp2ojm-7neE_Q1jgJUht7m2a8758eKT7QE69VH7lyYkAA`,
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await response.json();
//       console.log(data, "data");
//     } catch (error) {
//       console.error("Error fetching event details:", error);
//     }
//   };

//   useCalendlyEventListener({
//     onProfilePageViewed: () => console.log("onProfilePageViewed"),
//     onDateAndTimeSelected: (e) => console.log(e.data),
//     onEventTypeViewed: () => console.log("onEventTypeViewed"),
//     onEventScheduled: (e) => {
//       console.log("Event Scheduled:", e.data.payload);
//       const eventUri = e.data.payload.event.uri;
//       console.log(eventUri, "uri");
//       fetchEventDetails(eventUri);
//     },
//   });

//   const [email, setEmail] = useState<string>("");
//   const [phoneNumber, setPhoneNumber] = useState<string>("");
//   const [countryCode, setCountryCode] = useState<string>("+1"); // Default to Canada
//   const [emailValidationStatus, setEmailValidationStatus] = useState<
//     "invalid" | "valid" | "none"
//   >("none");
//   const [phoneValidationStatus, setPhoneValidationStatus] = useState<
//     "invalid" | "valid" | "none"
//   >("none");
//   const [preferredMethod, setPreferredMethod] = useState<string>("Email");

//   // Load persisted data from nestedAnswers
//   useEffect(() => {
//     if (nestedAnswers.length > 0) {
//       const emailAnswer = nestedAnswers.find((na) => na.question === "Email");
//       const phoneAnswer = nestedAnswers.find(
//         (na) => na.question === "Phone Number"
//       );
//       const preferredMethodAnswer = nestedAnswers.find(
//         (na) => na.question === "Preferred Contact Method"
//       );

//       // Load email
//       if (emailAnswer?.answer[0]) {
//         setEmail(emailAnswer.answer[0]);
//         validateEmail(emailAnswer.answer[0]);
//       }

//       // Load phone number
//       if (phoneAnswer?.answer[0]) {
//         const [savedCode, savedNumber] = phoneAnswer.answer[0].split("|");
//         setCountryCode(savedCode);
//         setPhoneNumber(savedNumber);
//         validatePhoneNumber(savedNumber, savedCode);
//       }

//       // Load preferred method
//       if (preferredMethodAnswer?.answer[0]) {
//         setPreferredMethod(preferredMethodAnswer.answer[0]);
//       }
//     }
//   }, [nestedAnswers]);

//   // Email validation
//   const validateEmail = (email: string) => {
//     if (!email) {
//       setEmailValidationStatus("none");
//       return false;
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (emailRegex.test(email)) {
//       setEmailValidationStatus("valid");
//       return true;
//     } else {
//       setEmailValidationStatus("invalid");
//       return false;
//     }
//   };

//   // Phone number validation
//   const validatePhoneNumber = (number: string, code: string) => {
//     if (!number) {
//       setPhoneValidationStatus("none");
//       return false;
//     }

//     const fullNumber = `${code}${number}`;
//     const phone = parsePhoneNumberFromString(fullNumber);

//     if (phone?.isValid()) {
//       setPhoneValidationStatus("valid");
//       return true;
//     } else {
//       setPhoneValidationStatus("invalid");
//       return false;
//     }
//   };

//   // Update nested answers
//   const updateNestedAnswers = (
//     newEmail: string,
//     newPhoneData: string,
//     newPreferredMethod: string
//   ) => {
//     const nestedAnswers = [
//       { question: "Email", answer: [newEmail] },
//       { question: "Phone Number", answer: [newPhoneData] },
//       { question: "Preferred Contact Method", answer: [newPreferredMethod] },
//     ];
//     onChange(["Contact Information"], nestedAnswers);
//   };

//   // Handle email change
//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newEmail = e.target.value;
//     setEmail(newEmail);
//     validateEmail(newEmail);
//     const phoneData = phoneNumber ? `${countryCode}|${phoneNumber}` : "";
//     updateNestedAnswers(newEmail, phoneData, preferredMethod);
//   };

//   // Handle phone number change
//   const handlePhoneChange = (value: string | undefined) => {
//     if (!value) {
//       setPhoneNumber("");
//       setPhoneValidationStatus("none");
//       updateNestedAnswers(email, "", preferredMethod);
//       return;
//     }

//     const phone = parsePhoneNumberFromString(value);
//     if (phone) {
//       const code = `+${phone.countryCallingCode}`;
//       const number = phone.nationalNumber;
//       setCountryCode(code);
//       setPhoneNumber(number);
//       validatePhoneNumber(number, code);
//       const phoneData = `${code}|${number}`;
//       updateNestedAnswers(email, phoneData, preferredMethod);
//     }
//   };

//   // Handle preferred method change
//   const handlePreferredMethodChange = (method: string) => {
//     setPreferredMethod(method);
//     const phoneData = phoneNumber ? `${countryCode}|${phoneNumber}` : "";
//     updateNestedAnswers(email, phoneData, method);
//   };

//   // Select Calendly link based on numberOfPatients (1 to 5)
//   const selectedCalendlyLink =
//     parseInt(numberOfPatients) >= 1 && parseInt(numberOfPatients) <= 5
//       ? calendlyLinks[parseInt(numberOfPatients) - 1]
//       : calendlyLinks[0]; // Default to 1 patient if out of range

//   return (
//     <div className="mb-6">
//       <h2 className="text-2xl font-semibold mb-4 text-center">{question}</h2>
//       <div className="mb-4">
//         <label className="block text-gray-700 mb-2">Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={handleEmailChange}
//           className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
//             emailValidationStatus === "invalid"
//               ? "border-red-500 focus:ring-red-500"
//               : emailValidationStatus === "valid"
//               ? "border-green-500 focus:ring-green-500"
//               : "border-gray-300 focus:ring-blue-500"
//           }`}
//           placeholder="Enter email address"
//         />
//         {emailValidationStatus === "invalid" && (
//           <p className="text-red-500 text-sm mt-1">Invalid email address</p>
//         )}
//         {emailValidationStatus === "valid" && (
//           <p className="text-green-500 text-sm mt-1">Valid email address</p>
//         )}
//       </div>
//       <div className="mb-4">
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <PhoneInput
//             international
//             countryCallingCodeEditable={false}
//             defaultCountry="CA"
//             value={phoneNumber ? `${countryCode}${phoneNumber}` : ""}
//             onChange={handlePhoneChange}
//             className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
//               phoneValidationStatus === "invalid"
//                 ? "border-red-500 focus:ring-red-500"
//                 : phoneValidationStatus === "valid"
//                 ? "border-green-500 focus:ring-green-500"
//                 : "border-gray-300 focus:ring-blue-500"
//             }`}
//             placeholder="Enter phone number"
//           />
//           {phoneValidationStatus === "invalid" && (
//             <p className="text-red-500 text-sm mt-1">Invalid phone number</p>
//           )}
//           {phoneValidationStatus === "valid" && (
//             <p className="text-green-500 text-sm mt-1">Valid phone number</p>
//           )}
//         </motion.div>
//       </div>
//       <div className="flex items-center space-x-4">
//         <label className="text-gray-700">
//           What is your preferred contact method for notifications?
//         </label>
//         <div className="flex space-x-4">
//           <label className="flex items-center">
//             <input
//               type="radio"
//               name="preferredMethod"
//               value="Email"
//               checked={preferredMethod === "Email"}
//               onChange={() => handlePreferredMethodChange("Email")}
//               className="mr-2"
//             />
//             Email
//           </label>
//           <label className="flex items-center">
//             <input
//               type="radio"
//               name="preferredMethod"
//               value="Text"
//               checked={preferredMethod === "Text"}
//               onChange={() => handlePreferredMethodChange("Text")}
//               className="mr-2"
//             />
//             Text
//           </label>
//         </div>
//       </div>
//       <div className="justify-center flex my-4">
//         <PopupButton
//           className="text-white bg-primary py-3 px-5 rounded-lg"
//           url={selectedCalendlyLink}
//           rootElement={document.getElementById("root")}
//           text="Schedule meet"
//         />
//       </div>
//     </div>
//   );
// };

// export default EmailPhoneInputQuestion;
// {
//   "resource": {
//       "calendar_event": {
//           "external_id": "o6vov3v38m7b6g7u07lk0j5f48",
//           "kind": "google"
//       },
//       "created_at": "2025-05-02T10:57:45.718195Z",
//       "end_time": "2025-05-03T04:00:00.000000Z",
//       "event_guests": [],
//       "event_memberships": [
//           {
//               "buffered_end_time": "2025-05-03T04:00:00.000000Z",
//               "buffered_start_time": "2025-05-03T03:30:00.000000Z",
//               "user": "https://api.calendly.com/users/17a95103-9688-4f8a-95c3-8c415688c5a7",
//               "user_email": "gagandeepsethi.7895@gmail.com",
//               "user_name": "Gagandeep Sethi"
//           }
//       ],
//       "event_type": "https://api.calendly.com/event_types/2ac17fa7-47ce-4880-886a-b6d15b206ca0",
//       "invitees_counter": {
//           "active": 1,
//           "limit": 1,
//           "total": 1
//       },
//       "location": {
//           "additional_info": "",
//           "location": "sharda nagar saharanpur",
//           "type": "physical"
//       },
//       "meeting_notes_html": null,
//       "meeting_notes_plain": null,
//       "name": "Schedule meeting",
//       "start_time": "2025-05-03T03:30:00.000000Z",
//       "status": "active",
//       "updated_at": "2025-05-02T10:57:46.993986Z",
//       "uri": "https://api.calendly.com/scheduled_events/c690719c-5679-4ea6-956e-a92518b2bbc8"
//   }
// }

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import PhoneInput from "react-phone-number-input";
// import { parsePhoneNumberFromString } from "libphonenumber-js";
// import "react-phone-number-input/style.css";
// import { PopupButton, useCalendlyEventListener } from "react-calendly";

// interface EmailPhoneInputQuestionProps {
//   question: string;
//   onSubmit: () => void;
//   setMeeting: (data: { date: string; timing: string }) => void;
//   onChange: (
//     answer: string[],
//     nestedAnswers?: { question: string; answer: string[] }[]
//   ) => void;
//   selectedAnswer: string[];
//   nestedAnswers?: { question: string; answer: string[] }[];
//   numberOfPatients: string;
// }

// const EmailPhoneInputQuestion: React.FC<EmailPhoneInputQuestionProps> = ({
//   question,
//   onChange,
//   selectedAnswer = [],
//   nestedAnswers = [],
//   numberOfPatients,
//   onSubmit,
//   setMeeting,
// }) => {
//   // Array of Calendly links for 1 to 5 patients (index 0 = 1 patient, index 1 = 2 patients, etc.)
//   const calendlyLinks = [
//     "https://calendly.com/gagandeepsethi-7895/schedule-meeting",
//     "https://calendly.com/gagandeepsethi-7895/schedule-meeting-2-patients",
//     "https://calendly.com/gagandeepsethi-7895/schedule-meeting-3-patients",
//     "https://calendly.com/gagandeepsethi-7895/schedule-meeting-4-patients",
//     "https://calendly.com/gagandeepsethi-7895/schedule-meeting-5-patients",
//   ];

//   const [email, setEmail] = useState<string>("");
//   const [phoneNumber, setPhoneNumber] = useState<string>("");
//   const [countryCode, setCountryCode] = useState<string>("+1"); // Default to Canada
//   const [emailValidationStatus, setEmailValidationStatus] = useState<
//     "invalid" | "valid" | "none"
//   >("none");
//   const [phoneValidationStatus, setPhoneValidationStatus] = useState<
//     "invalid" | "valid" | "none"
//   >("none");
//   const [preferredMethod, setPreferredMethod] = useState<string>("Email");
//   const [meetingDetails, setMeetingDetails] = useState<{
//     date: string;
//     timing: string;
//   }>({ date: "", timing: "" });

//   // Load persisted data from nestedAnswers
//   useEffect(() => {
//     if (nestedAnswers.length > 0) {
//       const emailAnswer = nestedAnswers.find((na) => na.question === "Email");
//       const phoneAnswer = nestedAnswers.find(
//         (na) => na.question === "Phone Number"
//       );
//       const preferredMethodAnswer = nestedAnswers.find(
//         (na) => na.question === "Preferred Contact Method"
//       );
//       const meetingDetailsAnswer = nestedAnswers.find(
//         (na) => na.question === "Meeting Details"
//       );

//       // Load email
//       if (emailAnswer?.answer[0]) {
//         setEmail(emailAnswer.answer[0]);
//         validateEmail(emailAnswer.answer[0]);
//       }

//       // Load phone number
//       if (phoneAnswer?.answer[0]) {
//         const [savedCode, savedNumber] = phoneAnswer.answer[0].split("|");
//         setCountryCode(savedCode);
//         setPhoneNumber(savedNumber);
//         validatePhoneNumber(savedNumber, savedCode);
//       }

//       // Load preferred method
//       if (preferredMethodAnswer?.answer[0]) {
//         setPreferredMethod(preferredMethodAnswer.answer[0]);
//       }

//       // Load meeting details
//       if (meetingDetailsAnswer?.answer[0]) {
//         const [date, timing] = meetingDetailsAnswer.answer[0].split("|");
//         setMeetingDetails({ date, timing });
//       }
//     }
//   }, [nestedAnswers]);

//   // Email validation
//   const validateEmail = (email: string) => {
//     if (!email) {
//       setEmailValidationStatus("none");
//       return false;
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (emailRegex.test(email)) {
//       setEmailValidationStatus("valid");
//       return true;
//     } else {
//       setEmailValidationStatus("invalid");
//       return false;
//     }
//   };

//   // Phone number validation
//   const validatePhoneNumber = (number: string, code: string) => {
//     if (!number) {
//       setPhoneValidationStatus("none");
//       return false;
//     }

//     const fullNumber = `${code}${number}`;
//     const phone = parsePhoneNumberFromString(fullNumber);

//     if (phone?.isValid()) {
//       setPhoneValidationStatus("valid");
//       return true;
//     } else {
//       setPhoneValidationStatus("invalid");
//       return false;
//     }
//   };

//   // Update nested answers
//   const updateNestedAnswers = (
//     newEmail: string,
//     newPhoneData: string,
//     newPreferredMethod: string,
//     newMeetingDetails: { date: string; timing: string }
//   ) => {
//     const nestedAnswers = [
//       { question: "Email", answer: [newEmail] },
//       { question: "Phone Number", answer: [newPhoneData] },
//       { question: "Preferred Contact Method", answer: [newPreferredMethod] },
//       {
//         question: "Meeting Details",
//         answer: [`${newMeetingDetails.date}|${newMeetingDetails.timing}`],
//       },
//     ];
//     onChange(["Contact Information"], nestedAnswers);
//   };

//   // Handle email change
//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newEmail = e.target.value;
//     setEmail(newEmail);
//     validateEmail(newEmail);
//     const phoneData = phoneNumber ? `${countryCode}|${phoneNumber}` : "";
//     updateNestedAnswers(newEmail, phoneData, preferredMethod, meetingDetails);
//   };

//   // Handle phone number change
//   const handlePhoneChange = (value: string | undefined) => {
//     if (!value) {
//       setPhoneNumber("");
//       setPhoneValidationStatus("none");
//       updateNestedAnswers(email, "", preferredMethod, meetingDetails);
//       return;
//     }

//     const phone = parsePhoneNumberFromString(value);
//     if (phone) {
//       const code = `+${phone.countryCallingCode}`;
//       const number = phone.nationalNumber;
//       setCountryCode(code);
//       setPhoneNumber(number);
//       validatePhoneNumber(number, code);
//       const phoneData = `${code}|${number}`;
//       updateNestedAnswers(email, phoneData, preferredMethod, meetingDetails);
//     }
//   };

//   // Handle preferred method change
//   const handlePreferredMethodChange = (method: string) => {
//     setPreferredMethod(method);
//     const phoneData = phoneNumber ? `${countryCode}|${phoneNumber}` : "";
//     updateNestedAnswers(email, phoneData, method, meetingDetails);
//   };

//   // Fetch and process event details
//   const fetchEventDetails = async (eventUri: string) => {
//     try {
//       const response = await fetch(eventUri, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzQ0MjkwNjg3LCJqdGkiOiI3ZjRjZmYzYy1mZjA4LTRjY2UtOTMwMi1mMDRiZDMxZTI2ZDgiLCJ1c2VyX3V1aWQiOiIxN2E5NTEwMy05Njg4LTRmOGEtOTVjMy04YzQxNTY4OGM1YTcifQ.1n8QMM0VjHOD_P0aovtca4BtI9S3-HRD-SnDsNt_Hvp2ojm-7neE_Q1jgJUht7m2a8758eKT7QE69VH7lyYkAA`,
//           "Content-Type": "application/json",
//         },
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data = await response.json();
//       console.log(data, "data");

//       // Extract date and timing from event data
//       const startTime = data?.resource?.start_time; // e.g., "2025-05-03T03:30:00.000000Z"
//       const endTime = data?.resource?.end_time; // e.g., "2025-05-03T04:00:00.000000Z"
//       if (startTime && endTime) {
//         const startDateObj = new Date(startTime);
//         const endDateObj = new Date(endTime);
//         const date = startDateObj.toISOString().split("T")[0]; // e.g., "2025-05-03"
//         const startFormatted = startDateObj.toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//         }); // e.g., "03:30 AM"
//         const endFormatted = endDateObj.toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//         }); // e.g., "04:00 AM"
//         // Combine start and end times with IST (placeholder timezone)
//         const timing = `${startFormatted} - ${endFormatted} IST`;

//         const newMeetingDetails = { date, timing };
//         setMeeting(newMeetingDetails);
//         setMeetingDetails(newMeetingDetails);

//         console.log(newMeetingDetails, "new");

//         // Update nested answers with meeting details
//         const phoneData = phoneNumber ? `${countryCode}|${phoneNumber}` : "";
//         updateNestedAnswers(
//           email,
//           phoneData,
//           preferredMethod,
//           newMeetingDetails
//         );
//         onSubmit();
//       }
//     } catch (error) {
//       console.error("Error fetching event details:", error);
//     }
//   };

//   // Calendly event listener
//   useCalendlyEventListener({
//     onProfilePageViewed: () => console.log("onProfilePageViewed"),
//     onDateAndTimeSelected: (e) => console.log(e.data),
//     onEventTypeViewed: () => console.log("onEventTypeViewed"),
//     onEventScheduled: (e) => {
//       console.log("Event Scheduled:", e.data.payload);
//       const eventUri = e.data.payload.event.uri;
//       console.log(eventUri, "uri");
//       fetchEventDetails(eventUri);
//     },
//   });

//   // Select Calendly link based on numberOfPatients (1 to 5)
//   const selectedCalendlyLink =
//     parseInt(numberOfPatients) >= 1 && parseInt(numberOfPatients) <= 5
//       ? calendlyLinks[parseInt(numberOfPatients) - 1]
//       : calendlyLinks[0]; // Default to 1 patient if out of range

//   return (
//     <div className="mb-6">
//       <h2 className="text-2xl font-semibold mb-4 text-center">{question}</h2>
//       <div className="mb-4">
//         <label className="block text-gray-700 mb-2">Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={handleEmailChange}
//           className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
//             emailValidationStatus === "invalid"
//               ? "border-red-500 focus:ring-red-500"
//               : emailValidationStatus === "valid"
//               ? "border-green-500 focus:ring-green-500"
//               : "border-gray-300 focus:ring-blue-500"
//           }`}
//           placeholder="Enter email address"
//         />
//         {emailValidationStatus === "invalid" && (
//           <p className="text-red-500 text-sm mt-1">Invalid email address</p>
//         )}
//         {emailValidationStatus === "valid" && (
//           <p className="text-green-500 text-sm mt-1">Valid email address</p>
//         )}
//       </div>
//       <div className="mb-4">
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <PhoneInput
//             international
//             countryCallingCodeEditable={false}
//             defaultCountry="CA"
//             value={phoneNumber ? `${countryCode}${phoneNumber}` : ""}
//             onChange={handlePhoneChange}
//             className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
//               phoneValidationStatus === "invalid"
//                 ? "border-red-500 focus:ring-red-500"
//                 : phoneValidationStatus === "valid"
//                 ? "border-green-500 focus:ring-green-500"
//                 : "border-gray-300 focus:ring-blue-500"
//             }`}
//             placeholder="Enter phone number"
//           />
//           {phoneValidationStatus === "invalid" && (
//             <p className="text-red-500 text-sm mt-1">Invalid phone number</p>
//           )}
//           {phoneValidationStatus === "valid" && (
//             <p className="text-green-500 text-sm mt-1">Valid phone number</p>
//           )}
//         </motion.div>
//       </div>
//       <div className="flex items-center space-x-4">
//         <label className="text-gray-700">
//           What is your preferred contact method for notifications?
//         </label>
//         <div className="flex space-x-4">
//           <label className="flex items-center">
//             <input
//               type="radio"
//               name="preferredMethod"
//               value="Email"
//               checked={preferredMethod === "Email"}
//               onChange={() => handlePreferredMethodChange("Email")}
//               className="mr-2"
//             />
//             Email
//           </label>
//           <label className="flex items-center">
//             <input
//               type="radio"
//               name="preferredMethod"
//               value="Text"
//               checked={preferredMethod === "Text"}
//               onChange={() => handlePreferredMethodChange("Text")}
//               className="mr-2"
//             />
//             Text
//           </label>
//         </div>
//       </div>
//       <div className="justify-center flex my-4">
//         <PopupButton
//           className="text-white bg-primary py-3 px-5 rounded-lg"
//           url={selectedCalendlyLink}
//           rootElement={document.getElementById("root")}
//           text="Schedule meet"
//         />
//       </div>
//     </div>
//   );
// };

// export default EmailPhoneInputQuestion;

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import PhoneInput from "react-phone-number-input";
// import { parsePhoneNumberFromString } from "libphonenumber-js";
// import "react-phone-number-input/style.css";
// import { PopupButton, useCalendlyEventListener } from "react-calendly";

// interface EmailPhoneInputQuestionProps {
//   question: string;
//   onSubmit: () => void;
//   //setMeeting: (data: { date: string; timing: string }) => void;
//   onChange: (
//     answer: string[],
//     nestedAnswers?: { question: string; answer: string[] }[]
//   ) => void;
//   selectedAnswer: string[];
//   nestedAnswers?: { question: string; answer: string[] }[];
//   numberOfPatients: string;
// }

// const EmailPhoneInputQuestion: React.FC<EmailPhoneInputQuestionProps> = ({
//   question,
//   onChange,
//   selectedAnswer = [],
//   nestedAnswers = [],
//   numberOfPatients,
//   onSubmit,
//   //setMeeting,
// }) => {
//   // Array of Calendly links for 1 to 5 patients (index 0 = 1 patient, index 1 = 2 patients, etc.)
//   const calendlyLinks = [
//     "https://calendly.com/gagandeepsethi-7895/schedule-meeting",
//     "https://calendly.com/gagandeepsethi-7895/schedule-meeting-2-patients",
//     "https://calendly.com/gagandeepsethi-7895/schedule-meeting-3-patients",
//     "https://calendly.com/gagandeepsethi-7895/schedule-meeting-4-patients",
//     "https://calendly.com/gagandeepsethi-7895/schedule-meeting-5-patients",
//   ];

//   const [email, setEmail] = useState<string>("");
//   const [phoneNumber, setPhoneNumber] = useState<string>("");
//   const [countryCode, setCountryCode] = useState<string>("+1"); // Default to Canada
//   const [emailValidationStatus, setEmailValidationStatus] = useState<
//     "invalid" | "valid" | "none"
//   >("none");
//   const [phoneValidationStatus, setPhoneValidationStatus] = useState<
//     "invalid" | "valid" | "none"
//   >("none");
//   const [preferredMethod, setPreferredMethod] = useState<string>("Email");
//   const [meetingDetails, setMeetingDetails] = useState<{
//     date: string;
//     timing: string;
//   }>({ date: "", timing: "" });

//   // Load persisted data from nestedAnswers
//   useEffect(() => {
//     if (nestedAnswers.length > 0) {
//       const emailAnswer = nestedAnswers.find((na) => na.question === "Email");
//       const phoneAnswer = nestedAnswers.find(
//         (na) => na.question === "Phone Number"
//       );
//       const preferredMethodAnswer = nestedAnswers.find(
//         (na) => na.question === "Preferred Contact Method"
//       );
//       const meetingDetailsAnswer = nestedAnswers.find(
//         (na) => na.question === "Meeting Details"
//       );

//       // Load email
//       if (emailAnswer?.answer[0]) {
//         setEmail(emailAnswer.answer[0]);
//         validateEmail(emailAnswer.answer[0]);
//       }

//       // Load phone number
//       if (phoneAnswer?.answer[0]) {
//         const [savedCode, savedNumber] = phoneAnswer.answer[0].split("|");
//         setCountryCode(savedCode);
//         setPhoneNumber(savedNumber);
//         validatePhoneNumber(savedNumber, savedCode);
//       }

//       // Load preferred method
//       if (preferredMethodAnswer?.answer[0]) {
//         setPreferredMethod(preferredMethodAnswer.answer[0]);
//       }

//       // Load meeting details
//       // if (meetingDetailsAnswer?.answer[0]) {
//       //   const [date, timing] = meetingDetailsAnswer.answer[0].split("|");
//       //   setMeetingDetails({ date, timing });
//       // }
//     }
//   }, [nestedAnswers]);

//   // Email validation
//   const validateEmail = (email: string) => {
//     if (!email) {
//       setEmailValidationStatus("none");
//       return false;
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (emailRegex.test(email)) {
//       setEmailValidationStatus("valid");
//       return true;
//     } else {
//       setEmailValidationStatus("invalid");
//       return false;
//     }
//   };

//   // Phone number validation
//   const validatePhoneNumber = (number: string, code: string) => {
//     if (!number) {
//       setPhoneValidationStatus("none");
//       return false;
//     }

//     const fullNumber = `${code}${number}`;
//     const phone = parsePhoneNumberFromString(fullNumber);

//     if (phone?.isValid()) {
//       setPhoneValidationStatus("valid");
//       return true;
//     } else {
//       setPhoneValidationStatus("invalid");
//       return false;
//     }
//   };

//   // Update nested answers
//   const updateNestedAnswers = (
//     newEmail: string,
//     newPhoneData: string,
//     newPreferredMethod: string,
//     newMeetingDetails: { date: string; timing: string }
//   ) => {
//     const nestedAnswers = [
//       { question: "Email", answer: [newEmail] },
//       { question: "Phone Number", answer: [newPhoneData] },
//       { question: "Preferred Contact Method", answer: [newPreferredMethod] },
//       {
//         question: "Meeting Details",
//         answer: [`${newMeetingDetails.date}|${newMeetingDetails.timing}`],
//       },
//     ];
//     onChange(["Contact Information"], nestedAnswers);
//   };

//   // Handle email change
//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newEmail = e.target.value;
//     setEmail(newEmail);
//     validateEmail(newEmail);
//     const phoneData = phoneNumber ? `${countryCode}|${phoneNumber}` : "";
//     updateNestedAnswers(newEmail, phoneData, preferredMethod, meetingDetails);
//   };

//   // Handle phone number change
//   const handlePhoneChange = (value: string | undefined) => {
//     if (!value) {
//       setPhoneNumber("");
//       setPhoneValidationStatus("none");
//       updateNestedAnswers(email, "", preferredMethod, meetingDetails);
//       return;
//     }

//     const phone = parsePhoneNumberFromString(value);
//     if (phone) {
//       const code = `+${phone.countryCallingCode}`;
//       const number = phone.nationalNumber;
//       setCountryCode(code);
//       setPhoneNumber(number);
//       validatePhoneNumber(number, code);
//       const phoneData = `${code}|${number}`;
//       updateNestedAnswers(email, phoneData, preferredMethod, meetingDetails);
//     }
//   };

//   // Handle preferred method change
//   const handlePreferredMethodChange = (method: string) => {
//     setPreferredMethod(method);
//     const phoneData = phoneNumber ? `${countryCode}|${phoneNumber}` : "";
//     updateNestedAnswers(email, phoneData, method, meetingDetails);
//   };

//   //Fetch and process event details
//   // const fetchEventDetails = async (eventUri: string) => {
//   //   try {
//   //     const response = await fetch(eventUri, {
//   //       method: "GET",
//   //       headers: {
//   //         Authorization: `Bearer ${import.meta.env.VITE_CALENDLY_API_KEY}`,
//   //         "Content-Type": "application/json",
//   //       },
//   //     });
//   //     if (!response.ok) {
//   //       throw new Error(`HTTP error! Status: ${response.status}`);
//   //     }
//   //     const data = await response.json();
//   //     console.log(data, "data");

//   //     // Extract date and timing from event data
//   //     const startTime = data?.resource?.start_time; // e.g., "2025-05-03T03:30:00.000000Z"
//   //     const endTime = data?.resource?.end_time; // e.g., "2025-05-03T04:00:00.000000Z"
//   //     if (startTime && endTime) {
//   //       const startDateObj = new Date(startTime);
//   //       const endDateObj = new Date(endTime);
//   //       const date = startDateObj.toISOString().split("T")[0]; // e.g., "2025-05-03"
//   //       const startFormatted = startDateObj.toLocaleTimeString("en-US", {
//   //         hour: "2-digit",
//   //         minute: "2-digit",
//   //         hour12: true,
//   //       }); // e.g., "03:30 AM"
//   //       const endFormatted = endDateObj.toLocaleTimeString("en-US", {
//   //         hour: "2-digit",
//   //         minute: "2-digit",
//   //         hour12: true,
//   //       }); // e.g., "04:00 AM"
//   //       // Combine start and end times with IST (placeholder timezone)
//   //       const timing = `${startFormatted} - ${endFormatted} IST`;

//   //       const newMeetingDetails = { date, timing };
//   //       //setMeeting(newMeetingDetails);
//   //       setMeetingDetails(newMeetingDetails);

//   //       console.log(newMeetingDetails, "new");

//   //       // Update nested answers with meeting details
//   //       const phoneData = phoneNumber ? `${countryCode}|${phoneNumber}` : "";
//   //       updateNestedAnswers(
//   //         email,
//   //         phoneData,
//   //         preferredMethod,
//   //         newMeetingDetails
//   //       );
//   //       setTimeout(() => {
//   //         onSubmit();
//   //       }, 0);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching event details:", error);
//   //   }
//   // };
//   // In EmailPhoneInputQuestion.tsx

//   const fetchAndUpdateEventDetails = async (
//     eventUri: string
//   ): Promise<{ date: string; timing: string } | null> => {
//     try {
//       const response = await fetch(eventUri, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${import.meta.env.VITE_CALENDLY_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("Calendly event data:", data);

//       const startTime = data?.resource?.start_time;
//       const endTime = data?.resource?.end_time;

//       if (startTime && endTime) {
//         const startDateObj = new Date(startTime);
//         const endDateObj = new Date(endTime);
//         const date = startDateObj.toISOString().split("T")[0];
//         const startFormatted = startDateObj.toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//         });
//         const endFormatted = endDateObj.toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//         });
//         const timing = `${startFormatted} - ${endFormatted} IST`;

//         const newMeetingDetails = { date, timing };

//         // Update state immediately
//         setMeetingDetails(newMeetingDetails);

//         // Update nested answers
//         const phoneData = phoneNumber ? `${countryCode}|${phoneNumber}` : "";
//         updateNestedAnswers(
//           email,
//           phoneData,
//           preferredMethod,
//           newMeetingDetails
//         );

//         return newMeetingDetails;
//       }
//       return null;
//     } catch (error) {
//       console.error("Error fetching event details:", error);
//       return null;
//     }
//   };

//   // Modify the event listener to handle the submission
//   useCalendlyEventListener({
//     onEventScheduled: async (e) => {
//       console.log("Event Scheduled:", e.data.payload);
//       const eventUri = e.data.payload.event.uri;

//       // Wait for meeting details to be fetched and updated
//       const meetingDetails = await fetchAndUpdateEventDetails(eventUri);

//       if (meetingDetails) {
//         // Call onSubmit after state is definitely updated
//         setTimeout(() => {
//           onSubmit();
//         }, 100); // Small delay to ensure state propagation
//       }
//     },
//   });

//   // Select Calendly link based on numberOfPatients (1 to 5)
//   const selectedCalendlyLink =
//     parseInt(numberOfPatients) >= 1 && parseInt(numberOfPatients) <= 5
//       ? calendlyLinks[parseInt(numberOfPatients) - 1]
//       : calendlyLinks[0]; // Default to 1 patient if out of range

//   return (
//     <div className="mb-6">
//       <h2 className="text-2xl font-semibold mb-4 text-center">{question}</h2>
//       <div className="mb-4">
//         <label className="block text-gray-700 mb-2">Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={handleEmailChange}
//           className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
//             emailValidationStatus === "invalid"
//               ? "border-red-500 focus:ring-red-500"
//               : emailValidationStatus === "valid"
//               ? "border-green-500 focus:ring-green-500"
//               : "border-gray-300 focus:ring-blue-500"
//           }`}
//           placeholder="Enter email address"
//         />
//         {emailValidationStatus === "invalid" && (
//           <p className="text-red-500 text-sm mt-1">Invalid email address</p>
//         )}
//         {emailValidationStatus === "valid" && (
//           <p className="text-green-500 text-sm mt-1">Valid email address</p>
//         )}
//       </div>
//       <div className="mb-4">
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <PhoneInput
//             international
//             countryCallingCodeEditable={false}
//             defaultCountry="CA"
//             value={phoneNumber ? `${countryCode}${phoneNumber}` : ""}
//             onChange={handlePhoneChange}
//             className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
//               phoneValidationStatus === "invalid"
//                 ? "border-red-500 focus:ring-red-500"
//                 : phoneValidationStatus === "valid"
//                 ? "border-green-500 focus:ring-green-500"
//                 : "border-Gray-300 focus:ring-blue-500"
//             }`}
//             placeholder="Enter phone number"
//           />
//           {phoneValidationStatus === "invalid" && (
//             <p className="text-red-500 text-sm mt-1">Invalid phone number</p>
//           )}
//           {phoneValidationStatus === "valid" && (
//             <p className="text-green-500 text-sm mt-1">Valid phone number</p>
//           )}
//         </motion.div>
//       </div>
//       <div className="flex items-center space-x-4">
//         <label className="text-gray-700">
//           What is your preferred contact method for notifications?
//         </label>
//         <div className="flex space-x-4">
//           <label className="flex items-center">
//             <input
//               type="radio"
//               name="preferredMethod"
//               value="Email"
//               checked={preferredMethod === "Email"}
//               onChange={() => handlePreferredMethodChange("Email")}
//               className="mr-2"
//             />
//             Email
//           </label>
//           <label className="flex items-center">
//             <input
//               type="radio"
//               name="preferredMethod"
//               value="Text"
//               checked={preferredMethod === "Text"}
//               onChange={() => handlePreferredMethodChange("Text")}
//               className="mr-2"
//             />
//             Text
//           </label>
//         </div>
//       </div>
//       {emailValidationStatus === "valid" &&
//         phoneValidationStatus === "valid" && (
//           <div className="justify-center flex my-4">
//             <PopupButton
//               className="text-white bg-primary py-3 px-5 rounded-lg"
//               url={selectedCalendlyLink}
//               rootElement={document.getElementById("root")}
//               text="Schedule meet"
//             />
//           </div>
//         )}
//     </div>
//   );
// };

// export default EmailPhoneInputQuestion;
// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import PhoneInput from "react-phone-number-input";
// import { parsePhoneNumberFromString } from "libphonenumber-js";
// import "react-phone-number-input/style.css";
// import { PopupButton, useCalendlyEventListener } from "react-calendly";

// interface EmailPhoneInputQuestionProps {
//   question: string;
//   onSubmit: () => void;
//   onChange: (
//     answer: string[],
//     nestedAnswers?: { question: string; answer: string[] }[]
//   ) => void;
//   selectedAnswer: string[];
//   nestedAnswers?: { question: string; answer: string[] }[];
//   numberOfPatients: string;
// }

// const EmailPhoneInputQuestion: React.FC<EmailPhoneInputQuestionProps> = ({
//   question,
//   onChange,
//   selectedAnswer = [],
//   nestedAnswers = [],
//   numberOfPatients,
//   onSubmit,
// }) => {
//   const calendlyLinks = [
//     "https://calendly.com/gagandeepsethi-7895/schedule-meeting",
//     "https://calendly.com/gagandeepsethi-7895/schedule-meeting",
//     "https://calendly.com/gagandeepsethi-7895/schedule-meeting-3-patients",
//     "https://calendly.com/gagandeepsethi-7895/schedule-meeting-4-patients",
//     "https://calendly.com/gagandeepsethi-7895/schedule-meeting-5-patients",
//   ];

//   const [email, setEmail] = useState<string>("");
//   const [phoneNumber, setPhoneNumber] = useState<string>("");
//   const [countryCode, setCountryCode] = useState<string>("+1");
//   const [emailValidationStatus, setEmailValidationStatus] = useState<
//     "invalid" | "valid" | "none"
//   >("none");
//   const [phoneValidationStatus, setPhoneValidationStatus] = useState<
//     "invalid" | "valid" | "none"
//   >("none");
//   const [preferredMethod, setPreferredMethod] = useState<string>("Email");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const submissionInProgress = useRef(false);

//   // Load persisted data
//   useEffect(() => {
//     if (nestedAnswers.length > 0) {
//       const emailAnswer = nestedAnswers.find((na) => na.question === "Email");
//       const phoneAnswer = nestedAnswers.find(
//         (na) => na.question === "Phone Number"
//       );
//       const preferredMethodAnswer = nestedAnswers.find(
//         (na) => na.question === "Preferred Contact Method"
//       );

//       if (emailAnswer?.answer[0]) {
//         setEmail(emailAnswer.answer[0]);
//         validateEmail(emailAnswer.answer[0]);
//       }

//       if (phoneAnswer?.answer[0]) {
//         const [savedCode, savedNumber] = phoneAnswer.answer[0].split("|");
//         setCountryCode(savedCode);
//         setPhoneNumber(savedNumber);
//         validatePhoneNumber(savedNumber, savedCode);
//       }

//       if (preferredMethodAnswer?.answer[0]) {
//         setPreferredMethod(preferredMethodAnswer.answer[0]);
//       }
//     }
//   }, [nestedAnswers]);

//   const validateEmail = (email: string) => {
//     if (!email) {
//       setEmailValidationStatus("none");
//       return false;
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (emailRegex.test(email)) {
//       setEmailValidationStatus("valid");
//       return true;
//     } else {
//       setEmailValidationStatus("invalid");
//       return false;
//     }
//   };

//   const validatePhoneNumber = (number: string, code: string) => {
//     if (!number) {
//       setPhoneValidationStatus("none");
//       return false;
//     }

//     const fullNumber = `${code}${number}`;
//     const phone = parsePhoneNumberFromString(fullNumber);

//     if (phone?.isValid()) {
//       setPhoneValidationStatus("valid");
//       return true;
//     } else {
//       setPhoneValidationStatus("invalid");
//       return false;
//     }
//   };

//   const updateNestedAnswers = (
//     newEmail: string,
//     newPhoneData: string,
//     newPreferredMethod: string
//   ) => {
//     const nestedAnswers = [
//       { question: "Email", answer: [newEmail] },
//       { question: "Phone Number", answer: [newPhoneData] },
//       { question: "Preferred Contact Method", answer: [newPreferredMethod] },
//       {
//         question: "Meeting Details",
//         answer: [""], // Initialize empty, will be filled after Calendly
//       },
//     ];
//     onChange(["Contact Information"], nestedAnswers);
//   };

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newEmail = e.target.value;
//     setEmail(newEmail);
//     validateEmail(newEmail);
//     const phoneData = phoneNumber ? `${countryCode}|${phoneNumber}` : "";
//     updateNestedAnswers(newEmail, phoneData, preferredMethod);
//   };

//   const handlePhoneChange = (value: string | undefined) => {
//     if (!value) {
//       setPhoneNumber("");
//       setPhoneValidationStatus("none");
//       updateNestedAnswers(email, "", preferredMethod);
//       return;
//     }

//     const phone = parsePhoneNumberFromString(value);
//     if (phone) {
//       const code = `+${phone.countryCallingCode}`;
//       const number = phone.nationalNumber;
//       setCountryCode(code);
//       setPhoneNumber(number);
//       validatePhoneNumber(number, code);
//       const phoneData = `${code}|${number}`;
//       updateNestedAnswers(email, phoneData, preferredMethod);
//     }
//   };

//   const handlePreferredMethodChange = (method: string) => {
//     setPreferredMethod(method);
//     const phoneData = phoneNumber ? `${countryCode}|${phoneNumber}` : "";
//     updateNestedAnswers(email, phoneData, method);
//   };

//   const fetchEventDetails = async (eventUri: string) => {
//     try {
//       const response = await fetch(eventUri, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${import.meta.env.VITE_CALENDLY_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok)
//         throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       console.log("Calendly event data:", data);

//       const startTime = data?.resource?.start_time;
//       const endTime = data?.resource?.end_time;

//       if (!startTime || !endTime) throw new Error("Missing start/end time");

//       const startDateObj = new Date(startTime);
//       const endDateObj = new Date(endTime);
//       const date = startDateObj.toISOString().split("T")[0];
//       const startFormatted = startDateObj.toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       });
//       const endFormatted = endDateObj.toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       });
//       const timing = `${startFormatted} - ${endFormatted} IST`;

//       return { date, timing };
//     } catch (error) {
//       console.error("Error fetching event details:", error);
//       throw error;
//     }
//   };

//   useCalendlyEventListener({
//     onEventScheduled: async (e) => {
//       if (submissionInProgress.current) return;
//       submissionInProgress.current = true;
//       setIsSubmitting(true);

//       try {
//         console.log("Event Scheduled:", e.data.payload);
//         const eventUri = e.data.payload.event.uri;

//         // 1. First fetch the meeting details
//         const meetingDetails = await fetchEventDetails(eventUri);

//         // 2. Update the nested answers with meeting details
//         const phoneData = phoneNumber ? `${countryCode}|${phoneNumber}` : "";
//         const nestedAnswers = [
//           { question: "Email", answer: [email] },
//           { question: "Phone Number", answer: [phoneData] },
//           { question: "Preferred Contact Method", answer: [preferredMethod] },
//           {
//             question: "Meeting Details",
//             answer: [`${meetingDetails.date}|${meetingDetails.timing}`],
//           },
//         ];

//         // 3. Update the parent component's state
//         onChange(["Contact Information"], nestedAnswers);

//         // 4. Wait a brief moment for state to propagate
//         await new Promise((resolve) => setTimeout(resolve, 100));

//         // 5. Finally trigger the form submission
//         onSubmit();
//       } catch (error) {
//         console.error("Error in calendly event processing:", error);
//       } finally {
//         submissionInProgress.current = false;
//         setIsSubmitting(false);
//       }
//     },
//   });

//   const selectedCalendlyLink =
//     parseInt(numberOfPatients) >= 1 && parseInt(numberOfPatients) <= 5
//       ? calendlyLinks[parseInt(numberOfPatients) - 1]
//       : calendlyLinks[0];

//   return (
//     <div className="mb-6">
//       <h2 className="text-2xl font-semibold mb-4 text-center">{question}</h2>
//       <div className="mb-4">
//         <label className="block text-gray-700 mb-2">Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={handleEmailChange}
//           className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
//             emailValidationStatus === "invalid"
//               ? "border-red-500 focus:ring-red-500"
//               : emailValidationStatus === "valid"
//               ? "border-green-500 focus:ring-green-500"
//               : "border-gray-300 focus:ring-blue-500"
//           }`}
//           placeholder="Enter email address"
//         />
//         {emailValidationStatus === "invalid" && (
//           <p className="text-red-500 text-sm mt-1">Invalid email address</p>
//         )}
//         {emailValidationStatus === "valid" && (
//           <p className="text-green-500 text-sm mt-1">Valid email address</p>
//         )}
//       </div>
//       <div className="mb-4">
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <PhoneInput
//             international
//             countryCallingCodeEditable={false}
//             defaultCountry="CA"
//             value={phoneNumber ? `${countryCode}${phoneNumber}` : ""}
//             onChange={handlePhoneChange}
//             className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
//               phoneValidationStatus === "invalid"
//                 ? "border-red-500 focus:ring-red-500"
//                 : phoneValidationStatus === "valid"
//                 ? "border-green-500 focus:ring-green-500"
//                 : "border-Gray-300 focus:ring-blue-500"
//             }`}
//             placeholder="Enter phone number"
//           />
//           {phoneValidationStatus === "invalid" && (
//             <p className="text-red-500 text-sm mt-1">Invalid phone number</p>
//           )}
//           {phoneValidationStatus === "valid" && (
//             <p className="text-green-500 text-sm mt-1">Valid phone number</p>
//           )}
//         </motion.div>
//       </div>
//       <div className="flex items-center space-x-4">
//         <label className="text-gray-700">
//           What is your preferred contact method for notifications?
//         </label>
//         <div className="flex space-x-4">
//           <label className="flex items-center">
//             <input
//               type="radio"
//               name="preferredMethod"
//               value="Email"
//               checked={preferredMethod === "Email"}
//               onChange={() => handlePreferredMethodChange("Email")}
//               className="mr-2"
//             />
//             Email
//           </label>
//           <label className="flex items-center">
//             <input
//               type="radio"
//               name="preferredMethod"
//               value="Text"
//               checked={preferredMethod === "Text"}
//               onChange={() => handlePreferredMethodChange("Text")}
//               className="mr-2"
//             />
//             Text
//           </label>
//         </div>
//       </div>
//       {emailValidationStatus === "valid" &&
//         phoneValidationStatus === "valid" && (
//           <div className="justify-center flex my-4">
//             <PopupButton
//               className="text-white bg-primary py-3 px-5 rounded-lg"
//               url={selectedCalendlyLink}
//               rootElement={document.getElementById("root")}
//               text={isSubmitting ? "Processing..." : "Schedule meet"}
//             />
//           </div>
//         )}
//     </div>
//   );
// };

// export default EmailPhoneInputQuestion;

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "react-phone-number-input/style.css";
import { PopupButton, useCalendlyEventListener } from "react-calendly";

interface EmailPhoneInputQuestionProps {
  question: string;
  onSubmit: (meetingDetails: { date: string; time: string }) => void;
  onChange: (
    answer: string[],
    nestedAnswers?: { question: string; answer: string[] }[]
  ) => void;
  selectedAnswer: string[];
  nestedAnswers?: { question: string; answer: string[] }[];
  numberOfPatients: string;
}

const EmailPhoneInputQuestion: React.FC<EmailPhoneInputQuestionProps> = ({
  question,
  onChange,
  selectedAnswer = [],
  nestedAnswers = [],
  numberOfPatients,
  onSubmit,
}) => {
  const calendlyLinks = [
    "https://calendly.com/gagandeepsethi-7895/schedule-meeting",
    "https://calendly.com/gagandeepsethi-7895/schedule-meeting",
    "https://calendly.com/gagandeepsethi-7895/schedule-meeting-3-patients",
    "https://calendly.com/gagandeepsethi-7895/schedule-meeting-4-patients",
    "https://calendly.com/gagandeepsethi-7895/schedule-meeting-5-patients",
  ];

  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+1");
  const [emailValidationStatus, setEmailValidationStatus] = useState<
    "invalid" | "valid" | "none"
  >("none");
  const [phoneValidationStatus, setPhoneValidationStatus] = useState<
    "invalid" | "valid" | "none"
  >("none");
  const [preferredMethod, setPreferredMethod] = useState<string>("Email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submissionInProgress = useRef(false);

  // Load persisted data
  useEffect(() => {
    if (nestedAnswers.length > 0) {
      const emailAnswer = nestedAnswers.find((na) => na.question === "Email");
      const phoneAnswer = nestedAnswers.find(
        (na) => na.question === "Phone Number"
      );
      const preferredMethodAnswer = nestedAnswers.find(
        (na) => na.question === "Preferred Contact Method"
      );

      if (emailAnswer?.answer[0]) {
        setEmail(emailAnswer.answer[0]);
        validateEmail(emailAnswer.answer[0]);
      }

      if (phoneAnswer?.answer[0]) {
        const [savedCode, savedNumber] = phoneAnswer.answer[0].split("|");
        setCountryCode(savedCode);
        setPhoneNumber(savedNumber);
        validatePhoneNumber(savedNumber, savedCode);
      }

      if (preferredMethodAnswer?.answer[0]) {
        setPreferredMethod(preferredMethodAnswer.answer[0]);
      }
    }
  }, [nestedAnswers]);

  const validateEmail = (email: string) => {
    if (!email) {
      setEmailValidationStatus("none");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setEmailValidationStatus("valid");
      return true;
    } else {
      setEmailValidationStatus("invalid");
      return false;
    }
  };

  const validatePhoneNumber = (number: string, code: string) => {
    if (!number) {
      setPhoneValidationStatus("none");
      return false;
    }

    const fullNumber = `${code}${number}`;
    const phone = parsePhoneNumberFromString(fullNumber);

    if (phone?.isValid()) {
      setPhoneValidationStatus("valid");
      return true;
    } else {
      setPhoneValidationStatus("invalid");
      return false;
    }
  };

  const updateNestedAnswers = (
    newEmail: string,
    newPhoneData: string,
    newPreferredMethod: string
  ) => {
    const nestedAnswers = [
      { question: "Email", answer: [newEmail] },
      { question: "Phone Number", answer: [newPhoneData] },
      { question: "Preferred Contact Method", answer: [newPreferredMethod] },
    ];
    onChange(["Contact Information"], nestedAnswers);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
    const phoneData = phoneNumber ? `${countryCode}|${phoneNumber}` : "";
    updateNestedAnswers(newEmail, phoneData, preferredMethod);
  };

  const handlePhoneChange = (value: string | undefined) => {
    if (!value) {
      setPhoneNumber("");
      setPhoneValidationStatus("none");
      updateNestedAnswers(email, "", preferredMethod);
      return;
    }

    const phone = parsePhoneNumberFromString(value);
    if (phone) {
      const code = `+${phone.countryCallingCode}`;
      const number = phone.nationalNumber;
      setCountryCode(code);
      setPhoneNumber(number);
      validatePhoneNumber(number, code);
      const phoneData = `${code}|${number}`;
      updateNestedAnswers(email, phoneData, preferredMethod);
    }
  };

  const handlePreferredMethodChange = (method: string) => {
    setPreferredMethod(method);
    const phoneData = phoneNumber ? `${countryCode}|${phoneNumber}` : "";
    updateNestedAnswers(email, phoneData, method);
  };

  const fetchEventDetails = async (eventUri: string) => {
    try {
      const response = await fetch(eventUri, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_CALENDLY_API_KEY}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("Calendly event data:", data);

      const startTime = data?.resource?.start_time;
      const endTime = data?.resource?.end_time;

      if (!startTime || !endTime) throw new Error("Missing start/end time");

      const startDateObj = new Date(startTime);
      const endDateObj = new Date(endTime);
      const date = startDateObj.toISOString().split("T")[0];
      const startFormatted = startDateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const endFormatted = endDateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const time = `${startFormatted} - ${endFormatted} IST`;

      return { date, time };
    } catch (error) {
      console.error("Error fetching event details:", error);
      throw error;
    }
  };

  useCalendlyEventListener({
    onEventScheduled: async (e) => {
      if (submissionInProgress.current) return;
      submissionInProgress.current = true;
      setIsSubmitting(true);

      try {
        console.log("Event Scheduled:", e.data.payload);
        const eventUri = e.data.payload.event.uri;

        // Fetch the meeting details
        const meetingDetails = await fetchEventDetails(eventUri);

        // Update nested answers without meeting details
        const phoneData = phoneNumber ? `${countryCode}|${phoneNumber}` : "";
        const nestedAnswers = [
          { question: "Email", answer: [email] },
          { question: "Phone Number", answer: [phoneData] },
          { question: "Preferred Contact Method", answer: [preferredMethod] },
        ];
        onChange(["Contact Information"], nestedAnswers);

        // Pass meeting details directly to onSubmit
        onSubmit(meetingDetails);
      } catch (error) {
        console.error("Error in calendly event processing:", error);
      } finally {
        submissionInProgress.current = false;
        setIsSubmitting(false);
      }
    },
  });

  const selectedCalendlyLink =
    parseInt(numberOfPatients) >= 1 && parseInt(numberOfPatients) <= 5
      ? calendlyLinks[parseInt(numberOfPatients) - 1]
      : calendlyLinks[0];

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">{question}</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
            emailValidationStatus === "invalid"
              ? "border-red-500 focus:ring-red-500"
              : emailValidationStatus === "valid"
              ? "border-green-500 focus:ring-green-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="Enter email address"
        />
        {emailValidationStatus === "invalid" && (
          <p className="text-red-500 text-sm mt-1">Invalid email address</p>
        )}
        {emailValidationStatus === "valid" && (
          <p className="text-green-500 text-sm mt-1">Valid email address</p>
        )}
      </div>
      <div className="mb-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry="CA"
            value={phoneNumber ? `${countryCode}${phoneNumber}` : ""}
            onChange={handlePhoneChange}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
              phoneValidationStatus === "invalid"
                ? "border-red-500 focus:ring-red-500"
                : phoneValidationStatus === "valid"
                ? "border-green-500 focus:ring-green-500"
                : "border-Gray-300 focus:ring-blue-500"
            }`}
            placeholder="Enter phone number"
          />
          {phoneValidationStatus === "invalid" && (
            <p className="text-red-500 text-sm mt-1">Invalid phone number</p>
          )}
          {phoneValidationStatus === "valid" && (
            <p className="text-green-500 text-sm mt-1">Valid phone number</p>
          )}
        </motion.div>
      </div>
      <div className="flex items-center space-x-4">
        <label className="text-gray-700">
          What is your preferred contact method for notifications?
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="preferredMethod"
              value="Email"
              checked={preferredMethod === "Email"}
              onChange={() => handlePreferredMethodChange("Email")}
              className="mr-2"
            />
            Email
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="preferredMethod"
              value="Text"
              checked={preferredMethod === "Text"}
              onChange={() => handlePreferredMethodChange("Text")}
              className="mr-2"
            />
            Text
          </label>
        </div>
      </div>
      {emailValidationStatus === "valid" &&
        phoneValidationStatus === "valid" && (
          <div className="justify-center flex my-4">
            <PopupButton
              className="text-white bg-primary py-3 px-5 rounded-lg"
              url={selectedCalendlyLink}
              rootElement={document.getElementById("root")}
              text={isSubmitting ? "Processing..." : "Schedule meet"}
            />
          </div>
        )}
    </div>
  );
};

export default EmailPhoneInputQuestion;
