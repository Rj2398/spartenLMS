import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { signIn } from "../../../redux/slices/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // ✅ clear error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validation = () => {
    let newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData?.password?.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validation()) {
      console.log("Validation failed ❌");
      return;
    }

    try {
      const response = await dispatch(signIn(formData)).unwrap();

      console.log("SUCCESS =>", response);

      if (response?.success === true) {
        toast.success(response?.message || "Login successful");
      } else {
        toast.error(response?.message || "Login failed");
      }
    } catch (error) {
      console.log("LOGIN ERROR =>", error);

      toast.error(error?.message || "Login failed");
    }
  };

  // useEffect(() => {
  //   if (isAuthenticated && user?.role) {

  //     navigate(`/${user.role?.replace("_", "-")}/dashboard`);
  //   }
  // }, [isAuthenticated, user, navigate]);

  return (
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
            <h3 className="log-in">Login</h3>
            <p className="login">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod
            </p>

            {/* ✅ FIXED FORM */}
            <form onSubmit={handleSubmit}>
              <div className="label-data mb-2 position-relative">
                <div className="icon">
                  <img src="images/login/mail-icon.svg" alt="" />
                </div>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Email address"
                  name="email"
                  value={formData.email}
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
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit(e);
                    }
                  }}
                />

                {error.password && (
                  <span style={{ color: "red" }}>{error.password}</span>
                )}

                <div className="password-eye">
                  <div
                    onClick={() => setShowPassword((prev) => !prev)}
                    className={`eye ${showPassword ? "eye-open" : "eye-close"}`}
                  ></div>
                </div>
              </div>

              <div className="forgot">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>

              {/* ✅ FIXED BUTTON */}
              <button type="submit" className="primary-cta">
                Login
              </button>

              <div className="signup">
                Don’t have an account? <Link to="/create-account">Sign up</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
