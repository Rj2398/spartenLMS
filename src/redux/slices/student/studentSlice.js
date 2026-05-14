import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api.js";
import toast from "react-hot-toast";

export const dashboardInfo = createAsyncThunk(
  "/student/dashboardInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.dashboardInfo();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getProfile = createAsyncThunk(
  "/student/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getProfile();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "/student/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.updateProfile(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const verifyUserEmail = createAsyncThunk(
  "/student/verifyUserEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.verifyUserEmail(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateUserEmail = createAsyncThunk(
  "/student/updateUserEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.updateUserEmail(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const studentSlice = createSlice({
  name: "studentSlice",
  initialState: {
    profileData: null,
    dashboardData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(dashboardInfo.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(dashboardInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action.payload?.data;
      })
      .addCase(dashboardInfo.rejected, (state, action) => {
        // state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch client information";
      })

      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload?.data;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch client information";
      })

      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload?.data;
        toast.success(
          action.payload?.message || "Profile updated successfully!"
        );
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch client information";
      })

      .addCase(verifyUserEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyUserEmail.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(
          action.payload?.message || "Verification email sent successfully!"
        );
      })
      .addCase(verifyUserEmail.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to send verification email";
      })

      .addCase(updateUserEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserEmail.fulfilled, (state, action) => {
        state.loading = false;
        // toast.success(action.payload?.message || "Email updated successfully!");
      })
      .addCase(updateUserEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update email";
        toast.error(state.error);
      });
  },
});

export default studentSlice.reducer;
