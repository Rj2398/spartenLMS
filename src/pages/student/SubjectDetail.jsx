import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  completeLesson,
  getLessionSlice,
} from "../../redux/slices/student/lessionSlice";
import {
  paymentInitiate,
  setCurrentSubject,
} from "../../redux/slices/student/subjectSlice";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const SubjectDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get("subjectId") || location?.state?.subjectId;

  // const storeAllLession = useSelector(({ lession }) => lession);
  const { storeAllLession } = useSelector((state) => state.lession);

  const lessonMap = storeAllLession?.subject?.get_lessons || [];

  // const [subscriptionStatus, setSubscriptionStatus] = useState(
  //   storeAllLession?.user_subscription_status
  // );

  // console.log("subscriptionStatus", subscriptionStatus);

  useEffect(() => {
    if (subjectId) {
      dispatch(getLessionSlice({ subject_id: subjectId }));
    }
  }, [dispatch, subjectId, location?.key]);

  useEffect(() => {
    if (storeAllLession?.subject?.name) {
      dispatch(setCurrentSubject(storeAllLession.subject.name));
    }
  }, [storeAllLession, dispatch]);

  const handleCompleteLesson = async (lessonId) => {
    try {
      const res = await dispatch(
        completeLesson({
          lesson_id: lessonId,
          subject_id: subjectId,
        })
      ).unwrap();

      // Refresh lesson list
      dispatch(
        getLessionSlice({
          subject_id: subjectId,
        })
      );
    } catch (error) {
      console.log("COMPLETE LESSON ERROR", error);
    }
  };

  const makePaymentAction = async () => {
    if (!subjectId) return;
    try {
      // .unwrap() is the key to catching errors in the component
      const res = await dispatch(
        paymentInitiate({ subject_id: subjectId })
      ).unwrap();

      const checkoutUrl = res?.data?.checkout_url;

      if (checkoutUrl) {
        window.open(checkoutUrl, "_blank", "noopener,noreferrer");
      }
      // You can now open your Stripe modal or redirect here
    } catch (error) {
      console.error("Payment Promise Rejected:", error);
      // Handle the error (e.g., show a toast notification)
    }
  };

  return (
    <>
      <div className="sub-detail-wrap">
        <div className="sub-detail-top">
          <h1 className="mb-2">
            {storeAllLession?.subject?.name}
            <span>
              <b>{storeAllLession?.subject?.progress_percentage}%</b>
            </span>
          </h1>
          <div className="sub-pro">
            <p>
              {storeAllLession?.subject?.description ||
                "No description available."}
            </p>
            <h1 className="mb-0">
              <span>
                {storeAllLession?.subject?.completed_lessons_count} /
                {storeAllLession?.subject?.get_lessons_count}
              </span>
            </h1>
          </div>
          <div className="sub-pro mb-0">
            <ul className="w-100">
              <li>
                <img src="/images/subject-detail/lessons.svg" alt="" />
                {storeAllLession?.subject?.get_lessons_count} lessons
              </li>
              <li>
                <img src="/images/subject-detail/quizzes.svg" alt="" />
                {storeAllLession?.subject?.get_lesson_quizzes_count} Quizzes
              </li>
              <li className="me-3">
                <span>Overall Progress</span>
              </li>
            </ul>
            <div className="progress">
              <div
                className="progress-bar"
                style={{
                  width: `${
                    (storeAllLession?.subject?.completed_lessons_count /
                      storeAllLession?.subject?.get_lessons_count) *
                      100 || 0
                  }%`,
                }}
                role="progressbar"
                aria-valuenow={
                  Math.round(
                    (storeAllLession?.subject?.completed_lessons_count /
                      storeAllLession?.subject?.get_lessons_count) *
                      100
                  ) || 0
                }
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>

        {/* Baseline Assessment */}
        {!storeAllLession?.user_subscription_status && (
          <div className="assessment-result">
            <div className="payment-card">
              <div className="payment-left">
                <div className="lock-icon">
                  <img src="/images/subject-detail/lock.png" alt="lock icon" />
                </div>

                <div>
                  <h4>Complete Your Payment to Access Quizzes</h4>
                  <p>
                    Unlock all quizzes for this course with a one-time payment.
                  </p>

                  <div className="payment-alert">
                    <span>
                      <img
                        src="/images/subject-detail/jam_info.png"
                        alt="alert icon"
                      />
                    </span>
                    Once payment is completed, all quizzes will be unlocked
                    instantly across all lessons.
                  </div>
                </div>
              </div>

              <div className="payment-right">
                <button
                  className="unlock-btn"
                  onClick={() => makePaymentAction()}
                >
                  Unlock Quizzes
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Lessons */}
        <div className="sub-lessons-list">
          <h3>Lessons</h3>

          {lessonMap && lessonMap.length > 0 ? (
            lessonMap?.map((lesson, index) => (
              <div
                className="sub-lessons-list-in"
                key={lesson?.id}
                style={{
                  pointerEvents:
                    lesson?.lesson_quiz_status === "locked" ? "none" : "auto",
                  // opacity: lesson?.lesson_quiz_status === "locked" ? 0.5 : 1,
                  cursor:
                    lesson?.lesson_quiz_status === "locked"
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                <div className="lesson-num-ico">
                  <span>{index + 1}</span>
                  <img
                    src={`/images/subject-detail/sub-lessons/${
                      lesson?.lesson_quiz_status == "start_quiz" ||
                      lesson?.lesson_quiz_status == "locked"
                        ? "locked-not-started"
                        : lesson?.lesson_quiz_status == "completed"
                        ? "completed"
                        : lesson?.lesson_quiz_status == "in-progress"
                        ? "in-progress"
                        : "review-again"
                    }.svg`}
                    alt={lesson?.lesson_quiz_status}
                  />
                </div>
                <div className="lesson-data">
                  <h2>
                    <Link
                      to="#"
                      onClick={() => window.open(lesson?.lesson_pdf, "_blank")}
                    >
                      {lesson?.title}
                    </Link>
                  </h2>
                  <p>{lesson?.desc}</p>
                </div>
                <div className="sub-lessons-list-in-ryt">
                  <div style={{ display: "flex" }}>
                    {/* <div
                      className={`manage-sub-cta ${
                        lesson?.lesson_status === "completed"
                          ? "completed"
                          : "start_lesson"
                      }`}
                    >
                      <Link
                        to="#"
                        onClick={(e) => {
                          e.preventDefault();
                          // OPEN PDF
                          window.open(lesson?.lesson_pdf, "_blank");

                          // COMPLETE LESSON
                          handleCompleteLesson(lesson?.id);
                        }}
                        style={{
                          marginRight: "10px",

                          background:
                            lesson?.lesson_status === "completed"
                              ? ""
                              : "#C6C6C6",

                          opacity:
                            lesson?.lesson_status === "completed" ? 1 : "",
                        }}
                      >
                        <img
                          src="/images/subject-detail/view.png"
                          alt="view content icon"
                        />

                        <span
                          style={{
                            color:
                              lesson?.lesson_status === "completed"
                                ? "white"
                                : "#4B5563",
                          }}
                        >
                          View Content
                        </span>
                      </Link>
                    </div> */}

                    <div
                      className={`manage-sub-cta ${
                        index === 0 ||
                        lessonMap[index - 1]?.lesson_status === "completed" ||
                        lesson?.lesson_status === "completed"
                          ? lesson?.lesson_status === "completed"
                            ? "completed"
                            : "start_lesson"
                          : "disabled-lesson"
                      }`}
                    >
                      <Link
                        to="#"
                        onClick={(e) => {
                          e.preventDefault();

                          const isFirst = index === 0;
                          const isPrevDone =
                            lessonMap[index - 1]?.lesson_status === "completed";
                          const isCurrentDone =
                            lesson?.lesson_status === "completed";

                          // Click tabhi kaam karega jab logic true ho
                          if (isFirst || isPrevDone || isCurrentDone) {
                            window.open(
                              API_BASE_URL + lesson?.lesson_pdf,
                              "_blank"
                            );
                            handleCompleteLesson(lesson?.id);
                          }
                        }}
                        style={{
                          marginRight: "10px",

                          background:
                            index === 0 ||
                            lessonMap[index - 1]?.lesson_status ===
                              "completed" ||
                            lesson?.lesson_status === "completed"
                              ? lesson?.lesson_status === "completed"
                                ? ""
                                : "" // Agar completed hai toh default (CSS se), warna blue
                              : "#C6C6C6", // Agar locked hai toh grey

                          opacity:
                            index === 0 ||
                            lessonMap[index - 1]?.lesson_status ===
                              "completed" ||
                            lesson?.lesson_status === "completed"
                              ? 1
                              : 0.6,

                          pointerEvents:
                            index === 0 ||
                            lessonMap[index - 1]?.lesson_status ===
                              "completed" ||
                            lesson?.lesson_status === "completed"
                              ? "auto"
                              : "none",
                        }}
                      >
                        <img
                          src="/images/subject-detail/view.png"
                          alt="view content icon"
                        />

                        <span
                          style={{
                            color:
                              index === 0 ||
                              lessonMap[index - 1]?.lesson_status ===
                                "completed" ||
                              lesson?.lesson_status === "completed"
                                ? "white"
                                : "#4B5563",
                          }}
                        >
                          View Content
                        </span>
                      </Link>
                    </div>

                    <div>
                      <button
                        disabled={lesson?.lesson_quiz_status === "locked"}
                        onClick={() => {
                          const status = lesson?.lesson_quiz_status;

                          if (
                            ["start_quiz", "in_process", "retake"].includes(
                              status
                            )
                          ) {
                            navigate(
                              `/student/baseline-assignment/${lesson?.subject_id}`,
                              {
                                state: {
                                  subjectId: lesson?.subject_id,
                                  lessonTitle: lesson?.title,
                                  lessonId: lesson?.id,
                                  quizStatus:
                                    status === "start_quiz" ||
                                    status === "in_process"
                                      ? "start"
                                      : "retake",
                                },
                              }
                            );
                          } else if (status === "completed") {
                            navigate(`/student/assesment-review`, {
                              state: {
                                subjectId: lesson?.subject_id,
                                lessonId: lesson?.id,
                              },
                            });
                          }
                        }}
                        className={`status ${
                          ["not_started", "locked", ""].includes(
                            lesson?.lesson_quiz_status
                          )
                            ? "locked"
                            : lesson?.lesson_quiz_status === "start_quiz"
                            ? "start_quiz"
                            : lesson?.lesson_quiz_status === "completed"
                            ? "completed"
                            : lesson?.lesson_quiz_status === "in_process"
                            ? "in-progress"
                            : lesson?.lesson_quiz_status === "retake"
                            ? "retake"
                            : "locked"
                        }`}
                        style={{
                          padding: "12px",
                          borderRadius: "10px",
                          border: "none",
                          // cursor: subscriptionStatus ? "pointer" : "not-allowed",
                          opacity:
                            lesson?.lesson_quiz_status === "locked" ? "" : 1,
                        }}
                      >
                        {lesson?.lesson_quiz_status === "locked"
                          ? "Locked Quiz"
                          : lesson?.lesson_quiz_status === "completed"
                          ? "Quiz Completed"
                          : lesson?.lesson_quiz_status
                          ? lesson.lesson_quiz_status
                              .replace(/_/g, " ")
                              .replace(/\b\w/g, (char) => char.toUpperCase())
                          : "Start Quiz"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#666" }}>
              No lesson found
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default SubjectDetail;
