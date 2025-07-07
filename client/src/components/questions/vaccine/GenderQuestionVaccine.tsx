import React from "react";

interface ButtonRadioQuestionProps {
  question: string;
  options: string[];
  onChange: (answer: string[]) => void;
  selectedAnswer: string | null;
  name: string;
}

const ButtonRadioQuestion: React.FC<ButtonRadioQuestionProps> = ({
  question,
  options,
  onChange,
  selectedAnswer,
  name,
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
    <div className="max-w-lg mx-auto my-6 p-6 bg-white rounded-xl shadow-md border-2 border-blue-200">
      <h1 className="text-lg text-center italic text-gray-600 mb-2">{name}</h1>
      <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">
        {question}
      </h2>
      <div className="space-y-3">
        {options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center p-3 rounded-lg cursor-pointer text-gray-800 hover:bg-blue-50 transition-transform duration-200 hover:scale-[1.02] ${
              selectedAnswer === option ? "bg-blue-500 text-white" : ""
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
            <span
              className={`w-5 h-5 mr-3 rounded-full border-2 border-blue-300 flex items-center justify-center ${
                selectedAnswer === option ? "bg-blue-500" : ""
              }`}
            >
              {selectedAnswer === option && (
                <span className="w-3 h-3 rounded-full bg-white"></span>
              )}
            </span>
            {option}
          </label>
        ))}
      </div>
      <div className="mt-4">
        <label className="block text-gray-800">
          This question is required for clinical assessment and reimbursement
          purposes. If none of the above please specify:
          <input
            type="text"
            className="mt-1 p-2 border border-blue-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
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
