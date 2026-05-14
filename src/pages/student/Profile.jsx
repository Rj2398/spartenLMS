import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  getProfile,
  updateProfile,
  verifyUserEmail,
} from "../../redux/slices/student/studentSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Spinner, Form } from "react-bootstrap";
import { logout } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileData, loading } = useSelector((state) => state.student);
  // const [showModal, setShowModal] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [originalEmail, setOriginalEmail] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    join_date: "",
  });

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profileData) {
      setFormData({
        full_name: profileData.full_name || "",
        email: profileData.email || "",
        join_date: profileData.join_date || "",
      });
    }
  }, [profileData]);

  useEffect(() => {
    if (formData.email) {
      setOriginalEmail(formData.email);
    }
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateProfile({ full_name: formData.full_name }));
    }

    setIsEditing(!isEditing);

    dispatch(getProfile());
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    if (!formData.email && isEditing) {
      toast("Please enter an email address.");
      return;
    }

    try {
      const resultAction = await dispatch(
        verifyUserEmail({ email: formData.email })
      ).unwrap();
      if (resultAction.success && isEditing) {
        sessionStorage.setItem("updateEmail", formData.email);
        navigate("/verify", { state: { updateemail: formData.email } });
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      toast.error("Failed to verify email. Please try again.");
    }
  };

  // const handleLogout = () => {
  //   dispatch(logout());
  // };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    sessionStorage.clear();
    // window.location.assign(
    //   `https://clever.com/oauth/logout?redirect_uri=https://pmsc.holpentech.com`
    // );
  };

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner animation="border" />
        </div>
      )}

      <div className="top-head">
        <div className="top-head-in">
          <h1>Profile Settings</h1>
          <p>Manage your account settings and preferences</p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8">
          <div className="personal-info">
            <h2>Personal Information</h2>
            <h4>
              <span>{profileData?.email || "Email not available"}</span>
            </h4>
            <form>
              <div className="form-group">
                <label htmlFor="full_name">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  placeholder="Enter Your Full Name"
                  value={formData.full_name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="email">E-mail ID</label>
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail ID"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div> */}

              <div className="form-group">
                <label htmlFor="email">E-mail ID</label>

                {/* <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <input
                type="email"
                name="email"
                placeholder="E-mail ID"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />

              {isEditing && (
                <button
                  type="button"
                  style={{color:'white',
                    backgroundColor: "#4126a8 ",
                    border:"none",
                    padding:"8px 16px",
                    borderRadius:"4px",
                    cursor:"pointer"
                  }}
                  onClick={handleVerifyEmail}               
                >
                  Verify
                </button>
              )}
            </div> */}

                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail ID"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />

                  {isEditing &&
                    formData.email.trim() !== "" &&
                    formData.email !== originalEmail && (
                      <button
                        type="button"
                        style={{
                          color: "white",
                          backgroundColor: "#4126a8",
                          border: "none",
                          padding: "8px 16px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                        onClick={handleVerifyEmail}
                      >
                        Verify
                      </button>
                    )}
                </div>
              </div>
              {/* <div className="form-group">
                <label htmlFor="student_id">Student ID</label>
                <input
                  type="text"
                  placeholder="Student ID"
                  value={profileData?.student_id || ""}
                  disabled
                />
              </div> */}
              <div className="form-group">
                <label htmlFor="join_date">Join Date</label>
                <input
                  type="text"
                  placeholder="Join Date"
                  value={profileData?.join_date || ""}
                  disabled
                />
              </div>
              <div className="form-group">
                <input //acc. to bug student cannot edit their profile.
                  type="submit"
                  value={isEditing ? "Update" : "Edit Profile"}
                  onClick={handleEdit}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="personal-info">
            <h2>Quick Actions</h2>
            <Link to="#" onClick={handleLogout}>
              <img src="/images/logout.svg" alt="" /> Log out
            </Link>
          </div>
        </div>
      </div>
      {/* <button onClick={() => setShowModal(!showModal)}>show </button>
      <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" size="lg" centered >
        <Modal.Header closeButton style={{ backgroundColor: "#5a2ecf", color: "white" }} >
          <Modal.Title style={{fontSize:"18px", fontWeight:"500"}}>
            ⚠️ Important - Please Read
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{fontSize:"14px", paddingBottom:"0px"}}>
          <div style={{ 
            border: "1px solid #ccc", 
            padding: "10px", 
            borderRadius: "5px", 
            maxHeight: "250px",
            overflowY: "auto",
            whiteSpace: "pre-wrap",
            fontFamily: "Arial, sans-serif",
            fontSize: "14px",
            lineHeight: "1.5",
            color: "#333"
          }} >
            <strong>
              These are NOT the full Terms & Conditions. You must read and accept the
              complete agreement before using Holpentech's services. Below is a short recap
              of key rules unique to our platform:
            </strong>
            <br />
            <br />
            <ul style={{ paddingLeft: "20px", marginTop: 0, marginBottom: "10px" }}>
              <li>
                <strong>One account, one person - </strong> Your login is just for you. Sharing access
                is not allowed.
              </li>
              <li>
                <strong>No external posting or AI use - </strong> Do not upload PMSC® content to Course Hero,
                Chegg, ChatGPT, CoPilot, or any other third-party site or tool.
              </li>
              <li>
                <strong>No copying or redistribution - </strong> You may not copy, print, paraphrase, or distribute
                PMSC® content, except as expressly permitted.
              </li>
              <li>
                <strong>Facilitators only - </strong> Teachers may display limited facilitator content in class,
                but cannot distribute it to students outside the system.
              </li>
              <li>
                <strong>Rule violations may lead to termination - </strong> Breaking these rules may immediately
                end your license.
              </li>
              <li>
                <strong>Your feedback is sent to Holpentech - </strong> Holpentech may use any suggestions or
                ideas provided without payment or credit.
              </li>
              <li>
                <strong>“As is” service - </strong> Holpentech does not guarantee the Service will be error-free,
                and liability is limited to the cost of your seat/license.
              </li>
              <li>
                <strong>Dispute process - </strong> Disputes must first go to mediation. By agreeing, you also waive
                the right to file or join a class action.
              </li>
              <li>
                <strong>Student data is protected - </strong> PMSC® complies with FERPA and COPPA. We never sell your
                data.
              </li>
            </ul>
            <p>
              👉 Please click <strong>“View Full Terms & Conditions”</strong> below to read the entire
              agreement before accepting.
            </p>
            
          </div>

          <Form.Group controlId="formBasicCheckbox" className="mt-3">
            <Form.Check type="checkbox" 
              label={
                <span>
                  By checking this box, you agree to our{" "}
                  <Link to="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy-and-policy" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </Link>.
                </span>
              }
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="border-0 pt-0">
          <Button style={{ backgroundColor: "#5a2ecf", border: "none" }}>
            Go to website
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

export default Profile;
