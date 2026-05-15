import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEarnedCertificate } from "../../redux/slices/authSlice";

const EarnedCertificate = ({ studentId = null }) => {
  const dispatch = useDispatch();
  const { earnCertificateData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (studentId) {
      dispatch(getEarnedCertificate({ student_id: studentId }));
    }
  }, [studentId]);

  return (
    <>
      {earnCertificateData?.length > 0 && (
        <div className="col-lg-12">
          <div className="my-subjects">
            <div className="my-subjects-head">
              <h3 className="fw-semibold">
                <img
                  src="/images/dashboard/earned-certificates/earned-certi.svg"
                  alt="certificates"
                />
                Earned Certificate
              </h3>
            </div>
            {earnCertificateData?.length > 0 ? (
              <div className="earned-certi-grid">
                {earnCertificateData?.map((item, index) => (
                  <div className="earned-certi-itm" key={index}>
                    <img
                      src="/images/dashboard/earned-certificates/earn-batch.svg"
                      alt="batch"
                    />
                    <h5> {item?.subject_name} Assessment Complete </h5>
                    <p>Score: {item?.average_score_percentage}%</p>
                    <p>Issued: {item?.certificate_issued_date}</p>
                    <a
                      href={item?.certificate_file}
                      download
                      target="_blank"
                      style={{ color: "white" }}
                    >
                      <img
                        src="/images/dashboard/earned-certificates/download.svg"
                        alt="download"
                      />
                      Download PDF
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <h5
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100px",
                  fontSize: "16px",
                }}
              >
                {" "}
                No Certificate Earned by Student
              </h5>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EarnedCertificate;
