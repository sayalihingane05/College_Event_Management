import { useState } from "react";
import { useNavigate } from "react-router-dom";
import collegeBg from "../assets/eventformbg.jpg";

import AxiosInstance from "../../AxiosInstance";

// const API = "https://college-event-management-backend.onrender.com/user";


const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);


  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // removed otp states




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // REGISTER
      if (!isLogin) {
        const res = await AxiosInstance.post("/user/register", {
          name: form.name,
          email: form.email,
          password: form.password,
        });

        alert(res.data.message);
        setIsLogin(true);
        return;
      }

      // LOGIN
      const res = await AxiosInstance.post("/user/login", {
        email: form.email,
        password: form.password,
      });

      alert(res.data.message);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/home");
    } catch (error) {
      console.error("Auth Error:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };


  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${collegeBg})` }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-cyan-700 mb-4">
          College Events
        </h2>

        {!isLogin && (
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <button className="w-full bg-cyan-700 text-white py-2 rounded">
          {isLogin ? "Login" : "Register"}
        </button>


        <p
          className="text-center mt-3 text-cyan-700 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "New user? Register"
            : "Already registered? Login"}
        </p>
      </form>
    </div>
  );
};

export default Auth;




