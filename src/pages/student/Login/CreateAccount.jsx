import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { signUp } from "../../../redux/slices/authSlice";
import toast from "react-hot-toast";

const CreateAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    newPassword: "",
  });

  const [error, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  //  const handleChange =(e)=>{
  //    const {value,name} =e.target;

  //    setFormData((prev)=>({
  //      ...prev,
  //       [name]:value
  //    }))

  //  }

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validation = () => {
    let newErrors = {};

    if (!formData?.full_name?.trim()) {
      newErrors.full_name = "Full name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.full_name)) {
      newErrors.full_name = "Full name should contain only letters";
    }

    if (!formData?.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // if (!formData?.password?.trim()) {
    //   newErrors.password = "Password is required";
    // } else if (formData.password.length < 6) {
    //   newErrors.password = "Password must be at least 6 characters";
    // }

    // if (!formData?.newPassword?.trim()) {
    //   newErrors.newPassword = "Password is required";
    // } else if (formData.password.length < 6) {
    //   newErrors.newPassword = "Password must be at least 6 characters";
    // }

    if (!formData?.password?.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData?.newPassword?.trim()) {
      newErrors.newPassword = "Confirm Password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    } else if (formData.password !== formData.newPassword) {
      newErrors.newPassword = "Password mismatch";
    }

    setErrors(newErrors);

    // return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async(e) => {
  //   e.preventDefault();

  //   if (validation()) {
  //         try {
  //           const response = await dispatch(signUp(formData));
  //            if(response.data.success){
  //              setOpenModal("profileCreated")
  //            }else{
  //              setOpenModal("alreadyRegistered")
  //            }
  //         } catch (error) {

  //         }

  //          navigate("/verify")

  //          if("success"){
  //           setOpenModal("profileCreated")

  //          }else{
  //           setOpenModal("alreadyRegistered")
  //          }
  //     }else{
  //         console.log("Validation failed ❌")
  //     }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validation()) {
      try {
        const response = await dispatch(signUp(formData)).unwrap();

        console.log(response);

        if (
          response?.success === true &&
          response?.message === "OTP sent successfully."
        ) {
          toast.success(response?.message || "OTP sent successfully");

          navigate("/verify");
        } else if (response?.success === false) {
          // setOpenModal("alreadyRegistered");
          const modalElement = document.getElementById("alreadyRegistered");
          if (modalElement && window.bootstrap) {
            const modalInstance = new window.bootstrap.Modal(modalElement);
            modalInstance.show();
          }
        } else {
          toast.error(response?.message || "Something went wrong");
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.message || "An error occurred. Please try again.");

        // setOpenModal("alreadyRegistered");
        const modalElement = document.getElementById("alreadyRegistered");
        if (modalElement && window.bootstrap) {
          const modalInstance = new window.bootstrap.Modal(modalElement);
          modalInstance.show();
        }
      }
    } else {
      console.log("Validation failed ❌");
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
              <h3 className="log-in">Create Account</h3>
              <p className="login">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod{" "}
              </p>
              <form onSubmit={handleSubmit}>
                <div className="label-data mb-2 position-relative">
                  <div className="icon">
                    <img src="images/login/user-icon.svg" alt="" />
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter full name"
                    id=""
                    name="full_name"
                    onChange={handleChange}
                  />

                  {error.full_name && (
                    <span style={{ color: "red" }}>{error.full_name}</span>
                  )}
                </div>
                <div className="label-data mb-2 position-relative">
                  <div className="icon">
                    <img src="images/login/mail-icon.svg" alt="" />
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    id=""
                    name="email"
                    onChange={handleChange}
                  />

                  {error.email && (
                    <span style={{ color: "red" }}>{error.email}</span>
                  )}
                </div>

                <div className="label-data mb-2 position-relative">
                  <div className="icon">
                    <img src="images/login/password-icon.svg" alt="" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter password"
                    id="password"
                    name="password"
                    onChange={handleChange}
                  />

                  {error.password && (
                    <span style={{ color: "red" }}>{error.password}</span>
                  )}

                  <div className="password-eye">
                    <div
                      onClick={() => setShowPassword((prev) => !prev)}
                      className={showPassword ? "eye-open" : "eye-close"}
                    ></div>
                  </div>
                </div>

                <div className="label-data mb-2 position-relative">
                  <div className="icon">
                    <img src="images/login/password-icon.svg" alt="" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Re-enter password"
                    id="password"
                    name="newPassword"
                    onChange={handleChange}
                  />

                  {error.newPassword && (
                    <span style={{ color: "red" }}>{error.newPassword}</span>
                  )}

                  <div className="password-eye">
                    <div
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className={showConfirmPassword ? "eye-open" : "eye-close"}
                    ></div>
                  </div>
                </div>

                <button type="submit" className="primary-cta">
                  Signup
                </button>

                <div className="signup">
                  Already have an account? <Link to="/"> Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <AlreadyRegisteredModal />
      <ProfileCreated />
    </>
  );
};

export default CreateAccount;

export const AlreadyRegisteredModal = () => {
  return (
    <>
      <div
        class="modal fade"
        id="alreadyRegistered"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header rioght-cross">
              {/* <!-- <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> --> */}
              <img
                src="images/login/popup-cross-icon.svg"
                data-bs-dismiss="modal"
                alt=""
              />
              {/* <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> --> */}
            </div>
            <div class="modal-body">
              <div class="pass-pop">
                <div class="sucess-icon">
                  <img src="images/login/alert-icon.svg" alt="" />
                </div>
                <p class="pass-text">
                  This email ID is already <br /> registered.
                </p>
                <button
                  type="button"
                  class="primary-cta"
                  data-bs-dismiss="modal"
                >
                  Okay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const ProfileCreated = () => {
  return (
    <>
      <div
        class="modal fade"
        id="profileCreated"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
              <div class="pass-pop">
                <div class="sucess-icon">
                  <img src="images/login/sucess-icon.svg" alt="" />
                </div>
                <p class="pass-text">
                  Your profile has been created <br /> Successfully!
                </p>
                <button
                  type="button"
                  class="primary-cta"
                  data-bs-dismiss="modal"
                >
                  Okay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
