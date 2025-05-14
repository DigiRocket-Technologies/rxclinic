import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import ServiceCard from "@/components/ServiceCard";
import {
  PillIcon,
  StethoscopeIcon,
  MessageSquareTextIcon,
  MicroscopeIcon,
  SyringeIcon,
  CalendarClockIcon,
} from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedServiceId, setExpandedServiceId] = useState<number | null>(
    null
  );

  const services = [
    {
      id: 1,
      title: "Prescriptions",
      icon: <PillIcon size={24} className="text-primary" />,
      description: "Request and manage your prescriptions online",
      subservices: [
        { id: "1-1", title: "New Prescription", icon: "prescription" },
        { id: "1-2", title: "Prescription Refill", icon: "prescription" },
        { id: "1-3", title: "Prescription Transfer", icon: "prescription" },
        { id: "1-4", title: "Prescription Renewal", icon: "prescription" },
      ],
    },
    {
      id: 2,
      title: "Minor Ailments and Conditions",
      icon: <StethoscopeIcon size={24} className="text-primary" />,
      description: "Get help with common health concerns",
      subservices: [
        {
          id: "2-1",
          title: "Digestive Conditions",
          subItems: [
            { id: "2-1-1", title: "Hemorrhoids", icon: "digestive" },
            { id: "2-1-2", title: "Heartburn", icon: "digestive" },
            {
              id: "2-1-3",
              title: "Pinworms and Threadworms",
              icon: "digestive",
            },
            {
              id: "2-1-4",
              title: "Nausea and Vomiting in Pregnancy",
              icon: "digestive",
            },
          ],
        },
        {
          id: "2-2",
          title: "Ear, Eye and Mouth",
          subItems: [
            { id: "2-2-1", title: "Canker Sores", icon: "mouth" },
            { id: "2-2-2", title: "Oral Thrush", icon: "mouth" },
            { id: "2-2-3", title: "Allergies", icon: "allergies" },
            { id: "2-2-4", title: "Cold Sores", icon: "mouth" },
            { id: "2-2-5", title: "Pink Eye or Eye Allergies", icon: "eye" },
          ],
        },
        {
          id: "2-3",
          title: "Skin Conditions",
          subItems: [
            { id: "2-3-1", title: "Acne", icon: "skin" },
            { id: "2-3-2", title: "Skin Infections (Impetigo)", icon: "skin" },
            {
              id: "2-3-3",
              title: "Skin Irritations (Dermatitis)",
              icon: "skin",
            },
            { id: "2-3-4", title: "Insect Bites and Hives", icon: "skin" },
            { id: "2-3-5", title: "Diaper Rash", icon: "skin" },
            {
              id: "2-3-6",
              title: "Tick Bite - Lyme Disease Prevention",
              icon: "skin",
            },
          ],
        },
        {
          id: "2-4",
          title: "Urinary and Reproductive Conditions",
          subItems: [
            {
              id: "2-4-1",
              title: "Menstrual (Period) Cramps",
              icon: "reproductive",
            },
            {
              id: "2-4-2",
              title: "Vaginal Yeast Infection",
              icon: "reproductive",
            },
            {
              id: "2-4-3",
              title: "Urinary Tract Infection",
              icon: "reproductive",
            },
          ],
        },
        {
          id: "2-5",
          title: "Other",
          subItems: [
            { id: "2-5-1", title: "Muscle Strains or Sprains", icon: "muscle" },
            {
              id: "2-5-2",
              title: "Influenza Treatment or Prevention",
              icon: "flu",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Medical or Telemedicine Services",
      icon: <MessageSquareTextIcon size={24} className="text-primary" />,
      description: "Connect with healthcare professionals remotely",
      subservices: [
        {
          id: "3-1",
          title: "Telemedicine Clinic (Covered by OHIP+)",
          icon: "telemedicine",
        },
      ],
    },
    {
      id: 4,
      title: "COVID-19",
      icon: <MicroscopeIcon size={24} className="text-primary" />,
      description: "Access COVID-19 testing, vaccination, and information",
      subservices: [
        { id: "4-1", title: "COVID-19 Vaccine", icon: "vaccine" },
        { id: "4-2", title: "COVID-19 + Flu Vaccine", icon: "vaccine" },
      ],
    },
    {
      id: 5,
      title: "Vaccines / Injections",
      icon: <SyringeIcon size={24} className="text-primary" />,
      description: "Schedule and manage your vaccinations",
      subservices: [
        { id: "5-1", title: "COVID-19 Vaccine", icon: "vaccine" },
        { id: "5-2", title: "Hepatitis A", icon: "vaccine" },
        { id: "5-3", title: "Hepatitis A and B", icon: "vaccine" },
        { id: "5-4", title: "Hepatitis B", icon: "vaccine" },
        { id: "5-5", title: "HPV", icon: "vaccine" },
        { id: "5-6", title: "Pneumococcal disease", icon: "vaccine" },
        { id: "5-7", title: "Shingles", icon: "vaccine" },
        { id: "5-8", title: "Vitamin B12", icon: "vaccine" },
      ],
    },
    {
      id: 6,
      title: "Consultations",
      icon: <CalendarClockIcon size={24} className="text-primary" />,
      description: "Book appointments with healthcare professionals",
      subservices: [
        { id: "6-1", title: "Medication Review", icon: "consultation" },
        { id: "6-2", title: "Ask a Pharmacist", icon: "consultation" },
      ],
    },
  ];

  const toggleService = (id: number) => {
    if (expandedServiceId === id) {
      setExpandedServiceId(null);
    } else {
      setExpandedServiceId(id);
    }
  };

  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.subservices?.some(
        (sub) =>
          (typeof sub.title === "string" &&
            sub.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
          sub.subItems?.some((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
  );

  return (
    // <div className="min-h-screen bg-neutral-50 flex flex-col items-center px-4 py-8 md:py-16">
    //   <div className="w-full max-w-2xl mx-auto">
    //     <div className="flex justify-center space-x-2 mb-8">
    //       <div className="w-6 h-1 bg-gray-300 rounded-full"></div>
    //       <div className="w-6 h-1 bg-gray-300 rounded-full"></div>
    //       <div className="w-6 h-1 bg-gray-900 rounded-full"></div>
    //     </div>

    //     <div className="mb-10">
    //       <h1 className="text-2xl md:text-3xl font-medium text-center mb-2">
    //         Select a Service
    //       </h1>
    //       <p className="text-gray-600 text-center text-sm md:text-base">
    //         Choose from the list of services to get started
    //       </p>
    //     </div>

    //     <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

    //     <div className="mt-6 space-y-4">
    //       {filteredServices.map((service) => (
    //         <ServiceCard
    //           key={service.id}
    //           icon={service.icon}
    //           title={service.title}
    //           isExpanded={expandedServiceId === service.id}
    //           onClick={() => toggleService(service.id)}
    //           subservices={service.subservices}
    //         />
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-8 md:py-16">
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex justify-center space-x-3 mb-10">
          <div className="w-8 h-2 bg-blue-200 rounded-full"></div>
          <div className="w-8 h-2 bg-blue-200 rounded-full"></div>
          <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
        </div>

        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
            Select a Service
          </h1>
          <p className="text-gray-700 text-base md:text-lg">
            Choose from the list of services to get started
          </p>
        </div>

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="mt-8 space-y-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              isExpanded={expandedServiceId === service.id}
              onClick={() => toggleService(service.id)}
              subservices={service.subservices}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
