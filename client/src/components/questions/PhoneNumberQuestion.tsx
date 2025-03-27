import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "react-phone-number-input/style.css";

interface Option {
  value: string;
  showsInput: boolean;
}

interface PhoneInputQuestionProps {
  question: string;
  options: Option[];
  onChange: (answer: string[]) => void;
  selectedAnswer: string[];
}

const PhoneInputQuestion: React.FC<PhoneInputQuestionProps> = ({
  question,
  options,
  onChange,
  selectedAnswer = [],
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+91");
  const [validationStatus, setValidationStatus] = useState<
    "invalid" | "valid" | "none"
  >("none");

  // Load persisted phone number from selectedAnswer[1]
  useEffect(() => {
    if (selectedAnswer.length > 1 && selectedAnswer[1]) {
      const [savedCode, savedNumber] = selectedAnswer[1].split("|");
      setCountryCode(savedCode);
      setPhoneNumber(savedNumber);
      validatePhoneNumber(savedNumber, savedCode);
    }
  }, [selectedAnswer]);

  const validatePhoneNumber = (number: string, code: string) => {
    if (!number) {
      setValidationStatus("none");
      return false;
    }

    const fullNumber = `${code}${number}`;
    const phone = parsePhoneNumberFromString(fullNumber);

    if (phone?.isValid()) {
      setValidationStatus("valid");
      return true;
    } else {
      setValidationStatus("invalid");
      return false;
    }
  };

  const handleOptionChange = (option: string) => {
    const selectedOption = options.find((opt) => opt.value === option);
    if (!selectedOption?.showsInput) {
      setPhoneNumber("");
      setCountryCode("+91");
      setValidationStatus("none");
      onChange([option]); // Only the option, no phone number
    } else {
      const phoneData = phoneNumber ? `${countryCode}|${phoneNumber}` : "";
      onChange([option, phoneData]); // Option + phone number in same array
    }
  };

  const handlePhoneChange = (value: string | undefined) => {
    if (!value) {
      setPhoneNumber("");
      setValidationStatus("none");
      onChange([selectedAnswer[0] || "Phone Call", ""]); // Keep option, clear phone
      return;
    }

    const phone = parsePhoneNumberFromString(value);
    if (phone) {
      const code = `+${phone.countryCallingCode}`;
      const number = phone.nationalNumber;
      setCountryCode(code);
      setPhoneNumber(number);
      validatePhoneNumber(number, code);
      const phoneData = `${code}|${number}`;
      onChange([selectedAnswer[0] || "Phone Call", phoneData]); // Option + phone
    }
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
                ? "bg-blue-500 text-white"
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
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry="IN"
            value={phoneNumber ? `${countryCode}${phoneNumber}` : ""}
            onChange={handlePhoneChange}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationStatus === "invalid"
                ? "border-red-500 focus:ring-red-500"
                : validationStatus === "valid"
                ? "border-green-500 focus:ring-green-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Enter phone number"
          />
          {validationStatus === "invalid" && (
            <p className="text-red-500 text-sm mt-1">Invalid phone number</p>
          )}
          {validationStatus === "valid" && (
            <p className="text-green-500 text-sm mt-1">Valid phone number</p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default PhoneInputQuestion;
