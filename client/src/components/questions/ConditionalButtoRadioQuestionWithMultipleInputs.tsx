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
//   onChange: (answer: string, additionalInfo?: string[]) => void;
//   selectedAnswer: string | null;
// }

// const ConditionalButtonRadioQuestion: React.FC<
//   ConditionalButtonRadioQuestionProps
// > = ({ question, options, onChange, selectedAnswer }) => {
//   const [additionalInfos, setAdditionalInfos] = useState<string[]>([""]);

//   const handleOptionChange = (option: string) => {
//     const selectedOption = options.find((opt) => opt.value === option);
//     if (!selectedOption?.showsInput) {
//       setAdditionalInfos([""]); // Reset to a single empty input if the option doesn't show input
//     }
//     onChange(option, additionalInfos);
//   };

//   const handleInputChange = (index: number, value: string) => {
//     const newInfos = [...additionalInfos];
//     newInfos[index] = value;
//     setAdditionalInfos(newInfos);
//     onChange(selectedAnswer!, newInfos);
//   };

//   const handleAddMore = () => {
//     setAdditionalInfos([...additionalInfos, ""]);
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
//             className={`flex-1 p-4 border rounded-lg cursor-pointer text-center ${
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
//           {additionalInfos.map((info, index) => (
//             <input
//               key={index}
//               type="text"
//               value={info}
//               onChange={(e) => handleInputChange(index, e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-2"
//               placeholder="Please specify..."
//             />
//           ))}
//           <button
//             type="button"
//             onClick={handleAddMore}
//             className="text-primary underline"
//           >
//             Add More
//           </button>
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
//   const [additionalInfos, setAdditionalInfos] = useState<string[]>([""]);

//   const handleOptionChange = (option: string) => {
//     const selectedOption = options.find((opt) => opt.value === option);
//     if (!selectedOption?.showsInput) {
//       setAdditionalInfos([""]); // Reset to a single empty input if the option doesn't show input
//     }
//     const nestedAnswers = selectedOption?.showsInput ? [{ question: selectedOption.label || "", answer: additionalInfos }] : [];
//     onChange([option], nestedAnswers);
//   };

//   const handleInputChange = (index: number, value: string) => {
//     const newInfos = [...additionalInfos];
//     newInfos[index] = value;
//     setAdditionalInfos(newInfos);
//     const selectedOption = options.find((opt) => selectedAnswer.includes(opt.value));
//     const nestedAnswers = selectedOption?.showsInput ? [{ question: selectedOption.label || "", answer: newInfos }] : [];
//     onChange(selectedAnswer, nestedAnswers);
//   };

//   const handleAddMore = () => {
//     setAdditionalInfos([...additionalInfos, ""]);
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
//           {additionalInfos.map((info, index) => (
//             <input
//               key={index}
//               type="text"
//               value={info}
//               onChange={(e) => handleInputChange(index, e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-2"
//               placeholder="Please specify..."
//             />
//           ))}
//           <button
//             type="button"
//             onClick={handleAddMore}
//             className="text-primary underline"
//           >
//             Add More
//           </button>
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
//   onChange: (
//     answer: string[],
//     nestedAnswers?: { question: string; answer: string[] }[]
//   ) => void;
//   selectedAnswer: string[];
// }

// const ConditionalButtonRadioQuestion: React.FC<
//   ConditionalButtonRadioQuestionProps
// > = ({
//   question,
//   options,
//   onChange,
//   selectedAnswer = [], // Provide a default value for selectedAnswer
// }) => {
//   const [additionalInfos, setAdditionalInfos] = useState<string[]>([""]);

//   const handleOptionChange = (option: string) => {
//     const selectedOption = options.find((opt) => opt.value === option);
//     if (!selectedOption?.showsInput) {
//       setAdditionalInfos([""]); // Reset to a single empty input if the option doesn't show input
//     }
//     const nestedAnswers = selectedOption?.showsInput
//       ? [{ question: selectedOption.label || "", answer: additionalInfos }]
//       : [];
//     onChange([option], nestedAnswers);
//   };

//   const handleInputChange = (index: number, value: string) => {
//     const newInfos = [...additionalInfos];
//     newInfos[index] = value;
//     setAdditionalInfos(newInfos);
//     const selectedOption = options.find((opt) =>
//       selectedAnswer.includes(opt.value)
//     );
//     const nestedAnswers = selectedOption?.showsInput
//       ? [{ question: selectedOption.label || "", answer: newInfos }]
//       : [];
//     onChange(selectedAnswer, nestedAnswers);
//   };

//   const handleAddMore = () => {
//     setAdditionalInfos([...additionalInfos, ""]);
//   };

//   const selectedOption = options.find((opt) =>
//     selectedAnswer.includes(opt.value)
//   );
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
//           {additionalInfos.map((info, index) => (
//             <input
//               key={index}
//               type="text"
//               value={info}
//               onChange={(e) => handleInputChange(index, e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-2"
//               placeholder="Please specify..."
//             />
//           ))}
//           <button
//             type="button"
//             onClick={handleAddMore}
//             className="text-primary underline"
//           >
//             Add More
//           </button>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default ConditionalButtonRadioQuestion;
// import React, { useState, useEffect, useCallback } from "react";
// import { motion } from "framer-motion";

// interface Option {
//   value: string;
//   showsInput: boolean;
//   label?: string; // Make label optional
// }

// interface ConditionalButtonRadioQuestionProps {
//   question: string;
//   options: Option[];
//   onChange: (
//     answer: string[],
//     nestedAnswers?: { question: string; answer: string[] }[]
//   ) => void;
//   selectedAnswer: string[];
//   nestedAnswers?: { question: string; answer: string[] }[];
// }

// const ConditionalButtoRadioQuestionWithMultipleInputs: React.FC<
//   ConditionalButtonRadioQuestionProps
// > = ({
//   question,
//   options,
//   onChange,
//   selectedAnswer = [], // Provide a default value for selectedAnswer
//   nestedAnswers = [], // Provide a default value for nestedAnswers
// }) => {
//   const [additionalInfos, setAdditionalInfos] = useState<string[]>([]);

//   useEffect(() => {
//     console.log("useEffect triggered", nestedAnswers);
//     if (nestedAnswers.length > 0) {
//       setAdditionalInfos(nestedAnswers[0].answer);
//     } else {
//       setAdditionalInfos([""]);
//     }
//   }, [nestedAnswers]);

//   const handleOptionChange = useCallback((option: string) => {
//     console.log("handleOptionChange triggered", option);
//     const selectedOption = options.find((opt) => opt.value === option);
//     if (!selectedOption?.showsInput) {
//       setAdditionalInfos(["N/A"]); // Set to "N/A" if the option doesn't show input
//     } else {
//       setAdditionalInfos(additionalInfos.length > 0 ? additionalInfos : [""]); // Retain existing values or initialize with an empty input
//     }
//     const nestedAnswers = selectedOption?.showsInput
//       ? [{ question: "Please specify", answer: additionalInfos }]
//       : [{ question: "Please specify", answer: ["N/A"] }];
//     onChange([option], nestedAnswers);
//   }, [options, additionalInfos, onChange]);

//   const handleInputChange = useCallback((index: number, value: string) => {
//     console.log("handleInputChange triggered", index, value);
//     const newInfos = [...additionalInfos];
//     newInfos[index] = value;
//     setAdditionalInfos(newInfos);
//     const selectedOption = options.find((opt) =>
//       selectedAnswer.includes(opt.value)
//     );
//     const nestedAnswers = selectedOption?.showsInput
//       ? [{ question: "Please specify", answer: newInfos }]
//       : [{ question: "Please specify", answer: ["N/A"] }];
//     onChange(selectedAnswer, nestedAnswers);
//   }, [options, additionalInfos, selectedAnswer, onChange]);

//   const handleAddMore = useCallback(() => {
//     console.log("handleAddMore triggered");
//     setAdditionalInfos([...additionalInfos, ""]);
//   }, [additionalInfos]);

//   const selectedOption = options.find((opt) =>
//     selectedAnswer.includes(opt.value)
//   );
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
//           {additionalInfos.map((info, index) => (
//             <input
//               key={index}
//               type="text"
//               value={info}
//               onChange={(e) => handleInputChange(index, e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-2"
//               placeholder="Please specify..."
//             />
//           ))}
//           <button
//             type="button"
//             onClick={handleAddMore}
//             className="text-primary underline"
//           >
//             Add More
//           </button>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default ConditionalButtoRadioQuestionWithMultipleInputs;
import React, { useState, useCallback } from "react";
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

const ConditionalButtoRadioQuestionWithMultipleInputs: React.FC<
  ConditionalButtonRadioQuestionProps
> = ({
  question,
  options,
  onChange,
  selectedAnswer = [], // Provide a default value for selectedAnswer
  nestedAnswers = [], // Provide a default value for nestedAnswers
}) => {
  const [additionalInfos, setAdditionalInfos] = useState<string[]>(
    nestedAnswers.length > 0 ? nestedAnswers[0].answer : [""]
  );

  const handleOptionChange = useCallback(
    (option: string) => {
      console.log("handleOptionChange triggered", option);
      const selectedOption = options.find((opt) => opt.value === option);
      if (!selectedOption?.showsInput) {
        setAdditionalInfos(["N/A"]); // Set to "N/A" if the option doesn't show input
      } else {
        setAdditionalInfos(additionalInfos.length > 0 ? additionalInfos : [""]); // Retain existing values or initialize with an empty input
      }
      const nestedAnswers = selectedOption?.showsInput
        ? [{ question: "Please specify", answer: additionalInfos }]
        : [{ question: "Please specify", answer: ["N/A"] }];
      onChange([option], nestedAnswers);
    },
    [options, additionalInfos, onChange]
  );

  const handleInputChange = useCallback(
    (index: number, value: string) => {
      const newInfos = [...additionalInfos];
      newInfos[index] = value;
      setAdditionalInfos(newInfos);
      const selectedOption = options.find((opt) =>
        selectedAnswer.includes(opt.value)
      );
      const nestedAnswers = selectedOption?.showsInput
        ? [{ question: "Please specify", answer: newInfos }]
        : [{ question: "Please specify", answer: ["N/A"] }];
      onChange(selectedAnswer, nestedAnswers);
    },
    [options, additionalInfos, selectedAnswer, onChange]
  );

  const handleAddMore = useCallback(() => {
    console.log("handleAddMore triggered");
    setAdditionalInfos([...additionalInfos, ""]);
  }, [additionalInfos]);

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
          {additionalInfos.map((info, index) => (
            <input
              key={index}
              type="text"
              value={info}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-2"
              placeholder="Please specify..."
            />
          ))}
          <button
            type="button"
            onClick={handleAddMore}
            className="text-primary underline"
          >
            Add More
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ConditionalButtoRadioQuestionWithMultipleInputs;
