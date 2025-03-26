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
    <div className="mb-6">
      <h2 className="text-xl font-medium mb-4">{question}</h2>
      <div className="flex items-center">
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Please enter your answer..."
        />
        <select
          value={selectedUnit}
          onChange={handleUnitChange}
          className="ml-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
