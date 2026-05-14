import { useLocation } from "react-router-dom";
import { StripeWrapper } from "./StripeWrapper";
import DummyPayment from "./StripePayment";

const PaymentPage = () => {
  const location = useLocation();
  const amount = location.state?.amount || 500;

  return (
    <StripeWrapper>
      <DummyPayment amount={amount} />
    </StripeWrapper>
  );
};

export default PaymentPage;