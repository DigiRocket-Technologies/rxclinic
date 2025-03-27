import React, { useState, useEffect } from "react";

interface ConsentForInjectionQuestionProps {
  question: string;
  onChange: (
    answer: string[],
    nestedAnswers?: { question: string; answer: string[] }[]
  ) => void;
  selectedAnswer: string[];
  nestedAnswers?: { question: string; answer: string[] }[];
}

const ConsentForInjectionQuestion: React.FC<
  ConsentForInjectionQuestionProps
> = ({ question, onChange, selectedAnswer = [], nestedAnswers = [] }) => {
  const [fullName, setFullName] = useState<string>("");
  const [relationship, setRelationship] = useState<string>("");

  // Load persisted data from nestedAnswers
  useEffect(() => {
    if (nestedAnswers.length > 0) {
      const fullNameAnswer = nestedAnswers.find(
        (na) => na.question === "Full Legal Name"
      );
      const relationshipAnswer = nestedAnswers.find(
        (na) => na.question === "Relationship to person giving consent"
      );

      // Load full name
      if (fullNameAnswer?.answer[0]) {
        setFullName(fullNameAnswer.answer[0]);
      }

      // Load relationship
      if (relationshipAnswer?.answer[0]) {
        setRelationship(relationshipAnswer.answer[0]);
      }
    }
  }, [nestedAnswers]);

  // Update nested answers
  const updateNestedAnswers = (
    newFullName: string,
    newRelationship: string
  ) => {
    const nestedAnswers = [
      { question: "Full Legal Name", answer: [newFullName] },
      {
        question: "Relationship to person giving consent",
        answer: [newRelationship],
      },
    ];
    // Set the main answer to "agree" if both fields are filled
    const mainAnswer = newFullName && newRelationship ? ["agree"] : [];
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
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">{question}</h2>
      <div className="mb-4">
        <p className="text-gray-700">
          <span className="text-lg text-black">Declaration of Consent:</span>
          <br />
          - I have been explained the information regarding the risks, benefits
          and potential side effects associated with the Hepatitis A
          vaccine(s)/injection(s).
          <br />
          - I have had the opportunity to have my questions answered by the
          pharmacist.
          <br />
          - I understand the need for observation by the provider for 15 minutes
          after my injection.
          <br />
          - I understand health information may be shared with another
          healthcare provider as necessary for care.
          <br />- I consent to the provider administering the
          vaccine(s)/injection(s) for myself or my child/dependent.
        </p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Enter your full legal name:
        </label>
        <input
          type="text"
          value={fullName}
          onChange={handleFullNameChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your full legal name"
        />
      </div>
      {fullName && (
        <div className="mb-4 flex justify-center">
          <p
            className="text-gray-700 italic text-3xl"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {fullName}
          </p>
        </div>
      )}
      <div className="flex items-center space-x-4">
        <label className="text-gray-700">
          Relationship to person giving consent:
        </label>
        <select
          value={relationship}
          onChange={handleRelationshipChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
