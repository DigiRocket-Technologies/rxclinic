// import { useState } from "react";
// import { ArrowLeft, Camera, FileText, ChevronDown } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const PrescriptionTransfer = () => {
//   const navigate = useNavigate();
//   const [transferType, setTransferType] = useState("");
//   const [selectedOption, setSelectedOption] = useState("");
//   const [previousPharmacyName, setPreviousPharmacyName] = useState("");
//   const [previousPharmacyPhone, setPreviousPharmacyPhone] = useState("");
//   const [prescriptionDetails, setPrescriptionDetails] = useState("");
//   const [questions, setQuestions] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Prescription transfer form submitted");
//     alert("Prescription transfer request submitted successfully!");
//     navigate("/");
//   };

//   // Render transfer type options
//   const renderTransferTypeOptions = () => {
//     return (
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-[#1C2951] mb-2">
//           Transfer Type
//         </label>
//         <div className="relative">
//           <select
//             value={transferType}
//             onChange={(e) => {
//               setTransferType(e.target.value);
//               setSelectedOption(""); // Reset selection when transfer type changes
//             }}
//             className="appearance-none w-64 bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:border-blue-300"
//           >
//             <option value="">Please select</option>
//             <option value="specific">Transfer Specific Prescriptions</option>
//             <option value="all">Transfer All Prescriptions</option>
//           </select>
//           <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//             <ChevronDown size={16} className="text-gray-400" />
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Render transfer method options based on selected transfer type
//   const renderTransferOptions = () => {
//     if (!transferType) {
//       return null; // Don't render anything if no transfer type has been selected
//     }

//     return (
//       <div className="flex gap-4 mt-6">
//         <div
//           className={`flex-1 p-4 rounded-lg ${selectedOption === 'manual' ? 'bg-blue-100' : 'bg-blue-50'} flex flex-col items-center justify-center cursor-pointer`}
//           onClick={() => setSelectedOption('manual')}
//         >
//           <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mb-2">
//             <FileText size={18} className="text-blue-800" />
//           </div>
//           <h3 className="text-sm font-medium text-center">Enter Transfer Information</h3>
//           <p className="text-xs text-center text-gray-500 mt-1">Fill out info manually</p>
//         </div>

//         <div
//           className={`flex-1 p-4 rounded-lg ${selectedOption === 'photos' ? 'bg-blue-100' : 'bg-blue-50'} flex flex-col items-center justify-center cursor-pointer`}
//           onClick={() => setSelectedOption('photos')}
//         >
//           <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mb-2">
//             <Camera size={18} className="text-blue-800" />
//           </div>
//           <h3 className="text-sm font-medium text-center">Add Prescription Photos</h3>
//           <p className="text-xs text-center text-gray-500 mt-1">Submit photos of your prescription(s)</p>
//         </div>
//       </div>
//     );
//   };

//   // Render form based on selected option
//   const renderFormContent = () => {
//     if (!transferType || !selectedOption) {
//       return null; // Don't render anything if no option has been selected
//     }

//     if (selectedOption === 'manual') {
//       return (
//         <div className="mt-6 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-[#1C2951] mb-2">
//               Previous Pharmacy Name
//             </label>
//             <input
//               type="text"
//               value={previousPharmacyName}
//               onChange={(e) => setPreviousPharmacyName(e.target.value)}
//               placeholder="Previous Pharmacy Name"
//               className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-200"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-[#1C2951] mb-2">
//               Previous Pharmacy Phone
//             </label>
//             <div className="flex">
//               <div className="flex items-center border border-gray-300 rounded-l-md px-3 bg-gray-50 text-sm">
//                 ex. 416-123-4567
//               </div>
//               <input
//                 type="tel"
//                 value={previousPharmacyPhone}
//                 onChange={(e) => setPreviousPharmacyPhone(e.target.value)}
//                 className="flex-1 border border-l-0 border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-200"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-[#1C2951] mb-2">
//               Please enter the Rx Numbers or names of the medications you'd like transferred
//             </label>
//             <textarea
//               value={prescriptionDetails}
//               onChange={(e) => setPrescriptionDetails(e.target.value)}
//               placeholder="Enter your prescription number(s) or medication names"
//               className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-200 min-h-[80px] resize-y"
//             />
//           </div>

//           {renderCommonFormFields()}
//         </div>
//       );
//     } else if (selectedOption === 'photos') {
//       return (
//         <div className="mt-6 space-y-4">
//           <div className="p-4 bg-blue-50 text-sm text-blue-800 rounded-md">
//             Please ensure your name, pharmacy name and phone number, and prescription numbers or medication names are in the photos
//           </div>

//           <div>
//             <h3 className="font-medium text-sm mb-3">Add up to 3 Prescription Labels</h3>
//             <div className="space-y-3">
//               {Array.from({ length: 3 }).map((_, index) => (
//                 <div key={index} className="flex">
//                   <label className="inline-block mr-3">
//                     <span className="bg-white border border-gray-300 text-sm px-3 py-1 rounded cursor-pointer hover:bg-gray-50">
//                       Choose File
//                     </span>
//                     <input type="file" className="hidden" />
//                   </label>
//                   <span className="text-sm text-gray-500 flex-1 border-b border-gray-200 pb-2">No file chosen</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {renderCommonFormFields()}
//         </div>
//       );
//     }

//     return null;
//   };

//   // Common form fields for both options
//   const renderCommonFormFields = () => {
//     return (
//       <div className="space-y-4 mt-6">
//         <div>
//           <label className="block text-sm font-medium text-[#1C2951] mb-2">
//             Questions or Requests For Our Pharmacy Team
//           </label>
//           <textarea
//             value={questions}
//             onChange={(e) => setQuestions(e.target.value)}
//             placeholder="Type any questions or requests here..."
//             className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-200 min-h-[80px] resize-y"
//           />
//         </div>

//         <div>
//           <label htmlFor="firstName" className="block text-sm font-medium text-[#1C2951]">
//             First Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             id="firstName"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//             placeholder="First Name *"
//             className="mt-1 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-200"
//           />
//         </div>

//         <div>
//           <label htmlFor="lastName" className="block text-sm font-medium text-[#1C2951]">
//             Last Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             id="lastName"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//             placeholder="Last Name *"
//             className="mt-1 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-200"
//           />
//         </div>

//         <div>
//           <label htmlFor="dateOfBirth" className="block text-sm font-medium text-[#1C2951]">
//             Date of Birth (MM/DD/YYYY)
//           </label>
//           <div className="relative">
//             <input
//               type="text"
//               id="dateOfBirth"
//               value={dateOfBirth}
//               onChange={(e) => setDateOfBirth(e.target.value)}
//               placeholder="MM/DD/YYYY"
//               className="mt-1 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-200"
//             />
//             <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//               <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         <div>
//           <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#1C2951]">
//             Phone Number
//           </label>
//           <div className="flex mt-1">
//             <div className="flex items-center border border-gray-300 rounded-l-md px-3 bg-gray-50">
//               <span className="text-sm flex items-center">
//                 <img src="https://flagcdn.com/w20/ca.png" alt="Canada" className="h-4 mr-1" />
//                 +1
//               </span>
//             </div>
//             <input
//               type="tel"
//               id="phoneNumber"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               placeholder="Phone number"
//               className="flex-1 border border-l-0 border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-200"
//             />
//           </div>
//         </div>

//         <div className="flex justify-center mt-8">
//           <button
//             type="submit"
//             className="bg-[#1C2951] text-white text-sm font-medium py-3 px-8 rounded-md hover:bg-opacity-90 transition-colors"
//           >
//             Continue
//           </button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-white py-8 px-4">
//       <div className="max-w-2xl mx-auto">
//         <div className="flex items-center justify-between mb-5">
//           <h1 className="text-xl font-semibold text-[#1C2951]">Prescription Transfer</h1>
//           <button
//             onClick={() => navigate("/")}
//             className="flex items-center text-gray-700 hover:text-gray-900"
//           >
//             <ArrowLeft size={16} className="mr-1" />
//             <span className="text-sm">Back</span>
//           </button>
//         </div>

//         <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
//           <div className="w-full md:flex-1">
//             <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100 mb-6">
//               <p className="text-gray-700 text-sm">
//                 Transferring your prescriptions to us is quick and easy. Please fill out this form and we will contact you shortly.
//               </p>
//             </div>

//             <div className="border-t border-gray-200 pt-5">
//               <form onSubmit={handleSubmit}>
//                 {renderTransferTypeOptions()}
//                 {renderTransferOptions()}
//                 {renderFormContent()}
//               </form>
//             </div>
//           </div>

//           <div className="w-full md:w-1/4 flex justify-center">
//             <img
//               src="/lovable-uploads/58ea2da2-c29b-4eb7-a8ca-3390f44ec16f.png"
//               alt="Prescription transfer illustration"
//               className="max-w-[120px] md:max-w-[140px] object-contain"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PrescriptionTransfer;

// import { useState } from "react";
// import { ArrowLeft, Camera, FileText, ChevronDown } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { submitPrescriptionFormData } from "../utils/api.js";
// import { toast } from "sonner";

// const PrescriptionTransfer = () => {
//   const navigate = useNavigate();
//   const Name = "Prescription Transfer";
//   const [transferType, setTransferType] = useState("");
//   const [selectedOption, setSelectedOption] = useState("");
//   const [previousPharmacyName, setPreviousPharmacyName] = useState("");
//   const [previousPharmacyPhone, setPreviousPharmacyPhone] = useState("");
//   const [prescriptionDetails, setPrescriptionDetails] = useState("");
//   const [questions, setQuestions] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");

//   const [uploadedFiles, setUploadedFiles] = useState([null, null, null]);
//   const [fileNames, setFileNames] = useState(["", "", ""]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleFileChange = (index, e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       // Store actual file object in state
//       const newFiles = [...uploadedFiles];
//       newFiles[index] = file;
//       setUploadedFiles(newFiles);

//       // Store file name for display purposes
//       const newFileNames = [...fileNames];
//       newFileNames[index] = file.name;
//       setFileNames(newFileNames);

//       toast.success(`File "${file.name}" uploaded successfully!`, {
//         position: "top-right",
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       // Create FormData object to handle file uploads
//       const formData = new FormData();

//       formData.append("name", Name); // "Prescription Transfer"
//       formData.append("formType", "prescription-transfer");
//       formData.append("transferType", transferType);
//       formData.append("refillMethod", selectedOption);
//       formData.append("previousPharmacyName", previousPharmacyName);
//       formData.append("previousPharmacyPhone", previousPharmacyPhone);
//       formData.append("prescriptionDetails", prescriptionDetails);
//       formData.append("questions", questions);
//       formData.append("firstName", firstName);
//       formData.append("lastName", lastName);
//       formData.append("dateOfBirth", dateOfBirth);
//       formData.append("phoneNumber", phoneNumber);
//       formData.append("submittedAt", new Date().toISOString());

//       // Add files to FormData (only if photos option is selected)
//       if (selectedOption === "photos") {
//         uploadedFiles.forEach((file, index) => {
//           if (file) {
//             formData.append(`prescriptionFile${index + 1}`, file);
//           }
//         });
//       }

//       const result = await submitPrescriptionFormData(formData);
//       toast.success(result.message);
//       navigate("/"); // Redirect on success
//     } catch (error) {
//       toast.error("Failed to submit form. Please try again.");
//       console.error("Submission error:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const renderTransferTypeOptions = () => {
//     return (
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-[#1C2951] mb-2">
//           Transfer Type
//         </label>
//         <div className="relative">
//           <select
//             value={transferType}
//             onChange={(e) => {
//               setTransferType(e.target.value);
//               setSelectedOption("");
//             }}
//             className="appearance-none w-64 bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:border-blue-300"
//           >
//             <option value="">Please select</option>
//             <option value="specific">Transfer Specific Prescriptions</option>
//             <option value="all">Transfer All Prescriptions</option>
//           </select>
//           <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//             <ChevronDown size={16} className="text-gray-400" />
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderTransferOptions = () => {
//     if (!transferType) {
//       return null;
//     }

//     return (
//       <div className="flex gap-4 mt-6">
//         <div
//           className={`flex-1 p-4 rounded-lg ${
//             selectedOption === "manual" ? "bg-blue-100" : "bg-blue-50"
//           } flex flex-col items-center justify-center cursor-pointer`}
//           onClick={() => setSelectedOption("manual")}
//         >
//           <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mb-2">
//             <FileText size={18} className="text-blue-800" />
//           </div>
//           <h3 className="text-sm font-medium text-center">
//             Enter Transfer Information
//           </h3>
//           <p className="text-xs text-center text-gray-500 mt-1">
//             Fill out info manually
//           </p>
//         </div>

//         <div
//           className={`flex-1 p-4 rounded-lg ${
//             selectedOption === "photos" ? "bg-blue-100" : "bg-blue-50"
//           } flex flex-col items-center justify-center cursor-pointer`}
//           onClick={() => setSelectedOption("photos")}
//         >
//           <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mb-2">
//             <Camera size={18} className="text-blue-800" />
//           </div>
//           <h3 className="text-sm font-medium text-center">
//             Add Prescription Photos
//           </h3>
//           <p className="text-xs text-center text-gray-500 mt-1">
//             Submit photos of your prescription(s)
//           </p>
//         </div>
//       </div>
//     );
//   };

//   const renderFormContent = () => {
//     if (!transferType || !selectedOption) {
//       return null;
//     }

//     if (selectedOption === "manual") {
//       return (
//         <div className="mt-6 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-[#1C2951] mb-2">
//               Previous Pharmacy Name
//             </label>
//             <input
//               type="text"
//               value={previousPharmacyName}
//               onChange={(e) => setPreviousPharmacyName(e.target.value)}
//               placeholder="Previous Pharmacy Name"
//               className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-200"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-[#1C2951] mb-2">
//               Previous Pharmacy Phone
//             </label>
//             <div className="flex">
//               <div className="flex items-center border border-gray-300 rounded-l-md px-3 bg-gray-50 text-sm">
//                 ex. 416-123-4567
//               </div>
//               <input
//                 type="tel"
//                 value={previousPharmacyPhone}
//                 onChange={(e) => setPreviousPharmacyPhone(e.target.value)}
//                 className="flex-1 border border-l-0 border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-200"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-[#1C2951] mb-2">
//               Please enter the Rx Numbers or names of the medications you'd like
//               transferred
//             </label>
//             <textarea
//               value={prescriptionDetails}
//               onChange={(e) => setPrescriptionDetails(e.target.value)}
//               placeholder="Enter your prescription number(s) or medication names"
//               className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-200 min-h-[80px] resize-y"
//             />
//           </div>

//           {renderCommonFormFields()}
//         </div>
//       );
//     } else if (selectedOption === "photos") {
//       return (
//         <div className="mt-6 space-y-4">
//           <div className="p-4 bg-blue-50 text-sm text-blue-800 rounded-md">
//             Please ensure your name, pharmacy name and phone number, and
//             prescription numbers or medication names are in the photos
//           </div>

//           <div>
//             <h3 className="font-medium text-sm mb-3">
//               Add up to 3 Prescription Labels
//             </h3>
//             <div className="space-y-3">
//               {Array.from({ length: 3 }).map((_, index) => (
//                 <div key={index} className="flex">
//                   <label className="inline-block mr-3">
//                     <span className="bg-white border border-gray-300 text-sm px-3 py-1 rounded cursor-pointer hover:bg-gray-50">
//                       Choose File
//                     </span>
//                     <input
//                       type="file"
//                       className="hidden"
//                       onChange={(e) => handleFileChange(index, e)}
//                       accept="image/*"
//                     />
//                   </label>
//                   <span className="text-sm text-gray-500 flex-1 border-b border-gray-200 pb-2">
//                     {fileNames[index] ? fileNames[index] : "No file chosen"}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {renderCommonFormFields()}
//         </div>
//       );
//     }

//     return null;
//   };

//   const renderCommonFormFields = () => {
//     return (
//       <div className="space-y-4 mt-6">
//         <div>
//           <label className="block text-sm font-medium text-[#1C2951] mb-2">
//             Questions or Requests For Our Pharmacy Team
//           </label>
//           <textarea
//             value={questions}
//             onChange={(e) => setQuestions(e.target.value)}
//             placeholder="Type any questions or requests here..."
//             className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-200 min-h-[80px] resize-y"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="firstName"
//             className="block text-sm font-medium text-[#1C2951]"
//           >
//             First Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             id="firstName"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//             placeholder="First Name *"
//             className="mt-1 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-200"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="lastName"
//             className="block text-sm font-medium text-[#1C2951]"
//           >
//             Last Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             id="lastName"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//             placeholder="Last Name *"
//             className="mt-1 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-200"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="dateOfBirth"
//             className="block text-sm font-medium text-[#1C2951]"
//           >
//             Date of Birth (MM/DD/YYYY)
//           </label>
//           <div className="relative">
//             <input
//               type="text"
//               id="dateOfBirth"
//               value={dateOfBirth}
//               onChange={(e) => setDateOfBirth(e.target.value)}
//               placeholder="MM/DD/YYYY"
//               className="mt-1 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-200"
//             />
//             <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//               <svg
//                 className="w-5 h-5 text-gray-400"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//         <div>
//           <label
//             htmlFor="phoneNumber"
//             className="block text-sm font-medium text-[#1C2951]"
//           >
//             Phone Number
//           </label>
//           <div className="flex mt-1">
//             <div className="flex items-center border border-gray-300 rounded-l-md px-3 bg-gray-50">
//               <span className="text-sm flex items-center">
//                 <img
//                   src="https://flagcdn.com/w20/ca.png"
//                   alt="Canada"
//                   className="h-4 mr-1"
//                 />
//                 +1
//               </span>
//             </div>
//             <input
//               type="tel"
//               id="phoneNumber"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               placeholder="Phone number"
//               className="flex-1 border border-l-0 border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-200"
//             />
//           </div>
//         </div>

//         <div className="flex justify-center mt-8">
//           <button
//             type="submit"
//             className="bg-[#1C2951] text-white text-sm font-medium py-3 px-8 rounded-md hover:bg-opacity-90 transition-colors"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Submitting..." : "Continue"}
//           </button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-white py-8 px-4">
//       <div className="max-w-2xl mx-auto">
//         <div className="flex items-center justify-between mb-5">
//           <h1 className="text-xl font-semibold text-[#1C2951]">
//             Prescription Transfer
//           </h1>
//           <button
//             onClick={() => navigate("/")}
//             className="flex items-center text-gray-700 hover:text-gray-900"
//           >
//             <ArrowLeft size={16} className="mr-1" />
//             <span className="text-sm">Back</span>
//           </button>
//         </div>

//         <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
//           <div className="w-full md:flex-1">
//             <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100 mb-6">
//               <p className="text-gray-700 text-sm">
//                 Transferring your prescriptions to us is quick and easy. Please
//                 fill out this form and we will contact you shortly.
//               </p>
//             </div>

//             <div className="border-t border-gray-200 pt-5">
//               <form onSubmit={handleSubmit}>
//                 {renderTransferTypeOptions()}
//                 {renderTransferOptions()}
//                 {renderFormContent()}
//               </form>
//             </div>
//           </div>

//           {/* <div className="w-full md:w-1/4 flex justify-center">
//             <img
//               src="/lovable-uploads/58ea2da2-c29b-4eb7-a8ca-3390f44ec16f.png"
//               alt="Prescription transfer illustration"
//               className="max-w-[120px] md:max-w-[140px] object-contain"
//             />
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PrescriptionTransfer;
import { useState } from "react";
import { ArrowLeft, Camera, FileText, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { submitPrescriptionTransferFormData } from "../utils/api.js";
import { toast } from "sonner";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "react-phone-number-input/style.css";

const PrescriptionTransfer = () => {
  const navigate = useNavigate();
  const Name = "Prescription Transfer";
  const [transferType, setTransferType] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [previousPharmacyName, setPreviousPharmacyName] = useState("");
  const [previousPharmacyPhone, setPreviousPharmacyPhone] = useState("");
  const [prescriptionDetails, setPrescriptionDetails] = useState("");
  const [questions, setQuestions] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([null, null, null]);
  const [fileNames, setFileNames] = useState(["", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneValidationStatus, setPhoneValidationStatus] = useState<
    "invalid" | "valid" | "none"
  >("none");
  const [previousPhoneValidationStatus, setPreviousPhoneValidationStatus] =
    useState<"invalid" | "valid" | "none">("none");
  const [formErrors, setFormErrors] = useState({
    questions: false,
    dateOfBirth: false,
    phoneNumber: false,
    previousPharmacyName: false,
    previousPharmacyPhone: false,
    prescriptionDetails: false,
  });

  const handleFileChange = (index, e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newFiles = [...uploadedFiles];
      newFiles[index] = file;
      setUploadedFiles(newFiles);

      const newFileNames = [...fileNames];
      newFileNames[index] = file.name;
      setFileNames(newFileNames);

      toast.success(`File "${file.name}" uploaded successfully!`, {
        position: "top-right",
      });
    }
  };

  const validatePhoneNumber = (value: string, isPrevious: boolean = false) => {
    if (!value) {
      if (isPrevious) {
        setPreviousPhoneValidationStatus("none");
      } else {
        setPhoneValidationStatus("none");
      }
      return false;
    }
    const phone = parsePhoneNumberFromString(value);
    const isValid = phone?.isValid() || false;
    if (isPrevious) {
      setPreviousPhoneValidationStatus(isValid ? "valid" : "invalid");
    } else {
      setPhoneValidationStatus(isValid ? "valid" : "invalid");
    }
    return isValid;
  };

  const handlePhoneChange = (value: string | undefined) => {
    if (!value) {
      setPhoneNumber("");
      setPhoneValidationStatus("none");
      setFormErrors({ ...formErrors, phoneNumber: false });
      return;
    }
    const phone = parsePhoneNumberFromString(value);
    if (phone) {
      const e164Number = phone.format("E.164");
      setPhoneNumber(e164Number);
      validatePhoneNumber(e164Number);
      setFormErrors({ ...formErrors, phoneNumber: false });
    }
  };

  const handlePreviousPhoneChange = (value: string | undefined) => {
    if (!value) {
      setPreviousPharmacyPhone("");
      setPreviousPhoneValidationStatus("none");
      setFormErrors({ ...formErrors, previousPharmacyPhone: false });
      return;
    }
    const phone = parsePhoneNumberFromString(value);
    if (phone) {
      const e164Number = phone.format("E.164");
      setPreviousPharmacyPhone(e164Number);
      validatePhoneNumber(e164Number, true);
      setFormErrors({ ...formErrors, previousPharmacyPhone: false });
    }
  };

  const validateForm = () => {
    const errors = {
      questions: !questions.trim(),
      dateOfBirth: !dateOfBirth,
      phoneNumber: !phoneNumber || phoneValidationStatus === "invalid",
      previousPharmacyName:
        selectedOption === "manual" && !previousPharmacyName.trim(),
      previousPharmacyPhone:
        selectedOption === "manual" &&
        (!previousPharmacyPhone || previousPhoneValidationStatus === "invalid"),
      prescriptionDetails:
        selectedOption === "manual" && !prescriptionDetails.trim(),
    };
    setFormErrors(errors);

    if (errors.questions) {
      toast.error("Please enter your questions or requests");
    }
    if (errors.dateOfBirth) {
      toast.error("Please enter a valid date of birth");
    }
    if (errors.phoneNumber) {
      toast.error("Please enter a valid phone number");
    }
    if (errors.previousPharmacyName) {
      toast.error("Please enter previous pharmacy name");
    }
    if (errors.previousPharmacyPhone) {
      toast.error("Please enter a valid previous pharmacy phone number");
    }
    if (errors.prescriptionDetails) {
      toast.error("Please enter prescription details");
    }

    return !Object.values(errors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", Name);
      formData.append("formType", "prescription-transfer");
      formData.append("transferType", transferType);
      formData.append("refillMethod", selectedOption);
      formData.append("previousPharmacyName", previousPharmacyName);
      formData.append("previousPharmacyPhone", previousPharmacyPhone);
      formData.append("prescriptionDetails", prescriptionDetails);
      formData.append("questions", questions);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("dateOfBirth", dateOfBirth);
      formData.append("phoneNumber", phoneNumber);
      formData.append("submittedAt", new Date().toISOString());

      if (selectedOption === "photos") {
        uploadedFiles.forEach((file, index) => {
          if (file) {
            formData.append(`prescriptionFile${index + 1}`, file);
          }
        });
      }

      const result = await submitPrescriptionTransferFormData(formData);
      toast.success(result.message);
      navigate("/");
    } catch (error) {
      toast.error("Failed to submit form. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTransferTypeOptions = () => {
    return (
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#1C2951] mb-2">
          Transfer Type
        </label>
        <div className="relative">
          <select
            value={transferType}
            onChange={(e) => {
              setTransferType(e.target.value);
              setSelectedOption("");
            }}
            className="appearance-none w-64 bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:border-blue-300"
          >
            <option value="">Please select</option>
            <option value="specific">Transfer Specific Prescriptions</option>
            <option value="all">Transfer All Prescriptions</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </div>
    );
  };

  const renderTransferOptions = () => {
    if (!transferType) {
      return null;
    }

    return (
      <div className="flex gap-4 mt-6">
        <div
          className={`flex-1 p-4 rounded-lg ${
            selectedOption === "manual" ? "bg-blue-100" : "bg-blue-50"
          } flex flex-col items-center justify-center cursor-pointer`}
          onClick={() => setSelectedOption("manual")}
        >
          <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mb-2">
            <FileText size={18} className="text-blue-800" />
          </div>
          <h3 className="text-sm font-medium text-center">
            Enter Transfer Information
          </h3>
          <p className="text-xs text-center text-gray-500 mt-1">
            Fill out info manually
          </p>
        </div>

        <div
          className={`flex-1 p-4 rounded-lg ${
            selectedOption === "photos" ? "bg-blue-100" : "bg-blue-50"
          } flex flex-col items-center justify-center cursor-pointer`}
          onClick={() => setSelectedOption("photos")}
        >
          <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mb-2">
            <Camera size={18} className="text-blue-800" />
          </div>
          <h3 className="text-sm font-medium text-center">
            Add Prescription Photos
          </h3>
          <p className="text-xs text-center text-gray-500 mt-1">
            Submit photos of your prescription(s)
          </p>
        </div>
      </div>
    );
  };

  const renderFormContent = () => {
    if (!transferType || !selectedOption) {
      return null;
    }

    if (selectedOption === "manual") {
      return (
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1C2951] mb-2">
              Previous Pharmacy Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={previousPharmacyName}
              onChange={(e) => {
                setPreviousPharmacyName(e.target.value);
                setFormErrors({ ...formErrors, previousPharmacyName: false });
              }}
              placeholder="Previous Pharmacy Name"
              className={`w-full border ${
                formErrors.previousPharmacyName
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-200`}
            />
            {formErrors.previousPharmacyName && (
              <p className="text-red-500 text-sm mt-1">
                This field is required
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1C2951] mb-2">
              Previous Pharmacy Phone <span className="text-red-500">*</span>
            </label>
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry="CA"
              value={previousPharmacyPhone}
              onChange={handlePreviousPhoneChange}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-1 ${
                formErrors.previousPharmacyPhone ||
                previousPhoneValidationStatus === "invalid"
                  ? "border-red-500 focus:ring-red-500"
                  : previousPhoneValidationStatus === "valid"
                  ? "border-green-500 focus:ring-green-500"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              placeholder="Enter pharmacy phone number"
            />
            {formErrors.previousPharmacyPhone && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid phone number
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1C2951] mb-2">
              Please enter the Rx Numbers or names of the medications you'd like
              transferred <span className="text-red-500">*</span>
            </label>
            <textarea
              value={prescriptionDetails}
              onChange={(e) => {
                setPrescriptionDetails(e.target.value);
                setFormErrors({ ...formErrors, prescriptionDetails: false });
              }}
              placeholder="Enter your prescription number(s) or medication names"
              className={`w-full border ${
                formErrors.prescriptionDetails
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-200 min-h-[80px] resize-y`}
            />
            {formErrors.prescriptionDetails && (
              <p className="text-red-500 text-sm mt-1">
                This field is required
              </p>
            )}
          </div>

          {renderCommonFormFields()}
        </div>
      );
    } else if (selectedOption === "photos") {
      return (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-blue-50 text-sm text-blue-800 rounded-md">
            Please ensure your name, pharmacy name and phone number, and
            prescription numbers or medication names are in the photos
          </div>

          <div>
            <h3 className="font-medium text-sm mb-3">
              Add up to 3 Prescription Labels
            </h3>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex">
                  <label className="inline-block mr-3">
                    <span className="bg-white border border-gray-300 text-sm px-3 py-1 rounded cursor-pointer hover:bg-gray-50">
                      Choose File
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileChange(index, e)}
                      accept="image/*"
                    />
                  </label>
                  <span className="text-sm text-gray-500 flex-1 border-b border-gray-200 pb-2">
                    {fileNames[index] ? fileNames[index] : "No file chosen"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {renderCommonFormFields()}
        </div>
      );
    }

    return null;
  };

  const renderCommonFormFields = () => {
    return (
      <div className="space-y-4 mt-6">
        <div>
          <label className="block text-sm font-medium text-[#1C2951] mb-2">
            Questions or Requests For Our Pharmacy Team{" "}
            <span className="text-red-500">*</span>
          </label>
          <textarea
            value={questions}
            onChange={(e) => {
              setQuestions(e.target.value);
              setFormErrors({ ...formErrors, questions: false });
            }}
            placeholder="Type any questions or requests here..."
            className={`w-full border ${
              formErrors.questions ? "border-red-500" : "border-gray-300"
            } rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-200 min-h-[80px] resize-y`}
          />
          {formErrors.questions && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-[#1C2951]"
          >
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First Name *"
            className="mt-1 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-200"
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-[#1C2951]"
          >
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Last Name *"
            className="mt-1 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-200"
          />
        </div>

        <div>
          <label
            htmlFor="dateOfBirth"
            className="block text-sm font-medium text-[#1C2951]"
          >
            Date of Birth (MM/DD/YYYY) <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => {
              setDateOfBirth(e.target.value);
              setFormErrors({ ...formErrors, dateOfBirth: false });
            }}
            max={new Date().toISOString().split("T")[0]}
            className={`mt-1 w-full border ${
              formErrors.dateOfBirth ? "border-red-500" : "border-gray-300"
            } rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-200`}
          />
          {formErrors.dateOfBirth && (
            <p className="text-red-500 text-sm mt-1">
              Please enter a valid date of birth
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1C2951]">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry="CA"
            value={phoneNumber}
            onChange={handlePhoneChange}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-1 ${
              formErrors.phoneNumber || phoneValidationStatus === "invalid"
                ? "border-red-500 focus:ring-red-500"
                : phoneValidationStatus === "valid"
                ? "border-green-500 focus:ring-green-500"
                : "border-gray-300 focus:ring-blue-200"
            }`}
            placeholder="Enter phone number"
          />
          {formErrors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">
              Please enter a valid phone number
            </p>
          )}
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-[#1C2951] text-white text-sm font-medium py-3 px-8 rounded-md hover:bg-opacity-90 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Continue"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-semibold text-[#1C2951]">
            Prescription Transfer
          </h1>
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span className="text-sm">Back</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <div className="w-full md:flex-1">
            <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100 mb-6">
              <p className="text-gray-700 text-sm">
                Transferring your prescriptions to us is quick and easy. Please
                fill out this form and we will contact you shortly.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-5">
              <form onSubmit={handleSubmit}>
                {renderTransferTypeOptions()}
                {renderTransferOptions()}
                {renderFormContent()}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionTransfer;
