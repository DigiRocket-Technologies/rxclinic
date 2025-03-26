import React from "react";

interface ButtonRadioQuestionProps {
  question: string;
  options: string[];
  onChange: (answer: string[]) => void;
  selectedAnswer: string | null;
}

const ButtonRadioQuestion: React.FC<ButtonRadioQuestionProps> = ({
  question,
  options,
  onChange,
  selectedAnswer,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      onChange([value]);
    } else {
      onChange([""]);
    }
  };

  const handleRadioChange = (option: string) => {
    onChange([option]);
  };

  const handleInputFocus = () => {
    if (selectedAnswer && options.includes(selectedAnswer)) {
      onChange([""]);
    }
  };

  const shouldDisplayInputValue =
    selectedAnswer && !options.includes(selectedAnswer);

  return (
    <div className="mb-6">
      <h2 className="text-xl text-center font-medium mb-4">{question}</h2>
      <div className="flex space-x-4">
        {options.map((option, index) => (
          <label
            key={index}
            className={`flex-1 p-4 border rounded-lg cursor-pointer text-center ${
              selectedAnswer === option
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <input
              type="radio"
              name="answer"
              value={option}
              checked={selectedAnswer === option}
              onChange={() => handleRadioChange(option)}
              className="hidden"
            />
            {option}
          </label>
        ))}
      </div>
      <div className="mt-4">
        <label className="block text-gray-700">
          This question is required for clinical assessment and reimbursement
          purposes. If none of the above please specify:
          <input
            type="text"
            className="mt-1 p-2 border rounded-lg w-full"
            value={shouldDisplayInputValue ? selectedAnswer : ""}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            disabled={false}
          />
        </label>
      </div>
    </div>
  );
};

export default ButtonRadioQuestion;
