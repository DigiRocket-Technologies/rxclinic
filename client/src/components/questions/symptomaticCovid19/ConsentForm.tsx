import React, { useState } from "react";

interface ConsentAcknowledgementProps {
  question: string;
  onChange: (answer: string[]) => void;
  selectedAnswer: string[];
}

const ConsentAcknowledgement: React.FC<ConsentAcknowledgementProps> = ({
  onChange,
  selectedAnswer,
}) => {
  const [isChecked, setIsChecked] = useState(selectedAnswer.includes("Yes"));

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange(newCheckedState ? ["Yes"] : []);
  };

  const consentStatements = [
    "I confirm that the information I’ve provided is true and complete to the best of my knowledge.",
    "I acknowledge that completing this intake form does not guarantee a prescription. A pharmacist will review my responses to determine if treatment or referral is appropriate.",
    "I consent to receive care from the pharmacist, which may include an assessment, a prescription, or additional guidance.",
    "I understand that my personal health information may be used for my care and shared with other healthcare providers when necessary.",
    "I acknowledge that I have the right to fill any prescription at the pharmacy of my choice.",
  ];

  return (
    <div className="max-w-lg mx-auto my-6 p-6 bg-white rounded-xl shadow-md border-2 border-blue-200">
      <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">
        Consent and Acknowledgement
      </h2>
      <div className="space-y-3">
        {consentStatements.map((statement, index) => (
          <div key={index} className="flex items-start text-gray-800">
            <span className="mr-3 text-blue-500">•</span>
            <p>{statement}</p>
          </div>
        ))}
        <label className="flex items-center p-3 rounded-lg cursor-pointer text-gray-800 hover:bg-blue-50 transition-transform duration-200 hover:scale-[1.02]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="hidden"
          />
          <span
            className={`w-5 h-5 mr-3 rounded border-2 border-blue-300 flex items-center justify-center ${
              isChecked ? "bg-blue-500" : ""
            }`}
          >
            {isChecked && <span className="w-3 h-3 rounded bg-white"></span>}
          </span>
          I agree and give my consent.
        </label>
      </div>
    </div>
  );
};

export default ConsentAcknowledgement;
