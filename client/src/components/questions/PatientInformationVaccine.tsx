// src/questions/PatientInformationVaccine.tsx
// import React, { useState, useEffect } from "react";

// interface PatientInfo {
//   firstName: string;
//   lastName: string;
//   dateOfBirth: string;
//   address: string;
//   pronouns?: string;
//   healthCardNumber?: string;
//   hasHealthCard?: string;
// }

// interface PatientInformationVaccineProps {
//   question: string;
//   onChange: (info: Partial<PatientInfo>) => void;
//   currentPatientIndex: number;
//   numPatients: number;
//   initialData?: Partial<PatientInfo>;
//   onDelete?: () => void; // For "Delete Patient" functionality (to be implemented later)
// }

// const PatientInformationVaccine: React.FC<PatientInformationVaccineProps> = ({
//   question,
//   onChange,
//   currentPatientIndex,
//   numPatients,
//   initialData = {},
//   onDelete,
// }) => {
//   const [formData, setFormData] = useState<Partial<PatientInfo>>({
//     firstName: initialData.firstName || "",
//     lastName: initialData.lastName || "",
//     dateOfBirth: initialData.dateOfBirth || "",
//     address: initialData.address || "",
//     pronouns: initialData.pronouns || "",
//     healthCardNumber: initialData.healthCardNumber || "",
//     hasHealthCard: initialData.hasHealthCard || "yes",
//   });

//   // Sync formData to parent state whenever it changes
//   useEffect(() => {
//     onChange(formData);
//   }, [formData, onChange]);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const checked = e.target.checked;
//     setFormData((prev) => ({
//       ...prev,
//       hasHealthCard: checked ? "no" : "yes",
//       healthCardNumber: checked ? "none" : "",
//     }));
//   };

//   const isHealthCardDisabled = formData.hasHealthCard === "no";

//   return (
//     <div className="mb-6">
//       <p className="text-center text-3xl font-medium">{question}</p>
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-medium">
//           Person {currentPatientIndex + 1}/{numPatients}
//         </h2>
//         <button
//           onClick={onDelete}
//           className="text-red-500 border border-red-500 px-3 py-1 rounded-md hover:bg-red-50"
//         >
//           Delete Patient
//         </button>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* First Name */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             First Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleInputChange}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//             placeholder="First Name"
//             required
//           />
//         </div>
//         {/* Last Name */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Last Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleInputChange}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//             placeholder="Last Name"
//             required
//           />
//         </div>
//         {/* Date of Birth */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Date of Birth <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="date"
//             name="dateOfBirth"
//             value={formData.dateOfBirth}
//             onChange={handleInputChange}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//             required
//           />
//         </div>
//         {/* Pronouns */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Pronouns (optional)
//           </label>
//           <input
//             type="text"
//             name="pronouns"
//             value={formData.pronouns || ""}
//             onChange={handleInputChange}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//             placeholder="Pronouns"
//           />
//         </div>
//         {/* Address */}
//         <div className="md:col-span-2">
//           <label className="block text-sm font-medium text-gray-700">
//             Address <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleInputChange}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//             placeholder="Address"
//             required
//           />
//         </div>
//         {/* Health Card Number */}
//         <div className="md:col-span-2">
//           <label className="block text-sm font-medium text-gray-700">
//             Health Card Number (optional)
//           </label>
//           <input
//             type="text"
//             name="healthCardNumber"
//             value={isHealthCardDisabled ? "" : formData.healthCardNumber || ""}
//             onChange={handleInputChange}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//             placeholder="Health Card Number"
//             disabled={isHealthCardDisabled}
//           />
//           <label className="flex items-center mt-2">
//             <input
//               type="checkbox"
//               checked={formData.hasHealthCard === "no"}
//               onChange={handleCheckboxChange}
//               className="mr-2"
//             />
//             I do not have a health card
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientInformationVaccine;

// src/questions/PatientInformationVaccine.tsx
// src/questions/PatientInformationVaccine.tsx
// src/questions/PatientInformationVaccine.tsx
import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";

interface PatientInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  pronouns?: string;
  healthCardNumber?: string;
  hasHealthCard?: string;
}

interface PatientInformationVaccineProps {
  question: string;
  onChange: (info: Partial<PatientInfo>) => void;
  currentPatientIndex: number;
  numPatients: number;
  initialData?: Partial<PatientInfo>;
  onDelete?: () => void;
  validate?: () => boolean;
}

interface PatientInformationVaccineRef {
  validateForm: () => boolean;
}

const PatientInformationVaccine = forwardRef<
  PatientInformationVaccineRef,
  PatientInformationVaccineProps
>(
  (
    {
      question,
      onChange,
      currentPatientIndex,
      numPatients,
      initialData = {},
      onDelete,
    },
    ref
  ) => {
    const [formData, setFormData] = useState<Partial<PatientInfo>>({
      firstName: initialData.firstName || "",
      lastName: initialData.lastName || "",
      dateOfBirth: initialData.dateOfBirth || "",
      address: initialData.address || "",
      pronouns: initialData.pronouns || "",
      healthCardNumber: initialData.healthCardNumber || "",
      hasHealthCard: initialData.hasHealthCard || "yes",
    });

    const [errors, setErrors] = useState<
      Partial<Record<keyof PatientInfo, string>>
    >({});

    useEffect(() => {
      onChange(formData);
    }, [formData, onChange]);

    const validateField = (name: keyof PatientInfo, value: string) => {
      if (
        ["firstName", "lastName", "dateOfBirth", "address"].includes(name) &&
        !value.trim()
      ) {
        return `${
          name === "firstName"
            ? "First Name"
            : name === "lastName"
            ? "Last Name"
            : name === "dateOfBirth"
            ? "Date of Birth"
            : "Address"
        } is required`;
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
          "address",
        ] as (keyof PatientInfo)[]
      ).forEach((field) => {
        const error = validateField(field, formData[field] || "");
        if (error) newErrors[field] = error;
      });
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    useImperativeHandle(ref, () => ({
      validateForm,
    }));

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
        healthCardNumber: checked ? "none" : "",
      }));
    };

    const isHealthCardDisabled = formData.hasHealthCard === "no";

    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">
            Person {currentPatientIndex + 1}/{numPatients}
          </h2>
          <button
            onClick={onDelete}
            className="text-red-500 border border-red-500 px-3 py-1 rounded-md hover:bg-red-50"
          >
            Delete Patient
          </button>
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
              Pronouns (optional)
            </label>
            <input
              type="text"
              name="pronouns"
              value={formData.pronouns || ""}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Pronouns"
            />
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
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Health Card Number"
              disabled={isHealthCardDisabled}
            />
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={formData.hasHealthCard === "no"}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              I do not have a health card
            </label>
          </div>
        </div>
      </div>
    );
  }
);

export default PatientInformationVaccine;
