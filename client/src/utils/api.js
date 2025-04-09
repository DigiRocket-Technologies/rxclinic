export const submitFormData = async (formData) => {
  try {
    const response = await fetch("http://localhost:3000/submitForm", {
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
    const response = await fetch("http://localhost:3000/submit-vaccine-form", {
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
