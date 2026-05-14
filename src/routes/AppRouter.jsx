import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import StudentLayout from "../layout/StudentLayout";

// Pages
import Login from "../pages/student/Login/Login";
import CreateAccount from "../pages/student/Login/CreateAccount";
import ForgotPassword from "../pages/student/Login/ForgotPassword";
import OtpVerification from "../pages/student/Login/OtpVerification";
import NewPassword from "../pages/student/Login/NewPassword";

import StudentDashboard from "../pages/student/Dashboard";
import StudentProfile from "../pages/student/Profile";
import StudentProgressAndScore from "../pages/student/ProgressAndScore";
import BaselineAssessment from "../pages/student/BaselineAssessment";
import SubjectDetail from "../pages/student/SubjectDetail";
import LessonDetail from "../pages/student/LessonDetail";
import SummativeAssessment from "../pages/student/SummativeAssessment";
import AssessmentReview from "../pages/student/AssessmentReview";

import Payment from "../pages/student/Payment";

import TermsCondition from "../pages/common/TermsCondition";
import PrivacyPolicy from "../pages/common/PrivacyPolicy";
import NotFound from "../pages/common/NotFound";
import ProtectedRoute from "./RoleBasedRoute";
import PaymentSuccess from "../pages/student/PaymentSuccess";
const AppRouter = () => (
  <Router>
    <Routes>
      {/* 1. AUTH ROUTES (isPrivate={false}) 
          Redirects to /student/dashboard if user is already logged in */}
      <Route element={<ProtectedRoute isPrivate={false} />}>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify" element={<OtpVerification />} />
        <Route path="/new-password" element={<NewPassword />} />
      </Route>

      {/* 2. PROTECTED STUDENT ROUTES (isPrivate={true}) 
          Redirects to / if user is NOT logged in */}
      <Route element={<ProtectedRoute isPrivate={true} />}>
        <Route element={<StudentLayout />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/payments" element={<Payment />} />
          <Route path="/student/subject-detail" element={<SubjectDetail />} />
          <Route path="/student/lesson-detail" element={<LessonDetail />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/student/payments" element={<Payment />} />
          <Route
            path="/student/progress-and-score"
            element={<StudentProgressAndScore />}
          />
          <Route
            path="/student/assesment-review"
            element={<AssessmentReview />}
          />
          <Route
            path="/student/baseline-assignment/:subject_id"
            element={<BaselineAssessment />}
          />
          <Route
            path="/student/summative-assessment/:subject_id"
            element={<SummativeAssessment />}
          />
        </Route>
      </Route>

      {/* 3. ALWAYS ACCESSIBLE ROUTES */}
      <Route path="/terms-and-conditions" element={<TermsCondition />} />
      <Route path="/privacy-and-policy" element={<PrivacyPolicy />} />

      {/* 4. 404 NOT FOUND */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRouter;
