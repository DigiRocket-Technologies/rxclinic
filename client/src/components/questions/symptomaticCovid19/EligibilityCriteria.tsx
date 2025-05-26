import React from "react";

interface EligibilityCriteriaQuestionProps {
  question: string;
  onChange: (answer: string[]) => void;
  selectedAnswer: string[];
}

const EligibilityCriteriaQuestion: React.FC<
  EligibilityCriteriaQuestionProps
> = ({ question, onChange, selectedAnswer }) => {
  const options = ["Yes", "No"];
  const eligibilityCriteriaUrl =
    "https://www.ontario.ca/page/covid-19-testing-and-treatment#section-2"; // Replace with actual URL

  const handleOptionChange = (option: string) => {
    onChange([option]);
  };

  return (
    <div className="max-w-lg mx-auto my-6 p-6 bg-white rounded-xl shadow-md border-2 border-blue-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-center text-gray-900">
          {question}
        </h2>
        <a
          href={eligibilityCriteriaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm"
        >
          Eligibility Criteria
        </a>
      </div>
      <div className="space-y-3">
        {options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center p-3 rounded-lg cursor-pointer text-gray-800 hover:bg-blue-50 transition-transform duration-200 hover:scale-[1.02] ${
              selectedAnswer.includes(option)
                ? "bg-blue-500 text-white hover:text-gray-800"
                : ""
            }`}
          >
            <input
              type="radio"
              name="answer"
              value={option}
              checked={selectedAnswer.includes(option)}
              onChange={() => handleOptionChange(option)}
              className="hidden"
            />
            <span
              className={`w-5 h-5 mr-3 rounded-full border-2 border-blue-300 flex items-center justify-center ${
                selectedAnswer.includes(option) ? "bg-blue-500" : ""
              }`}
            >
              {selectedAnswer.includes(option) && (
                <span className="w-3 h-3 rounded-full bg-white"></span>
              )}
            </span>
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default EligibilityCriteriaQuestion;
