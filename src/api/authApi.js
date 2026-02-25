import API_CONFIG from "./config";


export const loginApi = async (data) => {
  const response = await fetch(`${API_CONFIG.AUTH_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Login failed");
  }
  return result;
};




export const verifyOtpApi = async (data) => {
  const response = await fetch(`${API_CONFIG.AUTH_BASE_URL}/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "OTP verification failed");
  }

  return result;
};




export const registerApi = async (data) => {
  try {
    const response = await fetch(`${API_CONFIG.USER_BASE_URL || API_CONFIG.AUTH_BASE_URL}/register`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data),
    });


    const text = await response.text();
    let result = {};
    if (text && text.trim()) {
      try {
        result = JSON.parse(text);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        console.error("Raw response that failed to parse:", text);
        
        if (text.trim().startsWith('<!DOCTYPE')) {
          throw new Error("Server returned HTML error page. Check if backend is running and CORS is configured.");
        }
        
        throw new Error(`Invalid JSON response from server: ${text.substring(0, 100)}...`);
      }
    }

    if (!response.ok) {
      const errorMessage = result.message || result.error || `Registration failed with status ${response.status}`;
      throw new Error(errorMessage);
    }
    return {
      success: true,
      message: result.message || "Registration successful",
      ...result
    };
    
  } catch (error) {
    console.error("Registration API error:", error);
    throw error;
  }
};