// //code commented by rajan 12-05-2026
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllQuestion,
  getAttemptId,
  submitAnswer,
} from "../../redux/slices/student/subjectSlice";
import toast from "react-hot-toast";

const BaselineAssessment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { subject_id } = useParams();
  const quizStatus = location.state?.quizStatus;
  //   // 1. Dynamic IDs and Titles
  const lessonId = location.state?.lessonId;
  const subjectId = location.state?.subjectId || subject_id;
  const { allSubjectQuestion, subjectDetail, attemptId } = useSelector(
    (state) => state.subject
  );
  // console.log(attemptId, "subjectDetailsubjectDetail");
  const lessionWiseDetailsFromStore = useSelector(
    ({ lession }) => lession?.lessionWiseDetails // Added optional chaining for safety
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [answers, setAnswers] = useState({});
  const [lessionWiseDetails, setLessonWiseDetails] = useState();

  useEffect(() => {
    setLessonWiseDetails(lessionWiseDetailsFromStore);
  }, [lessionWiseDetailsFromStore]);

  useEffect(() => {
    dispatch(
      getAllQuestion({
        subject_id: subject_id,
        lesson_id: lessonId,
        quiz_status: quizStatus,
      })
    );
  }, [dispatch]); // Added dependencies to fix logic mismatch

  // Initialize answers when questions are loaded
  useEffect(() => {
    if (allSubjectQuestion && allSubjectQuestion?.length > 0) {
      const initialAnswers = {};
      allSubjectQuestion.forEach((q) => {
        initialAnswers[q.id] = null;
      });
      setAnswers(initialAnswers);
    }
  }, [allSubjectQuestion]);

  const handleOptionChange = (optionId) => {
    const currentQuestion = allSubjectQuestion?.[currentIndex];
    if (currentQuestion) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: optionId,
      }));
    }
  };

  const handleNext = () => {
    if (currentIndex < (allSubjectQuestion?.length || 0) - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFinish = async () => {
    const finalPayload = allSubjectQuestion?.map((q) => ({
      quiz_id: q.id,
      selected_option_id: answers[q.id],
    }));

    const anyUnanswered = finalPayload?.some(
      (ans) => ans.selected_option_id === null
    );

    if (anyUnanswered) {
      toast.error("Please answer all questions before finishing!!");
      return;
    }

    console.log("Submit Payload:", finalPayload);

    try {
      await dispatch(
        submitAnswer({
          attempt_id: attemptId,
          quiz_status: "completed",
          answers: finalPayload,
        })
      ).unwrap(); // .unwrap() is used with createAsyncThunk to catch errors

      toast.success("Assessment submitted successfully!");

      navigate("/student/subject-detail", {
        state: { subjectId: subjectId || subject_id },
      });
    } catch (error) {
      toast.error("Failed to submit assessment. Please try again.");
      console.error("Submission error:", error);
    }
  };

  //
  const totalQuestions = allSubjectQuestion?.length || 0;
  const answeredCount = Object.values(answers).filter(
    (val) => val !== null
  ).length;
  const progress =
    totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;
  const currentQuestion = allSubjectQuestion?.[currentIndex];

  return (
    <>
      <div className="baseline-ass-wrp">
        <div className="back-btn mb-3">
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              setShowQuitModal(true);
            }}
          >
            <img src="/images/baseline-assessment/back-icon.svg" alt="icon" />{" "}
            Back
          </Link>
        </div>

        <div className="sub-detail-top">
          <h1 className="mb-2">
            {subjectDetail?.name}
            <span className="text-black">
              <b>{progress}%</b>
            </span>
          </h1>
          <div className="sub-pro mb-2">
            <p>{subjectDetail?.description}</p>
            <h1 className="mb-0">
              <span className="text-black">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
            </h1>
          </div>
          <div className="sub-pro mb-0">
            <ul>
              <li>
                <img src="/images/subject-detail/lessons.svg" alt="lessons" />{" "}
                {subjectDetail?.get_lessons_count} lessons
              </li>
              <li>
                <img src="/images/subject-detail/quizzes.svg" alt="quizzes" />{" "}
                {subjectDetail?.get_lesson_quizzes_count} Quizzes
              </li>
              <li>
                <span>&nbsp;</span>
              </li>
            </ul>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFinish();
          }}
        >
          <div className="baseline-ass-q-a">
            <h2>{currentQuestion?.question}</h2>
            {currentQuestion?.options?.map((opt) => (
              <label key={opt.id}>
                <input
                  type="radio"
                  name={`question_${currentQuestion.id}`}
                  value={opt.id}
                  // FIXED LOGIC: Changed answers[currentIndex] to answers[currentQuestion.id]
                  checked={answers[currentQuestion?.id] === opt.id}
                  onChange={() => handleOptionChange(opt.id)}
                />{" "}
                {opt.option}
              </label>
            ))}
          </div>

          <div className="bottom-cta">
            <Link
              className={`previous-cta ${currentIndex === 0 ? "disabled" : ""}`}
              onClick={(e) => {
                if (currentIndex === 0) e.preventDefault();
                handlePrevious();
              }}
            >
              <i className="fa-solid fa-arrow-left"></i> Previous
            </Link>

            {currentIndex < totalQuestions - 1 ? (
              <Link to="#" className="next-cta" onClick={handleNext}>
                Next <i className="fa-solid fa-arrow-right"></i>
              </Link>
            ) : (
              <button type="submit" className="finish-cta">
                Finish Baseline Assessment
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Quit Modal */}
      <Modal
        show={showQuitModal}
        onHide={() => setShowQuitModal(false)}
        className="my-popup"
        dialogClassName="custom-quit-modal"
        centered
      >
        <div
          className="modal-content"
          style={{
            border: "1px solid rgb(65, 38, 168)",
            borderRadius: "11px",
            overflow: "hidden",
          }}
        >
          <div className="modal-heading">
            <h2>Quit Assessment</h2>
            <button
              type="button"
              className="close close-btn-front"
              onClick={() => setShowQuitModal(false)}
            >
              <span aria-hidden="true">
                <img src="/images/cross-pop.svg" alt="" />
              </span>
            </button>
          </div>
          <Modal.Body>
            <div className="delete-pop-wrap">
              <div className="delete-pop-inner text-center ">
                <p style={{ fontWeight: "700" }}>
                  Are you sure you want to quit this Baseline Assessment?
                </p>
              </div>
              <div className="delete-pop-btn d-flex justify-content-end gap-3 mt-3 pe-3">
                <Button
                  variant="secondary"
                  onClick={() => setShowQuitModal(false)}
                  style={{
                    backgroundColor: "white",
                    color: "blue",
                    border: "1px solid blue",
                    padding: "9px 25px ",
                    borderRadius: "10px",
                  }}
                >
                  Cancel
                </Button>
                <Button
                type="submit"
                  variant="danger"
                  style={{ border: "none" }}
                  onClick={() => navigate("/student/dashboard")}
                >
                  Yes, sure
                </Button>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default BaselineAssessment;
