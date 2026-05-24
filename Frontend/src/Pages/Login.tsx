import { Link, useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../Hooks/useDocumentTitle";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState } from "react";

const Login = () => {
  type Errors = {
    email?: string;
    password?: string;
  };
  useDocumentTitle("Login");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Errors = {};

    if (email === "") {
      newErrors.email = "Email is required";
    } else if (email.trim() === "") {
      newErrors.email = "Email cannot be only spaces.";
    } else if (!email.includes("@") || !email.includes(".")) {
      newErrors.email = "Email is invalid";
    }

    if (password === "") {
      newErrors.password = "Password is required.";
    } else if (password.trim() === "") {
      newErrors.password = "Password cannot be only spaces.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    navigate("/");
  };
  return (
    <div className="login">
      <div className="card">
        <div className="right">
          <h1>URL shortner</h1>
          <form className="LoginForm" onSubmit={handleLogin}>
            <h2 className="LoginTitle">Login</h2>
            <div className="input-wrapper">
              <input
                className="EnterLogin"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                required
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
            <div className="TheDivWrapper">
              <div className="password-row">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  id="showPasswd"
                  className="Passkey"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
              </div>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
            <Link to="/reset" forgot-password-link>
              Forgot Password?
            </Link>
            <button className="NavigateLogin" type="submit">
              Sign In
            </button>
            <p>
              New to Url Shortner?{" "}
              <Link to="/Register " onClick={(e) => e.stopPropagation()}>
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
