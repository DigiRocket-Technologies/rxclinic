import { sendEmail } from "../helper/email.js";
import {
  generateFormHtml,
  generateVaccineFormHtml,
  generateCovidVaccineFormHtml,
  generateConsultationFormHtml,
  generateSymptonaticCovidFormHtml,
} from "../helper/htmlGenerator.js";

export const submitForm = async (req, res) => {
  try {
    const { questionnaire, patientInfo, formName } = req.body;

    // Validate required data
    if (!questionnaire || !formName || !patientInfo || !patientInfo.email) {
      return res.status(400).json({ error: "Missing required data" });
    }

    // Generate HTML content
    const htmlContent = generateFormHtml(questionnaire, patientInfo, formName);

    // Define email details
    const adminEmail = "gagandeepsethi.7895@gmail.com"; // Replace with client-provided email or env variable
    const subject = `New Patient Form Submission - ${patientInfo.firstName} ${patientInfo.lastName}`;
    const text =
      "A new patient form has been submitted. Please check the details in HTML format.";

    // Send email
    await sendEmail(adminEmail, subject, text, htmlContent);

    // Respond to frontend
    res
      .status(200)
      .json({ message: "Form submitted successfully, email sent" });
  } catch (error) {
    console.error("Error in form submission:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const submitVaccineForm = async (req, res) => {
  try {
    const { setup, questionnaire, patientInfo, contactInfo, MeetingDetails } =
      req.body;

    // Validate required data
    if (
      !setup ||
      !setup.formName ||
      !setup.patientCount ||
      !patientInfo ||
      !Array.isArray(patientInfo) ||
      !questionnaire ||
      !Array.isArray(questionnaire) ||
      !contactInfo ||
      !contactInfo.email ||
      !MeetingDetails ||
      !MeetingDetails.date ||
      !MeetingDetails.timing
    ) {
      return res
        .status(400)
        .json({ error: "Missing or invalid required data" });
    }

    // Ensure patientInfo and questionnaire arrays align
    if (
      patientInfo.length !== questionnaire.length ||
      patientInfo.length !== parseInt(setup.patientCount)
    ) {
      return res.status(400).json({
        error:
          "Mismatch between patient count, patientInfo, and questionnaire data",
      });
    }

    // Generate HTML content
    const htmlContent = generateVaccineFormHtml(
      setup,
      questionnaire,
      patientInfo,
      contactInfo,
      MeetingDetails
    );

    // Define email details
    const adminEmail = "gagandeepsethi.7895@gmail.com"; // Replace with env variable later
    const subject = `New ${setup.formName} Form Submission (${setup.patientCount} Patients)`;
    const text =
      "A new vaccine form has been submitted with multiple patients. Please check the details in HTML format.";

    // Send email
    await sendEmail(adminEmail, subject, text, htmlContent);

    // Respond to frontend
    res
      .status(200)
      .json({ message: "Vaccine form submitted successfully, email sent" });
  } catch (error) {
    console.error("Error in vaccine form submission:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const submitCovidVaccineForm = async (req, res) => {
  try {
    const { setup, questionnaire, patientInfo, contactInfo, MeetingDetails } =
      req.body;

    // Validate required data
    if (
      !setup ||
      !setup.formName ||
      !setup.patientCount ||
      !patientInfo ||
      !Array.isArray(patientInfo) ||
      !questionnaire ||
      !Array.isArray(questionnaire) ||
      !contactInfo ||
      !contactInfo.email ||
      !MeetingDetails ||
      !MeetingDetails.date ||
      !MeetingDetails.timing
    ) {
      return res
        .status(400)
        .json({ error: "Missing or invalid required data" });
    }

    // Ensure patientInfo and questionnaire arrays align
    if (
      patientInfo.length !== questionnaire.length ||
      patientInfo.length !== parseInt(setup.patientCount)
    ) {
      return res.status(400).json({
        error:
          "Mismatch between patient count, patientInfo, and questionnaire data",
      });
    }

    // Generate HTML content
    const htmlContent = generateCovidVaccineFormHtml(
      setup,
      questionnaire,
      patientInfo,
      contactInfo,
      MeetingDetails
    );

    // Define email details
    const adminEmail = "gagandeepsethi.7895@gmail.com"; // Replace with env variable later
    const subject = `New ${setup.formName} Form Submission (${setup.patientCount} Patients)`;
    const text =
      "A new vaccine form has been submitted . Please check the details in HTML format.";

    // Send email
    await sendEmail(adminEmail, subject, text, htmlContent);

    // Respond to frontend
    res
      .status(200)
      .json({ message: "Vaccine form submitted successfully, email sent" });
  } catch (error) {
    console.error("Error in vaccine form submission:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const submitConsultationForm = async (req, res) => {
  try {
    const {
      service,
      firstName,
      lastName,
      dateOfBirth,
      consultationType,
      isCurrentPatient,
      interestedInTransfer,
      email,
      phoneNumber,
      preferredContactMethod,
      date,
      timing,
    } = req.body;

    const htmlContent = generateConsultationFormHtml(
      service,
      firstName,
      lastName,
      dateOfBirth,
      consultationType,
      isCurrentPatient,
      interestedInTransfer,
      email,
      phoneNumber,
      preferredContactMethod,
      date,
      timing
    );
    console.log(timing, "time");

    // Define email details
    const adminEmail = "gagandeepsethi.7895@gmail.com"; // Replace with env variable in production
    const subject = `New Pharmacy Consultation Request - ${firstName} ${lastName}`;
    const text =
      "A new pharmacy consultation form has been submitted. Please check the details in HTML format.";

    // Send email
    await sendEmail(adminEmail, subject, text, htmlContent);

    //Respond to frontend
    res
      .status(200)
      .json({ message: "Form submitted successfully, email sent" });
  } catch (error) {
    console.error("Error in form submission:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const submitSymptomaticCovid = async (req, res) => {
  try {
    const { setup, questionnaire, patientInfo, contactInfo, MeetingDetails } =
      req.body;

    // Validate required data
    // if (
    //   !setup ||
    //   !setup.formName ||
    //   !setup.patientCount ||
    //   !patientInfo ||
    //   !Array.isArray(patientInfo) ||
    //   !questionnaire ||
    //   !Array.isArray(questionnaire) ||
    //   !contactInfo ||
    //   !contactInfo.email ||
    //   !MeetingDetails ||
    //   !MeetingDetails.date ||
    //   !MeetingDetails.timing
    // ) {
    //   return res
    //     .status(400)
    //     .json({ error: "Missing or invalid required data" });
    // }

    // Generate HTML content
    const htmlContent = generateSymptonaticCovidFormHtml(
      setup,
      questionnaire,
      patientInfo,
      contactInfo,
      MeetingDetails
    );

    // Define email details
    const adminEmail = "gagandeepsethi.7895@gmail.com"; // Replace with env variable later
    const subject = `New ${setup.formName} Form Submission (${setup.patientCount} Patients)`;
    const text =
      "A new form has been submitted . Please check the details in HTML format.";

    // Send email
    await sendEmail(adminEmail, subject, text, htmlContent);

    // Respond to frontend
    res
      .status(200)
      .json({ message: " Form submitted successfully, email sent" });
  } catch (error) {
    console.error("Error in  form submission:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
