import React, { useState, useImperativeHandle, forwardRef } from "react";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "react-phone-number-input/style.css";
interface PatientInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  healthCardNumber: string;
  address: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  reasonForVisit: string;
  isPregnant: string;
  hasSymptoms: string;
  hadContact: string;
  vaccinationStatus: string;
  hasHealthCard?: string;
}

interface PatientInformationCovidProps {
  question: string;
  onChange: (info: Partial<PatientInfo>) => void;
  currentPatientIndex: number;
  numPatients: number;
  initialData?: Partial<PatientInfo>;
}

export interface PatientInformationCovidRef {
  validateForm: () => boolean;
}

const PatientInformationCovid = forwardRef<
  PatientInformationCovidRef,
  PatientInformationCovidProps
>(
  (
    { question, onChange, currentPatientIndex, numPatients, initialData = {} },
    ref
  ) => {
    const [formData, setFormData] = useState<Partial<PatientInfo>>({
      firstName: initialData.firstName || "",
      lastName: initialData.lastName || "",
      dateOfBirth: initialData.dateOfBirth || "",
      gender: initialData.gender || "",
      healthCardNumber: initialData.healthCardNumber || "",
      address: initialData.address || "",
      city: initialData.city || "",
      postalCode: initialData.postalCode || "",
      phoneNumber: initialData.phoneNumber || "",
      email: initialData.email || "",
      reasonForVisit: initialData.reasonForVisit || "",
      isPregnant: initialData.isPregnant || "",
      hasSymptoms: initialData.hasSymptoms || "",
      hadContact: initialData.hadContact || "",
      vaccinationStatus: initialData.vaccinationStatus || "",
      hasHealthCard: initialData.hasHealthCard || "yes",
    });

    const [errors, setErrors] = useState<
      Partial<Record<keyof PatientInfo, string>>
    >({});

    const validateField = (name: keyof PatientInfo, value: string) => {
      if (
        [
          "firstName",
          "lastName",
          "dateOfBirth",
          "gender",
          "address",
          "city",
          "postalCode",
          "phoneNumber",
          "email",
          "reasonForVisit",
          "isPregnant",
          "hasSymptoms",
          "hadContact",
          "vaccinationStatus",
        ].includes(name) &&
        !value.trim()
      ) {
        return `${
          name === "firstName"
            ? "First Name"
            : name === "lastName"
            ? "Last Name"
            : name === "dateOfBirth"
            ? "Date of Birth"
            : name === "gender"
            ? "Gender"
            : name === "address"
            ? "Address"
            : name === "city"
            ? "City"
            : name === "postalCode"
            ? "Postal Code"
            : name === "phoneNumber"
            ? "Phone Number"
            : name === "email"
            ? "Email"
            : name === "reasonForVisit"
            ? "Reason for Visit"
            : name === "isPregnant"
            ? "Pregnancy Status"
            : name === "hasSymptoms"
            ? "Symptom Status"
            : name === "hadContact"
            ? "Contact Status"
            : "Vaccination Status"
        } is required`;
      }
      if (name === "email" && value.trim() && !value.includes("@")) {
        return "Please enter a valid email address";
      }
      if (name === "phoneNumber" && value.trim()) {
        const phone = parsePhoneNumberFromString(value);
        if (!phone?.isValid()) {
          return "Please enter a valid phone number";
        }
      }

      return "";
    };

    const validateForm = () => {
      const newErrors: Partial<Record<keyof PatientInfo, string>> = {};
      (
        [
          "firstName",
          "lastName",
          "dateOfBirth",
          "gender",
          "address",
          "city",
          "postalCode",
          "phoneNumber",
          "email",
          "reasonForVisit",
          "isPregnant",
          "hasSymptoms",
          "hadContact",
          "vaccinationStatus",
        ] as (keyof PatientInfo)[]
      ).forEach((field) => {
        const error = validateField(field, formData[field] || "");
        if (error) newErrors[field] = error;
      });
      if (
        formData.hasHealthCard === "yes" &&
        !formData.healthCardNumber?.trim()
      ) {
        newErrors.healthCardNumber =
          "Health Card Number is required if you have a health card";
      }
      setErrors(newErrors);
      const isValid = Object.keys(newErrors).length === 0;
      if (isValid) onChange(formData);
      return isValid;
    };

    useImperativeHandle(ref, () => ({
      validateForm,
    }));

    const handlePhoneChange = (value: string | undefined) => {
      if (!value) {
        setFormData((prev) => ({ ...prev, phoneNumber: "" }));
        return;
      }
      const phone = parsePhoneNumberFromString(value);
      if (phone) {
        const e164Number = phone.format("E.164");
        setFormData((prev) => ({ ...prev, phoneNumber: e164Number }));
        validateField("phoneNumber", e164Number);
      }
    };

    const handleInputChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      const error = validateField(name as keyof PatientInfo, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setFormData((prev) => ({
        ...prev,
        hasHealthCard: checked ? "no" : "yes",
        healthCardNumber: checked ? "none" : prev.healthCardNumber || "",
      }));
      setErrors((prev) => ({ ...prev, healthCardNumber: undefined }));
    };

    const isHealthCardDisabled = formData.hasHealthCard === "no";

    return (
      <div className="mb-6">
        <p className="text-3xl font-medium text-center">{question}</p>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">
            Person {currentPatientIndex + 1}/{numPatients}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="First Name"
              required
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Last Name"
              required
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              max={new Date().toISOString().split("T")[0]}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.dateOfBirth ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.gender ? "border-red-500" : "border-gray-300"
              }`}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Address"
              required
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="City"
              required
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Postal Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.postalCode ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Postal Code"
              required
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry="CA"
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter phone number"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Email"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Reason for Visit <span className="text-red-500">*</span>
            </label>
            <textarea
              name="reasonForVisit"
              value={formData.reasonForVisit}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.reasonForVisit ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Reason for Visit"
              required
            />
            {errors.reasonForVisit && (
              <p className="text-red-500 text-sm mt-1">
                {errors.reasonForVisit}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Are you pregnant? <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isPregnant"
                  value="Yes"
                  checked={formData.isPregnant === "Yes"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isPregnant"
                  value="No"
                  checked={formData.isPregnant === "No"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                No
              </label>
            </div>
            {errors.isPregnant && (
              <p className="text-red-500 text-sm mt-1">{errors.isPregnant}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Do you currently have COVID-19 symptoms?{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hasSymptoms"
                  value="Yes"
                  checked={formData.hasSymptoms === "Yes"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hasSymptoms"
                  value="No"
                  checked={formData.hasSymptoms === "No"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                No
              </label>
            </div>
            {errors.hasSymptoms && (
              <p className="text-red-500 text-sm mt-1">{errors.hasSymptoms}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Have you had contact with a confirmed COVID-19 case?{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hadContact"
                  value="Yes"
                  checked={formData.hadContact === "Yes"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hadContact"
                  value="No"
                  checked={formData.hadContact === "No"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                No
              </label>
            </div>
            {errors.hadContact && (
              <p className="text-red-500 text-sm mt-1">{errors.hadContact}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              COVID-19 Vaccination Status{" "}
              <span className="text-red-500">*</span>
            </label>
            <select
              name="vaccinationStatus"
              value={formData.vaccinationStatus}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.vaccinationStatus ? "border-red-500" : "border-gray-300"
              }`}
              required
            >
              <option value="">Select Vaccination Status</option>
              <option value="Fully Vaccinated">Fully Vaccinated</option>
              <option value="Partially Vaccinated">Partially Vaccinated</option>
              <option value="Unvaccinated">Unvaccinated</option>
            </select>
            {errors.vaccinationStatus && (
              <p className="text-red-500 text-sm mt-1">
                {errors.vaccinationStatus}
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Health Card Number (optional)
            </label>
            <input
              type="text"
              name="healthCardNumber"
              value={
                isHealthCardDisabled ? "" : formData.healthCardNumber || ""
              }
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.healthCardNumber ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Health Card Number"
              disabled={isHealthCardDisabled}
            />
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={isHealthCardDisabled}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              I do not have a health card
            </label>
            {errors.healthCardNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.healthCardNumber}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default PatientInformationCovid;
