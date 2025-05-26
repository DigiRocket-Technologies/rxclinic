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
