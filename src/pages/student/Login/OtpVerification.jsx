import React, { useState, useEffect } from "react";
import SuccessPopup from "./SuccessPopup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import {
  verifyOtp,
  resendOtp,
  verifyForgotPasswordOtp,
} from "../../../redux/slices/authSlice";
import { updateUserEmail } from "../../../redux/slices/student/studentSlice";

const OtpVerification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  // const { email, from, updateemail } = location.state || {};
  // const email =
  //   location.state?.email || sessionStorage.getItem("forgotPasswordEmail");
  // const updateemail =
  //   location.state?.updateemail || sessionStorage.getItem("updateEmail");
  // const signUpUser = JSON.parse(sessionStorage.getItem("signUpUser") || "null");

  const email =
    location.state?.email || sessionStorage.getItem("forgotPasswordEmail");

  const updateemail =
    location.state?.updateemail || sessionStorage.getItem("updateEmail");

  const signUpUserData = sessionStorage.getItem("signUpUser");

  const signUpUser =
    signUpUserData && signUpUserData !== "undefined"
      ? JSON.parse(signUpUserData)
      : null;

  console.log(updateemail);

  // const { signUpUser } = useSelector((state) => state.auth);

  console.log("New User in OTP Page:", signUpUser);

  const [openModal, setOpenModal] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(119);
  const [canResend, setCanResend] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [showProfileCreated, setShowProfileCreated] = useState(false);

  // ✅ TIMER
  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => clearInterval(interval);
  }, [timer]);

  // ✅ Handle OTP change
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move forward
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // ✅ Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleVerify = async () => {
    const finalOtp = otp.join("").trim();

    if (!finalOtp || finalOtp.length !== 6) {
      toast.error(finalOtp ? "Please enter complete OTP" : "Please enter OTP");
      return;
    }

    try {
      setOtpError(false);
      let response;

      // if (!email) {
      //   response = await dispatch(
      //     verifyOtp({
      //       otp: finalOtp,
      //       email: signUpUser?.user?.email,
      //     })
      //   ).unwrap();
      // }else if(updatemail){
      //   response = await dispatch(updateUserEmail({
      //     otp: finalOtp,
      //     email: updatemail,
      //   })).unwrap();
      // } else {
      //   response = await dispatch(
      //     verifyForgotPasswordOtp({
      //       otp: finalOtp,
      //       email: email,
      //     })
      //   ).unwrap();
      // }

      if (updateemail) {
        response = await dispatch(
          updateUserEmail({
            otp: finalOtp,
            email: updateemail,
          })
        ).unwrap();
      } else if (!email) {
        response = await dispatch(
          verifyOtp({
            otp: finalOtp,
            email: signUpUser?.user?.email,
          })
        ).unwrap();
      } else {
        response = await dispatch(
          verifyForgotPasswordOtp({
            otp: finalOtp,
            email: email,
          })
        ).unwrap();
      }

      if (response?.success) {
        toast.success(response?.message || "Success!");

        sessionStorage.setItem("resetToken", response?.data?.reset_token || "");
        sessionStorage.removeItem("signUpUser");
        sessionStorage.removeItem("updateEmail");

        if (response?.data?.reset_token) {
          navigate("/new-password", {
            state: { email, resetToken: response?.data?.reset_token },
          });
        } else {
          // setOpenModal("profileCreated");

          // const modalElement = document.getElementById("profileCreated");
          // if (modalElement && window.bootstrap) {
          //   const modalInstance = new window.bootstrap.Modal(modalElement);
          //   modalInstance.show();
          // }
          if (!email && !updateemail) {
            setShowProfileCreated(true);
          }

          if (updateemail) {
            navigate("/student/profile");
          }
        }

        return;
      }
      if (response?.success === false && response?.message === "Invalid OTP.") {
        setOtpError(true);
      }
      setOtp(["", "", "", "", "", ""]);
      toast.error(response?.message || "OTP verification failed");
    } catch (error) {
      console.error("OTP ERROR =>", error);
      if (error?.message === "Invalid OTP.") {
        setOtpError(true);
      }
      toast.error(error?.message || "Something went wrong. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;

    try {
      const response = await dispatch(
        resendOtp({
          email: signUpUser?.user?.email || email || updateemail,
        })
      ).unwrap();

      console.log("RESEND RESPONSE:", response);

      toast.success("OTP resent successfully");

      // reset timer
      setTimer(119);
      setCanResend(false);

      // clear fields
      setOtp(["", "", "", "", "", ""]);
    } catch (error) {
      console.log(error);

      toast.error(error?.message || "Failed to resend OTP");
    }
  };

  return (
    <>
      <section>
        <div className="login-wrp">
          <div className="left-img">
            <img src="images/login/login-left-img.svg" alt="" />
          </div>

          <div className="right-form">
            <div className="login-logo">
              <img src="images/login/logo.svg" alt="" />
            </div>

            <div className="form-inner">
              <div className="forget-haeding">
                <Link
                  onClick={() => window.history.back()}
                  className="back-icon"
                >
                  <img src="images/login/left-back-icon.svg" alt="" />
                </Link>

                <h3>Verification</h3>
              </div>

              <p className="got">Enter the Code to Complete the Process.</p>

              <p className="digit-verify">
                Enter the 6 - digit verification code sent to your registered
                email.
              </p>

              <form>
                {/* OTP INPUTS */}
                <div className="input-multigrp">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      className="input-field-code-in inputs"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  ))}
                </div>

                <div className="receive-wrp">
                  <div className="receive-code">
                    Didn't receive the verification code?
                    <a
                      className="resend"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleResendOtp();
                      }}
                      style={{
                        pointerEvents: canResend ? "auto" : "none",
                        opacity: canResend ? 1 : 0.5,
                      }}
                    >
                      RESEND
                    </a>
                  </div>

                  {otpError && (
                    <div className="receive-code incorrect">
                      Incorrect verification code.
                      <a className="resend" href="#">
                        {" "}
                        Please try again.
                      </a>
                    </div>
                  )}

                  <div className="receive-code">
                    Resend verification code in{" "}
                    <a href="#">
                      {`${String(Math.floor(timer / 60)).padStart(
                        2,
                        "0"
                      )}:${String(timer % 60).padStart(2, "0")} secs`}
                    </a>
                  </div>
                </div>

                {/* VERIFY BUTTON */}
                <button
                  onClick={handleVerify}
                  className="primary-cta"
                  type="button"
                >
                  Verify
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS MODAL */}
      <ProfileCreated
        show={showProfileCreated}
        handleClose={() => setShowProfileCreated(false)}
      />
    </>
  );
};

export default OtpVerification;

export const ProfileCreated = ({ show, onClose }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    // onClose(); // close modal first
    navigate("/");
  };

  if (!show) return null;

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ width: "75%" }}>
            <div className="modal-body">
              <div className="pass-pop">
                <div className="sucess-icon">
                  <img src="images/login/sucess-icon.svg" alt="" />
                </div>

                <p className="pass-text">
                  Your profile has been created <br />
                  Successfully!
                </p>

                <button
                  type="button"
                  className="primary-cta"
                  onClick={handleNavigate}
                >
                  Okay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop show"></div>
    </>
  );
};
