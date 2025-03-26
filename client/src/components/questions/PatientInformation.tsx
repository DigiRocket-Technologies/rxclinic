import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "react-phone-number-input/style.css";

interface PatientInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  city: string;
  email: string;
  phoneNumber: string;
  pronouns?: string;
  contactMethod: string;
  newPatient: string;
  healthCardNumber?: string;
  hasHealthCard?: string;
  interestedInTransfer?: string;
}

interface PatientInformationProps {
  onChange: (info: PatientInfo) => void;
  onSubmit: () => void;
}

const PatientInformation: React.FC<PatientInformationProps> = ({
  onChange,
  onSubmit,
}) => {
  const [isNewPatient, setIsNewPatient] = useState<boolean>(true);
  const [hasHealthCard, setHasHealthCard] = useState<boolean>(false);
  const [interestedInTransfer, setInterestedInTransfer] =
    useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    pronouns: "",
    address: "",
    city: "",
    email: "",
    phoneNumber: "",
    contactMethod: "email",
    healthCardNumber: "",
  });
  const [phoneValidationStatus, setPhoneValidationStatus] = useState<
    "invalid" | "valid" | "none"
  >("none");
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});

  const validatePhoneNumber = (value: string) => {
    if (!value) {
      setPhoneValidationStatus("none");
      return false;
    }
    const phone = parsePhoneNumberFromString(value);
    const isValid = phone?.isValid() || false;
    setPhoneValidationStatus(isValid ? "valid" : "invalid");
    return isValid;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePhoneChange = (value: string | undefined) => {
    if (!value) {
      setFormData((prev) => ({ ...prev, phoneNumber: "" }));
      setPhoneValidationStatus("none");
      return;
    }
    const phone = parsePhoneNumberFromString(value);
    if (phone) {
      const e164Number = phone.format("E.164");
      setFormData((prev) => ({ ...prev, phoneNumber: e164Number }));
      validatePhoneNumber(e164Number);
    }
  };

  const handleHasHealthCardChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    setHasHealthCard(checked);
    setFormData((prev) => ({
      ...prev,
      healthCardNumber: checked ? "None" : "",
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};
    const requiredFields: (keyof typeof formData)[] = [
      "firstName",
      "lastName",
      "dateOfBirth",
      "address",
      "city",
      "email",
      "phoneNumber",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = `${field
          .replace(/([A-Z])/g, " $1")
          .trim()
          .toLowerCase()} is required`;
      }
    });

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.phoneNumber && !validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number";
    }

    if (isNewPatient && !hasHealthCard && !formData.healthCardNumber.trim()) {
      newErrors.healthCardNumber = "Health card number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return; // Stop submission if validation fails, errors will show
    }

    const patientInfo: PatientInfo = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      address: formData.address,
      city: formData.city,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      pronouns: formData.pronouns || undefined,
      contactMethod: formData.contactMethod,
      newPatient: isNewPatient ? "Yes" : "No",
      ...(isNewPatient && {
        healthCardNumber: formData.healthCardNumber || undefined,
        hasHealthCard: hasHealthCard ? "Yes" : "No",
        interestedInTransfer: interestedInTransfer ? "Yes" : "No",
      }),
    };

    onChange(patientInfo);
    onSubmit();
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl text-center font-semibold mb-4">
        Patient Information
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`input-field ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="First Name"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`input-field ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Last Name"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className={`input-field ${
              errors.dateOfBirth ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Pronouns (optional)
          </label>
          <input
            type="text"
            name="pronouns"
            value={formData.pronouns}
            onChange={handleInputChange}
            className="input-field border-gray-300"
            placeholder="Pronouns"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className={`input-field ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Address"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className={`input-field ${
              errors.city ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="City"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`input-field ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Email Address"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry="CA"
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.phoneNumber || phoneValidationStatus === "invalid"
                ? "border-red-500 focus:ring-red-500"
                : phoneValidationStatus === "valid"
                ? "border-green-500 focus:ring-green-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Enter phone number"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
          {!errors.phoneNumber && phoneValidationStatus === "invalid" && (
            <p className="text-red-500 text-sm mt-1">Invalid phone number</p>
          )}
          {phoneValidationStatus === "valid" && (
            <p className="text-green-500 text-sm mt-1">Valid phone number</p>
          )}
        </div>
        <div className="mb-4 col-span-2">
          <p className="text-sm font-medium text-gray-700">
            Preferred Contact Method
          </p>
          <div className="flex items-center space-x-4">
            <label className="radio-label">
              <input
                type="radio"
                name="contactMethod"
                value="email"
                checked={formData.contactMethod === "email"}
                onChange={handleRadioChange}
                className="radio-input"
              />
              Email
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="contactMethod"
                value="text"
                checked={formData.contactMethod === "text"}
                onChange={handleRadioChange}
                className="radio-input"
              />
              Text
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="contactMethod"
                value="phone"
                checked={formData.contactMethod === "phone"}
                onChange={handleRadioChange}
                className="radio-input"
              />
              Phone Call
            </label>
          </div>
        </div>
        <div className="mb-4 col-span-2">
          <p className="text-sm font-medium text-gray-700">
            Are you a new patient to this pharmacy or clinic?
          </p>
          <div className="flex items-center space-x-4">
            <label className="radio-label">
              <input
                type="radio"
                name="patientStatus"
                value="yes"
                checked={isNewPatient}
                onChange={() => setIsNewPatient(true)}
                className="radio-input"
              />
              Yes
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="patientStatus"
                value="no"
                checked={!isNewPatient}
                onChange={() => setIsNewPatient(false)}
                className="radio-input"
              />
              No
            </label>
          </div>
        </div>
        {isNewPatient && (
          <div className="mb-4 col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Health Card Number
            </label>
            <input
              type="text"
              name="healthCardNumber"
              value={formData.healthCardNumber}
              onChange={handleInputChange}
              className={`input-field ${
                errors.healthCardNumber ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Health Card Number"
              disabled={hasHealthCard}
            />
            {errors.healthCardNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.healthCardNumber}
              </p>
            )}
            <div className="flex items-center space-x-4 mt-2">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="hasHealthCard"
                  checked={hasHealthCard}
                  onChange={handleHasHealthCardChange}
                  className="checkbox-input"
                />
                I do not have a health card
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="interestedInTransfer"
                  checked={interestedInTransfer}
                  onChange={(e) => setInterestedInTransfer(e.target.checked)}
                  className="checkbox-input"
                />
                I'm interested in learning about transferring my medications
              </label>
            </div>
            <div className="bg-yellow-100 p-4 rounded-xl mt-4">
              <p className="text-sm text-gray-700">
                Please provide the following items during your appointment:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                <li>Your medications, or a list of your medications</li>
                <li>Your health card</li>
                <li>Any insurance cards</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      {!isNewPatient && (
        <div className="bg-red-200 rounded-xl">
          <p className="text-red-600 px-6 py-4">
            Please bring your health and insurance cards to the appointment.
          </p>
        </div>
      )}
      <button
        onClick={handleSubmit}
        className="mt-4 w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  );
};

export default PatientInformation;
