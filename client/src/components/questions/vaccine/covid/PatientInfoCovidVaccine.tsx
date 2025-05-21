import React, { useState, useImperativeHandle, forwardRef } from "react";

interface PatientInfo {
  firstName: string;
  lastName: string;
  age: number;
}

interface PatientInformationVaccineProps {
  question: string;
  onChange: (info: Partial<PatientInfo>) => void;
  currentPatientIndex: number;
  numPatients: number;
  initialData?: Partial<PatientInfo>;
  validate?: () => boolean;
}

export interface PatientInformationVaccineRef {
  validateForm: () => boolean;
}

const PatientInformationVaccine = forwardRef<
  PatientInformationVaccineRef,
  PatientInformationVaccineProps
>(
  (
    { question, onChange, currentPatientIndex, numPatients, initialData = {} },
    ref
  ) => {
    const [formData, setFormData] = useState<Partial<PatientInfo>>({
      firstName: initialData.firstName || "",
      lastName: initialData.lastName || "",
      age: initialData.age || 0,
    });

    const [errors, setErrors] = useState<
      Partial<Record<keyof PatientInfo, string>>
    >({});

    const validateField = (name: keyof PatientInfo, value: string | number) => {
      if (
        ["firstName", "lastName"].includes(name) &&
        !value.toString().trim()
      ) {
        return `${
          name === "firstName" ? "First Name" : "Last Name"
        } is required`;
      }
      if (
        name === "age" &&
        (!value || isNaN(Number(value)) || Number(value) <= 0)
      ) {
        return "Age is required and must be a positive number";
      }
      return "";
    };

    const validateForm = () => {
      const newErrors: Partial<Record<keyof PatientInfo, string>> = {};
      (["firstName", "lastName", "age"] as (keyof PatientInfo)[]).forEach(
        (field) => {
          const error = validateField(field, formData[field] || "");
          if (error) newErrors[field] = error;
        }
      );
      setErrors(newErrors);
      const isValid = Object.keys(newErrors).length === 0;
      if (isValid) onChange(formData); // Only send data to parent if valid
      return isValid;
    };

    useImperativeHandle(ref, () => ({
      validateForm,
    }));

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: name === "age" ? Number(value) : value,
      }));

      const error = validateField(
        name as keyof PatientInfo,
        name === "age" ? Number(value) : value
      );
      setErrors((prev) => ({ ...prev, [name]: error }));
    };

    return (
      <div className="mb-6">
        <p className="text-3xl font-medium text-center">Patient Information</p>
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
              Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.age ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Age"
              required
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default PatientInformationVaccine;
