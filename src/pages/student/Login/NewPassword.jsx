import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { resetPassword } from "../../../redux/slices/authSlice";


const NewPassword = () => {

  const navigate=useNavigate()
  const location=useLocation();
  const dispatch=useDispatch();

  // const {email,resetToken}=location.state || {}
  const resetToken = sessionStorage.getItem("resetToken")||location.state?.resetToken || "";
  const email = location.state?.email || sessionStorage.getItem("forgotPasswordEmail") ||"";

  const [formData, setFormData] = useState({
      password: "",
      confirmPassword: "",
    });
  const [openModal,setOpenModal]=useState(null)
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ✅ handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ validation
  const validation = () => {
    const newErrors = {};

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ handle submit
const handleSubmit = async (e) => {

  e.preventDefault();

  if (validation()) {

    try {

      const response = await dispatch(
        resetPassword({
          email:email,
          password: formData.password,
          reset_token: resetToken
        })
      ).unwrap();

      console.log("RESET RESPONSE:", response);

      if(response?.success === true){
        sessionStorage.removeItem("resetToken");
        sessionStorage.removeItem("forgotPasswordEmail");
      }

      toast.success(
        response?.message || "Password changed successfully"
      );

      // trigger bootstrap modal manually
      const modal = new window.bootstrap.Modal(
        document.getElementById("passwordChanged")
      );

      modal.show();

      // optional redirect
      navigate("/");

    } catch (error) {

      console.log(error);

      toast.error(
        error?.message || "Failed to reset password"
      );
    }
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
                <Link to="/verify" className="back-icon">
                  <img src="images/login/left-back-icon.svg" alt="" />
                </Link>
                <h3>New Password</h3>
              </div>

              <p className="got">Please enter your new password.</p>

              <form onSubmit={handleSubmit}>
                {/* PASSWORD */}
                <div className="label-data mb-2 position-relative">
                  <div className="icon">
                    <img src="images/login/password-icon.svg" alt="" />
                  </div>

                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="New Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <div className="password-eye">
                    <div
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className={`eye ${
                        showPassword ? "eye-open" : "eye-close"
                      }`}
                    ></div>
                  </div>

                  {error.password && (
                    <span style={{ color: "red" }}>
                      {error.password}
                    </span>
                  )}
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="label-data mb-2 position-relative">
                  <div className="icon">
                    <img src="images/login/password-icon.svg" alt="" />
                  </div>

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm New Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />

                  <div className="password-eye">
                    <div
                      onClick={() =>
                        setShowConfirmPassword((prev) => !prev)
                      }
                      className={`eye ${
                        showConfirmPassword
                          ? "eye-open"
                          : "eye-close"
                      }`}
                    ></div>
                  </div>

                  {error.confirmPassword && (
                    <span style={{ color: "red" }}>
                      {error.confirmPassword}
                    </span>
                  )}
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="primary-cta mt-3"
                  // data-bs-toggle="modal"
                  // data-bs-target='#passwordChanged'
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <PasswordChanged />
    </>
  );
};

export default NewPassword;

export const PasswordChanged =()=>{

    const navigate = useNavigate()

    return (
        <>
                <div className="modal fade" id="passwordChanged" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-body">
                        <div className="pass-pop">
                            <div className="sucess-icon">
                            <img src="images/login/sucess-icon.svg" alt="" />
                        </div>
                        <p className="pass-text">Password Changed <br/> Successfully!</p>
                        <button type="button" className="primary-cta" data-bs-dismiss="modal" onClick={()=>navigate("/")} >Okay</button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            
        </>
    )
}