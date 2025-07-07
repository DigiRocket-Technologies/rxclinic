import { useState } from "react";
import {
  ArrowLeft,
  Camera,
  FileText,
  Edit,
  ChevronDown,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { submitPrescriptionRenewalFormData } from "../utils/api.js";
import { toast } from "sonner";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "react-phone-number-input/style.css";

const PrescriptionRenewal = () => {
  const Name = "Prescription Renewal";
  const navigate = useNavigate();
  const [numberOfItems, setNumberOfItems] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [prescriptionNumbers, setPrescriptionNumbers] = useState("");
  const [questions, setQuestions] = useState("");
  const [hasIssues, setHasIssues] = useState(null);
  const [deliveryOption, setDeliveryOption] = useState("Pick Up");
  const [pickupDate, setPickupDate] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notifyMethod, setNotifyMethod] = useState("");
  const [autoRefill, setAutoRefill] = useState(false);
  const [showAllDueMessage, setShowAllDueMessage] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([null, null, null]);
  const [fileNames, setFileNames] = useState(["", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneValidationStatus, setPhoneValidationStatus] = useState<
    "invalid" | "valid" | "none"
  >("none");
  const [formErrors, setFormErrors] = useState({
    questions: false,
    hasIssues: false,
    deliveryOption: false,
    pickupDate: false,
    phoneNumber: false,
    notifyMethod: false,
    prescriptionNumbers: false,
    deliveryInstructions: false,
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
      questions: !questions.trim(),
      hasIssues: hasIssues === null,
      deliveryOption: !deliveryOption,
      pickupDate: deliveryOption === "Pick Up" && !pickupDate,
      phoneNumber: !phoneNumber || phoneValidationStatus === "invalid",
      notifyMethod: !notifyMethod,
      prescriptionNumbers:
        selectedOption === "manual" && !prescriptionNumbers.trim(),
      deliveryInstructions:
        deliveryOption === "Delivery" && !deliveryInstructions.trim(),
    };
    setFormErrors(errors);

    if (errors.questions) {
      toast.error("Please enter your questions or requests");
    }
    if (errors.hasIssues) {
      toast.error("Please select if you're experiencing any issues");
    }
    if (errors.deliveryOption) {
      toast.error("Please select a delivery option");
    }
    if (errors.pickupDate) {
      toast.error("Please select a pickup date");
    }
    if (errors.phoneNumber) {
      toast.error("Please enter a valid phone number");
    }
    if (errors.notifyMethod) {
      toast.error("Please select a notification method");
    }
    if (errors.prescriptionNumbers) {
      toast.error("Please enter prescription numbers or medication names");
    }
    if (errors.deliveryInstructions) {
      toast.error("Please provide delivery instructions");
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
      formData.append("numberOfItems", numberOfItems);
      formData.append("selectedOption", selectedOption);

      if (selectedOption === "manual") {
        formData.append("prescriptionNumbers", prescriptionNumbers);
      }

      formData.append("requestAllDue", showAllDueMessage.toString());
      formData.append("questions", questions);
      formData.append("hasIssues", hasIssues || "");
      formData.append("deliveryOption", deliveryOption);
      formData.append("pickupDate", pickupDate);
      formData.append("deliveryInstructions", deliveryInstructions);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phoneNumber", phoneNumber);
      formData.append("notifyMethod", notifyMethod);
      formData.append("autoRefill", autoRefill.toString());

      if (selectedOption === "photos") {
        uploadedFiles.forEach((file, index) => {
          if (file) {
            formData.append(`prescriptionFile${index + 1}`, file);
          }
        });
      }

      const result = await submitPrescriptionRenewalFormData(formData);
      toast.success(result.message);
      navigate("/");
    } catch (error) {
      toast.error("Failed to submit form. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSelectionComplete = () => {
    if (!numberOfItems) return false;

    if (numberOfItems === "4+") {
      return selectedOption === "all" || selectedOption === "manual";
    } else if (numberOfItems === "1-3") {
      if (selectedOption === "photos") {
        return uploadedFiles.some((photo) => photo !== null);
      }
      return selectedOption === "manual";
    }

    return false;
  };

  const renderFormContent = () => {
    if (!numberOfItems) {
      return null;
    }

    if (numberOfItems === "4+") {
      return (
        <>
          <div className="flex gap-4 mt-6">
            <div
              className={`flex-1 p-4 rounded-lg ${
                selectedOption === "all" ? "bg-blue-100" : "bg-blue-50"
              } flex flex-col items-center justify-center cursor-pointer`}
              onClick={() => {
                setSelectedOption("all");
                setShowAllDueMessage(true);
              }}
            >
              <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mb-2">
                <FileText size={18} className="text-blue-800" />
              </div>
              <h3 className="text-sm font-medium text-center">
                All Prescriptions That Are Due
              </h3>
              <p className="text-xs text-center text-gray-500 mt-1">
                Request for all due prescriptions
              </p>
            </div>

            <div
              className={`flex-1 p-4 rounded-lg ${
                selectedOption === "manual" ? "bg-blue-100" : "bg-blue-50"
              } flex flex-col items-center justify-center cursor-pointer`}
              onClick={() => {
                setSelectedOption("manual");
                setShowAllDueMessage(false);
              }}
            >
              <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mb-2">
                <FileText size={18} className="text-blue-800" />
              </div>
              <h3 className="text-sm font-medium text-center">
                Enter Prescription Information
              </h3>
              <p className="text-xs text-center text-gray-500 mt-1">
                Fill out info manually
              </p>
            </div>
          </div>

          {selectedOption === "all" && (
            <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-lg text-sm text-center">
              All of your prescriptions that are due will be requested
            </div>
          )}

          {selectedOption === "manual" && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">
                Enter your prescription number(s) or medication names{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={prescriptionNumbers}
                  onChange={(e) => {
                    setPrescriptionNumbers(e.target.value);
                    setFormErrors({
                      ...formErrors,
                      prescriptionNumbers: false,
                    });
                  }}
                  placeholder="E.g: 983242, 983243, Sertraline and both my inhalers"
                  className={`w-full border ${
                    formErrors.prescriptionNumbers
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg p-3 pr-10`}
                />
                <Edit
                  size={18}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
              {formErrors.prescriptionNumbers && (
                <p className="text-red-500 text-sm mt-1">
                  This field is required
                </p>
              )}
            </div>
          )}
        </>
      );
    } else if (numberOfItems === "1-3") {
      return (
        <>
          <div className="flex gap-4 mt-6">
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
                Enter Prescription Information
              </h3>
              <p className="text-xs text-center text-gray-500 mt-1">
                Fill out info manually
              </p>
            </div>
          </div>

          {selectedOption === "photos" && (
            <div className="mt-4">
              <h3 className="font-medium text-sm mb-2">
                Add up to 3 Prescription Labels
              </h3>
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className={`rounded-lg transition-all duration-300 ${
                      fileNames[index]
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
                          capture="environment"
                          onChange={(e) => handleFileChange(index, e)}
                        />
                      </label>
                      <span className="text-sm text-gray-700 flex-1">
                        {fileNames[index] ? (
                          <div className="flex items-center">
                            <CheckCircle
                              size={16}
                              className="text-green-500 mr-2"
                            />
                            <span>{fileNames[index]}</span>
                          </div>
                        ) : (
                          "No file chosen"
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {selectedOption === "photos" &&
                !uploadedFiles.some((photo) => photo !== null) && (
                  <p className="text-sm text-red-500 mt-2">
                    Please upload at least one prescription photo
                  </p>
                )}
            </div>
          )}

          {selectedOption === "manual" && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">
                Enter your prescription number(s) or medication names{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={prescriptionNumbers}
                  onChange={(e) => {
                    setPrescriptionNumbers(e.target.value);
                    setFormErrors({
                      ...formErrors,
                      prescriptionNumbers: false,
                    });
                  }}
                  placeholder="E.g: 983242, 983243, Sertraline and both my inhalers"
                  className={`w-full border ${
                    formErrors.prescriptionNumbers
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg p-3 pr-10`}
                />
                <Edit
                  size={18}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
              {formErrors.prescriptionNumbers && (
                <p className="text-red-500 text-sm mt-1">
                  This field is required
                </p>
              )}
            </div>
          )}
        </>
      );
    }

    return null;
  };

  const renderRemainingForm = () => {
    if (!isSelectionComplete()) {
      return null;
    }

    return (
      <>
        <div className="mt-6">
          <label className="block text-sm font-medium text-[#1C2951] mb-2">
            Questions, requests, or over-the-counter (OTC) products you would
            like with your refill <span className="text-red-500">*</span>
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

        <div className="mt-6">
          <label className="block text-sm font-medium text-[#1C2951] mb-2">
            With your current medication(s), are you experiencing any issues?{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-6 mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="hasIssues"
                value="yes"
                checked={hasIssues === "yes"}
                onChange={() => {
                  setHasIssues("yes");
                  setFormErrors({ ...formErrors, hasIssues: false });
                }}
                className="form-radio"
              />
              <span className="ml-2">Yes</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="radio"
                name="hasIssues"
                value="no"
                checked={hasIssues === "no"}
                onChange={() => {
                  setHasIssues("no");
                  setFormErrors({ ...formErrors, hasIssues: false });
                }}
                className="form-radio"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
          {formErrors.hasIssues && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-[#1C2951] mb-2">
            Pick Up or Delivery? <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={deliveryOption}
              onChange={(e) => {
                setDeliveryOption(e.target.value);
                setFormErrors({
                  ...formErrors,
                  deliveryOption: false,
                  pickupDate: false,
                  deliveryInstructions: false,
                });
              }}
              className={`appearance-none w-40 bg-white border ${
                formErrors.deliveryOption ? "border-red-500" : "border-gray-300"
              } text-gray-700 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:ring-1 focus:ring-blue-200`}
            >
              <option value="">Select option</option>
              <option>Pick Up</option>
              <option>Delivery</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
          {formErrors.deliveryOption && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        {deliveryOption === "Pick Up" && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-[#1C2951] mb-2">
              When would you like to pick up your prescription?{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={pickupDate}
                onChange={(e) => {
                  setPickupDate(e.target.value);
                  setFormErrors({ ...formErrors, pickupDate: false });
                }}
                className={`appearance-none w-40 bg-white border ${
                  formErrors.pickupDate ? "border-red-500" : "border-gray-300"
                } text-gray-700 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:ring-1 focus:ring-blue-200`}
              >
                <option value="">Select day</option>
                <option>Saturday</option>
                <option>Sunday</option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
            {formErrors.pickupDate && (
              <p className="text-red-500 text-sm mt-1">
                This field is required
              </p>
            )}
          </div>
        )}

        {deliveryOption === "Delivery" && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-[#1C2951] mb-2">
              Please provide any delivery instructions{" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              value={deliveryInstructions}
              onChange={(e) => {
                setDeliveryInstructions(e.target.value);
                setFormErrors({ ...formErrors, deliveryInstructions: false });
              }}
              placeholder="Enter delivery instructions"
              className={`w-full border ${
                formErrors.deliveryInstructions
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-200 min-h-[80px] resize-y`}
            />
            {formErrors.deliveryInstructions && (
              <p className="text-red-500 text-sm mt-1">
                This field is required
              </p>
            )}
          </div>
        )}

        <div className="space-y-4 mt-6">
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
              className="mt-1 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-200"
            />
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
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-[#1C2951] mb-3">
            Notify me when ready by: <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-6">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="notifyMethod"
                value="Email"
                checked={notifyMethod === "Email"}
                onChange={() => {
                  setNotifyMethod("Email");
                  setFormErrors({ ...formErrors, notifyMethod: false });
                }}
                className="form-radio"
              />
              <span className="ml-2">Email</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="radio"
                name="notifyMethod"
                value="Call"
                checked={notifyMethod === "Call"}
                onChange={() => {
                  setNotifyMethod("Call");
                  setFormErrors({ ...formErrors, notifyMethod: false });
                }}
                className="form-radio"
              />
              <span className="ml-2">Call</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="radio"
                name="notifyMethod"
                value="Text"
                checked={notifyMethod === "Text"}
                onChange={() => {
                  setNotifyMethod("Text");
                  setFormErrors({ ...formErrors, notifyMethod: false });
                }}
                className="form-radio"
              />
              <span className="ml-2">Text</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="radio"
                name="notifyMethod"
                value="No need"
                checked={notifyMethod === "No need"}
                onChange={() => {
                  setNotifyMethod("No need");
                  setFormErrors({ ...formErrors, notifyMethod: false });
                }}
                className="form-radio"
              />
              <span className="ml-2">No need</span>
            </label>
          </div>
          {formErrors.notifyMethod && (
            <p className="text-red-500 text-sm mt-1">
              Please select a notification method
            </p>
          )}
        </div>

        <div className="mt-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={autoRefill}
              onChange={() => setAutoRefill(!autoRefill)}
              className="form-checkbox"
            />
            <span className="ml-2 text-sm">
              I want my medications to be refilled automatically when they are
              due
            </span>
          </label>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-[#1C2951] text-white text-sm font-medium py-3 px-8 rounded-md hover:bg-opacity-90 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-semibold text-[#1C2951]">
            Prescription Renewal
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
                Did you run out of refills? Your pharmacist can extend or fax
                your doctor to renew your prescription. Please enter your
                prescription or Rx number, which is
                <span className="text-blue-600">
                  {" "}
                  usually found on the medication bottle
                </span>
                , and we will notify you when it's ready.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-5">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#1C2951] mb-2">
                    Number of items to refill
                  </label>
                  <div className="relative">
                    <select
                      value={numberOfItems}
                      onChange={(e) => {
                        setNumberOfItems(e.target.value);
                        setSelectedOption(""); // Reset selection when number of items changes
                        setShowAllDueMessage(false);
                      }}
                      className="appearance-none w-64 bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:ring-1 focus:ring-blue-200"
                    >
                      <option value="">Please Select</option>
                      <option value="1-3">1-3</option>
                      <option value="4+">4+</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>

                {renderFormContent()}
                {renderRemainingForm()}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionRenewal;
