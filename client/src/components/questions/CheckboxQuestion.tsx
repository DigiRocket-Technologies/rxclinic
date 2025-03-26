import React, { useState, useEffect } from "react";

interface CheckboxQuestionProps {
  question: string;
  options: string[];
  onChange: (answers: string[]) => void;
  selectedAnswers: string[];
}

const CheckboxQuestion: React.FC<CheckboxQuestionProps> = ({
  question,
  options,
  onChange,
  selectedAnswers = [],
}) => {
  const [otherInput, setOtherInput] = useState<string>("");
  const hasNoneOption = options.includes("None of the above");
  const hasOtherOption = options.includes("Other");

  const customInputValue = selectedAnswers.find(
    (answer) => !options.includes(answer)
  );

  useEffect(() => {
    if (customInputValue && !otherInput) {
      setOtherInput(customInputValue);
    }
  }, [customInputValue, otherInput]);

  const handleChange = (option: string) => {
    let newSelection = [...selectedAnswers];

    if (option === "None of the above") {
      newSelection = selectedAnswers.includes(option)
        ? selectedAnswers.filter((o) => o !== option)
        : ["None of the above"];
    } else {
      // If selecting any option (including "Other") while "None of the above" is selected
      if (hasNoneOption && selectedAnswers.includes("None of the above")) {
        newSelection = [option];
      } else if (option === "Other") {
        newSelection = selectedAnswers.includes(option)
          ? selectedAnswers.filter((o) => o !== option && o !== otherInput)
          : [...selectedAnswers, option];
      } else {
        newSelection = selectedAnswers.includes(option)
          ? selectedAnswers.filter((o) => o !== option)
          : [...selectedAnswers, option];
      }
    }

    if (hasOtherOption && newSelection.includes("Other") && otherInput) {
      newSelection = [
        ...newSelection.filter((o) => o !== otherInput),
        otherInput,
      ];
    }

    onChange(newSelection);
  };

  const handleOtherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setOtherInput(newValue);

    const filteredAnswers = selectedAnswers.filter(
      (answer) => options.includes(answer) || answer === "Other"
    );
    onChange(newValue ? [...filteredAnswers, newValue] : filteredAnswers);
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl text-center font-medium mb-2">{question}</h2>
      <div className="flex flex-col items-center space-y-2">
        <p className="text-gray-500">Select all that apply</p>
        {options.map((option, index) => (
          <label
            key={index}
            className="flex items-center space-x-2 cursor-pointer w-full max-w-md justify-center"
          >
            <input
              type="checkbox"
              checked={selectedAnswers.includes(option)}
              onChange={() => handleChange(option)}
              className="absolute opacity-0"
            />
            <span className="w-5 h-5 border border-gray-600 rounded-full bg-white flex items-center justify-center">
              {selectedAnswers.includes(option) && (
                <span className="w-3 h-3 bg-primary rounded-full"></span>
              )}
            </span>
            <span className="flex-1 text-left hover:text-primary">
              {option}
            </span>
          </label>
        ))}
        {hasOtherOption && selectedAnswers.includes("Other") && (
          <div className="w-full max-w-md mt-2 flex flex-col items-center">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Please specify
            </label>
            <input
              type="text"
              value={otherInput}
              onChange={handleOtherInputChange}
              className="w-3/4 px-3 py-2 text-center border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
                transition duration-150 ease-in-out"
              placeholder="Enter your answer"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckboxQuestion;
