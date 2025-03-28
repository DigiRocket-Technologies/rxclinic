import React from "react";

interface PrimaryCareProviderQuestionProps {
  question: string;
  answer: string[];
  onChange: (answer: string[], isChecked?: boolean) => void;
}

const PrimaryCareProviderQuestion: React.FC<
  PrimaryCareProviderQuestionProps
> = ({ question, answer, onChange }) => {
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
    <div className="mb-6">
      <h2 className="text-xl font-medium mb-4">{question}</h2>
      <input
        type="text"
        value={isChecked ? "" : answer[0] || ""}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-4"
        placeholder="Please specify..."
        disabled={isChecked}
      />
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        I do not have a primary care provider
      </label>
    </div>
  );
};

export default PrimaryCareProviderQuestion;
