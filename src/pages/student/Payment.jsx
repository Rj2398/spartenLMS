import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadPDf,
  getAllSubject,
  paymentHistory,
  paymentInitiate,
} from "../../redux/slices/student/subjectSlice";
import toast from "react-hot-toast";

// const courseData = [
//   {
//     id: 1,
//     course_name: "React Mastery",
//     date: "02-02-2025",
//     status: "completed",
//     invoice: true,
//   },
//   {
//     id: 2,
//     course_name: "Node.js Backend",
//     date: "05-02-2025",
//     status: "failed",
//     invoice: false,
//   },
//   {
//     id: 3,
//     course_name: "Fullstack MERN",
//     date: "10-02-2025",
//     status: "completed",
//     invoice: true,
//   },
//   {
//     id: 4,
//     course_name: "UI/UX Design",
//     date: "12-02-2025",
//     status: "failed",
//     invoice: false,
//   },
//   // ... more data
// ];
const Payment = () => {
  const dispatch = useDispatch();
  const { allSubject } = useSelector((state) => state.subject);
  const itemsPerPage = 5;

  const [courseData, setcourseData] = useState([]);
  const [localStorePdf, setLocalStorePdf] = useState(null);
  const [selectedProgressSubject, setSelectedProgressSubject] = useState("");
  const uniqueStatuses = [...new Set(courseData.map((item) => item.status))];

  const [currentPage, setCurrentPage] = useState(() => {
    // Get the last page from localStorage if exists, else 1
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? Number(savedPage) : 1;
  });

  useEffect(() => {
    const handlePaymentFetch = async () => {
      try {
        const res = await dispatch(paymentHistory()).unwrap();

        // Now 'res' is your actual data (the response from your API)
        console.log("Payment Data:", res.data);

        setcourseData(res.data);
      } catch (error) {
        // If the API returns a 400/500 error, it lands here
        console.error("Payment Fetch Failed:", error);
      }
    };

    handlePaymentFetch();
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllSubject());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(currentPage);
  }, []);

  const filteredData = selectedProgressSubject
    ? courseData.filter((item) => item.status === selectedProgressSubject)
    : courseData;

  const totalItems = filteredData?.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const makePaymentAction = async () => {
    const subjectId = allSubject[0]?.id;

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
  // const downloadPdf = async (id) => {
  //   if (!id) return;

  //   try {
  //     // 1. Fetch the PDF URL from your API
  //     const res = await dispatch(downloadPDf({ payment_id: id })).unwrap();
  //     const fileUrl = res?.data?.file_url;

  //     if (!fileUrl) {
  //       console.error("File URL missing from server response");
  //       return;
  //     }

  //     // 2. Fetch the actual file data as a Blob to bypass browser opening behavior
  //     const fileResponse = await fetch(fileUrl);
  //     const blob = await fileResponse.blob();

  //     // 3. Create a temporary local Object URL for that Blob data
  //     const localUrl = window.URL.createObjectURL(blob);

  //     // 4. Create a hidden link and point it to our local Object URL
  //     const link = document.createElement("a");
  //     link.href = localUrl;
  //     link.setAttribute("download", `invoice_${id}.pdf`); // This will now work perfectly

  //     // 5. Append to body, click it to trigger local save, and clean up
  //     document.body.appendChild(link);
  //     link.click();

  //     // Clean up from memory
  //     document.body.removeChild(link);
  //     window.URL.revokeObjectURL(localUrl);

  //     // Optional state update
  //     setLocalStorePdf(fileUrl);
  //   } catch (error) {
  //     console.error("Error downloading PDF locally:", error);
  //     // Add your toast alert here if the download fails
  //   }
  // };
  const downloadPdf = async (id) => {
    if (!id) return;

    try {
      // 1. Fetch the PDF URL from your backend
      const res = await dispatch(downloadPDf({ payment_id: id })).unwrap();

      // Get the file URL from your API response structure
      const fileUrl = res?.data?.file_url;

      if (fileUrl) {
        // 2. Create a temporary hidden anchor link
        const link = document.createElement("a");
        link.href = fileUrl;

        // Forces the browser to download instead of navigating
        link.setAttribute("download", `invoice_${id}.pdf`);
        link.setAttribute("target", "_blank"); // Fallback safety for cross-origin URLs

        // 3. Append, click, and clean up
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Optional state update if you still need it elsewhere
        setLocalStorePdf(fileUrl);
        toast.success(res.message);
      } else {
        console.error("File URL missing from server response");
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Trigger toast notification error here
    }
  };

  return (
    <>
      <div
        className=""
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1 style={{ margin: "0", fontSize: "24px", fontWeight: "bold" }}>
            Payments
          </h1>
          <span style={{ color: "#6b7280", fontSize: "14px" }}>
            Track your payment status
          </span>
        </div>
        <div style={{ marginTop: "20px" }}>
          <h1
            style={{
              display: "inline-block",
              backgroundColor: "#4126A8",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              textAlign: "center",
              border: "none",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
            onClick={() => makePaymentAction()}
          >
            Pay Now
          </h1>
        </div>
      </div>

      <div className="my-subjects">
        <div className="top-head">
          <div className="top-head-in">
            <h1 className="mb-0"> Payments History </h1>
          </div>
          <select
            name="status"
            className="ms-auto"
            onChange={(e) => setSelectedProgressSubject(e.target.value)}
          >
            <option value="">Status</option>

            {uniqueStatuses.map((status, index) => (
              <option key={index} value={status}>
                {status
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </option>
            ))}
          </select>
        </div>
        <div className="table-responsive">
          <table>
            <tr>
              <th>Course</th>
              <th>Date</th>
              <th>Status</th>
              <th>Invoice</th>
            </tr>
            {currentItems.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No records found
                </td>
              </tr>
            ) : (
              currentItems.map((item) => (
                <tr className="lessons-list" key={item.id}>
                  {/* Course Name */}
                  <td>{item.course_name}</td>

                  {/* Date */}
                  <td>{item.date}</td>

                  {/* Status */}
                  <td>
                    <div
                      className="status"
                      style={{
                        backgroundColor:
                          item.status === "completed"
                            ? "#16a34a"
                            : item.status === "failed"
                            ? "#dc2626"
                            : "#f59e0b",
                        color: "#fff",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        display: "inline-block",
                        fontSize: "12px",
                      }}
                    >
                      {item.status
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                    </div>
                  </td>

                  {/* Invoice */}
                  <td>
                    {/* {item.invoice && (
                      <button
                        style={{
                          background: "#e5e7eb",
                          border: "none",
                          padding: "12px",
                          borderRadius: "20px",
                          fontSize: "15px",
                          cursor: "pointer",
                          color: "#4B5563",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <img
                          src="/images/subject-detail/download.png"
                          style={{ width: "20px" }}
                          alt="download"
                        />
                        Invoice
                      </button>
                      
                    )} */}

                    <button
                      style={{
                        background: "#C6C6C6",
                        border: "none",
                        padding: "12px",
                        borderRadius: "20px",
                        fontSize: "15px",
                        cursor: "pointer",
                        color: "#4B5563",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                      onClick={() => downloadPdf(item?.id)}
                    >
                      <img
                        src="/images/subject-detail/download.png"
                        style={{ width: "20px" }}
                        alt="download"
                      />
                      Invoice
                    </button>
                  </td>
                </tr>
              ))
            )}
          </table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        showResult={true}
      />
    </>
  );
};
export default Payment;
