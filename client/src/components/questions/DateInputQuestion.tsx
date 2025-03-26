import React, { useState } from "react";

interface DynamicQuestionProps {
  question: string;
  answer: string[];
  onChange: (answer: string[]) => void;
}

const DateInputQuestion: React.FC<DynamicQuestionProps> = ({
  question,
  answer,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  // Initialize inputValue based on the answer prop
  if (answer.length > 0 && answer[0] !== inputValue) {
    setInputValue(answer[0]);
  } else if (answer.length === 0 && inputValue !== "") {
    setInputValue("");
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    onChange([value]);
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-medium mb-4">{question}</h2>
      <input
        type="date"
        value={inputValue}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
};

export default DateInputQuestion;
