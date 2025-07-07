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
    <div className="max-w-lg mx-auto my-6 p-6 bg-white rounded-xl shadow-md border-2 border-blue-200">
      <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">
        {question}
      </h2>
      <p className="text-gray-600 text-center italic mb-3">
        Select all that apply
      </p>
      <div className="space-y-3">
        {options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center p-3 rounded-lg cursor-pointer text-gray-800 hover:bg-blue-50 transition-transform duration-200 hover:scale-[1.02] ${
              selectedAnswers.includes(option)
                ? "bg-blue-500 text-white hover:text-gray-800"
                : ""
            }`}
          >
            <input
              type="checkbox"
              checked={selectedAnswers.includes(option)}
              onChange={() => handleChange(option)}
              className="hidden"
            />
            <span
              className={`w-5 h-5 mr-3 rounded border-2 border-blue-300 flex items-center justify-center ${
                selectedAnswers.includes(option) ? "bg-blue-500" : ""
              }`}
            >
              {selectedAnswers.includes(option) && (
                <span className="w-3 h-3 rounded bg-white"></span>
              )}
            </span>
            <span className="flex-1">{option}</span>
          </label>
        ))}
        {hasOtherOption && selectedAnswers.includes("Other") && (
          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-800 mb-2 text-center">
              Please specify
            </label>
            <input
              type="text"
              value={otherInput}
              onChange={handleOtherInputChange}
              className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg bg-blue-50 text-gray-800 
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
            transition duration-200 hover:bg-blue-100"
              placeholder="Enter your answer"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckboxQuestion;
