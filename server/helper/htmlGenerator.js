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
        // <tr>
        //   <td style="padding: 10px; border: 1px solid #ddd;"><strong>Has Health Card</strong></td>
        //   <td style="padding: 10px; border: 1px solid #ddd;">${patientInfo.hasHealthCard}</td>
        // </tr>
        // <tr style="background-color: #ecf0f1;">
        //   <td style="padding: 10px; border: 1px solid #ddd;"><strong>Interested in Transfer</strong></td>
        //   <td style="padding: 10px; border: 1px solid #ddd;">${patientInfo.interestedInTransfer}</td>
        // </tr>
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

// export const generateVaccineFormHtml = (
//   setup,
//   questionnaire,
//   patientInfo,
//   contactInfo
// ) => {
//   // Contact Info Section
//   const contactInfoHtml = `
//     <h2 style="color: #2c3e50;">Contact Information</h2>
//     <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
//       <tr style="background-color: #ecf0f1;">
//         <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email</strong></td>
//         <td style="padding: 10px; border: 1px solid #ddd;">${
//           contactInfo.email
//         }</td>
//       </tr>
//       <tr>
//         <td style="padding: 10px; border: 1px solid #ddd;"><strong>Phone Number</strong></td>
//         <td style="padding: 10px; border: 1px solid #ddd;">${
//           contactInfo.phoneNumber || "N/A"
//         }</td>
//       </tr>
//       <tr style="background-color: #ecf0f1;">
//         <td style="padding: 10px; border: 1px solid #ddd;"><strong>Preferred Method</strong></td>
//         <td style="padding: 10px; border: 1px solid #ddd;">${
//           contactInfo.preferredMethod || "N/A"
//         }</td>
//       </tr>
//     </table>
//   `;

//   // Setup Info Section (Patient Count and "What brought you here?")
//   const setupInfoHtml = `
//     <h2 style="color: #2c3e50;">Form Details</h2>
//     <div style="margin-bottom: 20px;">
//       <p><strong>Patient Count:</strong> ${setup.patientCount}</p>
//       <p><strong>What brought you here today?</strong><span style="color: #16a085;"> ${setup["What brought you here today?"]}</span></p>
//     </div>
//   `;

//   // Patient Sections (loop through patientInfo and questionnaire)
//   const patientsHtml = patientInfo
//     .map((patient, index) => {
//       // Patient Info
//       const patientInfoHtml = `
//         <h3 style="color: #34495e; margin-top: 20px;">Patient ${
//           index + 1
//         } Information</h3>
//         <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
//           <tr style="background-color: #ecf0f1;">
//             <td style="padding: 10px; border: 1px solid #ddd;"><strong>First Name</strong></td>
//             <td style="padding: 10px; border: 1px solid #ddd;">${
//               patient.firstName
//             }</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #ddd;"><strong>Last Name</strong></td>
//             <td style="padding: 10px; border: 1px solid #ddd;">${
//               patient.lastName
//             }</td>
//           </tr>
//           <tr style="background-color: #ecf0f1;">
//             <td style="padding: 10px; border: 1px solid #ddd;"><strong>Date of Birth</strong></td>
//             <td style="padding: 10px; border: 1px solid #ddd;">${
//               patient.dateOfBirth || "N/A"
//             }</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #ddd;"><strong>Address</strong></td>
//             <td style="padding: 10px; border: 1px solid #ddd;">${
//               patient.address || "N/A"
//             }</td>
//           </tr>
//           <tr style="background-color: #ecf0f1;">
//             <td style="padding: 10px; border: 1px solid #ddd;"><strong>Pronouns</strong></td>
//             <td style="padding: 10px; border: 1px solid #ddd;">${
//               patient.pronouns || "N/A"
//             }</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #ddd;"><strong>Health Card Number</strong></td>
//             <td style="padding: 10px; border: 1px solid #ddd;">${
//               patient.healthCardNumber || "N/A"
//             }</td>
//           </tr>
//           <tr style="background-color: #ecf0f1;">
//             <td style="padding: 10px; border: 1px solid #ddd;"><strong>Has Health Card</strong></td>
//             <td style="padding: 10px; border: 1px solid #ddd;">${
//               patient.hasHealthCard || "N/A"
//             }</td>
//           </tr>
//         </table>
//       `;

//       // Questionnaire for this patient
//       const patientQuestionnaire = questionnaire[index];
//       const questionnaireHtml = patientQuestionnaire
//         .map((section) => {
//           const isGrouped = section.length > 1;
//           const sectionContent = section
//             .map((qa, qaIndex) => {
//               const answers =
//                 qa.answer.length > 0 ? qa.answer.join(", ") : "N/A";
//               const questionStyle =
//                 qaIndex === 0
//                   ? `font-weight: bold; color: #34495e; margin-bottom: 5px;`
//                   : `font-weight: normal; color: #7f8c8d; margin-left: 20px; margin-bottom: 5px;`;
//               return `
//                 <div style="${questionStyle}">
//                   ${qa.question}: <span style="color: #16a085;">${answers}</span>
//                 </div>
//               `;
//             })
//             .join("");
//           return `
//             <div style="margin-bottom: 15px; padding: ${
//               isGrouped ? "10px" : "0"
//             }; border: ${
//             isGrouped ? "1px solid #eee" : "none"
//           }; border-radius: 5px; background-color: ${
//             isGrouped ? "#f9f9f9" : "transparent"
//           };">
//               ${sectionContent}
//             </div>
//           `;
//         })
//         .join("");

//       return `
//         ${patientInfoHtml}
//         <h3 style="color: #34495e; margin-top: 20px;">Patient ${
//           index + 1
//         } Questionnaire Responses</h3>
//         <div style="margin-top: 15px;">
//           ${questionnaireHtml}
//         </div>
//       `;
//     })
//     .join("<hr style='border: 1px solid #eee; margin: 20px 0;'>"); // Separator between patients

//   // Full HTML
//   return `
//     <html>
//       <body style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 700px; margin: 0 auto; background-color: #f4f4f4;">
//         <div style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
//           <h1 style="color: #3498db; text-align: center; margin-bottom: 20px;">${
//             setup.formName
//           } Form Submission</h1>
//           ${contactInfoHtml}
//           ${setupInfoHtml}
//           ${patientsHtml}
//           <footer style="margin-top: 30px; font-size: 12px; color: #7f8c8d; text-align: center;">
//             <p>Submitted on: ${new Date().toLocaleString()}</p>
//             <p>Powered by Sky-Shop</p>
//           </footer>
//         </div>
//       </body>
//     </html>
//   `;
// };
export const generateVaccineFormHtml = (
  setup,
  questionnaire,
  patientInfo,
  contactInfo,
  MeetingDetails
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

  // Meeting Details Section
  const meetingDetailsHtml = `
    <h2 style="color: #2c3e50;">Meeting Details</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr style="background-color: #ecf0f1;">
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Date</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">${MeetingDetails.date}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Timing</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">${MeetingDetails.time}</td>
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
          ${meetingDetailsHtml}
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

export const generateCovidVaccineFormHtml = (
  setup,
  questionnaire,
  patientInfo,
  contactInfo,
  MeetingDetails
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

  // Meeting Details Section
  const meetingDetailsHtml = `
    <h2 style="color: #2c3e50;">Meeting Details</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr style="background-color: #ecf0f1;">
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Date</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">${MeetingDetails.date}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Timing</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">${MeetingDetails.time}</td>
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
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Age</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              patient.age || "N/A"
            }</td>
          </tr>
          
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
          ${meetingDetailsHtml}
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

export const generateConsultationFormHtml = (
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
  comments
) => {
  // Consultation Details Section
  const consultationDetailsHtml = `
      <h2 style="color: #2c3e50; margin-top: 30px; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Consultation Details</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr style="background-color: #ecf0f1;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Service</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${service}</td>
        </tr>
        <tr style="background-color: #ecf0f1;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Consultation Type</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${consultationType}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
        </tr>
        <tr style="background-color: #ecf0f1;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Phone Number</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${phoneNumber}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Preferred Contact Method</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${preferredContactMethod}</td>
        </tr>
        <tr style="background-color: #ecf0f1;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Date</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${date}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Timing</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${timing}</td>
        </tr>
      </table>
    `;

  // Patient Information Section
  const patientInfoHtml = `
      <h2 style="color: #2c3e50; margin-top: 30px; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Patient Information</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr style="background-color: #ecf0f1;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>First Name</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${firstName}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Last Name</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${lastName}</td>
        </tr>
        <tr style="background-color: #ecf0f1;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Date of Birth</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${dateOfBirth}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Current Patient</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${
            isCurrentPatient ? "Yes" : "No"
          }</td>
        </tr>
        <tr style="background-color: #ecf0f1;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Interested in Transfer</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${
            interestedInTransfer ? "Yes" : "No"
          }</td>
        </tr>
      </table>
    `;

  // Comments Section (Optional)
  const commentsHtml = comments
    ? `
      <h2 style="color: #2c3e50; margin-top: 30px; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Comments</h2>
      <div style="padding: 10px; background-color: #f9f9f9; border: 1px solid #eee; border-radius: 5px; margin-bottom: 20px;">
        <p style="color: #16a085;">${comments}</p>
      </div>
    `
    : "";

  // Full HTML with Improved UI
  return `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 700px; margin: 0 auto; background-color: #f4f4f4;">
          <div style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <h1 style="color: #3498db; text-align: center; margin-bottom: 20px;">Consultation Form</h1>
            ${consultationDetailsHtml}
            ${patientInfoHtml}
            ${commentsHtml}
            <footer style="margin-top: 30px; font-size: 12px; color: #7f8c8d; text-align: center;">
              <p>Submitted on: ${new Date().toLocaleString()}</p>
              <p>Powered by Sky-Shop</p>
            </footer>
          </div>
        </body>
      </html>
    `;
};
export const generateSymptonaticCovidFormHtml = (
  setup,
  questionnaire,
  patientInfo,
  contactInfo,
  MeetingDetails
) => {
  // Contact Info Section
  const contactInfoHtml = `
    <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 8px; margin-bottom: 15px;">Contact Information</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
      <tr style="background-color: #ecf0f1;">
        <td style="padding: 10px; border: 1px solid #ddd; width: 30%;"><strong>Email</strong></td>
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

  // Meeting Details Section
  const meetingDetailsHtml = `
    <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 8px; margin-bottom: 15px;">Meeting Details</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
      <tr style="background-color: #ecf0f1;">
        <td style="padding: 10px; border: 1px solid #ddd; width: 30%;"><strong>Date</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">${MeetingDetails.date}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Timing</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">${MeetingDetails.time}</td>
      </tr>
    </table>
  `;

  // Setup Info Section
  const setupInfoHtml = `
    <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 8px; margin-bottom: 15px;">Form Details</h2>
    <div style="margin-bottom: 25px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="background-color: #ecf0f1;">
          <td style="padding: 10px; border: 1px solid #ddd; width: 30%;"><strong>Patient Count</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${setup.patientCount}</td>
        </tr>
      </table>
    </div>
  `;

  // Patient Sections
  const patientsHtml = patientInfo
    .map((patient, index) => {
      return `
        <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 8px; margin-bottom: 15px; margin-top: 30px;">
          Patient ${index + 1} Information
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
          <tr style="background-color: #ecf0f1;">
            <td style="padding: 10px; border: 1px solid #ddd; width: 30%;"><strong>First Name</strong></td>
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
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Gender</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              patient.gender || "N/A"
            }</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Date of Birth</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              patient.dateOfBirth || "N/A"
            }</td>
          </tr>
          <tr style="background-color: #ecf0f1;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>City</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              patient.city || "N/A"
            }</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Postal Code</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              patient.postalCode || "N/A"
            }</td>
          </tr>
          <tr style="background-color: #ecf0f1;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Address</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              patient.address || "N/A"
            }</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              patient.email || "N/A"
            }</td>
          </tr>
          <tr style="background-color: #ecf0f1;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Phone Number</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              patient.phoneNumber || "N/A"
            }</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Pregnant Status</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              patient.isPregnant || "N/A"
            }</td>
          </tr>
          <tr style="background-color: #ecf0f1;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Symptoms</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              patient.hasSymptoms || "N/A"
            }</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Contact with COVID Patient</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              patient.hasContact || "N/A"
            }</td>
          </tr>
          <tr style="background-color: #ecf0f1;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Vaccination Status</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              patient.vaccinationStatus || "N/A"
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
    })
    .join("");

  // Questionnaire Section
  const questionnaireHtml =
    questionnaire.length > 0
      ? `
    <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 8px; margin-bottom: 15px; margin-top: 30px;">
      Questionnaire
    </h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
      ${questionnaire
        .map((qa, index) => {
          const answers = Array.isArray(qa.answer)
            ? qa.answer.join(", ")
            : qa.answer;
          return `
          <tr style="${index % 2 === 0 ? "background-color: #ecf0f1;" : ""}">
            <td style="padding: 10px; border: 1px solid #ddd; width: 30%;"><strong>${
              qa.question
            }</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd; color: #16a085;">${answers}</td>
          </tr>
        `;
        })
        .join("")}
    </table>
  `
      : "";

  // Full HTML
  return `
    <html>
      <head>
        <meta charset="UTF-8">
        <title>${setup.formName} Form Submission</title>
      </head>
      <body style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 800px; margin: 0 auto; background-color: #f4f4f4;">
        <div style="background-color: #fff; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h1 style="color: #3498db; text-align: center; margin-bottom: 25px; border-bottom: 2px solid #3498db; padding-bottom: 15px;">
            ${setup.formName} Form Submission
          </h1>
          ${contactInfoHtml}
          ${meetingDetailsHtml}
          ${setupInfoHtml}
          ${patientsHtml}
          ${questionnaireHtml}
          <footer style="margin-top: 40px; font-size: 12px; color: #7f8c8d; text-align: center; border-top: 1px solid #eee; padding-top: 15px;">
            <p>Submitted on: ${new Date().toLocaleString()}</p>
            <p>Powered by Sky-Shop</p>
          </footer>
        </div>
      </body>
    </html>
  `;
};

export default generateFormHtml;
