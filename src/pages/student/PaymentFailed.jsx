import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  // Theme colors derived from your app style
  const theme = {
    primary: "#4126A8",
    error: "#ef4444", // Red for failure
    background: "#f9fafb",
    textMain: "#111827",
    textSecondary: "#6b7280",
  };

  return (
    <div style={{ ...styles.container, backgroundColor: theme.background }}>
      <div style={styles.card}>
        {/* Error Icon - Cross (X) */}
        <div style={{ ...styles.iconCircle, backgroundColor: theme.error }}>
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>

        <h1 style={{ ...styles.title, color: theme.textMain }}>
          Payment Failed
        </h1>
        <p style={{ ...styles.message, color: theme.textSecondary }}>
          We couldn't process your transaction. This could be due to
          insufficient funds, an expired card, or a temporary connection issue.
        </p>

        <div style={styles.detailsContainer}>
          <div style={styles.detailRow}>
            <span>Status:</span>
            <span style={{ color: theme.error, fontWeight: "600" }}>
              Failed
            </span>
          </div>
          <div style={styles.detailRow}>
            <span>Transaction ID:</span>
            <span style={{ color: theme.textMain }}>#TXN-0000000</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <button
            onClick={() => navigate("/student/payments")}
            style={{ ...styles.button, backgroundColor: theme.primary }}
            onMouseOver={(e) => (e.target.style.filter = "brightness(1.1)")}
            onMouseOut={(e) => (e.target.style.filter = "brightness(1)")}
          >
            Try Again
          </button>

          <button
            onClick={() => navigate("/student/dashboard")}
            style={styles.secondaryButton}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 24px auto",
    boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "12px",
  },
  message: {
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "32px",
  },
  detailsContainer: {
    backgroundColor: "#fef2f2", // Very light red background
    padding: "16px",
    borderRadius: "12px",
    marginBottom: "32px",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    margin: "8px 0",
  },
  button: {
    color: "#ffffff",
    border: "none",
    padding: "14px 28px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    width: "100%",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    color: "#6b7280",
    border: "1px solid #e5e7eb",
    padding: "12px 28px",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    width: "100%",
  },
};

export default PaymentFailed;
