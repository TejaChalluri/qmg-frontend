// import { head, header } from "framer-motion/client";
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
    console.log("Sending registration data to:", `${API_CONFIG.AUTH_BASE_URL}/register`);
    console.log("Registration data:", data);
    
    const response = await fetch(`${API_CONFIG.USER_BASE_URL || API_CONFIG.AUTH_BASE_URL}/register`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data),
    });

    console.log("Registration response status:", response.status);
    console.log("Registration response headers:", response.headers);

    // Get response as text first
    const text = await response.text();
    console.log("Registration raw response:", text);

    // Try to parse as JSON if there's content
    let result = {};
    if (text && text.trim()) {
      try {
        result = JSON.parse(text);
        console.log("Registration parsed response:", result);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        console.error("Raw response that failed to parse:", text);
        
        // Check if it's an HTML error page
        if (text.trim().startsWith('<!DOCTYPE')) {
          throw new Error("Server returned HTML error page. Check if backend is running and CORS is configured.");
        }
        
        throw new Error(`Invalid JSON response from server: ${text.substring(0, 100)}...`);
      }
    } else {
      console.log("Empty response from server");
    }

    if (!response.ok) {
      throw new Error(result.message || `Registration failed with status ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error("Registration API error:", error);
    throw error;
  }
};
