
const API_URL = "http://localhost:5000"; // adjust as needed

export const signupUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
