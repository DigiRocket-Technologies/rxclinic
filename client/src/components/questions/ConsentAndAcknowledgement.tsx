import React, { useState } from "react";

interface ConsentAcknowledgementProps {
  onSubmit: () => void;
}

const ConsentAcknowledgement: React.FC<ConsentAcknowledgementProps> = ({
  onSubmit,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const consentStatements = [
    "I confirm that the information I have provided is accurate and complete to the best of my knowledge.",
    "I understand that this intake form does not guarantee a prescription. A pharmacist will review my responses and decide if treatment or a referral is appropriate.",
    "I consent to receive services from the pharmacist, which may include assessment, prescribing medication, or providing further guidance.",
    "I understand my personal health information may be used to provide care and shared with other health professionals when needed.",
    "I understand that I may fill any prescription at a pharmacy of my choice.",
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
      {isChecked && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={onSubmit}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default ConsentAcknowledgement;
