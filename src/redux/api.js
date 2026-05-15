import axios from "axios";
import toast from "react-hot-toast";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") || "null";

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete config.headers["Authorization"];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message;

    if (message === "Unauthenticated." || error?.response?.status === 401) {
      toast.error("Token Expired");

      localStorage.removeItem("token");
      localStorage.removeItem("pmsc");

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }

    return Promise.reject(error);
  }
);

export const signIn = (formData) => API.post(`/login`, formData);
export const signUp = (formData) => API.post(`/signup`, formData);
export const verifyOtp = (formData) => API.post(`/verify_account`, formData);
export const resendOtp = (formData) => API.post(`/resend_otp`, formData);
export const forgotPassword = (formData) =>
  API.post(`/forgot_password`, formData);
export const resetPassword = (formData) =>
  API.post(`/reset_password`, formData);
export const verifyForgotPasswordOtp = (formData) =>
  API.post(`/verify_forgot_password_otp`, formData);
export const logout = () => API.post(`/logout`, {});
export const verifyUserEmail = (formData) =>
  API.post(`/verify-user-email`, formData);
export const updateUserEmail = (formData) =>
  API.post(`/update-user-email`, formData);

export const getTermsCondition = () => API.post(`/get-terms-conditions`, {});
export const getPrivacyPolicy = () => API.post(`/get-privacy-policy`, {});
export const dashboardInfo = () => API.post(`/dashboard`, {});
export const getAllSubject = () => API.post(`/stud-sub`, {});
export const getAllQuestion = (formData) => API.post(`/start-quiz`, formData); //changed from get-question

export const paymentInitiate = (formData) =>
  API.post(`/create-subscription-payment`, formData);
export const paymentHistory = (formData) =>
  API.post(`/user-payment-history`, formData);

export const downloadPDf = (formData) =>
  API.post(`/user-payment-invoice`, formData);
//

//
export const getAttemptId = (formData) => API.post(`/start-quiz`, formData);
export const removeAttemptId = (formData) =>
  API.post(`/delete-quiz-attempt`, formData);
export const submitAnswer = (formData) => API.post(`/submit-quiz`, formData);
export const getSubmittedAnswer = (formData) =>
  API.post(`/user-quiz-summary`, formData);

export const getUserProgress = (formData) =>
  API.post(`/user-subject-progress`, formData);
export const subjectWiseProgress = (formData) =>
  API.post(`/user-lesson-progress`, formData);
export const getProfile = () => API.post(`/view-profile`);
export const updateProfile = (formData) =>
  API.post(`/update-user-profile`, formData);

// --------
export const getAllLession = (formData) =>
  API.post(`/get_subject_lesson`, formData);
export const getLessionDetails = (formData) =>
  API.post(`/lessons-content`, formData);
export const startLession = (formData) => API.post(`/start-lesson`, formData);
export const startQuiz = (formData) => API.post(`/start-quiz`, formData);
export const lessionSubmit = (formData) =>
  API.post(`/submit-answers`, formData);
export const completeLesson = (formData) =>
  API.post(`/complete_lesson`, formData);
export const retriveLesson = (formData) =>
  API.post(`/lessons-review`, formData);
export const getEarnedCertificate = (formData) =>
  API.post(`/get-user-certificate`, formData);
export const getWhiteboard = (formData) =>
  API.post(`/submit-whiteboard-answer`, formData);
