import { useState } from "react";
import SendOtpForm from "../components/templates/SendOtpForm";
import CheckOtpForm from "../components/templates/CheckOtpForm";

function AuthPage() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");

  return (
    <>
      {step === 1 && (
        <SendOtpForm setStep={setStep} mobile={mobile} setMobile={setMobile} />
      )}
      {step === 2 && (
        <CheckOtpForm
          code={code}
          setCode={setCode}
          mobile={mobile}
          setStep={setStep}
        />
      )}
    </>
  );
}

export default AuthPage;
