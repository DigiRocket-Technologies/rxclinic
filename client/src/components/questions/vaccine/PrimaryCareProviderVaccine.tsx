import React from "react";

interface PrimaryCareProviderQuestionProps {
  question: string;
  answer: string[];
  name: string;

  onChange: (answer: string[], isChecked?: boolean) => void;
}

const PrimaryCareProviderQuestion: React.FC<
  PrimaryCareProviderQuestionProps
> = ({ question, answer, onChange, name }) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    if (checked) {
      onChange(["I do not have a primary care provider"], checked);
    } else {
      onChange([], false); // Clear the answer when unchecked
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange([value], false);
  };

  const isChecked = answer.includes("I do not have a primary care provider");

  return (
    <div className="max-w-lg mx-auto my-6 p-6 bg-white rounded-xl shadow-md border-2 border-blue-200">
      <h1 className="text-lg text-center italic text-gray-600 mb-2">{name}</h1>
      <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">
        {question}
      </h2>
      <input
        type="text"
        value={isChecked ? "" : answer[0] || ""}
        onChange={handleInputChange}
        className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 mb-4 disabled:bg-gray-100 disabled:cursor-not-allowed"
        placeholder="Please specify..."
        disabled={isChecked}
      />
      <label className="flex items-center p-3 rounded-lg cursor-pointer text-gray-800 hover:bg-blue-50 transition-transform duration-200 hover:scale-[1.02]">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="hidden"
        />
        <span
          className={`w-5 h-5 mr-3 border-2 border-blue-300 rounded flex items-center justify-center ${
            isChecked ? "bg-blue-500" : ""
          }`}
        >
          {isChecked && <span className="w-3 h-3 bg-white rounded"></span>}
        </span>
        I do not have a primary care provider
      </label>
    </div>
  );
};

export default PrimaryCareProviderQuestion;
