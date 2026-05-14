import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { forgotPassword } from "../../../redux/slices/authSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {

const navigate = useNavigate();
const dispatch = useDispatch();

const [email,setEmail]=useState("")
const [error,setError]=useState({})

const validation = () => {
  const newErrors = {};

  if (!email || !email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Invalid email format";
  }

  setError(newErrors); // ✅ correct

  return Object.keys(newErrors).length === 0;
};


//  const handleSubmit =(e)=>{
  
//     e.preventDefault();

//    if(validation()){
//     console.log("email verfied successfully ")
//     navigate('/verify')
     
//    }else{
//     console.log("email verfied failed ")
//    }
//  }


const handleSubmit = async (e) => {

  e.preventDefault();

  if (validation()) {
    try {

      const response = await dispatch(
        forgotPassword({
          email:email,
        })
      ).unwrap();

      console.log("FORGOT PASSWORD RESPONSE:", response);
        if (response?.success) {
        toast.success(response?.message || "OTP sent successfully");

        sessionStorage.setItem("forgotPasswordEmail", email);

        navigate("/verify", {
          state: { email: email, from: "forgotPassword" },
        });
      } else {
        toast.error(response?.message || "Failed to send OTP");
}
    } catch (error) {

      console.log(error);

      toast.error(
        error?.message || "Failed to send OTP"
      );
    }

  } else {

    console.log("email verification failed");
  }
};




  return (
    <>  
      <section>
        <div className="login-wrp">
            <div className="left-img">
                <img src="images/login/login-left-img.svg" alt=""/>
            </div>
            <div className="right-form">
                <div className="login-logo">
                    <img src="images/login/logo.svg" alt=""/>
                </div>
                <div className="form-inner">
                   <div className="forget-haeding">
                    <Link to="/" className="back-icon">
                     <img src="images/login/left-back-icon.svg" alt=""/>
                   </Link>
                   <h3>Forgot Password</h3>
                   </div>
                    <p className="got">Don't worry. We've got you covered!</p>
                    <p>Enter the email address associated with your account. </p>
                    <form onSubmit={handleSubmit}>
                         <div className="label-data mb-4 position-relative">
                                <div className="icon"><img src="images/login/mail-icon.svg" alt=""/></div>
                                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter email" id=""/>

                                  {
                                    error.email && (
                                      <span style={{color:'red'}}>{error.email}</span>
                                   )
                                }
                        </div>

                        <button  type="submit" className="primary-cta">Send Code</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
    </>
  );
};

export default ForgotPassword;