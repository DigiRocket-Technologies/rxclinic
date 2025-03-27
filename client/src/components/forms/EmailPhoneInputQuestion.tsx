import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "react-phone-number-input/style.css";

interface EmailPhoneInputQuestionProps {
  question: string;
  onChange: (
    answer: string[],
    nestedAnswers?: { question: string; answer: string[] }[]
  ) => void;
  selectedAnswer: string[];
  nestedAnswers?: { question: string; answer: string[] }[];
}

const EmailPhoneInputQuestion: React.FC<EmailPhoneInputQuestionProps> = ({
  question,
  onChange,
  selectedAnswer = [],
  nestedAnswers = [],
}) => {
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+1"); // Default to Canada as per the image
  const [emailValidationStatus, setEmailValidationStatus] = useState<
    "invalid" | "valid" | "none"
  >("none");
  const [phoneValidationStatus, setPhoneValidationStatus] = useState<
    "invalid" | "valid" | "none"
  >("none");
  const [preferredMethod, setPreferredMethod] = useState<string>("Email");

  // Load persisted data from nestedAnswers
  useEffect(() => {
    if (nestedAnswers.length > 0) {
      const emailAnswer = nestedAnswers.find((na) => na.question === "Email");
      const phoneAnswer = nestedAnswers.find(
        (na) => na.question === "Phone Number"
      );
      const preferredMethodAnswer = nestedAnswers.find(
        (na) => na.question === "Preferred Contact Method"
      );

      // Load email
      if (emailAnswer?.answer[0]) {
        setEmail(emailAnswer.answer[0]);
        validateEmail(emailAnswer.answer[0]);
      }

      // Load phone number
      if (phoneAnswer?.answer[0]) {
        const [savedCode, savedNumber] = phoneAnswer.answer[0].split("|");
        setCountryCode(savedCode);
        setPhoneNumber(savedNumber);
        validatePhoneNumber(savedNumber, savedCode);
      }

      // Load preferred method
      if (preferredMethodAnswer?.answer[0]) {
        setPreferredMethod(preferredMethodAnswer.answer[0]);
      }
    }
  }, [nestedAnswers]);

  // Email validation
  const validateEmail = (email: string) => {
    if (!email) {
      setEmailValidationStatus("none");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setEmailValidationStatus("valid");
      return true;
    } else {
      setEmailValidationStatus("invalid");
      return false;
    }
  };

  // Phone number validation
  const validatePhoneNumber = (number: string, code: string) => {
    if (!number) {
      setPhoneValidationStatus("none");
      return false;
    }

    const fullNumber = `${code}${number}`;
    const phone = parsePhoneNumberFromString(fullNumber);

    if (phone?.isValid()) {
      setPhoneValidationStatus("valid");
      return true;
    } else {
      setPhoneValidationStatus("invalid");
      return false;
    }
  };

  // Update nested answers
  const updateNestedAnswers = (
    newEmail: string,
    newPhoneData: string,
    newPreferredMethod: string
  ) => {
    const nestedAnswers = [
      { question: "Email", answer: [newEmail] },
      { question: "Phone Number", answer: [newPhoneData] },
      { question: "Preferred Contact Method", answer: [newPreferredMethod] },
    ];
    onChange(["Contact Information"], nestedAnswers);
  };

  // Handle email change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
    const phoneData = phoneNumber ? `${countryCode}|${phoneNumber}` : "";
    updateNestedAnswers(newEmail, phoneData, preferredMethod);
  };

  // Handle phone number change
  const handlePhoneChange = (value: string | undefined) => {
    if (!value) {
      setPhoneNumber("");
      setPhoneValidationStatus("none");
      updateNestedAnswers(email, "", preferredMethod);
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
      updateNestedAnswers(email, phoneData, preferredMethod);
    }
  };

  // Handle preferred method change
  const handlePreferredMethodChange = (method: string) => {
    setPreferredMethod(method);
    const phoneData = phoneNumber ? `${countryCode}|${phoneNumber}` : "";
    updateNestedAnswers(email, phoneData, method);
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">{question}</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
            emailValidationStatus === "invalid"
              ? "border-red-500 focus:ring-red-500"
              : emailValidationStatus === "valid"
              ? "border-green-500 focus:ring-green-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="Enter email address"
        />
        {emailValidationStatus === "invalid" && (
          <p className="text-red-500 text-sm mt-1">Invalid email address</p>
        )}
        {emailValidationStatus === "valid" && (
          <p className="text-green-500 text-sm mt-1">Valid email address</p>
        )}
      </div>
      <div className="mb-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry="CA" // Default to Canada as per the image
            value={phoneNumber ? `${countryCode}${phoneNumber}` : ""}
            onChange={handlePhoneChange}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
              phoneValidationStatus === "invalid"
                ? "border-red-500 focus:ring-red-500"
                : phoneValidationStatus === "valid"
                ? "border-green-500 focus:ring-green-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Enter phone number"
          />
          {phoneValidationStatus === "invalid" && (
            <p className="text-red-500 text-sm mt-1">Invalid phone number</p>
          )}
          {phoneValidationStatus === "valid" && (
            <p className="text-green-500 text-sm mt-1">Valid phone number</p>
          )}
        </motion.div>
      </div>
      <div className="flex items-center space-x-4">
        <label className="text-gray-700">
          What is your preferred contact method for notifications?
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="preferredMethod"
              value="Email"
              checked={preferredMethod === "Email"}
              onChange={() => handlePreferredMethodChange("Email")}
              className="mr-2"
            />
            Email
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="preferredMethod"
              value="Text"
              checked={preferredMethod === "Text"}
              onChange={() => handlePreferredMethodChange("Text")}
              className="mr-2"
            />
            Text
          </label>
        </div>
      </div>
    </div>
  );
};

export default EmailPhoneInputQuestion;
