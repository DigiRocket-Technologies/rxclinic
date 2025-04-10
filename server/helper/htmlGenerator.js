export const generateFormHtml = (questionnaire, patientInfo, formName) => {
  // Patient Info Section (unchanged)
  const patientInfoHtml = `
      <h2 style="color: #2c3e50;">Patient Information</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr style="background-color: #ecf0f1;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>First Name</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${patientInfo.firstName}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Last Name</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${patientInfo.lastName}</td>
        </tr>
        <tr style="background-color: #ecf0f1;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Date of Birth</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${patientInfo.dateOfBirth}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Address</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${patientInfo.address}, ${patientInfo.city}</td>
        </tr>
        <tr style="background-color: #ecf0f1;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${patientInfo.email}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Phone Number</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${patientInfo.phoneNumber}</td>
        </tr>
        <tr style="background-color: #ecf0f1;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Contact Method</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${patientInfo.contactMethod}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>New Patient</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${patientInfo.newPatient}</td>
        </tr>
        <tr style="background-color: #ecf0f1;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Health Card Number</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${patientInfo.healthCardNumber}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Has Health Card</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${patientInfo.hasHealthCard}</td>
        </tr>
        <tr style="background-color: #ecf0f1;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Interested in Transfer</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${patientInfo.interestedInTransfer}</td>
        </tr>
      </table>
    `;

  // Questionnaire Section with Improved Grouping
  const questionnaireHtml = questionnaire
    .map((section, index) => {
      // Check if this section has multiple related questions (e.g., follow-ups like "Please specify")
      const isGrouped = section.length > 1;
      const sectionContent = section
        .map((qa, qaIndex) => {
          const answers = qa.answer.join(", ");
          // Primary question vs follow-up styling
          const questionStyle =
            qaIndex === 0
              ? `font-weight: bold; color: #34495e; margin-bottom: 5px;`
              : `font-weight: normal; color: #7f8c8d; margin-left: 20px; margin-bottom: 5px;`;
          return `
              <div style="${questionStyle}">
                ${qa.question}: <span style="color: #16a085;">${answers}</span>
              </div>
            `;
        })
        .join("");

      // Wrap grouped questions in a container with subtle styling
      return `
          <div style="margin-bottom: 15px; padding: ${
            isGrouped ? "10px" : "0"
          }; border: ${
        isGrouped ? "1px solid #eee" : "none"
      }; border-radius: 5px; background-color: ${
        isGrouped ? "#f9f9f9" : "transparent"
      };">
            ${sectionContent}
          </div>
        `;
    })
    .join("");

  // Full HTML with Improved UI
  return `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 700px; margin: 0 auto; background-color: #f4f4f4;">
          <div style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <h1 style="color: #3498db; text-align: center; margin-bottom: 20px;">${formName} Form Submission</h1>
            ${patientInfoHtml}
            <h2 style="color: #2c3e50; margin-top: 30px; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Questionnaire Responses</h2>
            <div style="margin-top: 15px;">
              ${questionnaireHtml}
            </div>
            <footer style="margin-top: 30px; font-size: 12px; color: #7f8c8d; text-align: center;">
              <p>Submitted on: ${new Date().toLocaleString()}</p>
              <p>Powered by Sky-Shop</p>
            </footer>
          </div>
        </body>
      </html>
    `;
};

export const generateVaccineFormHtml = (
  setup,
  questionnaire,
  patientInfo,
  contactInfo
) => {
  // Contact Info Section
  const contactInfoHtml = `
    <h2 style="color: #2c3e50;">Contact Information</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr style="background-color: #ecf0f1;">
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">${
          contactInfo.email
        }</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Phone Number</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">${
          contactInfo.phoneNumber || "N/A"
        }</td>
      </tr>
      <tr style="background-color: #ecf0f1;">
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Preferred Method</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">${
          contactInfo.preferredMethod || "N/A"
        }</td>
      </tr>
    </table>
  `;

  // Setup Info Section (Patient Count and "What brought you here?")
  const setupInfoHtml = `
    <h2 style="color: #2c3e50;">Form Details</h2>
    <div style="margin-bottom: 20px;">
      <p><strong>Patient Count:</strong> ${setup.patientCount}</p>
      <p><strong>What brought you here today?</strong><span style="color: #16a085;"> ${setup["What brought you here today?"]}</span></p>
    </div>
  `;

  // Patient Sections (loop through patientInfo and questionnaire)
  const patientsHtml = patientInfo
    .map((patient, index) => {
      // Patient Info
      const patientInfoHtml = `
        <h3 style="color: #34495e; margin-top: 20px;">Patient ${
          index + 1
        } Information</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr style="background-color: #ecf0f1;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>First Name</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              patient.firstName
            }</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Last Name</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              patient.lastName
            }</td>
          </tr>
          <tr style="background-color: #ecf0f1;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Date of Birth</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              patient.dateOfBirth || "N/A"
            }</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Address</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              patient.address || "N/A"
            }</td>
          </tr>
          <tr style="background-color: #ecf0f1;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Pronouns</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              patient.pronouns || "N/A"
            }</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Health Card Number</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              patient.healthCardNumber || "N/A"
            }</td>
          </tr>
          <tr style="background-color: #ecf0f1;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Has Health Card</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              patient.hasHealthCard || "N/A"
            }</td>
          </tr>
        </table>
      `;

      // Questionnaire for this patient
      const patientQuestionnaire = questionnaire[index];
      const questionnaireHtml = patientQuestionnaire
        .map((section) => {
          const isGrouped = section.length > 1;
          const sectionContent = section
            .map((qa, qaIndex) => {
              const answers =
                qa.answer.length > 0 ? qa.answer.join(", ") : "N/A";
              const questionStyle =
                qaIndex === 0
                  ? `font-weight: bold; color: #34495e; margin-bottom: 5px;`
                  : `font-weight: normal; color: #7f8c8d; margin-left: 20px; margin-bottom: 5px;`;
              return `
                <div style="${questionStyle}">
                  ${qa.question}: <span style="color: #16a085;">${answers}</span>
                </div>
              `;
            })
            .join("");
          return `
            <div style="margin-bottom: 15px; padding: ${
              isGrouped ? "10px" : "0"
            }; border: ${
            isGrouped ? "1px solid #eee" : "none"
          }; border-radius: 5px; background-color: ${
            isGrouped ? "#f9f9f9" : "transparent"
          };">
              ${sectionContent}
            </div>
          `;
        })
        .join("");

      return `
        ${patientInfoHtml}
        <h3 style="color: #34495e; margin-top: 20px;">Patient ${
          index + 1
        } Questionnaire Responses</h3>
        <div style="margin-top: 15px;">
          ${questionnaireHtml}
        </div>
      `;
    })
    .join("<hr style='border: 1px solid #eee; margin: 20px 0;'>"); // Separator between patients

  // Full HTML
  return `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 700px; margin: 0 auto; background-color: #f4f4f4;">
        <div style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <h1 style="color: #3498db; text-align: center; margin-bottom: 20px;">${
            setup.formName
          } Form Submission</h1>
          ${contactInfoHtml}
          ${setupInfoHtml}
          ${patientsHtml}
          <footer style="margin-top: 30px; font-size: 12px; color: #7f8c8d; text-align: center;">
            <p>Submitted on: ${new Date().toLocaleString()}</p>
            <p>Powered by Sky-Shop</p>
          </footer>
        </div>
      </body>
    </html>
  `;
};
