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
    <div className="max-w-lg mx-auto my-6 p-6 bg-white rounded-xl shadow-md border-2 border-blue-200">
      <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">
        {question}
      </h2>
      <input
        type="date"
        value={inputValue}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg bg-blue-50 text-gray-800 
      focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
      transition duration-200 hover:bg-blue-100"
      />
    </div>
  );
};

export default DateInputQuestion;
