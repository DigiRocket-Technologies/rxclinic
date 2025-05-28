// import { useState } from "react";
// import { ArrowLeft, Upload, CheckCircle } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const NewPrescription = () => {
//   const navigate = useNavigate();
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [isCurrentPatient, setIsCurrentPatient] = useState<string | null>(null);
//   const [textWhenReady, setTextWhenReady] = useState(false);
//   const [autoRefill, setAutoRefill] = useState(false);
//   const [questions, setQuestions] = useState("");
//   const [uploadedFiles, setUploadedFiles] = useState<string[]>(["", "", ""]);

//   const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const newFiles = [...uploadedFiles];
//       newFiles[index] = e.target.files[0].name;
//       setUploadedFiles(newFiles);

//       // Show success toast when file is uploaded
//       toast.success(`File "${e.target.files[0].name}" uploaded successfully!`, {
//         position: "top-right",
//       });
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Prescription form submitted");

//     // Show success toast instead of alert
//     toast.success("Prescription request submitted successfully!", {
//       description: "We'll notify you when it's ready.",
//       position: "top-center",
//       duration: 3000,
//     });

//     setTimeout(() => navigate("/"), 1500);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl font-bold text-[#1C2951] bg-clip-text">New Prescription</h1>
//           <button
//             onClick={() => navigate("/")}
//             className="flex items-center text-gray-700 hover:text-[#1C2951] transition-colors"
//           >
//             <ArrowLeft size={20} className="mr-1" />
//             <span>Back</span>
//           </button>
//         </div>

//         <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
//           <div className="w-full md:w-3/4 fade-in">
//             <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 mb-6 shadow-sm">
//               <p className="text-gray-700">
//                 <span className="font-medium text-[#1C2951]">Submit a picture of your new prescription</span> using your phone and we will notify you when it is ready for pick up! Please bring in the original prescription and allow us up to 3 hours to prepare. Thank you!
//               </p>
//             </div>

//             <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//               <div className="mb-8">
//                 <h2 className="font-medium mb-4 text-[#1C2951]">Add prescriptions and/or insurance or healthcards</h2>
//                 <div className="space-y-4">
//                   {uploadedFiles.map((fileName, index) => (
//                     <div key={index} className={`rounded-lg transition-all duration-300 ${fileName ? 'bg-green-50 border border-green-100' : 'bg-gray-50 border border-gray-200'} p-4`}>
//                       <div className="flex items-center">
//                         <label className="inline-block mr-3">
//                           <span className="bg-white border border-gray-300 text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-gray-50 shadow-sm transition-all">
//                             Choose File
//                           </span>
//                           <input
//                             type="file"
//                             className="hidden"
//                             onChange={(e) => handleFileChange(index, e)}
//                           />
//                         </label>
//                         <span className="text-sm text-gray-700 flex-1">
//                           {fileName ? (
//                             <div className="flex items-center">
//                               <CheckCircle size={16} className="text-green-500 mr-2" />
//                               <span>{fileName}</span>
//                             </div>
//                           ) : "No file chosen"}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="mb-8">
//                 <h2 className="font-medium mb-4 text-[#1C2951]">Are you a current patient at this location?</h2>
//                 <div className="flex space-x-8">
//                   <label className="flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-50 hover:border-blue-100 hover:shadow-sm">
//                     <input
//                       type="radio"
//                       name="currentPatient"
//                       value="yes"
//                       checked={isCurrentPatient === "yes"}
//                       onChange={() => setIsCurrentPatient("yes")}
//                       className="mr-3 h-4 w-4 text-blue-600"
//                     />
//                     <span>Yes</span>
//                   </label>
//                   <label className="flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-50 hover:border-blue-100 hover:shadow-sm">
//                     <input
//                       type="radio"
//                       name="currentPatient"
//                       value="no"
//                       checked={isCurrentPatient === "no"}
//                       onChange={() => setIsCurrentPatient("no")}
//                       className="mr-3 h-4 w-4 text-blue-600"
//                     />
//                     <span>No</span>
//                   </label>
//                 </div>
//               </div>

//               <div className="mb-8">
//                 <h2 className="font-medium mb-4 text-[#1C2951]">Questions or Requests For Our Pharmacy Team</h2>
//                 <textarea
//                   value={questions}
//                   onChange={(e) => setQuestions(e.target.value)}
//                   placeholder="Type any questions or requests here..."
//                   className="w-full h-24 border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div className="space-y-6 mb-8">
//                 <div>
//                   <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
//                     First Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="firstName"
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                     required
//                     className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
//                     Last Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="lastName"
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                     required
//                     className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
//                     Phone Number
//                   </label>
//                   <div className="flex mt-1">
//                     <div className="flex items-center border border-gray-300 rounded-l-lg px-4 bg-gray-50">
//                       <span className="text-sm flex items-center">
//                         <img src="https://flagcdn.com/w20/ca.png" alt="Canada" className="h-4 mr-1" />
//                         +1
//                       </span>
//                     </div>
//                     <input
//                       type="tel"
//                       id="phoneNumber"
//                       value={phoneNumber}
//                       onChange={(e) => setPhoneNumber(e.target.value)}
//                       placeholder="Phone number"
//                       className="flex-1 border border-l-0 border-gray-300 rounded-r-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-4 mb-8 bg-gray-50 p-5 rounded-lg border border-gray-100">
//                 <label className="flex items-start cursor-pointer group">
//                   <input
//                     type="checkbox"
//                     checked={textWhenReady}
//                     onChange={() => setTextWhenReady(!textWhenReady)}
//                     className="mt-1 mr-3 h-5 w-5 text-blue-600 rounded"
//                   />
//                   <span className="text-sm group-hover:text-[#1C2951] transition-colors">
//                     Text me when my prescription is ready
//                   </span>
//                 </label>

//                 <label className="flex items-start cursor-pointer group">
//                   <input
//                     type="checkbox"
//                     checked={autoRefill}
//                     onChange={() => setAutoRefill(!autoRefill)}
//                     className="mt-1 mr-3 h-5 w-5 text-blue-600 rounded"
//                   />
//                   <span className="text-sm group-hover:text-[#1C2951] transition-colors">
//                     I want my medications to be refilled automatically when they are due
//                   </span>
//                 </label>
//               </div>

//               <div className="flex justify-center">
//                 <button
//                   type="submit"
//                   className="bg-[#1C2951] text-white font-medium py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors shadow-md hover:shadow-lg"
//                 >
//                   Continue
//                 </button>
//               </div>
//             </form>
//           </div>

//           <div className="w-full md:w-1/4 flex justify-center sticky top-8">
//             <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
//               <img
//                 src="/lovable-uploads/58ea2da2-c29b-4eb7-a8ca-3390f44ec16f.png"
//                 alt="Prescription illustration"
//                 className="max-w-[150px] mx-auto mb-6 hover:scale-105 transition-transform duration-300"
//               />
//               <div className="text-sm text-gray-600">
//                 <p className="mb-3 font-medium text-[#1C2951]">Need help?</p>
//                 <p className="mb-3">Our pharmacy team is available to assist you with your prescription.</p>
//                 <p>Call us at <span className="text-blue-600 font-medium">1-800-123-4567</span></p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewPrescription;

// import { useState } from "react";
// import { ArrowLeft, Upload, CheckCircle } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { submitPrescriptionFormData } from "../utils/api.js";

// const NewPrescription = () => {
//   const navigate = useNavigate();
//   const Name = "New Prescription";
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [isCurrentPatient, setIsCurrentPatient] = useState(null);
//   const [textWhenReady, setTextWhenReady] = useState(false);
//   const [autoRefill, setAutoRefill] = useState(false);
//   const [questions, setQuestions] = useState("");
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

//       // Add basic form fields
//       formData.append("name", Name);
//       formData.append("firstName", firstName);
//       formData.append("lastName", lastName);
//       formData.append("phoneNumber", phoneNumber);
//       formData.append("isCurrentPatient", isCurrentPatient);
//       formData.append("textWhenReady", textWhenReady.toString());
//       formData.append("autoRefill", autoRefill.toString());

//       formData.append("questions", questions);
//       formData.append("submittedAt", new Date().toISOString());

//       // Add files to FormData
//       uploadedFiles.forEach((file, index) => {
//         if (file) {
//           formData.append(`prescriptionFile${index + 1}`, file);
//         }
//       });

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

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl font-bold text-[#1C2951] bg-clip-text">
//             New Prescription
//           </h1>
//           <button
//             onClick={() => navigate("/")}
//             className="flex items-center text-gray-700 hover:text-[#1C2951] transition-colors"
//           >
//             <ArrowLeft size={20} className="mr-1" />
//             <span>Back</span>
//           </button>
//         </div>

//         <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
//           <div className="w-full md:w-3/4 fade-in">
//             <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 mb-6 shadow-sm">
//               <p className="text-gray-700">
//                 <span className="font-medium text-[#1C2951]">
//                   Submit a picture of your new prescription
//                 </span>{" "}
//                 using your phone and we will notify you when it is ready for
//                 pick up! Please bring in the original prescription and allow us
//                 up to 3 hours to prepare. Thank you!
//               </p>
//             </div>

//             <form
//               onSubmit={handleSubmit}
//               className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
//             >
//               <div className="mb-8">
//                 <h2 className="font-medium mb-4 text-[#1C2951]">
//                   Add prescriptions and/or insurance or healthcards
//                 </h2>
//                 <div className="space-y-4">
//                   {fileNames.map((fileName, index) => (
//                     <div
//                       key={index}
//                       className={`rounded-lg transition-all duration-300 ${
//                         fileName
//                           ? "bg-green-50 border border-green-100"
//                           : "bg-gray-50 border border-gray-200"
//                       } p-4`}
//                     >
//                       <div className="flex items-center">
//                         <label className="inline-block mr-3">
//                           <span className="bg-white border border-gray-300 text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-gray-50 shadow-sm transition-all">
//                             Choose File
//                           </span>
//                           <input
//                             type="file"
//                             className="hidden"
//                             accept="image/*"
//                             onChange={(e) => handleFileChange(index, e)}
//                           />
//                         </label>
//                         <span className="text-sm text-gray-700 flex-1">
//                           {fileName ? (
//                             <div className="flex items-center">
//                               <CheckCircle
//                                 size={16}
//                                 className="text-green-500 mr-2"
//                               />
//                               <span>{fileName}</span>
//                             </div>
//                           ) : (
//                             "No file chosen"
//                           )}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="mb-8">
//                 <h2 className="font-medium mb-4 text-[#1C2951]">
//                   Are you a current patient at this location?
//                 </h2>
//                 <div className="flex space-x-8">
//                   <label className="flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-50 hover:border-blue-100 hover:shadow-sm">
//                     <input
//                       type="radio"
//                       name="currentPatient"
//                       value="yes"
//                       checked={isCurrentPatient === "yes"}
//                       onChange={() => setIsCurrentPatient("yes")}
//                       className="mr-3 h-4 w-4 text-blue-600"
//                     />
//                     <span>Yes</span>
//                   </label>
//                   <label className="flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-50 hover:border-blue-100 hover:shadow-sm">
//                     <input
//                       type="radio"
//                       name="currentPatient"
//                       value="no"
//                       checked={isCurrentPatient === "no"}
//                       onChange={() => setIsCurrentPatient("no")}
//                       className="mr-3 h-4 w-4 text-blue-600"
//                     />
//                     <span>No</span>
//                   </label>
//                 </div>
//               </div>

//               <div className="mb-8">
//                 <h2 className="font-medium mb-4 text-[#1C2951]">
//                   Questions or Requests For Our Pharmacy Team
//                 </h2>
//                 <textarea
//                   value={questions}
//                   onChange={(e) => setQuestions(e.target.value)}
//                   placeholder="Type any questions or requests here..."
//                   className="w-full h-24 border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div className="space-y-6 mb-8">
//                 <div>
//                   <label
//                     htmlFor="firstName"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     First Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="firstName"
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                     required
//                     className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="lastName"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Last Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="lastName"
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                     required
//                     className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="phoneNumber"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Phone Number
//                   </label>
//                   <div className="flex mt-1">
//                     <div className="flex items-center border border-gray-300 rounded-l-lg px-4 bg-gray-50">
//                       <span className="text-sm flex items-center">
//                         <img
//                           src="https://flagcdn.com/w20/ca.png"
//                           alt="Canada"
//                           className="h-4 mr-1"
//                         />
//                         +1
//                       </span>
//                     </div>
//                     <input
//                       type="tel"
//                       id="phoneNumber"
//                       value={phoneNumber}
//                       onChange={(e) => setPhoneNumber(e.target.value)}
//                       placeholder="Phone number"
//                       className="flex-1 border border-l-0 border-gray-300 rounded-r-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-4 mb-8 bg-gray-50 p-5 rounded-lg border border-gray-100">
//                 <label className="flex items-start cursor-pointer group">
//                   <input
//                     type="checkbox"
//                     checked={textWhenReady}
//                     onChange={() => setTextWhenReady(!textWhenReady)}
//                     className="mt-1 mr-3 h-5 w-5 text-blue-600 rounded"
//                   />
//                   <span className="text-sm group-hover:text-[#1C2951] transition-colors">
//                     Text me when my prescription is ready
//                   </span>
//                 </label>

//                 <label className="flex items-start cursor-pointer group">
//                   <input
//                     type="checkbox"
//                     checked={autoRefill}
//                     onChange={() => setAutoRefill(!autoRefill)}
//                     className="mt-1 mr-3 h-5 w-5 text-blue-600 rounded"
//                   />
//                   <span className="text-sm group-hover:text-[#1C2951] transition-colors">
//                     I want my medications to be refilled automatically when they
//                     are due
//                   </span>
//                 </label>
//               </div>

//               <div className="flex justify-center">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="bg-[#1C2951] text-white font-medium py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
//                 >
//                   {isSubmitting ? "Submitting..." : "Continue"}
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* <div className="w-full md:w-1/4 flex justify-center sticky top-8">
//             <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
//               <img
//                 src="/lovable-uploads/58ea2da2-c29b-4eb7-a8ca-3390f44ec16f.png"
//                 alt="Prescription illustration"
//                 className="max-w-[150px] mx-auto mb-6 hover:scale-105 transition-transform duration-300"
//               />
//               <div className="text-sm text-gray-600">
//                 <p className="mb-3 font-medium text-[#1C2951]">Need help?</p>
//                 <p className="mb-3">
//                   Our pharmacy team is available to assist you with your
//                   prescription.
//                 </p>
//                 <p>
//                   Call us at{" "}
//                   <span className="text-blue-600 font-medium">
//                     1-800-123-4567
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewPrescription;
import { useState } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { submitPrescriptionFormData } from "../utils/api.js";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "react-phone-number-input/style.css";

const NewPrescription = () => {
  const navigate = useNavigate();
  const Name = "New Prescription";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCurrentPatient, setIsCurrentPatient] = useState(null);
  const [textWhenReady, setTextWhenReady] = useState(false);
  const [autoRefill, setAutoRefill] = useState(false);
  const [questions, setQuestions] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([null, null, null]);
  const [fileNames, setFileNames] = useState(["", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneValidationStatus, setPhoneValidationStatus] = useState<
    "invalid" | "valid" | "none"
  >("none");
  const [formErrors, setFormErrors] = useState({
    isCurrentPatient: false,
    questions: false,
    phoneNumber: false,
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

  const validateForm = () => {
    const errors = {
      isCurrentPatient: isCurrentPatient === null,
      questions: !questions.trim(),
      phoneNumber: !phoneNumber || phoneValidationStatus === "invalid",
    };
    setFormErrors(errors);

    if (errors.isCurrentPatient) {
      toast.error("Please select if you're a current patient");
    }
    if (errors.questions) {
      toast.error("Please enter your questions or requests");
    }
    if (errors.phoneNumber) {
      toast.error("Please enter a valid phone number");
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
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phoneNumber", phoneNumber);
      formData.append("isCurrentPatient", isCurrentPatient);
      formData.append("textWhenReady", textWhenReady.toString());
      formData.append("autoRefill", autoRefill.toString());
      formData.append("questions", questions);
      formData.append("submittedAt", new Date().toISOString());

      uploadedFiles.forEach((file, index) => {
        if (file) {
          formData.append(`prescriptionFile${index + 1}`, file);
        }
      });

      const result = await submitPrescriptionFormData(formData);
      toast.success(result.message);
      navigate("/");
    } catch (error) {
      toast.error("Failed to submit form. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#1C2951] bg-clip-text">
            New Prescription
          </h1>
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-700 hover:text-[#1C2951] transition-colors"
          >
            <ArrowLeft size={20} className="mr-1" />
            <span>Back</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
          <div className="w-full md:w-3/4 fade-in">
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 mb-6 shadow-sm">
              <p className="text-gray-700">
                <span className="font-medium text-[#1C2951]">
                  Submit a picture of your new prescription
                </span>{" "}
                using your phone and we will notify you when it is ready for
                pick up! Please bring in the original prescription and allow us
                up to 3 hours to prepare. Thank you!
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              <div className="mb-8">
                <h2 className="font-medium mb-4 text-[#1C2951]">
                  Add prescriptions and/or insurance or healthcards
                </h2>
                <div className="space-y-4">
                  {fileNames.map((fileName, index) => (
                    <div
                      key={index}
                      className={`rounded-lg transition-all duration-300 ${
                        fileName
                          ? "bg-green-50 border border-green-100"
                          : "bg-gray-50 border border-gray-200"
                      } p-4`}
                    >
                      <div className="flex items-center">
                        <label className="inline-block mr-3">
                          <span className="bg-white border border-gray-300 text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-gray-50 shadow-sm transition-all">
                            Choose File
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFileChange(index, e)}
                          />
                        </label>
                        <span className="text-sm text-gray-700 flex-1">
                          {fileName ? (
                            <div className="flex items-center">
                              <CheckCircle
                                size={16}
                                className="text-green-500 mr-2"
                              />
                              <span>{fileName}</span>
                            </div>
                          ) : (
                            "No file chosen"
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="font-medium mb-4 text-[#1C2951]">
                  Are you a current patient at this location?{" "}
                  <span className="text-red-500">*</span>
                </h2>
                <div className="flex space-x-8">
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-50 hover:border-blue-100 hover:shadow-sm">
                    <input
                      type="radio"
                      name="currentPatient"
                      value="yes"
                      checked={isCurrentPatient === "yes"}
                      onChange={() => {
                        setIsCurrentPatient("yes");
                        setFormErrors({
                          ...formErrors,
                          isCurrentPatient: false,
                        });
                      }}
                      className="mr-3 h-4 w-4 text-blue-600"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-50 hover:border-blue-100 hover:shadow-sm">
                    <input
                      type="radio"
                      name="currentPatient"
                      value="no"
                      checked={isCurrentPatient === "no"}
                      onChange={() => {
                        setIsCurrentPatient("no");
                        setFormErrors({
                          ...formErrors,
                          isCurrentPatient: false,
                        });
                      }}
                      className="mr-3 h-4 w-4 text-blue-600"
                    />
                    <span>No</span>
                  </label>
                </div>
                {formErrors.isCurrentPatient && (
                  <p className="text-red-500 text-sm mt-1">
                    This field is required
                  </p>
                )}
              </div>

              <div className="mb-8">
                <h2 className="font-medium mb-4 text-[#1C2951]">
                  Questions or Requests For Our Pharmacy Team{" "}
                  <span className="text-red-500">*</span>
                </h2>
                <textarea
                  value={questions}
                  onChange={(e) => {
                    setQuestions(e.target.value);
                    setFormErrors({ ...formErrors, questions: false });
                  }}
                  placeholder="Type any questions or requests here..."
                  className={`w-full h-24 border ${
                    formErrors.questions ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all`}
                />
                {formErrors.questions && (
                  <p className="text-red-500 text-sm mt-1">
                    This field is required
                  </p>
                )}
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <PhoneInput
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry="CA"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      formErrors.phoneNumber ||
                      phoneValidationStatus === "invalid"
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
              </div>

              <div className="space-y-4 mb-8 bg-gray-50 p-5 rounded-lg border border-gray-100">
                <label className="flex items-start cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={textWhenReady}
                    onChange={() => setTextWhenReady(!textWhenReady)}
                    className="mt-1 mr-3 h-5 w-5 text-blue-600 rounded"
                  />
                  <span className="text-sm group-hover:text-[#1C2951] transition-colors">
                    Text me when my prescription is ready
                  </span>
                </label>

                <label className="flex items-start cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={autoRefill}
                    onChange={() => setAutoRefill(!autoRefill)}
                    className="mt-1 mr-3 h-5 w-5 text-blue-600 rounded"
                  />
                  <span className="text-sm group-hover:text-[#1C2951] transition-colors">
                    I want my medications to be refilled automatically when they
                    are due
                  </span>
                </label>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#1C2951] text-white font-medium py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Continue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPrescription;
