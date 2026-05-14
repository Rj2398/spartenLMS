import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSubject } from "../../redux/slices/student/subjectSlice";
// import { getAllSubject } from "../../redux/slices/student/subjectSlice";

const YourSubjects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { classLevel, allSubject } = useSelector((state) => state.subject);

  useEffect(() => {
    dispatch(getAllSubject());
  }, [dispatch]);

  const handleNavigate = (subject) => {
    navigate(`/student/subject-detail?subjectId=${subject?.id}`);
  };

  return (
    <>
      <div className="col-lg-12">
        <div className="my-subjects">
          <div className="my-subjects-head">
            <h3 style={{ textTransform: "capitalize" }}>
              <img src="/images/dashboard/book-icon.svg" alt="" /> Your Subjects
              {/* ({classLevel || "Ruby"} Level) */}
            </h3>
          </div>
          <div className="my-subjects-grid">
            {allSubject && allSubject.length > 0 ? (
              allSubject.map((subject, index) => (
                <div className="my-subjects-itm" key={index}>
                  <div className="my-subjects-itm-head">
                    <h4>
                      <img src="/images/dashboard/subjects/book.svg" alt="" />
                      {subject?.name}
                    </h4>
                    <span>
                      <b>{subject?.lesson_completion || 0}%</b> Complete
                    </span>
                  </div>

                  <div className="progress">
                    <div
                      className={`progress-bar`}
                      style={{ width: `${subject?.lesson_completion || 0}%` }}
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={subject?.lesson_completion}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>

                  <ul>
                    <li>
                      <p>
                        <img
                          src="/images/dashboard/subjects/document.svg"
                          alt="document"
                        />
                        Lessons
                      </p>

                      <span>
                        {subject?.complete_lesson}/{subject?.total_lesson}
                      </span>
                    </li>
                  </ul>

                  <Link
                    to="#"
                    className={
                      subject?.lesson_completion === 100 &&
                      subject?.summative_assessment === "Completed"
                        ? "completed-cta"
                        : "continue-cta"
                    }
                    onClick={(e) => {
                      e.preventDefault();

                      localStorage.setItem(
                        "DomainStudent",
                        String(subject?.name)
                      );

                      handleNavigate(subject);
                    }}
                  >
                    {subject?.lesson_completion === 100 &&
                    subject?.summative_assessment === "Completed" ? (
                      <img
                        src="/images/dashboard/subjects/circle-tick.svg"
                        alt="Completed"
                      />
                    ) : (
                      <i className="fa-solid fa-angle-right"></i>
                    )}

                    {subject?.lesson_completion === 100 &&
                    subject?.summative_assessment === "Completed"
                      ? " Completed"
                      : "Continue Learning"}
                  </Link>
                </div>
              ))
            ) : (
              <div
                className="my-subjects-itm"
                style={{ textAlign: "center", marginLeft: "100%" }}
              >
                No subjects found
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default YourSubjects;
