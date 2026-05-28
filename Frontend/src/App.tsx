import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";
import { useEffect, useState } from "react";
import axios from "axios";
import ResetPassword from "./Pages/ResetPassword";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get("https://url-shortner-c1kw.onrender.com/api/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(res.data);
        } catch (error) {
          localStorage.removeItem("token");
        }
      }
    };
    fetchUser();
  }, []);
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Login setUser={setUser} />}
        />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<ForgotPassword />} />
        <Route path="/restart/:token" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
