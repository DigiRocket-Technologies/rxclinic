import React from "react";
import { Slider } from "../ui/slider";

interface DynamicSliderQuestionProps {
  question: string;
  answer: string[];
  onChange: (answer: string[]) => void;
}

const DynamicSliderQuestion: React.FC<DynamicSliderQuestionProps> = ({
  question,
  answer,
  onChange,
}) => {
  // Ensure the handleSliderChange function matches the expected signature
  const handleSliderChange = (newValue: number[]) => {
    onChange(newValue.map(String)); // Convert numbers to strings
  };

  // Ensure sliderValue is an array of numbers
  const sliderValue = answer.length > 0 ? [parseInt(answer[0], 10)] : [0];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-medium mb-4 text-center">{question}</h2>
      <p className="text-gray-500 text-center mb-4">
        Drag the slider to select a value from 0 to 10
      </p>
      <Slider
        value={sliderValue} // Ensure this is an array of numbers
        onValueChange={handleSliderChange} // Use onValueChange instead of onChange
        min={0} // Set min value to 0
        max={10} // Set max value to 10
        step={1} // Set step to 1
        className="w-full"
      />
      <div className="flex justify-between mt-2">
        {[...Array(11).keys()].map((num) => (
          <span key={num} className="text-xs text-gray-500">
            {num}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DynamicSliderQuestion;
