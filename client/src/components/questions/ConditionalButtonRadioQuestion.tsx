// import React, { useState } from "react";
// import { motion } from "framer-motion";

// interface Option {
//   value: string;
//   showsInput: boolean;
//   label?: string; // Make label optional
// }

// interface ConditionalButtonRadioQuestionProps {
//   question: string;
//   options: Option[];
//   onChange: (answer: string, additionalInfo?: string) => void;
//   selectedAnswer: string | null;
// }
// const ConditionalButtonRadioQuestion: React.FC<
//   ConditionalButtonRadioQuestionProps
// > = ({ question, options, onChange, selectedAnswer }) => {
//   const [additionalInfo, setAdditionalInfo] = useState<string>("");

//   const handleOptionChange = (option: string) => {
//     onChange(option, additionalInfo);
//     if (!options.find((opt) => opt.value === option).showsInput) {
//       setAdditionalInfo(""); // Clear additional info if the option doesn't show input
//     }
//   };

//   const selectedOption = options.find((opt) => opt.value === selectedAnswer);
//   const showInput = selectedOption?.showsInput || false;

//   return (
//     <div className="mb-6">
//       <h2 className="text-xl font-medium mb-4">{question}</h2>
//       <div className="flex space-x-4 mb-4">
//         {options.map((option, index) => (
//           <label
//             key={index}
//             className={`flex-1 p-4 border  rounded-lg cursor-pointer text-center ${
//               selectedAnswer === option.value
//                 ? "bg-primary text-white"
//                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//             }`}
//           >
//             <input
//               type="radio"
//               name="answer"
//               value={option.value}
//               checked={selectedAnswer === option.value}
//               onChange={() => handleOptionChange(option.value)}
//               className="hidden"
//             />
//             {option.value}
//           </label>
//         ))}
//       </div>
//       {showInput && (
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mt-4"
//         >
//           {selectedOption?.label && (
//             <label className="block text-sm text-gray-700 mb-2">
//               {selectedOption.label}
//             </label>
//           )}
//           <input
//             type="text"
//             value={additionalInfo}
//             onChange={(e) => {
//               setAdditionalInfo(e.target.value);
//               onChange(selectedAnswer!, e.target.value);
//             }}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//             placeholder="Please specify..."
//           />
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default ConditionalButtonRadioQuestion;

// import React, { useState } from "react";
// import { motion } from "framer-motion";

// interface Option {
//   value: string;
//   showsInput: boolean;
//   label?: string; // Make label optional
// }

// interface ConditionalButtonRadioQuestionProps {
//   question: string;
//   options: Option[];
//   onChange: (answer: string[], nestedAnswers?: { question: string; answer: string[] }[]) => void;
//   selectedAnswer: string[];
// }

// const ConditionalButtonRadioQuestion: React.FC<ConditionalButtonRadioQuestionProps> = ({
//   question,
//   options,
//   onChange,
//   selectedAnswer,
// }) => {
//   const [additionalInfo, setAdditionalInfo] = useState<string>("");

//   const handleOptionChange = (option: string) => {
//     const nestedAnswers = option === "Yes" ? [{ question: selectedOption?.label || "", answer: [additionalInfo] }] : [];
//     onChange([option], nestedAnswers);
//     if (!options.find((opt) => opt.value === option).showsInput) {
//       setAdditionalInfo(""); // Clear additional info if the option doesn't show input
//     }
//   };

//   const selectedOption = options.find((opt) => selectedAnswer.includes(opt.value));
//   const showInput = selectedOption?.showsInput || false;

//   return (
//     <div className="mb-6">
//       <h2 className="text-xl font-medium mb-4">{question}</h2>
//       <div className="flex space-x-4 mb-4">
//         {options.map((option, index) => (
//           <label
//             key={index}
//             className={`flex-1 p-4 border rounded-lg cursor-pointer text-center ${
//               selectedAnswer.includes(option.value)
//                 ? "bg-primary text-white"
//                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//             }`}
//           >
//             <input
//               type="radio"
//               name="answer"
//               value={option.value}
//               checked={selectedAnswer.includes(option.value)}
//               onChange={() => handleOptionChange(option.value)}
//               className="hidden"
//             />
//             {option.value}
//           </label>
//         ))}
//       </div>
//       {showInput && (
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mt-4"
//         >
//           {selectedOption?.label && (
//             <label className="block text-sm text-gray-700 mb-2">
//               {selectedOption.label}
//             </label>
//           )}
//           <input
//             type="text"
//             value={additionalInfo}
//             onChange={(e) => {
//               setAdditionalInfo(e.target.value);
//               handleOptionChange(selectedOption.value);
//             }}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//             placeholder="Please specify..."
//           />
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default ConditionalButtonRadioQuestion;
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
    <div className="mb-6">
      <h2 className="text-xl font-medium mb-4">{question}</h2>
      <div className="flex space-x-4 mb-4">
        {options.map((option, index) => (
          <label
            key={index}
            className={`flex-1 p-4 border rounded-lg cursor-pointer text-center ${
              selectedAnswer.includes(option.value)
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
            <label className="block text-sm text-gray-700 mb-2">
              {selectedOption.label}
            </label>
          )}
          <input
            type="text"
            value={additionalInfo}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Please specify..."
          />
        </motion.div>
      )}
    </div>
  );
};

export default ConditionalButtonRadioQuestion;
