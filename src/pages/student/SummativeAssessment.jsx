import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllQuestion,
  getAttemptId,
  submitAnswer,
} from "../../redux/slices/student/subjectSlice";
import toast from "react-hot-toast";

const SummativeAssessment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { subject_id } = useParams();

  const subjectId = location.state?.subjectId;
  const subjectIdbyParams = subject_id;
  const isRetake = location.state?.isRetake || null;

  const { allSubjectQuestion, subjectDetail, attemptId } = useSelector(
    (state) => state.subject
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    dispatch(getAllQuestion({ subject_id: subjectId, type: "summative" }));
    dispatch(
      getAttemptId({
        subject_id: subjectId,
        quiz_type: "summative",
        ...(isRetake ? { retake: 1 } : {}),
      })
    );
  }, [dispatch]);

  // Initialize answers when questions are loaded
  useEffect(() => {
    if (allSubjectQuestion?.length > 0) {
      const initialAnswers = {};
      allSubjectQuestion.forEach((q, index) => {
        initialAnswers[index] = q.selected_option_id ?? null;
      });
      setAnswers(initialAnswers);
    }
  }, [allSubjectQuestion]);

  const handleOptionChange = (optionId) => {
    const currentQuestion = allSubjectQuestion?.[currentIndex];
    // Prevent changes if already answered
    if (currentQuestion?.selected_option_id !== null) return;

    setAnswers({
      ...answers,
      [currentIndex]: optionId,
    });
  };

  const handleNext = () => {
    if (currentIndex < allSubjectQuestion.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFinish = () => {
    const formattedAnswers = allSubjectQuestion.map((q, index) => ({
      quiz_id: q.id,
      selected_option_id: answers[index] ?? null,
    }));

    const anyUnanswered = formattedAnswers.some(
      (ans) => ans.selected_option_id === null
    );

    if (anyUnanswered) {
      toast.error("Please answer all questions.");
      return;
    }

    // const allEmpty = formattedAnswers.every(ans => ans.selected_option_id === null);

    // if (allEmpty) {
    //   toast.error("Please answer at least one question.");
    //   return;
    // }

    dispatch(
      submitAnswer({ attempt_id: attemptId, answers: formattedAnswers })
    );

    setTimeout(() => {
      navigate(
        `/student/subject-detail?subjectId=${subjectIdbyParams || subjectId}`
      );
    }, 1000);
  };

  const totalQuestions = allSubjectQuestion?.length || 0;
  const answeredCount = Object.values(answers).filter(
    (val) => val !== null
  ).length;
  const progress =
    totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const currentQuestion = allSubjectQuestion?.[currentIndex];
  const isReadOnly = currentQuestion?.selected_option_id !== null;

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
            {subjectDetail?.Subject} - Summative Assessment{" "}
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
                {subjectDetail?.total_lessons} lessons
              </li>
              <li>
                <img src="/images/subject-detail/quizzes.svg" alt="quizzes" />{" "}
                {subjectDetail?.total_lesson_quizzes} Quizzes
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
                  checked={answers[currentIndex] === opt.id}
                  onChange={() => handleOptionChange(opt.id)}
                  disabled={isReadOnly}
                />{" "}
                {opt.option}
              </label>
            ))}
          </div>

          <div className="bottom-cta">
            <Link
              className={`previous-cta ${currentIndex === 0 ? "disabled" : ""}`}
              onClick={handlePrevious}
            >
              <i className="fa-solid fa-arrow-left"></i> Previous
            </Link>

            {currentIndex < totalQuestions - 1 ? (
              <Link to="#" className="next-cta" onClick={handleNext}>
                Next <i className="fa-solid fa-arrow-right"></i>
              </Link>
            ) : (
              <button type="submit" className="finish-cta">
                Finish Summative Assessment
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
              data-bs-dismiss="modal"
              aria-label="Close"
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
                {/* <img src="/images/quit-icon.svg" alt="" /> */}
                <p style={{ fontWeight: "700" }}>
                  Are you sure you want to quit this Summative Assessment?
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
                  variant="danger"
                  style={{ border: "none" }}
                  href="/student/dashboard"
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

export default SummativeAssessment;
