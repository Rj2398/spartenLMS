import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSubject } from "../../redux/slices/student/subjectSlice";
// import { getAllSubject } from "../../redux/slices/student/subjectSlice";

const YourSubjects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { classLevel, allSubject } = useSelector((state) => state.subject);

  console.log("allSubject", allSubject);
  //   const allSubject = [
  //   {
  //     id: 1,
  //     name: "Mathematics",
  //     lesson_completion: 75,
  //     complete_lesson: 6,
  //     total_lesson: 8,
  //     summative_assessment: "Pending",
  //   },
  //   {
  //     id: 2,
  //     name: "Science",
  //     lesson_completion: 100,
  //     complete_lesson: 10,
  //     total_lesson: 10,
  //     summative_assessment: "Completed",
  //   },
  // ];

  useEffect(() => {
    dispatch(getAllSubject());
  }, [dispatch]);

  const handleNavigate = (subject) => {
    // if (subject?.baseline_assessment == "Completed") {
    // navigate("/student/subject-detail", { state: { subjectId: subject?.id } });
    navigate(`/student/subject-detail?subjectId=${subject?.id}`);

    //   return;
    // }
    // navigate(`/student/baseline-assignment/${subject?.id}`, {
    //   state: { subjectId: subject?.id },
    // });
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
            {allSubject?.map((subject, index) => (
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
                  {/* <li>
                    <p>
                      {" "}
                      <img
                        src="/images/dashboard/subjects/circle-tick.svg"
                        alt="tick"
                      />{" "}
                      Baseline Assessment{" "}
                    </p>
                    <span
                      className={subject?.baseline_assessment?.toLowerCase()}
                    >
                      {" "}
                      {subject?.baseline_assessment}{" "}
                    </span>
                  </li> */}
                  <li>
                    <p>
                      {" "}
                      <img
                        src="/images/dashboard/subjects/document.svg"
                        alt="document"
                      />{" "}
                      Lessons{" "}
                    </p>
                    <span>
                      {" "}
                      {subject?.complete_lesson}/{subject?.total_lesson}{" "}
                    </span>
                  </li>
                  {/* <li>
                    <p>
                      <img
                        src={
                          subject?.summative_assessment === "Locked"
                            ? "/images/dashboard/subjects/locked.svg"
                            : "/images/dashboard/subjects/circle-tick.svg"
                        }
                        alt={subject?.summative_assessment}
                      />
                      Summative Assessment
                    </p>
                    <span
                      className={subject?.summative_assessment?.toLowerCase()}
                    >
                      {" "}
                      {subject?.summative_assessment}{" "}
                    </span>
                  </li> */}
                </ul>

                {/* {subject?.lesson_completion === 100 &&
                subject?.summative_assessment === "Completed" ? ( */}
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
                  )}{" "}
                  {subject?.lesson_completion === 100 &&
                  subject?.summative_assessment === "Completed"
                    ? " Completed"
                    : "Continue Learning"}
                </Link>
                {/* ) : (
                  <Link
                    to={"#"}
                    onClick={(e) => {
                      e.preventDefault();
                      localStorage.setItem(
                        "DomainStudent",
                        String(subject?.name)
                      );
                      handleNavigate(subject);
                    }}
                  >
                    Continue Learning
                    <i className="fa-solid fa-angle-right"></i>
                  </Link>
                )} */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default YourSubjects;
