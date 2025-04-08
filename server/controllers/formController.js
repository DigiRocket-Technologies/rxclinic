import { sendEmail } from "../helper/email.js";
import { generateFormHtml } from "../helper/htmlGenerator.js";

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
