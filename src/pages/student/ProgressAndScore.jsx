import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSubject,
  getUserProgress,
  subjectWiseProgress,
  subjectWiseQuizProgress,
} from "../../redux/slices/student/subjectSlice";
import { Link, useNavigate } from "react-router";
import Select from "react-select";

const ProgressAndScore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allSubject, progressInfo, subjectWiseQuizInfo } = useSelector(
    (state) => state.subject
  );

  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedProgressSubject, setSelectedProgressSubject] = useState(null);
  const [showLession, setShowLession] = useState(false);

  const subjectWiseInfo = progressInfo?.subject_progress || [];

  // console.log(progressInfo, "progressInfo");
  console.log(subjectWiseQuizInfo, "subjectWiseQuizInfo");

  useEffect(() => {
    dispatch(getAllSubject());
  }, [dispatch]);

  useEffect(() => {
    if (selectedSubject) {
      dispatch(getUserProgress({ subject_id: allSubject?.[0]?.id }));
      dispatch(subjectWiseProgress({ subject_id: allSubject?.[0]?.id }));
    }
  }, [selectedSubject]);

  useEffect(() => {
    if (selectedProgressSubject) {
      dispatch(subjectWiseQuizProgress({ subject_id: allSubject?.[0]?.id }));
    }
  }, [selectedProgressSubject]);

  useEffect(() => {
    if (allSubject) {
      setSelectedProgressSubject(allSubject[0]?.id);
    }
  }, [allSubject]);

  const colors = [
    {
      base: "#C951E7",
      lesson: "#D573ED",
      summative: "#F1B7FF",
      label: "Life Dream",
    },
    {
      base: "#6466E9",
      lesson: "#888AF3",
      summative: "#B4B5FC",
      label: "Self Awareness",
    },
    {
      base: "#55E6C1",
      lesson: "#82EBD0",
      summative: "#BDEFE2",
      label: "Cognitive Construction",
    },
    {
      base: "#FFC312",
      lesson: "#FEDB74",
      summative: "#FAE9B7",
      label: "Interpersonal Relationships",
    },
    {
      base: "#ED4C67",
      lesson: "#EC6F84",
      summative: "#F5ABB7",
      label: "Coping",
    },
  ];

  return (
    <>
      <div className="top-head prog-sco-wrp">
        <div className="top-head-in">
          <h1> Completion </h1>
          {/* <p className="top-head-p">Your Progress</p> */}
        </div>
        <Select
          name="subject"
          placeholder="Select a subject..."
          isSearchable={false}
          options={[
            { value: "all", label: "All Subjects" },
            ...(allSubject?.map((item) => ({
              value: item.id,
              label: item.name,
            })) || []),
          ]}
          onChange={(selectedOption) =>
            setSelectedSubject(selectedOption.value)
          }
          defaultValue={{ value: "all", label: "All Subjects" }}
          styles={{
            control: (base) => ({
              ...base,
              minHeight: "38px",
              fontSize: "16px",
              width: "260px",
              borderColor: "#4126A8",
              boxShadow: "none",
              "&:hover": {
                borderColor: "#4126A8",
              },
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? "#4126A8" : "white",
              color: state.isFocused ? "white" : "#333",
              "&:active": {
                backgroundColor: "#4126A8",
              },
            }),
          }}
        />
      </div>
      <div className="progress-grid">
        <div className="row g-0">
          <div className="col-lg-3">
            <div
              className="progress-grid-in ms-0"
              style={{ marginRight: "30px" }}
            >
              <h2>
                <img src="/images/Overlay.svg" alt="" /> Lesson Quiz Progress
              </h2>
              <h3>
                {progressInfo?.overall_quiz_progress?.progress_percentage || 0}%
              </h3>
              <p className="text-white">
                {" "}
                {progressInfo?.overall_quiz_progress?.completed_quizzes || 0}/
                {progressInfo?.overall_quiz_progress?.total_quizzes || 0}{" "}
                Completed{" "}
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="progress-grid-in">
              <h2>
                <img src="/images/dashboard/progress-grid/3.svg" alt="" />{" "}
                Overall Lesson progress
              </h2>
              <h3>
                {progressInfo?.overall_lesson_progress?.progress_percentage ||
                  0}
                %
              </h3>
              {/* <!-- <a href="#">See details <i className="fa-solid fa-arrow-right"></i></a> --> */}
              <p className="text-black">
                {progressInfo?.overall_lesson_progress?.completed_lessons || 0}/
                {progressInfo?.overall_lesson_progress?.total_lessons || 0}{" "}
                Completed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------- Chart ----------------------------------------- */}
      <div className="subjects-lesson-progress mt-2">
        <div className="row">
          <div className="col-lg-12">
            <h3 className="my-subject-heading"> Scores </h3>
            <div className="my-subjects" style={{ marginTop: "0" }}>
              <div className="my-subjects-head mb-4">
                <h3 style={{ fontWeight: "700" }}>
                  <img
                    src="/images/dashboard/chart-icon.svg"
                    alt="chart-icon"
                  />{" "}
                  Subject Performance{" "}
                </h3>
              </div>
              <div className="chart-wrap">
                <div className="chart-in">
                  <p className="performance-text">Score</p>
                  <div className="chart-in-percent-grp">
                    {["100%", "80%", "60%", "40%", "20%", "0"].map(
                      (val, idx) => (
                        <div
                          className={`chart-in-percent ${
                            val === 0 ? "align-items-end" : ""
                          }`}
                          key={idx}
                        >
                          <span>{val}</span>
                          <hr
                            style={val === 0 ? { width: "95%" } : {}}
                            className={val === 0 ? "ms-auto" : ""}
                          />
                        </div>
                      )
                    )}

                    <div className="chart-bar-grp">
                      {subjectWiseInfo?.map((subject, idx) => {
                        console.log(subject, "subject");
                        const defaultColor = colors[idx % colors.length]; // default color if no match found
                        const subjectColor = colors.find(
                          (color) => color.label === subject.subject_name
                        );

                        const lessonColor = subjectColor
                          ? subjectColor.lesson
                          : defaultColor.lesson;

                        // const baseline = parseFloat(
                        //   subject.baseline_score || 0
                        // );
                        const lesson = parseFloat(
                          subject?.subject_progress_percentage || 0
                        );

                        return (
                          <div
                            className="chart-bar-in"
                            key={subject?.subject_id}
                          >
                            <div className="hover-data">
                              <div className="hover-data-in">
                                {/* <p>
                                  <span
                                    style={{ backgroundColor: baselineColor }}
                                  ></span>{" "}
                                  Baseline Assessment, {baseline}%
                                </p> */}
                                 
                                <p>
                                  <span
                                    style={{ backgroundColor: lessonColor }}
                                  ></span>
                                  Lesson Quiz, ({lesson}%)
                                  {subject?.completed_subject_lessons_quizzes ||
                                    0}
                                  /{subject?.total_subject_lessons || 0}
                                </p>
                              </div>
                            </div>

                            <div className="bar-wrp">
                              <div
                                className="bar"
                                style={{
                                  backgroundColor: lessonColor,
                                  height: `${lesson}%`,
                                }}
                              ></div>
                              <span>L</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <p className="activity-text"> Measurement Type </p>
                <ul>
                  {subjectWiseInfo?.map((subject, idx) => {
                    const defaultColor = colors[idx % colors.length]; // default color if no match found
                    const subjectColor = colors.find(
                      (color) => color.label === subject.subject_name
                    );
                    const baselineColor = subjectColor
                      ? subjectColor.base
                      : defaultColor.base;
                    return (
                      <li key={subject.subject_id}>
                        <span style={{ backgroundColor: baselineColor }}></span>{" "}
                        {subject.subject_name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------- */}

      <div className="my-subjects">
        <div className="top-head">
          <div className="top-head-in">
            <h1 className="mb-0"> Scores by Subject, Lesson & Status </h1>
          </div>
          <select
            name="subject"
            className="ms-auto"
            onChange={(e) => setSelectedProgressSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            {allSubject?.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <a
            style={{ cursor: "pointer" }}
            className="details-cta"
            onClick={() =>
              navigate(
                `/student/subject-detail?subjectId=${selectedProgressSubject}`
              )
            }
          >
            <img src="/images/view-icon.svg" alt="view-icon" />
            View Full Details
          </a>
        </div>
        <div className="table-responsive">
          <table>
            <tr>
              {/* <th style={{ width: "250px" }}> Measurement Type </th> */}
              <th>Lesson </th>
              <th style={{ width: "400px" }}>Score </th>
              <th>Status </th>
              <th>View Details </th>
            </tr>
            {subjectWiseQuizInfo?.map((item, index) => (
              <tr className="lessons-list" key={index}>
                {/* Lesson */}
                <td>{item?.title}</td>

                {/* Score */}
                <td>
                  <div className="prog">
                    <span>{item?.quiz_score}%</span>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${item?.quiz_score}%`,
                          backgroundColor: [
                            "not_started",
                            "not_completed",
                            "in_progress",
                            "retake",
                            "review",
                          ].includes(item?.quiz_status)
                            ? "#F28100"
                            : "#16a34a",
                        }}
                      ></div>
                    </div>
                  </div>
                </td>

                {/* Status */}
                {/* <td>
                  <div
                    className={`status  ${
                      item?.quiz_status == "in_progress"
                        ? "review"
                        : item?.quiz_status == "review"
                        ? "review"
                        : item?.quiz_status == "in_progress"
                        ? "review"
                        : ""
                    }`}
                    style={{
                      backgroundColor:
                        item?.quiz_status === "not_started" ||
                        item?.quiz_status === "locked" ||
                        item?.quiz_status === "undefined" ||
                        !item?.quiz_status
                          ? "#4b5563"
                          : "",
                    }}
                  >
                    {item?.quiz_status
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase()) ||
                      "Not Started"}
                  </div>
                </td> */}

                <td>
                  <div
                    className={`status  ${
                      item?.quiz_status == "in_process"
                        ? "review"
                        : item?.quiz_status == "review"
                        ? "review"
                        : item?.quiz_status == "in_process"
                        ? "review"
                        : ""
                    }`}
                    style={{
                      backgroundColor:
                        item?.quiz_status === "not_started" ||
                        item?.quiz_status === "locked" ||
                        item?.quiz_status === "undefined" ||
                        !item?.quiz_status
                          ? "#4b5563"
                          : "",
                    }}
                  >
                    {item?.quiz_status === "in_process"
                      ? "In Progress"
                      : item?.quiz_status
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase()) ||
                        "Not Started"}
                  </div>
                </td>

                <td>
                  {" "}
                  {item?.quiz_status === "completed" && (
                    <a
                      style={{ cursor: "pointer" }}
                      className="details-cta"
                      onClick={() =>
                        navigate(
                          `/student/assesment-review`,
                          {
                            state: {
                              lessonId: item?.id,
                              subjectId: selectedProgressSubject,
                            },
                          }
                          // `/student/subject-detail?subjectId=${selectedProgressSubject}`
                        )
                      }
                    >
                      <img
                        src="/images/subject-detail/hugeicons_view.png"
                        alt="view-icon"
                        style={{ width: "25px", marginRight: "10px" }}
                      />
                      View
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default ProgressAndScore;
