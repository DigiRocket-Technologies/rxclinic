import React, { useState } from "react";

interface DynamicQuestionProps {
  question: string;
  answer: string[];
  onChange: (answer: string[]) => void;
}

const WeightInputQuestion: React.FC<DynamicQuestionProps> = ({
  question,
  answer,
  onChange,
}) => {
  const units = ["kg", "lb"];
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedUnit, setSelectedUnit] = useState<string>(units[0]);

  // Initialize inputValue and selectedUnit based on the answer prop
  if (answer.length > 0 && answer[0]) {
    const [value, unit] = answer[0].split(" ");
    if (value !== inputValue || unit !== selectedUnit) {
      setInputValue(value);
      setSelectedUnit(unit);
    }
  } else {
    if (inputValue !== "" || selectedUnit !== units[0]) {
      setInputValue("");
      setSelectedUnit(units[0]);
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    onChange([`${value} ${selectedUnit}`]);
  };

  const handleUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const unit = event.target.value;
    setSelectedUnit(unit);
    onChange([`${inputValue} ${unit}`]);
  };

  return (
    <div className="max-w-lg mx-auto my-6 p-6 bg-white rounded-xl shadow-md border-2 border-blue-200">
      <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">
        {question}
      </h2>
      <div className="flex items-center space-x-3">
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg bg-blue-50 text-gray-800 
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
        transition duration-200 hover:bg-blue-100"
          placeholder="Please enter your answer..."
        />
        <select
          value={selectedUnit}
          onChange={handleUnitChange}
          className="px-4 py-2 border-2 border-blue-200 rounded-lg bg-blue-50 text-gray-800 
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
        transition duration-200 hover:bg-blue-100"
        >
          {units.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default WeightInputQuestion;
