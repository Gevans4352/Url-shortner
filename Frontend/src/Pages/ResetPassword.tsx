import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  type Errors = {
    password?: string;
    confirmPassword?: string;
  };
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Errors = {};
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!hasEightCharacters) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!hasUppercase) {
      newErrors.password = "Password needs an uppercase letter";
    }

    if (!hasLowercase) {
      newErrors.password = "Password needs a lowercase letter";
    }

    if (!hasNumber) {
      newErrors.password = "Password needs a number";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }
  };
  const hasEightCharacters = password.length >= 8;
  const hasUppercase = password !== password.toLowerCase();
  const hasLowercase = password !== password.toUpperCase();
  const hasNumber = password.split("").some((char) => Number(char) >= 0);

  const rules = [
    {
      label: "At least 8 characters",
      test: hasEightCharacters,
    },
    {
      label: "One uppercase letter",
      test: hasUppercase,
    },
    {
      label: "One lowercase letter",
      test: hasLowercase,
    },
    {
      label: "One number",
      test: hasNumber,
    },
  ];
  return (
    <div className="LoginForm">
      <h2 className="RegisterTitle">Reset Your Password</h2>
      <p className="aTinyMessage">Create a new password for your account</p>
      <div className="infoRow">
        <MdLockOutline className="passwordsvg" />
        <div>
          <p className="littlerature">Almost there!</p>
          <p className="aTinyMessage">Enter your new password below.</p>
        </div>
      </div>
      <form onSubmit={handleReset} className="formBox">
        <div className="password-row">
          <div className="uppermost">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="tabletforInput"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="openai"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
        </div>
        <div className="password-row">
          <div className="confurm">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="tabletforInput"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="openai"
            >
              {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
        </div>
        <div className="passwordsafety">
          <p className="safetypassword">Password must contain:</p>
          {rules.map((rule, idx) => (
            <div key={idx} className="rulespy">
              <span
                className={` ${rule.test ? "ruleDot pass" : "ruleDot fail"}`}
              />
              <span className={rule.test ? "ruleText passText" : "ruleText"}>
                {rule.label}
              </span>
            </div>
          ))}
        </div>

        <button type="submit" className="NavigateLogin">
          Reset Password
        </button>
        {errors.password && <p className="error-text">{errors.password}</p>}
        {errors.confirmPassword && (
          <p className="error-text">{errors.confirmPassword}</p>
        )}
      </form>

      <p className="backig">
        Back to <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
