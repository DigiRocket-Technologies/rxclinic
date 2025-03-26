// import React, { useState } from "react";

// //interface TermsAndConditionsProps {}

// const TermsAndConditions: React.FC = () => {
//   const [isFillingForSomeoneElse, setIsFillingForSomeoneElse] = useState(false);
//   const [fullName, setFullName] = useState("");
//   const [relationship, setRelationship] = useState("");

//   const termsAndConditionsText = `
//     I confirm that all the information provided is accurate and complete to the best of my knowledge. While this registration does not guarantee a prescription treatment, a pharmacist will review my information and determine if it is appropriate to prescribe a treatment or if a referral is necessary. If a prescription is provided, I understand that I have the option to fill it at any pharmacy of my choosing.

// I give my consent to receive pharmacist services, which may include an assessment and treatment related to the requested or recommended service. This includes the initiation of medication therapy, as well as any necessary assessments or referrals, as deemed necessary by the pharmacist, in accordance with applicable laws and regulations. I understand that personal health information may be collected, used, and disclosed by my pharmacy as necessary for the purposes of providing these services. This may include sharing my information with other healthcare providers as needed for continuity of care.
//   `;

//   return (
//     <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4">Terms & Conditions</h2>
//       <div className="mb-4 border p-2 max-h-40 overflow-y-auto text-gray-700">
//         {termsAndConditionsText}
//       </div>

//       <div className="flex items-center mb-4">
//         <input
//           type="checkbox"
//           id="fillingForSomeoneElse"
//           checked={isFillingForSomeoneElse}
//           onChange={(e) => setIsFillingForSomeoneElse(e.target.checked)}
//           className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
//         />
//         <label
//           htmlFor="fillingForSomeoneElse"
//           className="ml-2 text-sm text-gray-900"
//         >
//           I am filling out this form for someone else.
//         </label>
//       </div>

//       {isFillingForSomeoneElse && (
//         <div>
//           <div className="mb-4">
//             <label
//               htmlFor="relationship"
//               className="block text-sm font-medium text-gray-700"
//             >
//               What is your relationship to the patient?
//             </label>
//             <select
//               id="relationship"
//               value={relationship}
//               onChange={(e) => setRelationship(e.target.value)}
//               className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             >
//               <option value="">Select relationship</option>
//               <option value="Pharmacy Staff">Pharmacy Staff</option>
//               <option value="Parent">Parent</option>
//               <option value="Guardian/Legal Representative">
//                 Guardian/Legal Representative
//               </option>
//               <option value="Spouse">Spouse</option>
//               <option value="Family Member">Family Member</option>
//               <option value="Agent">Agent</option>

//               {/* Add more options as needed */}
//             </select>
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="fullName"
//               className="block text-sm font-medium text-gray-700"
//             >
//               My Full Name
//             </label>
//             <input
//               type="text"
//               id="fullName"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TermsAndConditions;

// import React, { useState } from "react";

// const TermsAndConditions = ({ question, onChange }) => {
//   const [isFillingForSomeoneElse, setIsFillingForSomeoneElse] = useState(false);
//   const [fullName, setFullName] = useState("");
//   const [relationship, setRelationship] = useState("");
//   const [isAgreed, setIsAgreed] = useState(false);

//   const termsAndConditionsText = `
//     I confirm that all the information provided is accurate and complete to the best of my knowledge. While this registration does not guarantee a prescription treatment, a pharmacist will review my information and determine if it is appropriate to prescribe a treatment or if a referral is necessary. If a prescription is provided, I understand that I have the option to fill it at any pharmacy of my choosing.

//     I give my consent to receive pharmacist services, which may include an assessment and treatment related to the requested or recommended service. This includes the initiation of medication therapy, as well as any necessary assessments or referrals, as deemed necessary by the pharmacist, in accordance with applicable laws and regulations. I understand that personal health information may be collected, used, and disclosed by my pharmacy as necessary for the purposes of providing these services. This may include sharing my information with other healthcare providers as needed for continuity of care.
//   `;

//   const handleAgree = () => {
//     setIsAgreed(true);
//     onChange("Yes", [
//       {
//         question: "I am filling out this form for someone else.",
//         answer: isFillingForSomeoneElse ? ["Yes"] : [],
//       },
//       {
//         question: "What is your relationship to the patient?",
//         answer: isFillingForSomeoneElse ? [relationship] : [],
//       },
//       {
//         question: "My Full Name",
//         answer: isFillingForSomeoneElse ? [fullName] : [],
//       },
//     ]);
//   };

//   const handleCheckboxChange = (e) => {
//     setIsFillingForSomeoneElse(e.target.checked);
//     if (!e.target.checked) {
//       onChange("Yes", [
//         {
//           question: "I am filling out this form for someone else.",
//           answer: [],
//         },
//         {
//           question: "What is your relationship to the patient?",
//           answer: [],
//         },
//         {
//           question: "My Full Name",
//           answer: [],
//         },
//       ]);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4">{question}</h2>
//       <div className="mb-4 border p-2 max-h-40 overflow-y-auto text-gray-700">
//         {termsAndConditionsText}
//       </div>

//       <div className="flex items-center mb-4">
//         <input
//           type="checkbox"
//           id="fillingForSomeoneElse"
//           checked={isFillingForSomeoneElse}
//           onChange={handleCheckboxChange}
//           className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
//         />
//         <label
//           htmlFor="fillingForSomeoneElse"
//           className="ml-2 text-sm text-gray-900"
//         >
//           I am filling out this form for someone else.
//         </label>
//       </div>

//       {isFillingForSomeoneElse && (
//         <div>
//           <div className="mb-4">
//             <label
//               htmlFor="relationship"
//               className="block text-sm font-medium text-gray-700"
//             >
//               What is your relationship to the patient?
//             </label>
//             <select
//               id="relationship"
//               value={relationship}
//               onChange={(e) => setRelationship(e.target.value)}
//               className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             >
//               <option value="">Select relationship</option>
//               <option value="Pharmacy Staff">Pharmacy Staff</option>
//               <option value="Parent">Parent</option>
//               <option value="Guardian/Legal Representative">
//                 Guardian/Legal Representative
//               </option>
//               <option value="Spouse">Spouse</option>
//               <option value="Family Member">Family Member</option>
//               <option value="Agent">Agent</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="fullName"
//               className="block text-sm font-medium text-gray-700"
//             >
//               My Full Name
//             </label>
//             <input
//               type="text"
//               id="fullName"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//         </div>
//       )}

//       <button
//         onClick={handleAgree}
//         className={`mt-4 px-4 py-2 bg-blue-600 text-white rounded ${
//           isFillingForSomeoneElse && (!relationship || !fullName)
//             ? "opacity-50 cursor-not-allowed"
//             : ""
//         }`}
//         disabled={isFillingForSomeoneElse && (!relationship || !fullName)}
//       >
//         I Agree
//       </button>
//     </div>
//   );
// };

// export default TermsAndConditions;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TermsAndConditions = ({ question, onChange }) => {
  const [isFillingForSomeoneElse, setIsFillingForSomeoneElse] = useState(false);
  const [fullName, setFullName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const termsAndConditionsText = `
    I confirm that all the information provided is accurate and complete to the best of my knowledge. While this registration does not guarantee a prescription treatment, a pharmacist will review my information and determine if it is appropriate to prescribe a treatment or if a referral is necessary. If a prescription is provided, I understand that I have the option to fill it at any pharmacy of my choosing.

    I give my consent to receive pharmacist services, which may include an assessment and treatment related to the requested or recommended service. This includes the initiation of medication therapy, as well as any necessary assessments or referrals, as deemed necessary by the pharmacist, in accordance with applicable laws and regulations. I understand that personal health information may be collected, used, and disclosed by my pharmacy as necessary for the purposes of providing these services. This may include sharing my information with other healthcare providers as needed for continuity of care.
  `;

  const handleAgree = () => {
    setIsAgreed(true);
    onChange("Yes", [
      {
        question: "I am filling out this form for someone else.",
        answer: isFillingForSomeoneElse ? ["Yes"] : ["N/A"],
      },
      {
        question: "What is your relationship to the patient?",
        answer: isFillingForSomeoneElse ? [relationship] : ["N/A"],
      },
      {
        question: "My Full Name",
        answer: isFillingForSomeoneElse ? [fullName] : ["N/A"],
      },
    ]);
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsFillingForSomeoneElse(isChecked);
    setIsAgreed(false); // Reset the agreed state when the checkbox is toggled
    if (!isChecked) {
      onChange("Yes", [
        {
          question: "I am filling out this form for someone else.",
          answer: ["N/A"],
        },
        {
          question: "What is your relationship to the patient?",
          answer: ["N/A"],
        },
        {
          question: "My Full Name",
          answer: ["N/A"],
        },
      ]);
    }
  };

  useEffect(() => {
    if (isFillingForSomeoneElse && relationship && fullName) {
      setIsAgreed(false); // Reset the agreed state when the additional fields are filled
    }
  }, [isFillingForSomeoneElse, relationship, fullName]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">{question}</h2>
      <div className="mb-4 border p-2 max-h-40 overflow-y-auto text-gray-700">
        {termsAndConditionsText}
      </div>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="fillingForSomeoneElse"
          checked={isFillingForSomeoneElse}
          onChange={handleCheckboxChange}
          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
        />
        <label
          htmlFor="fillingForSomeoneElse"
          className="ml-2 text-sm text-gray-900"
        >
          I am filling out this form for someone else.
        </label>
      </div>

      {isFillingForSomeoneElse && (
        <div>
          <div className="mb-4">
            <label
              htmlFor="relationship"
              className="block text-sm font-medium text-gray-700"
            >
              What is your relationship to the patient?
            </label>
            <select
              id="relationship"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select relationship</option>
              <option value="Pharmacy Staff">Pharmacy Staff</option>
              <option value="Parent">Parent</option>
              <option value="Guardian/Legal Representative">
                Guardian/Legal Representative
              </option>
              <option value="Spouse">Spouse</option>
              <option value="Family Member">Family Member</option>
              <option value="Agent">Agent</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              My Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      )}

      <motion.button
        onClick={handleAgree}
        className={`mt-4 px-4 py-2 text-white rounded ${
          isFillingForSomeoneElse && (!relationship || !fullName)
            ? "bg-gray-400 cursor-not-allowed"
            : isAgreed
            ? "bg-green-500"
            : "bg-blue-600"
        }`}
        disabled={isFillingForSomeoneElse && (!relationship || !fullName)}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        I Agree
      </motion.button>
    </div>
  );
};

export default TermsAndConditions;
