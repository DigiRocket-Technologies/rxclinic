import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  icon: React.ReactNode;
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
    console.log(`Selected subservice: ${id}`);

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

      default:
        // No navigation for other IDs
        break;
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="cursor-pointer hover:shadow-md transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <div className="px-6 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">{icon}</div>
            <span className="font-medium text-gray-800">{title}</span>
          </div>
          <motion.div
            animate={{ x: isHovered && !isExpanded ? 5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isExpanded ? (
              <ChevronDown size={20} className="text-gray-400" />
            ) : (
              <ChevronRight size={20} className="text-gray-400" />
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
            className="bg-gray-50 border-t border-gray-200"
          >
            <div className="p-4">
              {subservices.map((subservice) => {
                if (subservice.subItems) {
                  return (
                    <div key={subservice.id} className="mb-4">
                      <h3 className="text-sm font-medium text-gray-600 mb-2">
                        {subservice.title}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {subservice.subItems.map((item) => (
                          <div
                            key={item.id}
                            onClick={(e) => handleSubserviceClick(e, item.id)}
                            className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white hover:shadow-sm cursor-pointer"
                          >
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <div className="w-5 h-5 bg-blue-300 rounded-full"></div>
                              </div>
                              <span className="text-sm">{item.title}</span>
                            </div>
                            <ChevronRight size={16} className="text-gray-400" />
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
                      className="flex items-center justify-between p-3 mb-2 rounded-lg border border-gray-200 bg-white hover:shadow-sm cursor-pointer"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <div className="w-5 h-5 bg-blue-300 rounded-full"></div>
                        </div>
                        <span className="text-sm">{subservice.title}</span>
                      </div>
                      <ChevronRight size={16} className="text-gray-400" />
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
