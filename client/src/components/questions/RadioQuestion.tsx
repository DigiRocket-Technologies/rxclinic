// import React from "react";

// interface RadioQuestionProps {
//   question: string;
//   options: string[];
//   onChange: (answer: string) => void;
//   selectedAnswer: string | null;
// }

// const RadioQuestion: React.FC<RadioQuestionProps> = ({
//   question,
//   options,
//   onChange,
//   selectedAnswer,
// }) => {
//   return (
//     <div className="mb-6">
//       <h2 className="text-xl text-center font-medium mb-2">{question}</h2>
//       <div className="flex flex-col items-center space-y-2">
//         {options.map((option, index) => (
//           <label
//             key={index}
//             className="flex items-center w-full max-w-xs justify-start space-x-2 cursor-pointer"
//           >
//             <input
//               type="radio"
//               name="answer"
//               value={option}
//               checked={selectedAnswer === option}
//               onChange={() => onChange(option)}
//               className="text-primary"
//             />
//             <span className="w-full text-left">{option}</span>
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RadioQuestion;
// import React from "react";

// interface RadioQuestionProps {
//   question: string;
//   options: string[];
//   onChange: (answer: string[]) => void;
//   selectedAnswer: string[];
// }

// const RadioQuestion: React.FC<RadioQuestionProps> = ({
//   question,
//   options,
//   onChange,
//   selectedAnswer,
// }) => {
//   const handleOptionChange = (option: string) => {
//     onChange([option]);
//   };

//   return (
//     <div className="mb-6">
//       <h2 className="text-xl text-center font-medium mb-2">{question}</h2>
//       <div className="flex flex-col items-center space-y-2">
//         {options.map((option, index) => (
//           <label
//             key={index}
//             className="flex items-center w-full max-w-xs justify-start space-x-2 cursor-pointer"
//           >
//             <input
//               type="radio"
//               name="answer"
//               value={option}
//               checked={selectedAnswer.includes(option)}
//               onChange={() => handleOptionChange(option)}
//               className="text-primary"
//             />
//             <span className="w-full text-left">{option}</span>
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RadioQuestion;
import React from "react";

interface RadioQuestionProps {
  question: string;
  options: string[];
  onChange: (answer: string[]) => void;
  selectedAnswer: string[];
}

const RadioQuestion: React.FC<RadioQuestionProps> = ({
  question,
  options,
  onChange,
  selectedAnswer = [], // Provide a default value for selectedAnswer
}) => {
  const handleOptionChange = (option: string) => {
    onChange([option]);
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl text-center font-medium mb-2">{question}</h2>
      <div className="flex flex-col items-center space-y-2">
        {options.map((option, index) => (
          <label
            key={index}
            className="flex items-center w-full max-w-xs justify-start space-x-2 cursor-pointer"
          >
            <input
              type="radio"
              name="answer"
              value={option}
              checked={selectedAnswer.includes(option)}
              onChange={() => handleOptionChange(option)}
              className="text-primary"
            />
            <span className="w-full text-left">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioQuestion;
