import multer from "multer";
import path from "path";
import fs from "fs";

import { sendEmail, sendEmailWithAttachments } from "../helper/email.js";
import {
  generateFormHtml,
  generateVaccineFormHtml,
  generateCovidVaccineFormHtml,
  generateConsultationFormHtml,
  generateSymptonaticCovidFormHtml,
  generatePrescriptionTransferHtml,
  generatePrescriptionRefillHtml,
  generateNewPrescriptionHtml,
  generatePrescriptionRenewalHtml,
} from "../helper/htmlGenerator.js";
import { fileURLToPath } from "url";

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
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_TO; // Replace with client-provided email or env variable
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
      !MeetingDetails.time
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
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_TO; // Replace with env variable later
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
      !MeetingDetails.time
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
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_TO; // Replace with env variable later
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
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_TO; // Replace with env variable in production
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

    // Generate HTML content
    const htmlContent = generateSymptonaticCovidFormHtml(
      setup,
      questionnaire,
      patientInfo,
      contactInfo,
      MeetingDetails
    );

    // Define email details
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_TO; // Replace with env variable later
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

//Prescription stuff
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, JPG, PNG and GIF are allowed."),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const uploadPrescriptionFiles = upload.fields([
  { name: "prescriptionFile1", maxCount: 1 },
  { name: "prescriptionFile2", maxCount: 1 },
  { name: "prescriptionFile3", maxCount: 1 },
]);
const deleteUploadedFiles = (files) => {
  if (!files || files.length === 0) return;

  files.forEach((file) => {
    try {
      fs.unlinkSync(file.path);
      //console.log(`Deleted file: ${file.path}`);
    } catch (err) {
      console.error(`Error deleting file ${file.path}:`, err);
    }
  });
};

export const submitPrescriptionData = async (req, res) => {
  try {
    uploadPrescriptionFiles(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: `Upload error: ${err.message}` });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }

      const {
        name,
        firstName,
        lastName,
        phoneNumber,
        isCurrentPatient,
        textWhenReady,
        autoRefill,
        questions,
        submittedAt,
      } = req.body;

      if (!firstName || !lastName) {
        return res.status(400).json({ error: "Missing required data" });
      }

      const uploadedFiles = [];
      if (req.files) {
        Object.keys(req.files).forEach((fieldName) => {
          req.files[fieldName].forEach((file) => {
            uploadedFiles.push({
              filename: file.originalname,
              path: file.path,
              mimetype: file.mimetype,
            });
          });
        });
      }

      const formData = {
        Name: name,
        personal: {
          firstName,
          lastName,
          phoneNumber,
        },
        prescriptionDetails: {
          isCurrentPatient,
          uploadedFiles: uploadedFiles.map((file) => file.filename),
          questions,
        },
        preferences: {
          textWhenReady: textWhenReady === "true",
          autoRefill: autoRefill === "true",
        },
        submittedAt,
      };

      const htmlContent = generatePrescriptionFormHtml(formData);

      const customerName = `${firstName} ${lastName}`;

      const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_TO;
      const subject = `New Prescription - ${customerName}`;
      const text = `A new prescription form has been submitted by ${customerName}. Please check the details in the email.`;

      await sendEmailWithAttachments(
        adminEmail,
        subject,
        text,
        htmlContent,
        uploadedFiles
      );

      // Respond to frontend
      res.status(200).json({
        message:
          "Prescription submitted successfully. We'll process your request shortly.",
      });
    });
  } catch (error) {
    console.error("Error in form submission:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Generate HTML for email
function generatePrescriptionFormHtml(formData) {
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          h1 { color: #1C2951; }
          .section { margin-bottom: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px; }
          .section-title { font-weight: bold; margin-bottom: 10px; }
          .field { margin-bottom: 8px; }
          .label { font-weight: bold; color: #555; }
          .value { margin-left: 10px; }
          .preferences { display: flex; flex-direction: column; }
          .preference { margin-bottom: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>${formData.Name}</h1>
          
          <div class="section">
            <div class="section-title">Personal Information</div>
            <div class="field">
              <span class="label">Name:</span>
              <span class="value">${formData.personal.firstName} ${
    formData.personal.lastName
  }</span>
            </div>
            <div class="field">
              <span class="label">Phone Number:</span>
              <span class="value">${
                formData.personal.phoneNumber || "Not provided"
              }</span>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Prescription Details</div>
            <div class="field">
              <span class="label">Current Patient:</span>
              <span class="value">${
                formData.prescriptionDetails.isCurrentPatient || "Not specified"
              }</span>
            </div>
            <div class="field">
              <span class="label">Uploaded Files:</span>
              <span class="value">${
                formData.prescriptionDetails.uploadedFiles.length > 0
                  ? formData.prescriptionDetails.uploadedFiles.join(", ")
                  : "No files uploaded"
              }</span>
            </div>
            <div class="field">
              <span class="label">Questions/Requests:</span>
              <span class="value">${
                formData.prescriptionDetails.questions || "None"
              }</span>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Preferences</div>
            <div class="preferences">
              <div class="preference">
                <span class="label">Text when ready:</span>
                <span class="value">${
                  formData.preferences.textWhenReady ? "Yes" : "No"
                }</span>
              </div>
              <div class="preference">
                <span class="label">Auto-refill:</span>
                <span class="value">${
                  formData.preferences.autoRefill ? "Yes" : "No"
                }</span>
              </div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Submission Information</div>
            <div class="field">
              <span class="label">Submitted At:</span>
              <span class="value">${new Date(
                formData.submittedAt
              ).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

export const submitPrescriptionRefillData = async (req, res) => {
  try {
    uploadPrescriptionFiles(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: `Upload error: ${err.message}` });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }

      const {
        name,
        firstName,
        lastName,
        numberOfItems,
        pickupDate,
        notifyMethod,
        allDuePrescriptions,
        deliveryOption,
        phoneNumber,
        isCurrentPatient,
        textWhenReady,
        autoRefill,
        questions,
        submittedAt,
      } = req.body;

      if (!firstName || !lastName) {
        return res.status(400).json({ error: "Missing required data" });
      }

      const uploadedFiles = [];
      if (req.files) {
        Object.keys(req.files).forEach((fieldName) => {
          req.files[fieldName].forEach((file) => {
            uploadedFiles.push({
              filename: file.originalname,
              path: file.path,
              mimetype: file.mimetype,
            });
          });
        });
      }

      const htmlContent = generatePrescriptionRefillHtml(
        name,
        firstName,
        lastName,
        numberOfItems,
        pickupDate,
        notifyMethod,
        allDuePrescriptions,
        phoneNumber,
        isCurrentPatient,
        textWhenReady,
        autoRefill,
        questions,
        deliveryOption,
        submittedAt
      );

      const customerName = `${firstName} ${lastName}`;

      const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_TO;
      const subject = `New Prescription - ${customerName}`;
      const text = `A new prescription form has been submitted by ${customerName}. Please check the details in the email.`;

      try {
        await sendEmailWithAttachments(
          adminEmail,
          subject,
          text,
          htmlContent,
          uploadedFiles
        );

        // Delete files after successful email sending
        deleteUploadedFiles(uploadedFiles);

        // Respond to frontend
        res.status(200).json({
          message:
            "Prescription submitted successfully. We'll process your request shortly.",
        });
      } catch (emailError) {
        // Delete files even if email fails (optional - you might want to keep them if email fails)
        deleteUploadedFiles(uploadedFiles);
        throw emailError;
      }
    });
  } catch (error) {
    console.error("Error in form submission:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const submitPrescriptionTransferData = async (req, res) => {
  try {
    uploadPrescriptionFiles(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: `Upload error: ${err.message}` });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }

      const {
        name,
        firstName,
        lastName,
        transferType,
        previousPharmacyName,
        previousPharmacyPhone,
        prescriptionDetails,
        phoneNumber,
        dateOfBirth,
        questions,
        submittedAt,
      } = req.body;

      if (!firstName || !lastName) {
        return res.status(400).json({ error: "Missing required data" });
      }

      const uploadedFiles = [];
      if (req.files) {
        Object.keys(req.files).forEach((fieldName) => {
          req.files[fieldName].forEach((file) => {
            uploadedFiles.push({
              filename: file.originalname,
              path: file.path,
              mimetype: file.mimetype,
            });
          });
        });
      }

      const htmlContent = generatePrescriptionTransferHtml(
        name,
        firstName,
        lastName,
        transferType,
        previousPharmacyName,
        previousPharmacyPhone,
        prescriptionDetails,
        phoneNumber,
        dateOfBirth,
        questions,
        submittedAt
      );

      const customerName = `${firstName} ${lastName}`;

      const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_TO;
      const subject = `New Prescription - ${customerName}`;
      const text = `A new prescription form has been submitted by ${customerName}. Please check the details in the email.`;

      try {
        await sendEmailWithAttachments(
          adminEmail,
          subject,
          text,
          htmlContent,
          uploadedFiles
        );

        // Delete files after successful email sending
        deleteUploadedFiles(uploadedFiles);

        // Respond to frontend
        res.status(200).json({
          message:
            "Prescription submitted successfully. We'll process your request shortly.",
        });
      } catch (emailError) {
        // Delete files even if email fails (optional - you might want to keep them if email fails)
        deleteUploadedFiles(uploadedFiles);
        throw emailError;
      }
    });
  } catch (error) {
    console.error("Error in form submission:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const submitNewPrescriptionData = async (req, res) => {
  try {
    uploadPrescriptionFiles(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: `Upload error: ${err.message}` });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }

      const {
        name,
        firstName,
        lastName,
        isCurrentPatient,
        textWhenReady,
        autoRefill,
        phoneNumber,
        questions,
        submittedAt,
      } = req.body;

      if (!firstName || !lastName) {
        return res.status(400).json({ error: "Missing required data" });
      }

      const uploadedFiles = [];
      if (req.files) {
        Object.keys(req.files).forEach((fieldName) => {
          req.files[fieldName].forEach((file) => {
            uploadedFiles.push({
              filename: file.originalname,
              path: file.path,
              mimetype: file.mimetype,
            });
          });
        });
      }

      const htmlContent = generateNewPrescriptionHtml(
        name,
        firstName,
        lastName,
        isCurrentPatient,
        textWhenReady,
        autoRefill,
        phoneNumber,
        questions,
        submittedAt
      );

      const customerName = `${firstName} ${lastName}`;

      const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_TO;
      const subject = `New Prescription - ${customerName}`;
      const text = `A new prescription form has been submitted by ${customerName}. Please check the details in the email.`;

      try {
        await sendEmailWithAttachments(
          adminEmail,
          subject,
          text,
          htmlContent,
          uploadedFiles
        );

        // Delete files after successful email sending
        deleteUploadedFiles(uploadedFiles);

        // Respond to frontend
        res.status(200).json({
          message:
            "Prescription submitted successfully. We'll process your request shortly.",
        });
      } catch (emailError) {
        // Delete files even if email fails (optional - you might want to keep them if email fails)
        deleteUploadedFiles(uploadedFiles);
        throw emailError;
      }
    });
  } catch (error) {
    console.error("Error in form submission:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const submitPrescriptionRenewalDataa = async (req, res) => {
  try {
    uploadPrescriptionFiles(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: `Upload error: ${err.message}` });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }

      const {
        name,
        firstName,
        lastName,
        numberOfItems,
        notifyMethod,
        autoRefill,
        phoneNumber,
        questions,
        hasIssues,
        deliveryOption,
        pickupDate,
        deliveryInstructions,
        submittedAt,
      } = req.body;

      if (!firstName || !lastName) {
        return res.status(400).json({ error: "Missing required data" });
      }

      const uploadedFiles = [];
      if (req.files) {
        Object.keys(req.files).forEach((fieldName) => {
          req.files[fieldName].forEach((file) => {
            uploadedFiles.push({
              filename: file.originalname,
              path: file.path,
              mimetype: file.mimetype,
            });
          });
        });
      }

      const htmlContent = generatePrescriptionRenewalHtml(
        name,
        firstName,
        lastName,
        numberOfItems,
        notifyMethod,
        autoRefill,
        phoneNumber,
        questions,
        hasIssues,
        deliveryOption,
        pickupDate,
        deliveryInstructions,
        submittedAt
      );

      const customerName = `${firstName} ${lastName}`;

      const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_TO;
      const subject = `New Prescription - ${customerName}`;
      const text = `A new prescription form has been submitted by ${customerName}. Please check the details in the email.`;

      try {
        await sendEmailWithAttachments(
          adminEmail,
          subject,
          text,
          htmlContent,
          uploadedFiles
        );

        // Delete files after successful email sending
        deleteUploadedFiles(uploadedFiles);

        // Respond to frontend
        res.status(200).json({
          message:
            "Prescription submitted successfully. We'll process your request shortly.",
        });
      } catch (emailError) {
        // Delete files even if email fails (optional - you might want to keep them if email fails)
        deleteUploadedFiles(uploadedFiles);
        throw emailError;
      }
    });
  } catch (error) {
    console.error("Error in form submission:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
