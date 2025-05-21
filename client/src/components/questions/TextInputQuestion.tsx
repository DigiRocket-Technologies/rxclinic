import React from "react";

interface DynamicQuestionProps {
  question: string;
  answer: string[];
  onChange: (answer: string[]) => void;
}

const TextInputQuestion: React.FC<DynamicQuestionProps> = ({
  question,
  answer,
  onChange,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange([value]);
  };

  return (
    // <div className="mb-6">
    //   <h2 className="text-xl font-medium mb-4">{question}</h2>
    //   <input
    //     type="text"
    //     value={answer}
    //     onChange={handleInputChange}
    //     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
    //     placeholder="Please enter your answer..."
    //   />
    // </div>
    <div className="max-w-lg mx-auto my-6 p-6 bg-white rounded-xl shadow-md border-2 border-blue-200">
      <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">
        {question}
      </h2>
      <input
        type="text"
        value={answer}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg bg-blue-50 text-gray-800 
      focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
      transition duration-200 hover:bg-blue-100"
        placeholder="Please enter your answer..."
      />
    </div>
  );
};

export default TextInputQuestion;
