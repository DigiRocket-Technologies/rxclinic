import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Option {
  value: string;
  showsInput: boolean;
  label?: string; // Make label optional
}

interface ConditionalButtonRadioQuestionProps {
  question: string;
  options: Option[];
  onChange: (
    answer: string[],
    nestedAnswers?: { question: string; answer: string[] }[]
  ) => void;
  selectedAnswer: string[];
  nestedAnswers?: { question: string; answer: string[] }[];
}

const ConditionalButtonRadioQuestion: React.FC<
  ConditionalButtonRadioQuestionProps
> = ({
  question,
  options,
  onChange,
  selectedAnswer = [], // Provide a default value for selectedAnswer
  nestedAnswers = [], // Provide a default value for nestedAnswers
}) => {
  const [additionalInfo, setAdditionalInfo] = useState<string>("");

  useEffect(() => {
    if (nestedAnswers.length > 0) {
      setAdditionalInfo(nestedAnswers[0].answer[0]);
    } else {
      setAdditionalInfo("");
    }
  }, [nestedAnswers]);

  const handleOptionChange = (option: string) => {
    const selectedOption = options.find((opt) => opt.value === option);
    if (!selectedOption?.showsInput) {
      setAdditionalInfo("N/A"); // Set to "N/A" if the option doesn't show input
    } else {
      setAdditionalInfo(additionalInfo || ""); // Retain existing value or initialize with an empty input
    }
    const nestedAnswers = selectedOption?.showsInput
      ? [{ question: "Please specify", answer: [additionalInfo] }]
      : [{ question: "Please specify", answer: ["N/A"] }];
    onChange([option], nestedAnswers);
  };

  const handleInputChange = (value: string) => {
    setAdditionalInfo(value);
    const selectedOption = options.find((opt) =>
      selectedAnswer.includes(opt.value)
    );
    const nestedAnswers = selectedOption?.showsInput
      ? [{ question: "Please specify", answer: [value] }]
      : [{ question: "Please specify", answer: ["N/A"] }];
    onChange(selectedAnswer, nestedAnswers);
  };

  const selectedOption = options.find((opt) =>
    selectedAnswer.includes(opt.value)
  );
  const showInput = selectedOption?.showsInput || false;

  return (
    // <div className="mb-6">
    //   <h2 className="text-xl font-medium mb-4">{question}</h2>
    //   <div className="flex space-x-4 mb-4">
    //     {options.map((option, index) => (
    //       <label
    //         key={index}
    //         className={`flex-1 p-4 border rounded-lg cursor-pointer text-center ${
    //           selectedAnswer.includes(option.value)
    //             ? "bg-primary text-white"
    //             : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    //         }`}
    //       >
    //         <input
    //           type="radio"
    //           name="answer"
    //           value={option.value}
    //           checked={selectedAnswer.includes(option.value)}
    //           onChange={() => handleOptionChange(option.value)}
    //           className="hidden"
    //         />
    //         {option.value}
    //       </label>
    //     ))}
    //   </div>
    //   {showInput && (
    //     <motion.div
    //       initial={{ opacity: 0, y: 10 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.5 }}
    //       className="mt-4"
    //     >
    //       {selectedOption?.label && (
    //         <label className="block text-sm text-gray-700 mb-2">
    //           {selectedOption.label}
    //         </label>
    //       )}
    //       <input
    //         type="text"
    //         value={additionalInfo}
    //         onChange={(e) => handleInputChange(e.target.value)}
    //         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
    //         placeholder="Please specify..."
    //       />
    //     </motion.div>
    //   )}
    // </div>
    <div className="max-w-lg mx-auto my-6 p-6 bg-white rounded-xl shadow-md border-2 border-blue-200">
      <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">
        {question}
      </h2>
      <div className="space-y-3">
        {options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center p-3 rounded-lg cursor-pointer text-gray-800 hover:bg-blue-50 transition-transform duration-200 hover:scale-[1.02] ${
              selectedAnswer.includes(option.value)
                ? "bg-blue-500 text-white hover:text-gray-800"
                : ""
            }`}
          >
            <input
              type="radio"
              name="answer"
              value={option.value}
              checked={selectedAnswer.includes(option.value)}
              onChange={() => handleOptionChange(option.value)}
              className="hidden"
            />
            <span
              className={`w-5 h-5 mr-3 rounded-full border-2 border-blue-300 flex items-center justify-center ${
                selectedAnswer.includes(option.value) ? "bg-blue-500" : ""
              }`}
            >
              {selectedAnswer.includes(option.value) && (
                <span className="w-3 h-3 rounded-full bg-white"></span>
              )}
            </span>
            {option.value}
          </label>
        ))}
      </div>
      {showInput && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4"
        >
          {selectedOption?.label && (
            <label className="block text-sm font-semibold text-gray-800 mb-2 text-center">
              {selectedOption.label}
            </label>
          )}
          <input
            type="text"
            value={additionalInfo}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg bg-blue-50 text-gray-800 
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
          transition duration-200 hover:bg-blue-100"
            placeholder="Please specify..."
          />
        </motion.div>
      )}
    </div>
  );
};

export default ConditionalButtonRadioQuestion;
