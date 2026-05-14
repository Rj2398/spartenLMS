import React, { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

const DummyPayment = ({ amount = 500 }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    // simple validation check (Stripe handles most internally)
    const cardNumber = elements.getElement(CardNumberElement);
    if (!cardNumber) {
      setError("Card details are incomplete");
      setLoading(false);
      return;
    }

    // ⏳ fake API
    setTimeout(() => {
      setLoading(false);

      const isSuccess = Math.random() > 0.3;

      if (isSuccess) {
        setStatus("success");
      } else {
        setStatus("failed");
      }
    }, 1500);
  };

  const inputStyle = {
    base: {
      fontSize: "16px",
      color: "#000",
      "::placeholder": {
        color: "#aaa"
      }
    },
    invalid: {
      color: "red"
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h3>Pay ₹{amount}</h3>

      <form onSubmit={handlePayment}>
        
        {/* Card Number */}
        <div style={boxStyle}>
          <CardNumberElement options={{ style: inputStyle }} />
        </div>

        {/* Expiry */}
        <div style={boxStyle}>
          <CardExpiryElement options={{ style: inputStyle }} />
        </div>

        {/* CVV */}
        <div style={boxStyle}>
          <CardCvcElement options={{ style: inputStyle }} />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={btnStyle}
        >
          {loading ? "Processing..." : `Pay ₹${amount}`}
        </button>
      </form>

      {/* Result */}
      {status === "success" && (
        <p style={{ color: "green", marginTop: "10px" }}>
          Payment Successful 🎉
        </p>
      )}

      {status === "failed" && (
        <p style={{ color: "red", marginTop: "10px" }}>
          Payment Failed ❌
        </p>
      )}
    </div>
  );
};

const boxStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  marginBottom: "10px"
};

const btnStyle = {
  width: "100%",
  padding: "10px",
  background: "#635bff",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default DummyPayment;