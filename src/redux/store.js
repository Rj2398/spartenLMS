import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import subjectSlice from './slices/student/subjectSlice';
import studentSlice from './slices/student/studentSlice';
import lessionSlice from './slices/student/lessionSlice';

// Teacher Panel
// import dashboardSlice from './slices/teacher/dashboardSlice';
// import mwlSlice from './slices/teacher/mwlSlice';
// import progressSlice from './slices/teacher/progressSlice';


// principal Panel
// import principaDashboardSlice from './slices/principal/principalDashboardSlice';
// import teacherAndStudentsSlice from './slices/principal/teacherAndStudentsSlice';
// import principalProgressSlice from './slices/principal/principalProgressSlice'

// principal Panel
// import districtDashboardSlice from './slices/districtAdmin/districtSlice';s


export const store = configureStore({
  reducer: {
    auth: authSlice,
    student: studentSlice,
    subject: subjectSlice,
    lession: lessionSlice,

    // Teacher Slices
    // dashboard: dashboardSlice,
    // mwl: mwlSlice,
    // progress: progressSlice,

    //principal slice 
    // principalDashboard:principaDashboardSlice,
    // teacherAndStudents:teacherAndStudentsSlice,
    // principalProgress:principalProgressSlice,

    //principal slice 
    // districtDashboard:districtDashboardSlice,
  }
});
