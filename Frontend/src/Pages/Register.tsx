import { Link, useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../Hooks/useDocumentTitle";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";
import { CiUser } from "react-icons/ci";

const Register = () => {
  type Errors = {
    email?: string;
    password?: string;
    name?: string;
  };
  useDocumentTitle("Register");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // const userData = {
    //   name,
    //   email,
    //   password,
    // };

    try {
      const response = await fetch(
        "https://url-shortner-c1kw.onrender.com/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: name, email, password }),
        },
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/Login");
      } else {
        setErrors({ email: data.message });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    const newErrors: Errors = {};

    if (email.trim().length === 0) {
      newErrors.email = "Email address is required.";
    }
    if (!email.includes("@") || !email.includes(".")) {
      newErrors.email = "Please enter a valid email address";
    }
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }
    let hasNumber = false;
    for (let i = 0; i < password.length; i++) {
      if (password[i] >= "0" && password[i] <= "9") {
        hasNumber = true;
        break;
      }
    }
    if (!hasNumber) {
      newErrors.password = "Password must contain at least one number.";
    }
    let hasLetter = false;
    for (let i = 0; i < password.length; i++) {
      if (
        (password[i] >= "a" && password[i] <= "z") ||
        (password[i] >= "A" && password[i] <= "Z")
      ) {
        hasLetter = true;
        break;
      }
    }
    if (!hasLetter) {
      newErrors.password =
        "Password must contain at least one uppercase letter.";
    }
    let isValid = true;
    for (let i = 0; i < name.length; i++) {
      const char = name[i];
      const isLetter =
        (char >= "a" && char <= "z") || (char >= "A" && char <= "Z");
      const isNumber = char >= "0" && char <= "9";
      if (!isLetter && !isNumber) {
        isValid = false;
        break;
      }
    }
    if (!isValid) {
      newErrors.name = "Username must only contain letters and numbers.";
    }
    if (setName.length > 20) {
      newErrors.name = "Username cannot exceed 20 characters.";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    navigate("/Login");
  };
  return (
    <div className="login">
      <div className="card">
        <div className="right">
          <h1>Url Shortner</h1>
          <form className="LoginForm" onSubmit={handleRegister}>
            <h2 className="RegisterTitle">Register</h2>
            <div className="usernameInput">
              <CiUser className="usernameInputsvg" />
              <input
                className="RegisterUserInput"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                required
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>
            <div className="usernameInput">
              <MdOutlineMail className="usernameInputsvg" />
              <input
                className="RegisterUserInput"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                required
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
            <div className="passwordInputation">
              <TbLockPassword className="usernameInputsvg" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                id="showPasswd"
                className="password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </button>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
            <button className="submission" type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
            <p>
              Already have an account{" "}
              <Link to="/Login " onClick={(e) => e.stopPropagation()}>
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
