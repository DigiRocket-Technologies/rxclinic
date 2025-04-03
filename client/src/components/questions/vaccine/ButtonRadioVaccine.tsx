// import React from "react";

// interface ButtonRadioQuestionProps {
//   question: string;
//   options: string[];
//   onChange: (answer: string) => void;
//   selectedAnswer: string | null;
// }

// const ButtonRadioQuestion: React.FC<ButtonRadioQuestionProps> = ({
//   question,
//   options,
//   onChange,
//   selectedAnswer,
// }) => {
//   return (
//     <div className="mb-6">
//       <h2 className="text-xl text-center font-medium mb-4">{question}</h2>
//       <div className="flex space-x-4">
//         {options.map((option, index) => (
//           <label
//             key={index}
//             className={`flex-1 p-4 border rounded-lg cursor-pointer text-center ${
//               selectedAnswer === option
//                 ? "bg-primary text-white"
//                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//             }`}
//           >
//             <input
//               type="radio"
//               name="answer"
//               value={option}
//               checked={selectedAnswer === option}
//               onChange={() => onChange(option)}
//               className="hidden"
//             />
//             {option}
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ButtonRadioQuestion;

// import React from "react";

// interface ButtonRadioQuestionProps {
//   question: string;
//   options: string[];
//   onChange: (answer: string[]) => void;
//   selectedAnswer: string[];
// }

// const ButtonRadioQuestion: React.FC<ButtonRadioQuestionProps> = ({
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
//       <h2 className="text-xl text-center font-medium mb-4">{question}</h2>
//       <div className="flex space-x-4">
//         {options.map((option, index) => (
//           <label
//             key={index}
//             className={`flex-1 p-4 border rounded-lg cursor-pointer text-center ${
//               selectedAnswer.includes(option)
//                 ? "bg-primary text-white"
//                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//             }`}
//           >
//             <input
//               type="radio"
//               name="answer"
//               value={option}
//               checked={selectedAnswer.includes(option)}
//               onChange={() => handleOptionChange(option)}
//               className="hidden"
//             />
//             {option}
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ButtonRadioQuestion;

import React from "react";

interface ButtonRadioQuestionProps {
  question: string;
  options: string[];
  onChange: (answer: string[]) => void;
  selectedAnswer: string[];
  name: string;
}

const ButtonRadioQuestion: React.FC<ButtonRadioQuestionProps> = ({
  question,
  options,
  onChange,
  name,
  selectedAnswer = [], // Provide a default value for selectedAnswer
}) => {
  const handleOptionChange = (option: string) => {
    onChange([option]);
  };

  return (
    <div className="mb-6">
      <h1 className="text-lg text-center text-slate-500">{name}</h1>

      <h2 className="text-xl text-center font-medium mb-4">{question}</h2>
      <div className="flex space-x-4">
        {options.map((option, index) => (
          <label
            key={index}
            className={`flex-1 p-4 border rounded-lg cursor-pointer text-center ${
              selectedAnswer.includes(option)
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default ButtonRadioQuestion;
