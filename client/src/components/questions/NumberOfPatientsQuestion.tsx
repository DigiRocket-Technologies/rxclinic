// src/questions/NumberOfPatientsQuestion.tsx
import React from "react";

interface NumberOfPatientsQuestionProps {
  question: string;
  onChange: (answer: string) => void;
  selectedAnswer?: string;
}

const NumberOfPatientsQuestion: React.FC<NumberOfPatientsQuestionProps> = ({
  question,
  onChange,
  selectedAnswer,
}) => {
  const options = ["1", "2", "3", "4", "5"];

  const handleOptionClick = (option: string) => {
    onChange(option);
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-medium mb-4">{question}</h2>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            className={`px-4 py-2 rounded-md border transition-colors ${
              selectedAnswer === option
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NumberOfPatientsQuestion;
