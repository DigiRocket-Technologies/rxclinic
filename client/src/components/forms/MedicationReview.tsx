import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "react-phone-number-input/style.css";
import { submitConsultationForm } from "../../utils/api.js";
import { PopupButton, useCalendlyEventListener } from "react-calendly";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface FormData {
  service: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  comments: string;
  consultationType: string;
  isCurrentPatient: boolean | null;
  interestedInTransfer: boolean;
  email: string;
  phoneNumber: string;
  preferredContactMethod: string;
  date?: string;
  timing?: string;
}

interface FormErrors {
  [key: string]: string | null;
}

const PharmacyConsultationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    service: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    comments: "",
    consultationType: "",
    isCurrentPatient: null,
    interestedInTransfer: false,
    email: "",
    phoneNumber: "",
    preferredContactMethod: "",
    date: "",
    timing: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);
  const [phoneValidationStatus, setPhoneValidationStatus] = useState<
    "invalid" | "valid" | "none"
  >("none");
  const navigate = useNavigate();

  const services: string[] = ["Ask a Pharmacist", "Medication Review"];
  const consultationTypes: string[] = ["In-person", "Phone Call"];

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const fetchEventDetails = async (eventUri: string) => {
    try {
      const response = await fetch(eventUri, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_CALENDLY_API_KEY}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      //console.log("Calendly event data:", data);

      const startTime = data?.resource?.start_time;
      const endTime = data?.resource?.end_time;

      if (!startTime || !endTime) throw new Error("Missing start/end time");

      const startDateObj = new Date(startTime);
      const endDateObj = new Date(endTime);
      const date = startDateObj.toISOString().split("T")[0];
      const startFormatted = startDateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const endFormatted = endDateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const timing = `${startFormatted} - ${endFormatted} IST`;

      return { date, timing };
    } catch (error) {
      console.error("Error fetching event details:", error);
      throw error;
    }
  };

  useCalendlyEventListener({
    onProfilePageViewed: () => console.log("onProfilePageViewed"),
    onDateAndTimeSelected: (e) => console.log(e.data),
    onEventTypeViewed: () => console.log("onEventTypeViewed"),
    onEventScheduled: async (e) => {
      //console.log("Event Scheduled:", e.data.payload);
      const eventUri = e.data.payload.event.uri;
      //console.log(eventUri, "uri");
      try {
        const { date, timing } = await fetchEventDetails(eventUri);
        // console.log(date, "date");
        // console.log(timing, "time");

        // Update formData and pass the updated data to handleFinalSubmit
        setFormData((prevFormData) => {
          const updatedFormData = {
            ...prevFormData,
            date,
            timing,
          };
          console.log(updatedFormData, "formdata after update");
          // Call handleFinalSubmit with the updated form data
          handleFinalSubmit(updatedFormData);
          return updatedFormData;
        });
      } catch (error) {
        console.error("Error in onEventScheduled:", error);
        alert("Failed to process scheduled event. Please try again.");
      }
    },
  });

  const validatePhoneNumber = (phoneNumber: string): boolean => {
    if (!phoneNumber) {
      setPhoneValidationStatus("none");
      return false;
    }

    const phone = parsePhoneNumberFromString(phoneNumber);
    if (phone?.isValid()) {
      setPhoneValidationStatus("valid");
      return true;
    } else {
      setPhoneValidationStatus("invalid");
      return false;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear error for this field when user makes a change
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handlePhoneChange = (value: string | undefined) => {
    const newPhoneNumber = value || "";
    setFormData({ ...formData, phoneNumber: newPhoneNumber });
    validatePhoneNumber(newPhoneNumber);

    // Clear error for phoneNumber when user makes a change
    if (errors.phoneNumber) {
      setErrors({ ...errors, phoneNumber: null });
    }
  };

  const handleRadioChange = (name: string, value: boolean | string) => {
    setFormData({ ...formData, [name]: value });

    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required fields
    if (!formData.service) newErrors.service = "Please select a service";
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.consultationType)
      newErrors.consultationType = "Please select a consultation type";
    if (formData.isCurrentPatient === null)
      newErrors.isCurrentPatient = "Please select an option";
    if (!formData.preferredContactMethod)
      newErrors.preferredContactMethod = "Please select a contact method";

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Phone validation
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setShowTermsModal(true);
    }
  };

  // const handleAcceptTerms = () => {
  //   // Here you would typically submit the form data to your backend
  //   alert("Form submitted successfully!");
  //   setShowTermsModal(false);

  //   // Reset form after submission
  //   // setFormData({
  //   //   service: "",
  //   //   firstName: "",
  //   //   lastName: "",
  //   //   dateOfBirth: "",
  //   //   comments: "",
  //   //   consultationType: "",
  //   //   isCurrentPatient: null,
  //   //   interestedInTransfer: false,
  //   //   email: "",
  //   //   phoneNumber: "",
  //   //   preferredContactMethod: "",
  //   // });
  //   console.log(formData, "data");
  //   //setPhoneValidationStatus("none");
  // };

  const handleFinalSubmit = async (formData: FormData) => {
    console.log(formData, "formdata end");
    try {
      const result = await submitConsultationForm(formData); // Call the reusable function
      toast.success(result.message, {
        position: "top-right",
      });
      setTimeout(() => {
        navigate("/");
      }, 5000);

      //alert(result.message);
    } catch (error) {
      //alert("Failed to submit form. Please try again.");
      toast.error("Failed to submit form. Please try again.", {
        position: "top-right",
      });

      console.error("Submission error:", error);
    }
  };

  // Get today's date for max date validation
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Pharmacy Consultation Request
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Service Selection */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Select a Service
          </label>
          <div className="relative">
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`block w-full px-4 py-3 bg-gray-50 border rounded-lg appearance-none focus:outline-none focus:ring-2 ${
                errors.service
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            >
              <option value="">Choose an option</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          {errors.service && (
            <p className="text-red-500 text-sm mt-1">{errors.service}</p>
          )}
        </div>

        {/* Name and DOB Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.firstName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.lastName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Date of Birth *
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              max={today}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.dateOfBirth
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
            )}
          </div>
        </div>

        {/* Comments Field */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Please provide any comments about your request:
          </label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Consultation Type */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            How would you like your consultation to take place? *
          </label>
          <div className="relative">
            <select
              name="consultationType"
              value={formData.consultationType}
              onChange={handleChange}
              className={`block w-full px-4 py-3 bg-gray-50 border rounded-lg appearance-none focus:outline-none focus:ring-2 ${
                errors.consultationType
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            >
              <option value="">Choose an option</option>
              {consultationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          {errors.consultationType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.consultationType}
            </p>
          )}
        </div>

        {/* Current Patient Question */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Are you a current patient at this location? *
          </label>
          <div className="flex space-x-6">
            <label className="flex items-center cursor-pointer">
              <div
                className={`w-5 h-5 mr-2 rounded-full border flex items-center justify-center ${
                  formData.isCurrentPatient === true
                    ? "border-blue-500"
                    : "border-gray-400"
                }`}
              >
                {formData.isCurrentPatient === true && (
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                )}
              </div>
              <input
                type="radio"
                name="isCurrentPatient"
                checked={formData.isCurrentPatient === true}
                onChange={() => handleRadioChange("isCurrentPatient", true)}
                className="hidden"
              />
              <span>Yes</span>
            </label>

            <label className="flex items-center cursor-pointer">
              <div
                className={`w-5 h-5 mr-2 rounded-full border flex items-center justify-center ${
                  formData.isCurrentPatient === false
                    ? "border-blue-500"
                    : "border-gray-400"
                }`}
              >
                {formData.isCurrentPatient === false && (
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                )}
              </div>
              <input
                type="radio"
                name="isCurrentPatient"
                checked={formData.isCurrentPatient === false}
                onChange={() => handleRadioChange("isCurrentPatient", false)}
                className="hidden"
              />
              <span>No</span>
            </label>
          </div>
          {errors.isCurrentPatient && (
            <p className="text-red-500 text-sm mt-1">
              {errors.isCurrentPatient}
            </p>
          )}

          {/* Interested in Transfer Option */}
          {formData.isCurrentPatient === false && (
            <div className="mt-3 ml-6">
              <label className="flex items-center cursor-pointer">
                <div
                  className={`w-5 h-5 mr-2 border rounded flex items-center justify-center ${
                    formData.interestedInTransfer
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-400"
                  }`}
                >
                  {formData.interestedInTransfer && (
                    <svg
                      className="w-3 h-3 text-blue-500 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  name="interestedInTransfer"
                  checked={formData.interestedInTransfer}
                  onChange={handleChange}
                  className="hidden"
                />
                <span className="text-gray-700">
                  I'm interested in learning more about transferring my
                  medications to this pharmacy
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Email (Optional) *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-10">
          <label className="block text-gray-700 font-medium mb-2">
            Phone Number *
          </label>
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry="CA"
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
              phoneValidationStatus === "invalid"
                ? "border-red-500 focus:ring-red-500"
                : phoneValidationStatus === "valid"
                ? "border-green-500 focus:ring-green-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Enter phone number"
          />
          {phoneValidationStatus === "invalid" && (
            <p className="text-red-500 text-sm mt-1">Invalid phone number</p>
          )}
          {phoneValidationStatus === "valid" && (
            <p className="text-green-500 text-sm mt-1">Valid phone number</p>
          )}
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Preferred Contact Method Question */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            What is your preferred contact method for notifications? *
          </label>
          <div className="flex space-x-6">
            <label className="flex items-center cursor-pointer">
              <div
                className={`w-5 h-5 mr-2 rounded-full border flex items-center justify-center ${
                  formData.preferredContactMethod === "Email"
                    ? "border-blue-500"
                    : "border-gray-400"
                }`}
              >
                {formData.preferredContactMethod === "Email" && (
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                )}
              </div>
              <input
                type="radio"
                name="preferredContactMethod"
                checked={formData.preferredContactMethod === "Email"}
                onChange={() =>
                  handleRadioChange("preferredContactMethod", "Email")
                }
                className="hidden"
              />
              <span>Email</span>
            </label>

            <label className="flex items-center cursor-pointer">
              <div
                className={`w-5 h-5 mr-2 rounded-full border flex items-center justify-center ${
                  formData.preferredContactMethod === "Phone Number"
                    ? "border-blue-500"
                    : "border-gray-400"
                }`}
              >
                {formData.preferredContactMethod === "Phone Number" && (
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                )}
              </div>
              <input
                type="radio"
                name="preferredContactMethod"
                checked={formData.preferredContactMethod === "Phone Number"}
                onChange={() =>
                  handleRadioChange("preferredContactMethod", "Phone Number")
                }
                className="hidden"
              />
              <span>Phone Number</span>
            </label>
          </div>
          {errors.preferredContactMethod && (
            <p className="text-red-500 text-sm mt-1">
              {errors.preferredContactMethod}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Continue
          </button>
        </div>
      </form>
      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
            <div className="mb-6 text-gray-700">
              <p className="mb-4">
                These Terms and Conditions ("Terms") govern your use of our
                pharmacy consultation services. By using our services, you agree
                to these Terms.
              </p>

              <h3 className="font-semibold mb-2">1. Healthcare Information</h3>
              <p className="mb-3">
                Information provided during consultations is not a substitute
                for professional medical advice, diagnosis, or treatment. Always
                seek the advice of your physician or other qualified health
                provider with any questions you may have regarding a medical
                condition.
              </p>

              <h3 className="font-semibold mb-2">2. Privacy</h3>
              <p className="mb-3">
                We respect your privacy and will maintain the confidentiality of
                your personal and health information in accordance with
                applicable laws. Your information will only be used to provide
                you with our services and as permitted by law.
              </p>

              <h3 className="font-semibold mb-2">3. Service Availability</h3>
              <p className="mb-3">
                Our pharmacists will make reasonable efforts to accommodate your
                preferred consultation method and time. However, availability
                may vary and is subject to change without notice.
              </p>

              <h3 className="font-semibold mb-2">4. No Guarantee</h3>
              <p className="mb-3">
                We do not guarantee specific outcomes or results from our
                consultation services. The advice provided is based on the
                information you share and current professional standards.
              </p>

              <h3 className="font-semibold mb-2">5. Changes to Terms</h3>
              <p className="mb-3">
                We may modify these Terms at any time. Your continued use of our
                services constitutes your acceptance of the revised Terms.
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowTermsModal(false)}
                className="mr-4 px-4 py-2 text-gray-600 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              {/* <button
                onClick={handleAcceptTerms}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Accept & Submit
              </button> */}
              <div className="justify-center flex my-4">
                <PopupButton
                  className="text-white bg-primary py-3 px-5 rounded-lg"
                  url="https://calendly.com/gagandeepsethi-7895/schedule-meeting"
                  rootElement={document.getElementById("root")}
                  text={"Accept Terms & condition"}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PharmacyConsultationForm;
