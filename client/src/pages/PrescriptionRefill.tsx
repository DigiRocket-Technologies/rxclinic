
import { useState } from "react";
import { ArrowLeft, Camera, FileText, Edit, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrescriptionRefill = () => {
  const navigate = useNavigate();
  const [numberOfItems, setNumberOfItems] = useState(""); // Empty default state
  const [selectedOption, setSelectedOption] = useState(""); // Empty default state
  const [prescriptionNumbers, setPrescriptionNumbers] = useState("");
  const [questions, setQuestions] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("Pick Up");
  const [pickupDate, setPickupDate] = useState("Saturday");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notifyMethod, setNotifyMethod] = useState("No need");
  const [autoRefill, setAutoRefill] = useState(false);
  const [showAllDueMessage, setShowAllDueMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Prescription refill form submitted");
    alert("Prescription refill request submitted successfully!");
    navigate("/");
  };

  // Toggle between different views based on number of items
  const renderFormContent = () => {
    if (!numberOfItems) {
      return null; // Don't render anything if no selection has been made
    }
    
    if (numberOfItems === "4+") {
      return (
        <>
          <div className="flex gap-4 mt-6">
            <div 
              className={`flex-1 p-4 rounded-lg ${selectedOption === 'all' ? 'bg-blue-100' : 'bg-blue-50'} flex flex-col items-center justify-center cursor-pointer`}
              onClick={() => {
                setSelectedOption('all');
                setShowAllDueMessage(true);
              }}
            >
              <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mb-2">
                <Camera size={18} className="text-blue-800" />
              </div>
              <h3 className="text-sm font-medium text-center">All Prescriptions That Are Due</h3>
              <p className="text-xs text-center text-gray-500 mt-1">Request for all due prescriptions</p>
            </div>
            
            <div 
              className={`flex-1 p-4 rounded-lg ${selectedOption === 'manual' ? 'bg-blue-100' : 'bg-blue-50'} flex flex-col items-center justify-center cursor-pointer`}
              onClick={() => {
                setSelectedOption('manual');
                setShowAllDueMessage(false);
              }}
            >
              <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mb-2">
                <FileText size={18} className="text-blue-800" />
              </div>
              <h3 className="text-sm font-medium text-center">Enter Prescription Information</h3>
              <p className="text-xs text-center text-gray-500 mt-1">Fill out info manually</p>
            </div>
          </div>
          
          {showAllDueMessage && (
            <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-lg text-sm text-center">
              All of your prescriptions that are due will be requested
            </div>
          )}
          
          {selectedOption === 'manual' && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">
                Enter your prescription number(s) or medication names
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={prescriptionNumbers}
                  onChange={(e) => setPrescriptionNumbers(e.target.value)}
                  placeholder="E.g: 983242, 983243, Sertraline and both my inhalers"
                  className="w-full border border-gray-300 rounded-lg p-3 pr-10"
                />
                <Edit size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          )}
        </>
      );
    } else if (numberOfItems === "1-3") {
      return (
        <>
          <div className="flex gap-4 mt-6">
            <div 
              className={`flex-1 p-4 rounded-lg ${selectedOption === 'photos' ? 'bg-blue-100' : 'bg-blue-50'} flex flex-col items-center justify-center cursor-pointer`}
              onClick={() => setSelectedOption('photos')}
            >
              <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mb-2">
                <Camera size={18} className="text-blue-800" />
              </div>
              <h3 className="text-sm font-medium text-center">Add Prescription Photos</h3>
              <p className="text-xs text-center text-gray-500 mt-1">Submit photos of your prescription(s)</p>
            </div>
            
            <div 
              className={`flex-1 p-4 rounded-lg ${selectedOption === 'manual' ? 'bg-blue-100' : 'bg-blue-50'} flex flex-col items-center justify-center cursor-pointer`}
              onClick={() => setSelectedOption('manual')}
            >
              <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mb-2">
                <FileText size={18} className="text-blue-800" />
              </div>
              <h3 className="text-sm font-medium text-center">Enter Prescription Information</h3>
              <p className="text-xs text-center text-gray-500 mt-1">Fill out info manually</p>
            </div>
          </div>
          
          {selectedOption === 'photos' && (
            <div className="mt-4">
              <h3 className="font-medium text-sm mb-2">Add up to 3 Prescription Labels</h3>
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex">
                    <label className="inline-block mr-3">
                      <span className="bg-white border border-gray-300 text-sm px-3 py-1 rounded cursor-pointer hover:bg-gray-50">
                        Choose File
                      </span>
                      <input type="file" className="hidden" />
                    </label>
                    <span className="text-sm text-gray-500 flex-1 border-b border-gray-200 pb-2">No file chosen</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {selectedOption === 'manual' && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">
                Enter your prescription number(s) or medication names
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={prescriptionNumbers}
                  onChange={(e) => setPrescriptionNumbers(e.target.value)}
                  placeholder="E.g: 983242, 983243, Sertraline and both my inhalers"
                  className="w-full border border-gray-300 rounded-lg p-3 pr-10"
                />
                <Edit size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          )}
        </>
      );
    }
    
    return null;
  };

  // Render the remaining form fields only if both numberOfItems and selectedOption are selected
  const renderRemainingForm = () => {
    if (numberOfItems && selectedOption) {
      return (
        <>
          <div className="mt-6">
            <label className="block text-sm font-medium text-[#1C2951] mb-2">
              Questions, requests, or over-the-counter (OTC) products you would like with your refill
            </label>
            <textarea
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
              placeholder="Type any questions or requests here..."
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-200 min-h-[80px] resize-y"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-[#1C2951] mb-2">
              Pick Up or Delivery?
            </label>
            <div className="relative">
              <select
                value={deliveryOption}
                onChange={(e) => setDeliveryOption(e.target.value)}
                className="appearance-none w-40 bg-neutral-100 border border-neutral-200 text-gray-700 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
              >
                <option>Pick Up</option>
                <option>Delivery</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-[#1C2951] mb-2">
              When would you like to pick up your prescription?
            </label>
            <div className="relative">
              <select
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="appearance-none w-40 bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:ring-1 focus:ring-blue-200"
              >
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
          </div>

          <div className="space-y-4 mt-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-[#1C2951]">
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
              <label htmlFor="lastName" className="block text-sm font-medium text-[#1C2951]">
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
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#1C2951]">
                Phone Number
              </label>
              <div className="flex mt-1">
                <div className="flex items-center border border-gray-300 rounded-l-md px-3 bg-gray-50">
                  <span className="text-sm flex items-center">
                    <img src="https://flagcdn.com/w20/ca.png" alt="Canada" className="h-4 mr-1" />
                    +1
                  </span>
                </div>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone number"
                  className="flex-1 border border-l-0 border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-200"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-[#1C2951] mb-3">
              Notify me when ready by:
            </label>
            <div className="flex space-x-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="notifyMethod"
                  value="Email"
                  checked={notifyMethod === "Email"}
                  onChange={() => setNotifyMethod("Email")}
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
                  onChange={() => setNotifyMethod("Call")}
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
                  onChange={() => setNotifyMethod("Text")}
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
                  onChange={() => setNotifyMethod("No need")}
                  className="form-radio"
                />
                <span className="ml-2">No need</span>
              </label>
            </div>
          </div>

          <div className="mt-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={autoRefill}
                onChange={() => setAutoRefill(!autoRefill)}
                className="form-checkbox"
              />
              <span className="ml-2 text-sm">I want my medications to be refilled automatically when they are due</span>
            </label>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-[#1C2951] text-white text-sm font-medium py-3 px-8 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Continue
            </button>
          </div>
        </>
      );
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-semibold text-[#1C2951]">Prescription Refill</h1>
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
                Submit your refill request online and we can notify you when it is ready. Please enter your prescription or Rx number, which is usually found on the medication bottle.
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
                      className="appearance-none w-64 bg-neutral-100 border border-neutral-200 text-gray-700 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
                    >
                      <option value="">Please select</option>
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

          <div className="w-full md:w-1/4 flex justify-center">
            <img 
              src="/lovable-uploads/de19d5c6-9ba2-4f94-b00c-2a4affa853fb.png" 
              alt="Prescription refill illustration" 
              className="max-w-[120px] md:max-w-[140px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionRefill;
