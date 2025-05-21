import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import NewPrescription from "@/pages/NewPrescription";
import PrescriptionRefill from "@/pages/PrescriptionRefill";
import PrescriptionTransfer from "@/pages/PrescriptionTransfer";
import PrescriptionRenewal from "@/pages/PrescriptionRenewal";
import NotFound from "@/pages/NotFound";
import "@/App.css";
import { Toaster } from "sonner";
import NauseaAndVomitingInPregnancy from "./components/forms/NauseaAndVomitingInPregnancy";
import HeartBurn from "./components/forms/HeartBurn";
import ColdSore from "./components/forms/ColdSore";
import Hemmoroid from "./components/forms/Hemmoroids";
import PinwormAndThreadworm from "./components/forms/PinwormAndThreadworm";
import Allergies from "./components/forms/Allergies";
import OralThrush from "./components/forms/OralThrush";
import CankerSore from "./components/forms/CankerSore";
import MenstrualCramp from "./components/forms/Menstrual(Period)Cramp";
import VaginalYeastInfection from "./components/forms/VaginalYeastInfection";
import UrinaryTract from "./components/forms/UrinaryTractInfection";
import Dermatitis from "./components/forms/SkinIrritation(dermatitis)";
import InsectBitesAndHives from "./components/forms/InsectBitesAndHives";
import Impetigo from "./components/forms/SkinInfections(Impetigo)";
import Acne from "./components/forms/Acne";
import DiaperRash from "./components/forms/DiaperRash";
import TickBite from "./components/forms/TickBite";
import PinkEye from "./components/forms/PinkEyeOrEyeAllergies";
import Muscle from "./components/forms/MuscleStrainsOrSprains";
import Influenza from "./components/forms/InfluenzaTreatmentAndPrevention";
import HepatitisA from "./components/forms/HepatitisA";
import HepatitisB from "./components/forms/HepatitisB";
import HepatitisAandB from "./components/forms/HepatitisAandB";
import HPV from "./components/forms/HPV";
import PneumococcalDisease from "./components/forms/PneumococcalDisease";
import Shingles from "./components/forms/Shingles";
import VitaminB12 from "./components/forms/Vitamin B12";
import Covid19 from "./components/forms/Covid19Vaccine";
import MedicationReview from "./components/forms/MedicationReview";

// React 19 optimized component
function App() {
  return (
    <>
      <Toaster richColors />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/minorAilmentsAndConditions-digestiveConditions-NauseaAndVomitingInPregnancy"
          element={<NauseaAndVomitingInPregnancy />}
        />
        <Route
          path="/minorAilmentsAndConditions/UrinaryAndReproductiveConditions/VaginalYeastInfection"
          element={<VaginalYeastInfection />}
        />
        <Route
          path="/minorAilmentsAndConditions/SkinConditions/TickBite"
          element={<TickBite />}
        />
        <Route
          path="/minorAilmentsAndConditions-SkinConditions-Acne"
          element={<Acne />}
        />
        <Route
          path="/minorAilmentsAndConditions/SkinConditions/DiaperRash"
          element={<DiaperRash />}
        />
        <Route
          path="/minorAilmentsAndConditions/SkinConditions/SkinIrritation(dermatitis)"
          element={<Dermatitis />}
        />
        <Route
          path="/minorAilmentsAndConditions/SkinConditions/SkinInfections(Impetigo)"
          element={<Impetigo />}
        />
        <Route
          path="/minorAilmentsAndConditions/SkinConditions/InsectBitesAndHives"
          element={<InsectBitesAndHives />}
        />
        <Route
          path="/minorAilmentsAndConditions/UrinaryAndReproductiveConditions/UrinaryTractInfection"
          element={<UrinaryTract />}
        />
        <Route
          path="/minorAilmentsAndConditions/UrinaryAndReproductiveConditions/Menstrual(Period)Cramps"
          element={<MenstrualCramp />}
        />
        <Route
          path="/minorAilmentsAndConditions/EarEyesAndMouth/OralThrush"
          element={<OralThrush />}
        />
        <Route
          path="/minorAilmentsAndConditions/EarEyesAndMouth/CankerSore"
          element={<CankerSore />}
        />
        <Route
          path="/minorAilmentsAndConditions/EarEyesAndMouth/Allergies"
          element={<Allergies />}
        />
        <Route
          path="/minorAilmentsAndConditions/digestiveConditions/PinwormsAndThreadworms"
          element={<PinwormAndThreadworm />}
        />
        <Route
          path="/minorAilmentsAndConditions/digestiveConditions/Hemmoroid"
          element={<Hemmoroid />}
        />
        <Route
          path="/minorAilmentsAndConditions/digestiveConditions/Heartburn"
          element={<HeartBurn />}
        />
        <Route
          path="/minorAilmentsAndConditions/EarEyesAndMouth/ColdSore"
          element={<ColdSore />}
        />
        <Route
          path="/minorAilmentsAndConditions/EarEyesAndMouth/PinkEye"
          element={<PinkEye />}
        />
        <Route
          path="/minorAilmentsAndConditions/Other/MuscleStrainsAndSprains"
          element={<Muscle />}
        />
        <Route
          path="/minorAilmentsAndConditions/Other/InfluenzaTreatmentOrPrevention"
          element={<Influenza />}
        />
        <Route
          path="/vaccinesOrInjections/HepatitisA"
          element={<HepatitisA />}
        />
        <Route
          path="/vaccinesOrInjections/HepatitisB"
          element={<HepatitisB />}
        />
        <Route
          path="/vaccinesOrInjections/HepatitisA&B"
          element={<HepatitisAandB />}
        />
        <Route path="/vaccinesOrInjections/HPV" element={<HPV />} />
        <Route
          path="/vaccinesOrInjections/PneumococcalDisease"
          element={<PneumococcalDisease />}
        />
        <Route path="/vaccinesOrInjections/Shingles" element={<Shingles />} />
        <Route
          path="/vaccinesOrInjections/VitaminB12"
          element={<VitaminB12 />}
        />
        <Route path="/Consultation" element={<MedicationReview />} />
        <Route path="/vaccinesOrInjections/Covid19" element={<Covid19 />} />

        <Route path="/prescription/new" element={<NewPrescription />} />
        <Route path="/prescription/refill" element={<PrescriptionRefill />} />
        <Route
          path="/prescription/transfer"
          element={<PrescriptionTransfer />}
        />
        <Route path="/prescription/renewal" element={<PrescriptionRenewal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
