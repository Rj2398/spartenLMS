import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Success Icon */}
        <div style={styles.iconCircle}>
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        <h1 style={styles.title}>Payment Successful!</h1>
        <p style={styles.message}>
          Thank you for your purchase. Your transaction has been completed
          successfully, and a receipt has been sent to your email.
        </p>

        <div style={styles.detailsContainer}>
          <div style={styles.detailRow}>
            <span>Status:</span>
            <span style={styles.successText}>Completed</span>
          </div>
          <div style={styles.detailRow}>
            <span>Payment Method:</span>
            <span>Stripe Secure</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/student/dashboard")}
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#4f46e5")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4126A8")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

// Inline Styles for a clean look
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
    padding: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
    maxWidth: "500px",
    width: "100%",
    textAlign: "center",
  },
  iconCircle: {
    width: "100px",
    height: "100px",
    backgroundColor: "#4126A8", // Green Success color
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 24px auto",
    boxShadow: "0 4px 15px rgba(34, 197, 94, 0.3)",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "12px",
  },
  message: {
    fontSize: "16px",
    color: "#6b7280",
    lineHeight: "1.6",
    marginBottom: "32px",
  },
  detailsContainer: {
    backgroundColor: "#f3f4f6",
    padding: "16px",
    borderRadius: "12px",
    marginBottom: "32px",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    color: "#4b5563",
    margin: "8px 0",
  },
  successText: {
    color: "#16a34a",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#4126A8",
    color: "#ffffff",
    border: "none",
    padding: "14px 28px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    width: "100%",
  },
};

export default PaymentSuccess;
