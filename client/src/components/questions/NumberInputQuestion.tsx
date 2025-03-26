import React from "react";

interface DynamicQuestionProps {
  question: string;
  answer: string[];
  onChange: (answer: string[]) => void;
}

const NumberInputQuestion: React.FC<DynamicQuestionProps> = ({
  question,
  answer,
  onChange,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange([value]);
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-medium mb-4">{question}</h2>
      <input
        type="number"
        value={answer}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Please enter your answer..."
      />
    </div>
  );
};

export default NumberInputQuestion;
