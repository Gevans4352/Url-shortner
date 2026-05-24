import { MdOutlineMail } from "react-icons/md";
import { useDocumentTitle } from "../Hooks/useDocumentTitle";
import { Link } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
  useDocumentTitle("Forgot Password");
  const [email, setEmail] = useState("");
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="reset">
      <div className="card">
        <div className="right">
          <h2 className="RegisterTitle">Reset Password</h2>
          <p className="littlerature">We'll help you get back in</p>
          <p className="aTinyMessage">
            Enter your email address and we'll send you a link to reset your password
          </p>
          <form onSubmit={handleReset}>
            <div className="resetInput">
              <MdOutlineMail className="resetEmailsvg"/>
              <input
                className="resetEmail"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                required
              />
            </div>
            <button className="resetButton" type="submit">Send Reset Link</button>
          </form>
          <p className="toRemember">
            Remember your password?{" "}
            <Link to="/Login " onClick={(e) => e.stopPropagation()}>
              Login to your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
