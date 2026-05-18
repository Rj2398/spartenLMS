import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api.js";
import toast from "react-hot-toast";

// Load stored user from localStorage
const storedUser = JSON.parse(localStorage.getItem("pmsc") || "null");

const token = localStorage.getItem("token");

console.log("Stored User from localStorage:", storedUser); // Debugging line

// Async thunk for sign-in
export const signIn = createAsyncThunk(
  "/student/signIn",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const signUp = createAsyncThunk(
  "/student/signUp",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "/student/verifyOtp",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.verifyOtp(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const resendOtp = createAsyncThunk(
  "/student/resendOtp",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.resendOtp(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "/student/forgotPassword",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.forgotPassword(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "/student/resetPassword",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.resetPassword(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const verifyForgotPasswordOtp = createAsyncThunk(
  "/student/verifyForgotPasswordOtp",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.verifyForgotPasswordOtp(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const logout = createAsyncThunk(
  "/student/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.logout();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const getMyDetails = createAsyncThunk(
  "/anything/clever",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getMyDetails(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const getTermsCondition = createAsyncThunk(
  "/anything/getTermsCondition",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getTermsCondition(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const getPrivacyPolicy = createAsyncThunk(
  "/anything/getPrivacyPolicy",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getPrivacyPolicy(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const getReportDownloadData = createAsyncThunk(
  "/anything/getReportDownloadData",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getReportDownloadData(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const getEarnedCertificate = createAsyncThunk(
  "/anything/getEarnedCertificate",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getEarnedCertificate(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!storedUser,
    user: storedUser || null,
    signUpUser: null,
    verifyOtpData: null,
    isAlreadyVisited: null,
    termsData: null,
    privacyData: null,
    reportData: null,
    earnCertificateData: null,
    loading: false,
    reportLoading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("pmsc");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.data?.user;
        state.isAuthenticated = true;

        const user = action.payload?.data?.user;
        const token = action.payload?.data?.token;

        if (user) {
          localStorage.setItem("pmsc", JSON.stringify(user));
        }

        if (token) {
          localStorage.setItem("token", token);
        }
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to sign in.";
      })

      .addCase(signUp.pending, (state) => {
        state.loading = false;
        state.error = null;
      })

      // ✅ Success
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.signUpUser = action.payload?.data;
        sessionStorage.setItem(
          "signUpUser",
          JSON.stringify(action.payload?.data)
        );
        state.success = true;
      })

      // ✅ Failed
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(verifyOtp.pending, (state) => {
        state.loading = false;
        state.error = null;
      })

      // ✅ Success
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.verifyOtpData = action.payload?.data;
        state.success = true;
      })

      // ✅ Failed
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(resendOtp.pending, (state) => {
        state.loading = false;
        state.error = null;
      })

      // ✅ Success
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload?.message || "OTP resent successfully!");
        state.success = true;
      })

      // ✅ Failed
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        toast.error(
          action.payload?.message || "Failed to resend OTP. Please try again."
        );
        state.error = action.payload;
      })

      .addCase(forgotPassword.pending, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(
          action.payload?.message || "OTP sent to your email successfully!"
        );
        state.success = true;
      })

      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        toast.error(
          action.payload?.message || "Failed to send OTP. Please try again."
        );
        state.error = action.payload;
      })

      .addCase(resetPassword.pending, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(
          action.payload?.message || "Password reset successfully!"
        );
        state.success = true;
      })

      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        toast.error(
          action.payload?.message ||
            "Failed to reset password. Please try again."
        );
        state.error = action.payload;
      })

      .addCase(verifyForgotPasswordOtp.pending, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(verifyForgotPasswordOtp.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload?.message || "OTP verified successfully!");
        state.success = true;
      })

      .addCase(verifyForgotPasswordOtp.rejected, (state, action) => {
        state.loading = false;
        toast.error(
          action.payload?.message || "Failed to verify OTP. Please try again."
        );
        state.error = action.payload;
      })

      .addCase(logout.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        // toast.success("Logout Successfully...");
        localStorage.removeItem("pmsc");
        localStorage.removeItem("token");
        localStorage.removeItem("classLevel");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        // toast.success("Logout Successfully...");
        localStorage.removeItem("pmsc");
        localStorage.removeItem("token");
        localStorage.removeItem("classLevel");

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      })

      .addCase(getMyDetails.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getMyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user;
        state.isAuthenticated = true;
        if (action.payload?.user?.read_status == 0) {
          state.isAlreadyVisited = true;
        } else {
          state.isAlreadyVisited = false;
        }
        localStorage.setItem("pmsc", JSON.stringify(action.payload?.user));
        localStorage.setItem("classLevel", action.payload?.user?.level_id || 2);
      })

      .addCase(getMyDetails.rejected, (state, action) => {
        state.loading = false;
        toast.error(
          action.payload?.message || "Login failed. Please try again."
        );
        state.error = action.payload?.message || "Failed to sign in.";
      })

      .addCase(getTermsCondition.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getTermsCondition.fulfilled, (state, action) => {
        state.loading = false;
        state.termsData = action.payload?.data;
      })
      .addCase(getTermsCondition.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(getPrivacyPolicy.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getPrivacyPolicy.fulfilled, (state, action) => {
        state.loading = false;
        state.privacyData = action.payload?.data;
      })
      .addCase(getPrivacyPolicy.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(getReportDownloadData.pending, (state) => {
        state.reportLoading = true;
        state.error = null;
      })
      .addCase(getReportDownloadData.fulfilled, (state, action) => {
        state.reportLoading = false;
        state.reportData = action.payload?.data;
      })
      .addCase(getReportDownloadData.rejected, (state, action) => {
        state.reportLoading = false;
      })

      .addCase(getEarnedCertificate.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(getEarnedCertificate.fulfilled, (state, action) => {
        state.loading = false;
        state.earnCertificateData = action.payload?.certificates;
      })
      .addCase(getEarnedCertificate.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
