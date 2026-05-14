import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashboardInfo } from "../../redux/slices/student/studentSlice";

const WelcomeDashboard = () => {
  const dispatch = useDispatch();
  const { dashboardData } = useSelector((state) => state.student);


  useEffect(() => {
    dispatch(dashboardInfo());
  }, [dispatch]);

  return (
    <>
      <div className="top-head">
        <div className="top-head-in">
          <h1>Welcome, {dashboardData?.username||'Student'}!</h1>
          <p className="top-head-p"> Ready to continue your learning journey?  </p>
        </div>
      </div>

      <div className="progress-grid">
        <div className="row g-0">
          <div className="col-lg-3" style={{marginRight:'30px'}}>
            <div className="progress-grid-in ms-0">
              <h2>
            
                {/* <img src="/images/Overlay.svg" alt="" /> */}
                    <img src="/images/dashboard/progress-grid/3.svg" alt="" />
                 Lesson Quiz Progress
              </h2>
                <h3>{dashboardData?.overall_quiz_progress?.progress_percentage||0}%</h3>
              <p className="text-white">
                {dashboardData?.overall_quiz_progress?.completed_quizzes||0}/
                {dashboardData?.overall_quiz_progress?.total_quizzes||0} Completed{" "}
              </p>
             
              
            </div>
          </div>
          <div className="col-lg-3">
            <div className="progress-grid-in">
              <h2>
                <img src="/images/dashboard/progress-grid/3.svg" alt="" />
                Overall Lesson  progress
              </h2>
               <h3>{dashboardData?.overall_lesson_progress?.progress_percentage||0}%</h3>
              <p className="text-black">
                {dashboardData?.overall_lesson_progress?.completed_lessons||0}/
                {dashboardData?.overall_lesson_progress?.total_lessons||0} Completed{" "}
              </p>
            </div>
          </div>
       
        </div>
      </div>
    </>
  );
};

export default WelcomeDashboard;
