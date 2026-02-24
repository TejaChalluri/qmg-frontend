import { loginApi, verifyOtpApi, registerApi } from "../api/authApi";

export const loginUser = async (usernameOrEmail, password) => {
  return await loginApi({
    UsernameOrEmail: usernameOrEmail,
    Password: password
  });
};



export const verifyOtp = async (usernameOrEmail, password, otp) => {
  return await verifyOtpApi({
    UsernameOrEmail: usernameOrEmail,
    Password: password,
    Otp: otp
  });
};


export const registerUser = async (userData) => {
  return await registerApi({
    firstName: userData.firstName,
    lastName: userData.lastName,
    username: userData.username,
    email: userData.email,
    password: userData.password,
    roleName: userData.roleName,
    roleNumber: parseInt(userData.roleNumber),
    isActive: userData.isActive
  });
};