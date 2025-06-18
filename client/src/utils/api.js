export const submitFormData = async (formData) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_DOMAIN}submitForm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Form submission successful:", result);
    return result; // e.g., { message: "Form submitted successfully, email sent" }
  } catch (error) {
    console.error("Error submitting form:", error.message);
    throw error; // Re-throw to handle in the calling code
  }
};

export const submitVaccineForm = async (formData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_DOMAIN}submit-vaccine-form`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Form submission successful:", result);
    return result; // e.g., { message: "Form submitted successfully, email sent" }
  } catch (error) {
    console.error("Error submitting form:", error.message);
    throw error; // Re-throw to handle in the calling code
  }
};

export const submitConsultationForm = async (formData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_DOMAIN}submit-consultation-Form`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Form submission successful:", result);
    return result; // e.g., { message: "Form submitted successfully, email sent" }
  } catch (error) {
    console.error("Error submitting form:", error.message);
    throw error; // Re-throw to handle in the calling code
  }
};

export const submitSymptomaticCovid = async (formData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_DOMAIN}submit-symptomatic-covid`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Form submission successful:", result);
    return result; // e.g., { message: "Form submitted successfully, email sent" }
  } catch (error) {
    console.error("Error submitting form:", error.message);
    throw error; // Re-throw to handle in the calling code
  }
};

export const submitNewPrescriptionFormData = async (formData) => {
  try {
    const response = await fetch(
      "http://localhost:3000/submitNewPrescriptionData",
      {
        method: "POST",
        // Don't set Content-Type header when sending FormData
        // The browser will automatically set the correct Content-Type with boundary
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `HTTP error! Status: ${response.status}`
      );
    }

    const result = await response.json();
    console.log("Form submission successful:", result);
    return result;
  } catch (error) {
    console.error("Error submitting form:", error.message);
    throw error;
  }
};
export const submitPrescriptionRenewalFormData = async (formData) => {
  try {
    console.log("Sending form data to server...");

    const response = await fetch(
      "http://localhost:3000/submitprescriptionrenewaldata",
      {
        method: "POST",
        body: formData, // No need to set Content-Type for FormData
        // Don't set Content-Type header - browser will set it automatically with boundary
        // Increase timeout for large files
      }
    );

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Unknown error" }));
      console.error("Server error:", response.status, errorData);
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error; // Re-throw to let the component handle it
  }
};
export const submitPrescriptionRefillFormData = async (formData) => {
  try {
    const response = await fetch(
      "http://localhost:3000/submitPrescriptionRefillData",
      {
        method: "POST",
        // Don't set Content-Type header when sending FormData
        // The browser will automatically set the correct Content-Type with boundary
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `HTTP error! Status: ${response.status}`
      );
    }

    const result = await response.json();
    console.log("Form submission successful:", result);
    return result;
  } catch (error) {
    console.error("Error submitting form:", error.message);
    throw error;
  }
};
export const submitPrescriptionTransferFormData = async (formData) => {
  try {
    const response = await fetch(
      "http://localhost:3000/submitPrescriptionTransferData",
      {
        method: "POST",
        // Don't set Content-Type header when sending FormData
        // The browser will automatically set the correct Content-Type with boundary
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `HTTP error! Status: ${response.status}`
      );
    }

    const result = await response.json();
    console.log("Form submission successful:", result);
    return result;
  } catch (error) {
    console.error("Error submitting form:", error.message);
    throw error;
  }
};
export const calendlyLinks = [
  import.meta.env.VITE_CALENDLY_MEET_15,
  import.meta.env.VITE_CALENDLY_MEET_30,
  import.meta.env.VITE_CALENDLY_MEET_45,
  import.meta.env.VITE_CALENDLY_MEET_60,
  import.meta.env.VITE_CALENDLY_MEET_75,
];
