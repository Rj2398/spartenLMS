import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api.js";

//getlession
//
export const getLessionSlice = createAsyncThunk("/student/getAllLession",async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getAllLession(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
//
//get details

export const getLessionDetailSlice = createAsyncThunk("/student/lessons-content",async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getLessionDetails(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//start lession

export const startLession = createAsyncThunk("/student/start-lesson",async (formData, { rejectWithValue }) => {
    try {
      const response = await api.startLession(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//start quiz
export const startQuiz = createAsyncThunk("/student/startQuiz",async (formData, { rejectWithValue }) => {
    try {
      const response = await api.startQuiz(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//submit lesson
export const lessionSubmit = createAsyncThunk("/student/complete-lesson",async (formData, { rejectWithValue }) => {
    try {
      const response = await api.lessionSubmit(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
//complete lession

export const completeLesson = createAsyncThunk("/start/complete-lesson",async (formData, { rejectWithValue }) => {
    try {
      const response = await api.completeLesson(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//retrive lesson
export const retriveLesson = createAsyncThunk("/start/lessons-review",async (formData, { rejectWithValue }) => {
    try {
      const response = await api.retriveLesson(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getWhiteboard = createAsyncThunk("/student/submit-whiteboard-answer",async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getWhiteboard(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const lessionSlice = createSlice({
  name: "lessionSlice",
  initialState: {
    storeAllLession: null,
    lessionWiseDetails: null,
    whiteBoard: null,
    loading: false,
    error: null,
    startLessionResponse: null,
    startQuizResponse: null,
    lessonSubmitResponse: null,
    completeLessonResponse: null,
    retriveLessonResponse: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLessionSlice.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getLessionSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.storeAllLession = action.payload?.data;
        console.log("getLessionSlice response in slice", action.payload?.data);
      })
      .addCase(getLessionSlice.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch client information";
      })
      //details of lession

      .addCase(getLessionDetailSlice.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getLessionDetailSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.lessionWiseDetails = action.payload;
      })
      .addCase(getLessionDetailSlice.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch client information";
      })
      //complete lesson
      .addCase(startLession.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(startLession.fulfilled, (state, action) => {
        state.loading = false;
        state.startLessionResponse = action.payload;
      })
      .addCase(startLession.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch client information";
      })
      //complete startQuiz
      .addCase(startQuiz.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(startQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.startQuizResponse = action.payload;
      })
      .addCase(startQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch client information";
      })
      //lesson submit response

      .addCase(lessionSubmit.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(lessionSubmit.fulfilled, (state, action) => {
        state.loading = false;
        state.lessonSubmitResponse = action.payload;
      })
      .addCase(lessionSubmit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      })

      //complete lesson

      .addCase(completeLesson.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(completeLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.completeLessonResponse = action.payload;
      })
      .addCase(completeLesson.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch client information";
      })

      //retrive lesson response

      .addCase(retriveLesson.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(retriveLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.retriveLessonResponse = action.payload;
      })
      .addCase(retriveLesson.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch client information";
      })
      
      .addCase(getWhiteboard.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getWhiteboard.fulfilled, (state, action) => {
        state.loading = false;
        state.whiteBoard = action.payload;
      })
      .addCase(getWhiteboard.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch client information";
      });
      ;
  },
});

export default lessionSlice.reducer;
