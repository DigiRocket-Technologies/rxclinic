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
      icon: "/images/Prescriptions/Prescriptions_1.svg",
      description: "Request and manage your prescriptions online",
      subservices: [
        {
          id: "1-1",
          title: "New Prescription",
          icon: "/images/Prescriptions/new Prescriptions_1.svg",
        },
        {
          id: "1-2",
          title: "Prescription Refill",
          icon: "/images/Prescriptions/Prescriptions refill_1.svg",
        },
        {
          id: "1-3",
          title: "Prescription Transfer",
          icon: "/images/Prescriptions/Prescriptions transfer_1.svg",
        },
        {
          id: "1-4",
          title: "Prescription Renewal",
          icon: "/images/Prescriptions/Prescriptions renewal_1.svg",
        },
      ],
    },
    {
      id: 2,
      title: "Minor Ailments and Conditions",
      icon: "/images/Minor Ailments and Conditions/Minor Ailments and Conditions.svg",
      description: "Get help with common health concerns",
      subservices: [
        {
          id: "2-1",
          title: "Digestive Conditions",
          subItems: [
            {
              id: "2-1-1",
              title: "Hemorrhoids",
              icon: "/images/Minor Ailments and Conditions/Digestive Conditions/Hemorrhoids.svg",
            },
            {
              id: "2-1-2",
              title: "Heartburn",
              icon: "/images/Minor Ailments and Conditions/Digestive Conditions/heartburn.svg",
            },
            {
              id: "2-1-3",
              title: "Pinworms and Threadworms",
              icon: "/images/Minor Ailments and Conditions/Digestive Conditions/Pinworms and Threadworms.svg",
            },
            {
              id: "2-1-4",
              title: "Nausea and Vomiting in Pregnancy",
              icon: "/images/Minor Ailments and Conditions/Digestive Conditions/vomiting in pregnancy.svg",
            },
          ],
        },
        {
          id: "2-2",
          title: "Ear, Eye and Mouth",
          subItems: [
            {
              id: "2-2-1",
              title: "Canker Sores",
              icon: "/images/Minor Ailments and Conditions/Ear, Eye and Mouth/Canker Sores.svg",
            },
            {
              id: "2-2-2",
              title: "Oral Thrush",
              icon: "/images/Minor Ailments and Conditions/Ear, Eye and Mouth/Oral Thrush.svg",
            },
            {
              id: "2-2-3",
              title: "Allergies",
              icon: "/images/Minor Ailments and Conditions/Ear, Eye and Mouth/Allergies.svg",
            },
            {
              id: "2-2-4",
              title: "Cold Sores",
              icon: "/images/Minor Ailments and Conditions/Ear, Eye and Mouth/Cold Sores.svg",
            },
            {
              id: "2-2-5",
              title: "Pink Eye or Eye Allergies",
              icon: "/images/Minor Ailments and Conditions/Ear, Eye and Mouth/Pink Eye or Eye Allergies.svg",
            },
          ],
        },
        {
          id: "2-3",
          title: "Skin Conditions",
          subItems: [
            {
              id: "2-3-1",
              title: "Acne",
              icon: "/images/Minor Ailments and Conditions/Skin Conditions/Acne.svg",
            },
            {
              id: "2-3-2",
              title: "Skin Infections (Impetigo)",
              icon: "/images/Minor Ailments and Conditions/Skin Conditions/Skin Infections (Impetigo).svg",
            },
            {
              id: "2-3-3",
              title: "Skin Irritations (Dermatitis)",
              icon: "/images/Minor Ailments and Conditions/Skin Conditions/Skin Irritations (Dermatitis).svg",
            },
            {
              id: "2-3-4",
              title: "Insect Bites and Hives",
              icon: "/images/Minor Ailments and Conditions/Skin Conditions/Insect Bites.svg",
            },
            {
              id: "2-3-5",
              title: "Diaper Rash",
              icon: "/images/Minor Ailments and Conditions/Skin Conditions/Diaper Rash.svg",
            },
            {
              id: "2-3-6",
              title: "Tick Bite - Lyme Disease Prevention",
              icon: "/images/Minor Ailments and Conditions/Skin Conditions/Lyme Disease.svg",
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
              icon: "/images/Minor Ailments and Conditions/Urinary and Reproductive Conditions/Menstrual (Period) Cramps.svg",
            },
            {
              id: "2-4-2",
              title: "Vaginal Yeast Infection",
              icon: "/images/Minor Ailments and Conditions/Urinary and Reproductive Conditions/Vaginal Yeast Infection.svg",
            },
            {
              id: "2-4-3",
              title: "Urinary Tract Infection",
              icon: "/images/Minor Ailments and Conditions/Urinary and Reproductive Conditions/Urinary Tract Infection.svg",
            },
          ],
        },
        {
          id: "2-5",
          title: "Other",
          subItems: [
            {
              id: "2-5-1",
              title: "Muscle Strains or Sprains",
              icon: "/images/Minor Ailments and Conditions/Other/Muscle Strains or Sprains.svg",
            },
            {
              id: "2-5-2",
              title: "Influenza Treatment or Prevention",
              icon: "/images/Minor Ailments and Conditions/Other/Influenza Treatment or Prevention.svg",
            },
          ],
        },
      ],
    },

    {
      id: 4,
      title: "COVID-19",
      icon: "/images/Covid19/COVID 19.svg",
      description: "Access COVID-19 testing, vaccination, and information",
      subservices: [
        {
          id: "4-1",
          title: "COVID-19 Vaccine",
          icon: "/images/Covid19/COVID-19 Vaccine.svg",
        },
        {
          id: "4-2",
          title: "Symptomatic COVID-19 Test",
          icon: "/images/Covid19/COVID-19 + Flu Vaccine.svg",
        },
      ],
    },
    {
      id: 5,
      title: "Vaccines / Injections",
      icon: "/images/Vaccines  Injections/vaccine.svg",
      description: "Schedule and manage your vaccinations",
      subservices: [
        {
          id: "5-1",
          title: "COVID-19 Vaccine",
          icon: "/images/Vaccines  Injections/COVID-19 Vaccine.svg",
        },
        {
          id: "5-2",
          title: "Hepatitis A",
          icon: "/images/Vaccines  Injections/Hepatitis A.svg",
        },
        {
          id: "5-3",
          title: "Hepatitis A and B",
          icon: "/images/Vaccines  Injections/Hepatitis A and B.svg",
        },
        {
          id: "5-4",
          title: "Hepatitis B",
          icon: "/images/Vaccines  Injections/Hepatitis B.svg",
        },
        {
          id: "5-5",
          title: "HPV",
          icon: "/images/Vaccines  Injections/HPV.svg",
        },
        {
          id: "5-6",
          title: "Pneumococcal disease",
          icon: "/images/Vaccines  Injections/Pneumococcal disease.svg",
        },
        {
          id: "5-7",
          title: "Shingles",
          icon: "/images/Vaccines  Injections/Shingles.svg",
        },
        {
          id: "5-8",
          title: "Vitamin B12",
          icon: "/images/Vaccines  Injections/Vitamin B12.svg",
        },
      ],
    },
    {
      id: 6,
      title: "Consultations",
      icon: "/images/Consultations/consultation.svg",
      description: "Book appointments with healthcare professionals",
      subservices: [
        {
          id: "6-1",
          title: "Medication Review",
          icon: "/images/Consultations/Medication Review.svg",
        },
        {
          id: "6-2",
          title: "Ask a Pharmacist",
          icon: "/images/Consultations/Ask a Pharmacist.svg",
        },
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
    <div
      className="min-h-screen flex flex-col items-center px-4 py-8 md:py-16"
      // style={{
      //   backgroundImage: 'url("/images/banner.jpg")',
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      // }}
    >
      <div className="w-full max-w-3xl mx-auto">
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
