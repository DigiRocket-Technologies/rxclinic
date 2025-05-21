// import React, { useState } from "react";
// import PhoneInput from "react-phone-number-input";
// import { parsePhoneNumberFromString } from "libphonenumber-js";
// import "react-phone-number-input/style.css";

// interface PatientInfo {
//   firstName: string;
//   lastName: string;
//   dateOfBirth: string;
//   sexAssignedAtBirth: string;
//   address: string;
//   city: string;
//   email: string;
//   phoneNumber: string;
//   contactMethod: string;
//   newPatient: string;
//   healthCardNumber?: string;
// }

// interface PatientInformationProps {
//   onChange: (info: PatientInfo) => void;
// }

// const PatientInformation: React.FC<PatientInformationProps> = ({
//   onChange,
// }) => {
//   const [isNewPatient, setIsNewPatient] = useState<boolean | null>(null);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     dateOfBirth: "",
//     sexAssignedAtBirth: "",
//     address: "",
//     city: "",
//     email: "",
//     phoneNumber: "",
//     contactMethod: "",
//     healthCardNumber: "",
//   });
//   const [phoneValidationStatus, setPhoneValidationStatus] = useState<
//     "invalid" | "valid" | "none"
//   >("none");
//   const [errors, setErrors] = useState<
//     Partial<Record<keyof typeof formData, string>>
//   >({});
//   const [newPatientError, setNewPatientError] = useState<string | null>(null);

//   const validatePhoneNumber = (value: string) => {
//     if (!value) {
//       setPhoneValidationStatus("none");
//       return false;
//     }
//     const phone = parsePhoneNumberFromString(value);
//     const isValid = phone?.isValid() || false;
//     setPhoneValidationStatus(isValid ? "valid" : "invalid");
//     return isValid;
//   };

//   const validateEmail = (email: string) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//     validateForm({ ...formData, [name]: value });
//   };

//   const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     if (name === "patientStatus") {
//       setIsNewPatient(value === "yes");
//       validateForm(formData);
//     } else {
//       setFormData((prevData) => ({ ...prevData, [name]: value }));
//       validateForm({ ...formData, [name]: value });
//     }
//   };

//   const handlePhoneChange = (value: string | undefined) => {
//     if (!value) {
//       setFormData((prev) => ({ ...prev, phoneNumber: "" }));
//       setPhoneValidationStatus("none");
//       validateForm({ ...formData, phoneNumber: "" });
//       return;
//     }
//     const phone = parsePhoneNumberFromString(value);
//     if (phone) {
//       const e164Number = phone.format("E.164");
//       setFormData((prev) => ({ ...prev, phoneNumber: e164Number }));
//       validatePhoneNumber(e164Number);
//       validateForm({ ...formData, phoneNumber: e164Number });
//     }
//   };

//   const validateForm = (updatedData: typeof formData) => {
//     const newErrors: Partial<Record<keyof typeof formData, string>> = {};
//     const requiredFields: (keyof typeof formData)[] = [
//       "firstName",
//       "lastName",
//       "dateOfBirth",
//       "sexAssignedAtBirth",
//       "address",
//       "city",
//       "email",
//       "phoneNumber",
//       "contactMethod",
//     ];

//     requiredFields.forEach((field) => {
//       if (!updatedData[field].trim()) {
//         newErrors[field] = `${field
//           .replace(/([A-Z])/g, " $1")
//           .trim()
//           .toLowerCase()} is required`;
//       }
//     });

//     if (updatedData.email && !validateEmail(updatedData.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     if (
//       updatedData.phoneNumber &&
//       !validatePhoneNumber(updatedData.phoneNumber)
//     ) {
//       newErrors.phoneNumber = "Invalid phone number";
//     }

//     const newPatientValidationError =
//       isNewPatient === null ? "New patient status is required" : null;

//     setErrors(newErrors);
//     setNewPatientError(newPatientValidationError);

//     const patientInfo: PatientInfo = {
//       firstName: updatedData.firstName,
//       lastName: updatedData.lastName,
//       dateOfBirth: updatedData.dateOfBirth,
//       sexAssignedAtBirth: updatedData.sexAssignedAtBirth,
//       address: updatedData.address,
//       city: updatedData.city,
//       email: updatedData.email,
//       phoneNumber: updatedData.phoneNumber,
//       contactMethod: updatedData.contactMethod,
//       newPatient: isNewPatient === null ? "" : isNewPatient ? "yes" : "no",
//       healthCardNumber: updatedData.healthCardNumber || undefined,
//     };

//     if (Object.keys(newErrors).length === 0 && !newPatientValidationError) {
//       onChange(patientInfo);
//     }
//   };

//   // Get today's date in YYYY-MM-DD format for the max attribute
//   const today = new Date().toISOString().split("T")[0];

//   return (
//     <div className="max-w-lg mx-auto my-6 p-6 bg-white rounded-xl shadow-md border-2 border-blue-200">
//       <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">
//         Patient Information
//       </h2>
//       <div className="space-y-4">
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               First Name
//             </label>
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleInputChange}
//               className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.firstName
//                   ? "border-red-500 focus:ring-red-500"
//                   : "border-gray-300 focus:ring-blue-500"
//               }`}
//               placeholder="First Name"
//             />
//             {errors.firstName && (
//               <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
//             )}
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Last Name
//             </label>
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleInputChange}
//               className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.lastName
//                   ? "border-red-500 focus:ring-red-500"
//                   : "border-gray-300 focus:ring-blue-500"
//               }`}
//               placeholder="Last Name"
//             />
//             {errors.lastName && (
//               <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
//             )}
//           </div>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Date of Birth
//           </label>
//           <input
//             type="date"
//             name="dateOfBirth"
//             value={formData.dateOfBirth}
//             onChange={handleInputChange}
//             max={today}
//             className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//               errors.dateOfBirth
//                 ? "border-red-500 focus:ring-red-500"
//                 : "border-gray-300 focus:ring-blue-500"
//             }`}
//           />
//           {errors.dateOfBirth && (
//             <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Sex Assigned at Birth
//           </label>
//           <div className="space-y-2">
//             {["Female", "Male", "Prefer not to say"].map((option, index) => (
//               <label
//                 key={index}
//                 className={`flex items-center p-3 rounded-lg cursor-pointer text-gray-800 hover:bg-blue-50 transition-transform duration-200 hover:scale-[1.02] ${
//                   formData.sexAssignedAtBirth === option
//                     ? "bg-blue-500 text-white hover:text-gray-800"
//                     : ""
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="sexAssignedAtBirth"
//                   value={option}
//                   checked={formData.sexAssignedAtBirth === option}
//                   onChange={handleRadioChange}
//                   className="hidden"
//                 />
//                 <span
//                   className={`w-5 h-5 mr-3 rounded-full border-2 border-blue-300 flex items-center justify-center ${
//                     formData.sexAssignedAtBirth === option ? "bg-blue-500" : ""
//                   }`}
//                 >
//                   {formData.sexAssignedAtBirth === option && (
//                     <span className="w-3 h-3 rounded-full bg-white"></span>
//                   )}
//                 </span>
//                 {option}
//               </label>
//             ))}
//           </div>
//           {errors.sexAssignedAtBirth && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.sexAssignedAtBirth}
//             </p>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Address
//           </label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleInputChange}
//             className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//               errors.address
//                 ? "border-red-500 focus:ring-red-500"
//                 : "border-gray-300 focus:ring-blue-500"
//             }`}
//             placeholder="Address"
//           />
//           {errors.address && (
//             <p className="text-red-500 text-sm mt-1">{errors.address}</p>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             City
//           </label>
//           <input
//             type="text"
//             name="city"
//             value={formData.city}
//             onChange={handleInputChange}
//             className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//               errors.city
//                 ? "border-red-500 focus:ring-red-500"
//                 : "border-gray-300 focus:ring-blue-500"
//             }`}
//             placeholder="City"
//           />
//           {errors.city && (
//             <p className="text-red-500 text-sm mt-1">{errors.city}</p>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Email Address
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//               errors.email
//                 ? "border-red-500 focus:ring-red-500"
//                 : "border-gray-300 focus:ring-blue-500"
//             }`}
//             placeholder="Email Address"
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Phone Number
//           </label>
//           <PhoneInput
//             international
//             countryCallingCodeEditable={false}
//             defaultCountry="CA"
//             value={formData.phoneNumber}
//             onChange={handlePhoneChange}
//             className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//               errors.phoneNumber || phoneValidationStatus === "invalid"
//                 ? "border-red-500 focus:ring-red-500"
//                 : phoneValidationStatus === "valid"
//                 ? "border-green-500 focus:ring-green-500"
//                 : "border-gray-300 focus:ring-blue-500"
//             }`}
//             placeholder="Enter phone number"
//           />
//           {errors.phoneNumber && (
//             <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
//           )}
//           {!errors.phoneNumber && phoneValidationStatus === "invalid" && (
//             <p className="text-red-500 text-sm mt-1">Invalid phone number</p>
//           )}
//           {phoneValidationStatus === "valid" && (
//             <p className="text-green-500 text-sm mt-1">Valid phone number</p>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Health Card Number (optional)
//           </label>
//           <input
//             type="text"
//             name="healthCardNumber"
//             value={formData.healthCardNumber}
//             onChange={handleInputChange}
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
//             placeholder="Health Card Number"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Preferred Contact Method
//           </label>
//           <div className="space-y-2">
//             {["Email", "Text", "Phone Call"].map((option, index) => (
//               <label
//                 key={index}
//                 className={`flex items-center p-3 rounded-lg cursor-pointer text-gray-800 hover:bg-blue-50 transition-transform duration-200 hover:scale-[1.02] ${
//                   formData.contactMethod === option.toLowerCase()
//                     ? "bg-blue-500 text-white hover:text-gray-800"
//                     : ""
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="contactMethod"
//                   value={option.toLowerCase()}
//                   checked={formData.contactMethod === option.toLowerCase()}
//                   onChange={handleRadioChange}
//                   className="hidden"
//                 />
//                 <span
//                   className={`w-5 h-5 mr-3 rounded-full border-2 border-blue-300 flex items-center justify-center ${
//                     formData.contactMethod === option.toLowerCase()
//                       ? "bg-blue-500"
//                       : ""
//                   }`}
//                 >
//                   {formData.contactMethod === option.toLowerCase() && (
//                     <span className="w-3 h-3 rounded-full bg-white"></span>
//                   )}
//                 </span>
//                 {option}
//               </label>
//             ))}
//           </div>
//           {errors.contactMethod && (
//             <p className="text-red-500 text-sm mt-1">{errors.contactMethod}</p>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Are you a new patient to this pharmacy or clinic?
//           </label>
//           <div className="space-y-2">
//             {["Yes", "No"].map((option, index) => (
//               <label
//                 key={index}
//                 className={`flex items-center p-3 rounded-lg cursor-pointer text-gray-800 hover:bg-blue-50 transition-transform duration-200 hover:scale-[1.02] ${
//                   isNewPatient === (option === "Yes")
//                     ? "bg-blue-500 text-white hover:text-gray-800"
//                     : ""
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="patientStatus"
//                   value={option.toLowerCase()}
//                   checked={isNewPatient === (option === "Yes")}
//                   onChange={handleRadioChange}
//                   className="hidden"
//                 />
//                 <span
//                   className={`w-5 h-5 mr-3 rounded-full border-2 border-blue-300 flex items-center justify-center ${
//                     isNewPatient === (option === "Yes") ? "bg-blue-500" : ""
//                   }`}
//                 >
//                   {isNewPatient === (option === "Yes") && (
//                     <span className="w-3 h-3 rounded-full bg-white"></span>
//                   )}
//                 </span>
//                 {option}
//               </label>
//             ))}
//           </div>
//           {newPatientError && (
//             <p className="text-red-500 text-sm mt-1">{newPatientError}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientInformation;

// import React, { useState, forwardRef, useImperativeHandle } from "react";
// import PhoneInput from "react-phone-number-input";
// import { parsePhoneNumberFromString } from "libphonenumber-js";
// import "react-phone-number-input/style.css";

// interface PatientInfo {
//   firstName: string;
//   lastName: string;
//   dateOfBirth: string;
//   sexAssignedAtBirth: string;
//   address: string;
//   city: string;
//   email: string;
//   phoneNumber: string;
//   contactMethod: string;
//   newPatient: string;
//   healthCardNumber?: string;
// }

// interface PatientInformationProps {
//   onChange: (info: PatientInfo) => void;
// }

// interface PatientInformationRef {
//   validateForm: () => boolean;
// }

// const PatientInformation = forwardRef<
//   PatientInformationRef,
//   PatientInformationProps
// >(({ onChange }, ref) => {
//   const [isNewPatient, setIsNewPatient] = useState<boolean | null>(null);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     dateOfBirth: "",
//     sexAssignedAtBirth: "",
//     address: "",
//     city: "",
//     email: "",
//     phoneNumber: "",
//     contactMethod: "",
//     healthCardNumber: "",
//   });
//   const [phoneValidationStatus, setPhoneValidationStatus] = useState<
//     "invalid" | "valid" | "none"
//   >("none");
//   const [errors, setErrors] = useState<
//     Partial<Record<keyof typeof formData, string>>
//   >({});
//   const [newPatientError, setNewPatientError] = useState<string | null>(null);

//   const validatePhoneNumber = (value: string) => {
//     if (!value) {
//       setPhoneValidationStatus("none");
//       return false;
//     }
//     const phone = parsePhoneNumberFromString(value);
//     const isValid = phone?.isValid() || false;
//     setPhoneValidationStatus(isValid ? "valid" : "invalid");
//     return isValid;
//   };

//   const validateEmail = (email: string) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validateForm = (updatedData: typeof formData = formData) => {
//     const newErrors: Partial<Record<keyof typeof formData, string>> = {};
//     const requiredFields: (keyof typeof formData)[] = [
//       "firstName",
//       "lastName",
//       "dateOfBirth",
//       "sexAssignedAtBirth",
//       "address",
//       "city",
//       "email",
//       "phoneNumber",
//       "contactMethod",
//     ];

//     requiredFields.forEach((field) => {
//       if (!updatedData[field].trim()) {
//         newErrors[field] = `${field
//           .replace(/([A-Z])/g, " $1")
//           .trim()
//           .toLowerCase()} is required`;
//       }
//     });

//     if (updatedData.email && !validateEmail(updatedData.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     if (
//       updatedData.phoneNumber &&
//       !validatePhoneNumber(updatedData.phoneNumber)
//     ) {
//       newErrors.phoneNumber = "Invalid phone number";
//     }

//     const newPatientValidationError =
//       isNewPatient === null ? "New patient status is required" : null;

//     setErrors(newErrors);
//     setNewPatientError(newPatientValidationError);

//     const patientInfo: PatientInfo = {
//       firstName: updatedData.firstName,
//       lastName: updatedData.lastName,
//       dateOfBirth: updatedData.dateOfBirth,
//       sexAssignedAtBirth: updatedData.sexAssignedAtBirth,
//       address: updatedData.address,
//       city: updatedData.city,
//       email: updatedData.email,
//       phoneNumber: updatedData.phoneNumber,
//       contactMethod: updatedData.contactMethod,
//       newPatient: isNewPatient === null ? "" : isNewPatient ? "yes" : "no",
//       healthCardNumber: updatedData.healthCardNumber || undefined,
//     };

//     const isValid =
//       Object.keys(newErrors).length === 0 && !newPatientValidationError;
//     if (isValid) {
//       onChange(patientInfo);
//     }
//     return isValid;
//   };

//   useImperativeHandle(ref, () => ({
//     validateForm,
//   }));

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//     validateForm({ ...formData, [name]: value });
//   };

//   const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     if (name === "patientStatus") {
//       setIsNewPatient(value === "yes");
//       validateForm(formData);
//     } else {
//       setFormData((prevData) => ({ ...prevData, [name]: value }));
//       validateForm({ ...formData, [name]: value });
//     }
//   };

//   const handlePhoneChange = (value: string | undefined) => {
//     if (!value) {
//       setFormData((prev) => ({ ...prev, phoneNumber: "" }));
//       setPhoneValidationStatus("none");
//       validateForm({ ...formData, phoneNumber: "" });
//       return;
//     }
//     const phone = parsePhoneNumberFromString(value);
//     if (phone) {
//       const e164Number = phone.format("E.164");
//       setFormData((prev) => ({ ...prev, phoneNumber: e164Number }));
//       validatePhoneNumber(e164Number);
//       validateForm({ ...formData, phoneNumber: e164Number });
//     }
//   };

//   // Get today's date in YYYY-MM-DD format for the max attribute
//   const today = new Date().toISOString().split("T")[0];

//   return (
//     <div className="max-w-lg mx-auto my-6 p-6 bg-white rounded-xl shadow-md border-2 border-blue-200">
//       <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">
//         Patient Information
//       </h2>
//       <div className="space-y-4">
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               First Name
//             </label>
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleInputChange}
//               className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.firstName
//                   ? "border-red-500 focus:ring-red-500"
//                   : "border-gray-300 focus:ring-blue-500"
//               }`}
//               placeholder="First Name"
//             />
//             {errors.firstName && (
//               <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
//             )}
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Last Name
//             </label>
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleInputChange}
//               className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.lastName
//                   ? "border-red-500 focus:ring-red-500"
//                   : "border-gray-300 focus:ring-blue-500"
//               }`}
//               placeholder="Last Name"
//             />
//             {errors.lastName && (
//               <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
//             )}
//           </div>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Date of Birth
//           </label>
//           <input
//             type="date"
//             name="dateOfBirth"
//             value={formData.dateOfBirth}
//             onChange={handleInputChange}
//             max={today}
//             className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//               errors.dateOfBirth
//                 ? "border-red-500 focus:ring-red-500"
//                 : "border-gray-300 focus:ring-blue-500"
//             }`}
//           />
//           {errors.dateOfBirth && (
//             <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Sex Assigned at Birth
//           </label>
//           <div className="space-y-2">
//             {["Female", "Male", "Prefer not to say"].map((option, index) => (
//               <label
//                 key={index}
//                 className={`flex items-center p-3 rounded-lg cursor-pointer text-gray-800 hover:bg-blue-50 transition-transform duration-200 hover:scale-[1.02] ${
//                   formData.sexAssignedAtBirth === option
//                     ? "bg-blue-500 text-white hover:text-gray-800"
//                     : ""
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="sexAssignedAtBirth"
//                   value={option}
//                   checked={formData.sexAssignedAtBirth === option}
//                   onChange={handleRadioChange}
//                   className="hidden"
//                 />
//                 <span
//                   className={`w-5 h-5 mr-3 rounded-full border-2 border-blue-300 flex items-center justify-center ${
//                     formData.sexAssignedAtBirth === option ? "bg-blue-500" : ""
//                   }`}
//                 >
//                   {formData.sexAssignedAtBirth === option && (
//                     <span className="w-3 h-3 rounded-full bg-white"></span>
//                   )}
//                 </span>
//                 {option}
//               </label>
//             ))}
//           </div>
//           {errors.sexAssignedAtBirth && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.sexAssignedAtBirth}
//             </p>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Address
//           </label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleInputChange}
//             className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//               errors.address
//                 ? "border-red-500 focus:ring-red-500"
//                 : "border-gray-300 focus:ring-blue-500"
//             }`}
//             placeholder="Address"
//           />
//           {errors.address && (
//             <p className="text-red-500 text-sm mt-1">{errors.address}</p>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             City
//           </label>
//           <input
//             type="text"
//             name="city"
//             value={formData.city}
//             onChange={handleInputChange}
//             className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//               errors.city
//                 ? "border-red-500 focus:ring-red-500"
//                 : "border-gray-300 focus:ring-blue-500"
//             }`}
//             placeholder="City"
//           />
//           {errors.city && (
//             <p className="text-red-500 text-sm mt-1">{errors.city}</p>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Email Address
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//               errors.email
//                 ? "border-red-500 focus:ring-red-500"
//                 : "border-gray-300 focus:ring-blue-500"
//             }`}
//             placeholder="Email Address"
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Phone Number
//           </label>
//           <PhoneInput
//             international
//             countryCallingCodeEditable={false}
//             defaultCountry="CA"
//             value={formData.phoneNumber}
//             onChange={handlePhoneChange}
//             className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//               errors.phoneNumber || phoneValidationStatus === "invalid"
//                 ? "border-red-500 focus:ring-red-500"
//                 : phoneValidationStatus === "valid"
//                 ? "border-green-500 focus:ring-green-500"
//                 : "border-gray-300 focus:ring-blue-500"
//             }`}
//             placeholder="Enter phone number"
//           />
//           {errors.phoneNumber && (
//             <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
//           )}
//           {!errors.phoneNumber && phoneValidationStatus === "invalid" && (
//             <p className="text-red-500 text-sm mt-1">Invalid phone number</p>
//           )}
//           {phoneValidationStatus === "valid" && (
//             <p className="text-green-500 text-sm mt-1">Valid phone number</p>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Health Card Number (optional)
//           </label>
//           <input
//             type="text"
//             name="healthCardNumber"
//             value={formData.healthCardNumber}
//             onChange={handleInputChange}
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
//             placeholder="Health Card Number"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Preferred Contact Method
//           </label>
//           <div className="space-y-2">
//             {["Email", "Text", "Phone Call"].map((option, index) => (
//               <label
//                 key={index}
//                 className={`flex items-center p-3 rounded-lg cursor-pointer text-gray-800 hover:bg-blue-50 transition-transform duration-200 hover:scale-[1.02] ${
//                   formData.contactMethod === option.toLowerCase()
//                     ? "bg-blue-500 text-white hover:text-gray-800"
//                     : ""
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="contactMethod"
//                   value={option.toLowerCase()}
//                   checked={formData.contactMethod === option.toLowerCase()}
//                   onChange={handleRadioChange}
//                   className="hidden"
//                 />
//                 <span
//                   className={`w-5 h-5 mr-3 rounded-full border-2 border-blue-300 flex items-center justify-center ${
//                     formData.contactMethod === option.toLowerCase()
//                       ? "bg-blue-500"
//                       : ""
//                   }`}
//                 >
//                   {formData.contactMethod === option.toLowerCase() && (
//                     <span className="w-3 h-3 rounded-full bg-white"></span>
//                   )}
//                 </span>
//                 {option}
//               </label>
//             ))}
//           </div>
//           {errors.contactMethod && (
//             <p className="text-red-500 text-sm mt-1">{errors.contactMethod}</p>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Are you a new patient to this pharmacy or clinic?
//           </label>
//           <div className="space-y-2">
//             {["Yes", "No"].map((option, index) => (
//               <label
//                 key={index}
//                 className={`flex items-center p-3 rounded-lg cursor-pointer text-gray-800 hover:bg-blue-50 transition-transform duration-200 hover:scale-[1.02] ${
//                   isNewPatient === (option === "Yes")
//                     ? "bg-blue-500 text-white hover:text-gray-800"
//                     : ""
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="patientStatus"
//                   value={option.toLowerCase()}
//                   checked={isNewPatient === (option === "Yes")}
//                   onChange={handleRadioChange}
//                   className="hidden"
//                 />
//                 <span
//                   className={`w-5 h-5 mr-3 rounded-full border-2 border-blue-300 flex items-center justify-center ${
//                     isNewPatient === (option === "Yes") ? "bg-blue-500" : ""
//                   }`}
//                 >
//                   {isNewPatient === (option === "Yes") && (
//                     <span className="w-3 h-3 rounded-full bg-white"></span>
//                   )}
//                 </span>
//                 {option}
//               </label>
//             ))}
//           </div>
//           {newPatientError && (
//             <p className="text-red-500 text-sm mt-1">{newPatientError}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// });

// export default PatientInformation;
import React, { useState, forwardRef, useImperativeHandle } from "react";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "react-phone-number-input/style.css";

interface PatientInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sexAssignedAtBirth: string;
  address: string;
  city: string;
  email: string;
  phoneNumber: string;
  contactMethod: string;
  newPatient: string;
  healthCardNumber?: string;
}

interface PatientInformationProps {
  onChange: (info: PatientInfo) => void;
  patientInfo?: PatientInfo | null;
}

interface PatientInformationRef {
  validateForm: () => boolean;
}

const PatientInformation = forwardRef<
  PatientInformationRef,
  PatientInformationProps
>(({ onChange, patientInfo }, ref) => {
  const [formData, setFormData] = useState({
    firstName: patientInfo?.firstName || "",
    lastName: patientInfo?.lastName || "",
    dateOfBirth: patientInfo?.dateOfBirth || "",
    sexAssignedAtBirth: patientInfo?.sexAssignedAtBirth || "",
    address: patientInfo?.address || "",
    city: patientInfo?.city || "",
    email: patientInfo?.email || "",
    phoneNumber: patientInfo?.phoneNumber || "",
    contactMethod: patientInfo?.contactMethod || "",
    healthCardNumber: patientInfo?.healthCardNumber || "",
  });
  const [isNewPatient, setIsNewPatient] = useState<boolean | null>(
    patientInfo?.newPatient ? patientInfo.newPatient === "yes" : null
  );
  const [phoneValidationStatus, setPhoneValidationStatus] = useState<
    "invalid" | "valid" | "none"
  >(
    patientInfo?.phoneNumber
      ? parsePhoneNumberFromString(patientInfo.phoneNumber)?.isValid()
        ? "valid"
        : "invalid"
      : "none"
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});
  const [newPatientError, setNewPatientError] = useState<string | null>(null);

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

  const validateForm = (updatedData: typeof formData = formData) => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};
    const requiredFields: (keyof typeof formData)[] = [
      "firstName",
      "lastName",
      "dateOfBirth",
      "sexAssignedAtBirth",
      "address",
      "city",
      "email",
      "phoneNumber",
      "contactMethod",
    ];

    requiredFields.forEach((field) => {
      if (!updatedData[field].trim()) {
        newErrors[field] = `${field
          .replace(/([A-Z])/g, " $1")
          .trim()
          .toLowerCase()} is required`;
      }
    });

    if (updatedData.email && !validateEmail(updatedData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (
      updatedData.phoneNumber &&
      !validatePhoneNumber(updatedData.phoneNumber)
    ) {
      newErrors.phoneNumber = "Invalid phone number";
    }

    const newPatientValidationError =
      isNewPatient === null ? "New patient status is required" : null;

    setErrors(newErrors);
    setNewPatientError(newPatientValidationError);

    return Object.keys(newErrors).length === 0 && !newPatientValidationError;
  };

  useImperativeHandle(ref, () => ({
    validateForm: () => {
      const isValid = validateForm();
      if (isValid) {
        onChange({
          ...formData,
          newPatient: isNewPatient === null ? "" : isNewPatient ? "yes" : "no",
          healthCardNumber: formData.healthCardNumber || undefined,
        });
      }
      return isValid;
    },
  }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      validateForm(updatedData);
      return updatedData;
    });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "patientStatus") {
      const newValue = value === "yes";
      setIsNewPatient(newValue);
      setNewPatientError(null); // Clear error immediately
      validateForm(formData);
    } else {
      setFormData((prevData) => {
        const updatedData = { ...prevData, [name]: value };
        validateForm(updatedData);
        return updatedData;
      });
    }
  };

  const handlePhoneChange = (value: string | undefined) => {
    if (!value) {
      setFormData((prev) => {
        const updatedData = { ...prev, phoneNumber: "" };
        setPhoneValidationStatus("none");
        validateForm(updatedData);
        return updatedData;
      });
      return;
    }
    const phone = parsePhoneNumberFromString(value);
    if (phone) {
      const e164Number = phone.format("E.164");
      setFormData((prev) => {
        const updatedData = { ...prev, phoneNumber: e164Number };
        validatePhoneNumber(e164Number);
        validateForm(updatedData);
        return updatedData;
      });
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-lg mx-auto my-6 p-6 bg-white rounded-xl shadow-md border-2 border-blue-200">
      <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">
        Patient Information
      </h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.firstName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="First Name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.lastName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Last Name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            max={today}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.dateOfBirth
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sex Assigned at Birth
          </label>
          <div className="space-y-2">
            {["Female", "Male", "Prefer not to say"].map((option, index) => (
              <label
                key={index}
                className={`flex items-center p-3 rounded-lg cursor-pointer text-gray-800 hover:bg-blue-50 transition-transform duration-200 hover:scale-[1.02] ${
                  formData.sexAssignedAtBirth === option
                    ? "bg-blue-500 text-white hover:text-gray-800"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="sexAssignedAtBirth"
                  value={option}
                  checked={formData.sexAssignedAtBirth === option}
                  onChange={handleRadioChange}
                  className="hidden"
                />
                <span
                  className={`w-5 h-5 mr-3 rounded-full border-2 border-blue-300 flex items-center justify-center ${
                    formData.sexAssignedAtBirth === option ? "bg-blue-500" : ""
                  }`}
                >
                  {formData.sexAssignedAtBirth === option && (
                    <span className="w-3 h-3 rounded-full bg-white"></span>
                  )}
                </span>
                {option}
              </label>
            ))}
          </div>
          {errors.sexAssignedAtBirth && (
            <p className="text-red-500 text-sm mt-1">
              {errors.sexAssignedAtBirth}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.address
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Address"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.city
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="City"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Email Address"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry="CA"
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Health Card Number (optional)
          </label>
          <input
            type="text"
            name="healthCardNumber"
            value={formData.healthCardNumber}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
            placeholder="Health Card Number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Contact Method
          </label>
          <div className="space-y-2">
            {["Email", "Text", "Phone Call"].map((option, index) => (
              <label
                key={index}
                className={`flex items-center p-3 rounded-lg cursor-pointer text-gray-800 hover:bg-blue-50 transition-transform duration-200 hover:scale-[1.02] ${
                  formData.contactMethod === option.toLowerCase()
                    ? "bg-blue-500 text-white hover:text-gray-800"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="contactMethod"
                  value={option.toLowerCase()}
                  checked={formData.contactMethod === option.toLowerCase()}
                  onChange={handleRadioChange}
                  className="hidden"
                />
                <span
                  className={`w-5 h-5 mr-3 rounded-full border-2 border-blue-300 flex items-center justify-center ${
                    formData.contactMethod === option.toLowerCase()
                      ? "bg-blue-500"
                      : ""
                  }`}
                >
                  {formData.contactMethod === option.toLowerCase() && (
                    <span className="w-3 h-3 rounded-full bg-white"></span>
                  )}
                </span>
                {option}
              </label>
            ))}
          </div>
          {errors.contactMethod && (
            <p className="text-red-500 text-sm mt-1">{errors.contactMethod}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Are you a new patient to this pharmacy or clinic?
          </label>
          <div className="space-y-2">
            {["Yes", "No"].map((option, index) => (
              <label
                key={index}
                className={`flex items-center p-3 rounded-lg cursor-pointer text-gray-800 hover:bg-blue-50 transition-transform duration-200 hover:scale-[1.02] ${
                  isNewPatient === (option === "Yes")
                    ? "bg-blue-500 text-white hover:text-gray-800"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="patientStatus"
                  value={option.toLowerCase()}
                  checked={isNewPatient === (option === "Yes")}
                  onChange={handleRadioChange}
                  className="hidden"
                />
                <span
                  className={`w-5 h-5 mr-3 rounded-full border-2 border-blue-300 flex items-center justify-center ${
                    isNewPatient === (option === "Yes") ? "bg-blue-500" : ""
                  }`}
                >
                  {isNewPatient === (option === "Yes") && (
                    <span className="w-3 h-3 rounded-full bg-white"></span>
                  )}
                </span>
                {option}
              </label>
            ))}
          </div>
          {newPatientError && (
            <p className="text-red-500 text-sm mt-1">{newPatientError}</p>
          )}
        </div>
      </div>
    </div>
  );
});

export default PatientInformation;
