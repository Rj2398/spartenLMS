import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { updateUserEmail } from "../../redux/slices/student/studentSlice";

const OtpModal = ({ isOpen, onClose, email }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleVerify = async () => {
    // 1. Join the array and ensure we only have numbers
    const otpCode = otp.join("").trim();

    // 2. Validation
    if (otpCode.length < 6) {
      toast.error("Please enter the full 6-digit code.");
      return;
    }

    setIsLoading(true);

    try {
      // 3. Dispatch the action
      // We use .unwrap() to catch errors in the 'catch' block automatically
      const result = await dispatch(
        updateUserEmail({
          otp: otpCode,
          email: email, // Passed from props
        })
      ).unwrap();

      // 4. Handle Success based on your Laravel API response structure
      if (result.success || result.status === "success") {
        toast.success(
          result.message || "Email updated and verified successfully!"
        );

        // Clear session storage since the update is now permanent in DB
        sessionStorage.removeItem("updateEmail");

        onClose(); // Close the modal

        // Use replace: true so the user can't "go back" to the OTP screen
        navigate("/student/profile", { replace: true });
      } else {
        // Handle cases where the API returns 200 but success is false
        toast.error(result.message || "Verification failed.");
      }
    } catch (error) {
      // 5. Handle Errors (Wrong OTP, Expired OTP, Server Error)
      console.error("OTP Verification Error:", error);

      // Display the specific error message from Laravel if available
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Invalid OTP. Please try again.";
      toast.error(errorMessage);

      // Clear the inputs so the user can re-type
      setOtp(new Array(6).fill(""));

      // Auto-focus the first box again for a better feel
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value && element.nextSibling) element.nextSibling.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // --- INTERNAL STYLES ---
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      backdropFilter: "blur(4px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10000,
    },
    card: {
      backgroundColor: "#fff",
      padding: "40px",
      borderRadius: "24px",
      width: "90%",
      maxWidth: "400px",
      textAlign: "center",
    },
    otpContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "8px",
      marginBottom: "30px",
    },
    input: {
      width: "45px",
      height: "55px",
      fontSize: "20px",
      fontWeight: "bold",
      textAlign: "center",
      borderRadius: "10px",
      border: "2px solid #E5E7EB",
      backgroundColor: "#F9FAFB",
      outline: "none",
    },
    verifyBtn: {
      width: "100%",
      backgroundColor: isLoading ? "#9CA3AF" : "#4F46E5",
      color: "white",
      padding: "14px",
      borderRadius: "12px",
      border: "none",
      fontSize: "16px",
      fontWeight: "600",
      cursor: isLoading ? "not-allowed" : "pointer",
    },
    cancelBtn: {
      marginTop: "15px",
      background: "none",
      border: "none",
      color: "#9CA3AF",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: "8px", fontSize: "22px" }}>Verify OTP</h2>
        <p style={{ fontSize: "14px", color: "#6B7280", marginBottom: "24px" }}>
          Sent to <b>{email}</b>
        </p>

        <div style={styles.otpContainer}>
          {otp.map((data, index) => (
            <input
              key={index}
              style={styles.input}
              type="text"
              maxLength="1"
              value={data}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={(e) => (e.target.style.borderColor = "#4F46E5")}
              onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
            />
          ))}
        </div>

        <button
          style={styles.verifyBtn}
          onClick={handleVerify}
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify & Proceed"}
        </button>

        <button style={styles.cancelBtn} onClick={onClose} disabled={isLoading}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OtpModal;
