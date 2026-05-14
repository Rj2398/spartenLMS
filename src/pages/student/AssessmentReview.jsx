import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getSubmittedAnswer } from "../../redux/slices/student/subjectSlice";

const AssessmentReview = () => {
  const { submittedAns, attemptId } = useSelector((state) => state.subject);
  const location = useLocation();
  const subject_id = location?.state?.subjectId;

  const staticData = submittedAns?.quiz_summary;

  const lesson_id = location?.state?.lessonId;

  //
  //
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getSubmittedAnswer({ lesson_id: lesson_id, subject_id: subject_id })
    );
  }, [dispatch]);

  // Metadata for the top section
  const assessmentInfo = {
    subject_name: `${submittedAns?.subject_details?.name} - ${submittedAns?.subject_details?.lesson_name}`,
    percentage: submittedAns?.attempt_score_percentage,
    total_lessons: 5,
    total_lesson_quizzes:
      submittedAns?.subject_details?.get_lesson_quizzes_count,
    // status: subject_details?.attempt_status,
  };

  return (
    <>
      <div className="baseline-ass-wrp">
               {" "}
        <div className="back-btn mb-3">
                   {" "}
          <Link
            to="#"
            onClick={() => {
              navigate(-1);
            }}
          >
                       {" "}
            <img src="/images/baseline-assessment/back-icon.svg" alt="icon" />  
                      Back to the Subject          {" "}
          </Link>
                 {" "}
        </div>
             {" "}
      </div>

      <div className="sub-detail-wrap baseline-ass-wrp">
        {/* Header Section */}
        <div className="sub-detail-top">
          <div>
            <h1 className="mb-1">
              {assessmentInfo.subject_name}
              <span className="pe-4 text-black">
                {" "}
                Score: {assessmentInfo.percentage}%
              </span>
            </h1>

            <div className="sub-pro mb-0">
              <ul style={{ color: "#4126A8" }}>
                <li style={{ color: "#4126A8" }}>
                  <img src="../images/subject-detail/quizzes.svg" alt="" />
                  {assessmentInfo.total_lesson_quizzes} Quizzes
                </li>
              </ul>
              <b
                className={
                  submittedAns?.attempt_status === "completed"
                    ? "completed"
                    : "retake"
                }
              >
                {submittedAns?.attempt_status
                  ?.replace(/_/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </b>
            </div>
          </div>
        </div>

        {/* Questions Section - Matching image_55811e.png */}
        <div className="assessment-result baseline-top border-0 p-0">
          <div className="baseline-ass-q-a drop-list">
            <h2 className="mb-4">
              <img
                src="../images/dashboard/earned-certificates/earned-certi.svg"
                alt=""
              />
              Submitted assessment answers
            </h2>

            {staticData?.map((item, index) => (
              <div className="asse-complete-q-a mb-4" key={item.quiz_id}>
                {/* Question Row */}
                <h4 className="mb-1">
                  Question {index + 1}: {item.question}
                </h4>

                {/* Answer Row - Stacked directly below */}
                <p
                  className="ps-0 d-flex gap-2 align-items-center mb-0"
                  style={{ color: "#4126A8" }}
                >
                  <span style={{ color: "#6c757d" }}>Your Answer</span>
                  <img
                    src="../images/baseline-assessment/radio-icon.svg"
                    alt="radio"
                    style={{ width: "14px" }}
                  />
                  <span className="fw-normal text-primary">
                    {item.selected_answer || "No answer submitted"}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Action */}
        <div className="back-btn mt-4 mx-auto text-center">
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Return to Profile
          </Link>
        </div>
      </div>
    </>
  );
};

export default AssessmentReview;
