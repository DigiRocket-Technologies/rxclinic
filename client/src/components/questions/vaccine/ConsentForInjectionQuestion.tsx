import React, { useState, useEffect } from "react";

interface ConsentForInjectionQuestionProps {
  question: string;
  onChange: (
    answer: string[],
    nestedAnswers?: { question: string; answer: string[] }[]
  ) => void;
  selectedAnswer: string[];
  nestedAnswers?: { question: string; answer: string[] }[];
  name: string;
  formName: string;
}

const ConsentForInjectionQuestion: React.FC<
  ConsentForInjectionQuestionProps
> = ({
  question,
  onChange,
  selectedAnswer,
  name,
  formName,
  nestedAnswers = [],
}) => {
  const [fullName, setFullName] = useState<string>("");
  const [relationship, setRelationship] = useState<string>("");

  // Load persisted data from selectedAnswer and nestedAnswers
  useEffect(() => {
    // Load full name from selectedAnswer
    if (selectedAnswer.length > 0 && selectedAnswer[0]) {
      setFullName(selectedAnswer[0]);
    }

    // Load relationship from nestedAnswers
    if (nestedAnswers.length > 0) {
      const relationshipAnswer = nestedAnswers.find(
        (na) => na.question === "Relationship to person giving consent"
      );
      if (relationshipAnswer?.answer[0]) {
        setRelationship(relationshipAnswer.answer[0]);
      }
    }
  }, [selectedAnswer, nestedAnswers]);

  // Update answers
  const updateNestedAnswers = (
    newFullName: string,
    newRelationship: string
  ) => {
    const nestedAnswers = [
      {
        question: "Relationship to person giving consent",
        answer: [newRelationship],
      },
    ];
    // Set the main answer to the full name
    const mainAnswer = newFullName ? [newFullName] : [];
    onChange(mainAnswer, nestedAnswers);
  };

  // Handle full name change
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFullName = e.target.value;
    setFullName(newFullName);
    updateNestedAnswers(newFullName, relationship);
  };

  // Handle relationship change
  const handleRelationshipChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newRelationship = e.target.value;
    setRelationship(newRelationship);
    updateNestedAnswers(fullName, newRelationship);
  };

  return (
    <div className="max-w-lg mx-auto my-6 p-6 bg-white rounded-xl shadow-md border-2 border-blue-200">
      <h1 className="text-lg text-center italic text-gray-600 mb-2">{name}</h1>
      <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">
        {question}
      </h2>
      <div className="mb-4">
        <p className="text-gray-800">
          <span className="text-lg font-semibold text-black">
            Declaration of Consent:
          </span>
          <br />- I have been explained the information regarding the risks,
          benefits, and potential side effects associated with the {formName}{" "}
          vaccine(s)/injection(s).
          <br />- I have had the opportunity to have my questions answered by
          the pharmacist.
          <br />- I understand the need for observation by the provider for 15
          minutes after my injection.
          <br />- I understand health information may be shared with another
          healthcare provider as necessary for care.
          <br />- I consent to the provider administering the
          vaccine(s)/injection(s) for myself or my child/dependent.
        </p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-800 font-semibold mb-2">
          Enter your full legal name:
        </label>
        <input
          type="text"
          value={fullName}
          onChange={handleFullNameChange}
          className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          placeholder="Enter your full legal name"
        />
      </div>
      {fullName && (
        <div className="mb-4 flex justify-center">
          <p
            className="text-green-500 italic text-3xl"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {fullName}
          </p>
        </div>
      )}
      <div className=" items-center ">
        <label className="text-gray-800 font-semibold">
          Relationship to person giving consent:
        </label>
        <select
          value={relationship}
          onChange={handleRelationshipChange}
          className="p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        >
          <option value="Person receiving service">
            Person receiving service
          </option>
          <option value="Parent (with legal authority to consent)">
            Parent (with legal authority to consent)
          </option>
          <option value="Guardian/legal representative">
            Guardian/legal representative
          </option>
          <option value="Co-decision-maker">Co-decision-maker</option>
          <option value="Specific decision-maker">
            Specific decision-maker
          </option>
        </select>
      </div>
    </div>
  );
};

export default ConsentForInjectionQuestion;
