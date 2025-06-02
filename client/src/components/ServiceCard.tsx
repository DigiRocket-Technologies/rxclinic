import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence, px } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface SubItem {
  id: string;
  title: string;
  icon: string;
}

interface SubService {
  id: string;
  title: string;
  icon?: string;
  subItems?: SubItem[];
}

interface ServiceCardProps {
  icon: string;
  title: string;
  isExpanded: boolean;
  onClick: () => void;
  subservices?: SubService[];
}

// React 19 optimized component with proper memoization opportunities
const ServiceCard = ({
  icon,
  title,
  isExpanded,
  onClick,
  subservices,
}: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleSubserviceClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    //console.log(`Selected subservice: ${id}`);

    // Navigate based on subservice id
    switch (id) {
      case "1-1":
        navigate("/prescription/new");
        break;
      case "1-2":
        navigate("/prescription/refill");
        break;
      case "1-3":
        navigate("/prescription/transfer");
        break;
      case "1-4":
        navigate("/prescription/renewal");
        break;

      case "2-1-1":
        navigate("/minorAilmentsAndConditions/digestiveConditions/Hemmoroid");
        break;

      case "2-1-2":
        navigate("/minorAilmentsAndConditions/digestiveConditions/Heartburn");
        break;
      case "2-1-3":
        navigate(
          "/minorAilmentsAndConditions/digestiveConditions/PinwormsAndThreadworms"
        );
        break;
      case "2-1-4":
        navigate(
          "/minorAilmentsAndConditions/digestiveConditions/NauseaAndVomitingInPregnancy"
        );
        break;
      case "2-2-1":
        navigate("/minorAilmentsAndConditions/EarEyesAndMouth/CankerSore");
        break;
      case "2-2-2":
        navigate("/minorAilmentsAndConditions/EarEyesAndMouth/OralThrush");
        break;
      case "2-2-3":
        navigate("/minorAilmentsAndConditions/EarEyesAndMouth/Allergies");
        break;
      case "2-2-4":
        navigate("/minorAilmentsAndConditions/EarEyesAndMouth/ColdSore");
        break;
      case "2-2-5":
        navigate("/minorAilmentsAndConditions/EarEyesAndMouth/PinkEye");
        break;
      case "2-3-1":
        navigate("/minorAilmentsAndConditions/SkinConditions/Acne");
        break;
      case "2-3-2":
        navigate(
          "/minorAilmentsAndConditions/SkinConditions/SkinInfections(Impetigo)"
        );
        break;
      case "2-3-3":
        navigate(
          "/minorAilmentsAndConditions/SkinConditions/SkinIrritation(dermatitis)"
        );
        break;
      case "2-3-4":
        navigate(
          "/minorAilmentsAndConditions/SkinConditions/InsectBitesAndHives"
        );
        break;
      case "2-3-5":
        navigate("/minorAilmentsAndConditions/SkinConditions/DiaperRash");
        break;
      case "2-3-6":
        navigate("/minorAilmentsAndConditions/SkinConditions/TickBite");
        break;
      case "2-4-1":
        navigate(
          "/minorAilmentsAndConditions/UrinaryAndReproductiveConditions/Menstrual(Period)Cramps"
        );
        break;
      case "2-4-2":
        navigate(
          "/minorAilmentsAndConditions/UrinaryAndReproductiveConditions/VaginalYeastInfection"
        );
        break;
      case "2-4-3":
        navigate(
          "/minorAilmentsAndConditions/UrinaryAndReproductiveConditions/UrinaryTractInfection"
        );
        break;
      case "2-5-1":
        navigate("/minorAilmentsAndConditions/Other/MuscleStrainsAndSprains");
        break;
      case "2-5-2":
        navigate(
          "/minorAilmentsAndConditions/Other/InfluenzaTreatmentOrPrevention"
        );
        break;
      case "4-1":
        navigate("/vaccinesOrInjections/Covid19");
        break;
      case "4-2":
        navigate("/Covid19/SymptomaticCOVID-19Test");
        break;
      case "5-1":
        navigate("/vaccinesOrInjections/Covid19");
        break;
      case "5-2":
        navigate("/vaccinesOrInjections/HepatitisA");
        break;
      case "5-3":
        navigate("/vaccinesOrInjections/HepatitisA&B");
        break;
      case "5-4":
        navigate("/vaccinesOrInjections/HepatitisB");
        break;
      case "5-5":
        navigate("/vaccinesOrInjections/HPV");
        break;
      case "5-6":
        navigate("/vaccinesOrInjections/PneumococcalDisease");
        break;
      case "5-7":
        navigate("/vaccinesOrInjections/Shingles");
        break;
      case "5-8":
        navigate("/vaccinesOrInjections/VitaminB12");
        break;
      case "6-1":
        navigate("/Consultation");
        break;
      case "6-2":
        navigate("/Consultation");
        break;

      default:
        // No navigation for other IDs
        break;
    }
  };

  return (
    <div className="rounded-lg bg-white shadow-md overflow-hidden border-2 border-blue-200">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="cursor-pointer hover:bg-blue-50 transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <div className="px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 text-blue-600">
              {" "}
              <img
                height={35}
                width={35}
                src={icon}
                alt="Description of the image"
              />
            </div>
            <span className="font-semibold text-gray-900 text-lg">{title}</span>
          </div>
          <motion.div
            animate={{ x: isHovered && !isExpanded ? 5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isExpanded ? (
              <ChevronDown size={24} className="text-blue-400" />
            ) : (
              <ChevronRight size={24} className="text-blue-400" />
            )}
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && subservices && subservices.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-100 border-t border-blue-200"
          >
            <div className="p-5">
              {subservices.map((subservice) => {
                if (subservice.subItems) {
                  return (
                    <div key={subservice.id} className="mb-5">
                      <h3 className="text-base font-semibold text-gray-800 mb-3">
                        {subservice.title}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {subservice.subItems.map((item) => (
                          <div
                            key={item.id}
                            onClick={(e) => handleSubserviceClick(e, item.id)}
                            className="flex items-center justify-between p-4 rounded-lg bg-white shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 hover:bg-blue-50"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="">
                                <img
                                  height={35}
                                  width={35}
                                  src={item.icon}
                                  alt="Description of the image"
                                />
                              </div>

                              <span className="text-base text-gray-800">
                                {item.title}
                              </span>
                            </div>
                            <ChevronRight size={20} className="text-blue-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={subservice.id}
                      onClick={(e) => handleSubserviceClick(e, subservice.id)}
                      className="flex items-center justify-between p-4 mb-3 rounded-lg bg-white shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 hover:bg-blue-50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="">
                          <img
                            height={35}
                            width={35}
                            src={subservice.icon}
                            alt="Description of the image"
                          />
                        </div>
                        <span className="text-base text-gray-800">
                          {subservice.title}
                        </span>
                      </div>
                      <ChevronRight size={20} className="text-blue-400" />
                    </div>
                  );
                }
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceCard;
