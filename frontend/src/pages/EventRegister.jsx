





import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qrImage from "../assets/upi-qr.jpg";

import AxiosInstance from "../../AxiosInstance";

// const API = "https://your-backend.onrender.com/event-registration";

const EventRegister = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.eventName) {
      alert("Please select an event to register.");
      navigate("/View-Event"); // Redirect to event list
    }
  }, [state, navigate]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    eventName: state?.eventName || "",
    department: "",
    year: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await AxiosInstance.post("/event-registration/register", form);

      alert(res.data.message);
      navigate(-1); // ✅ go back after success
    } catch (err) {
      console.error("Registration Error:", err);
      alert(err.response?.data?.message || "Server not responding");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-cyan-700 to-blue-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white/95 p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        {/* 🔙 Back Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-cyan-800 text-white hover:text-cyan-900 font-semibold"
        >
          ← Back
        </button>

        <h2 className="text-2xl font-bold text-center text-cyan-700 mb-6">
          Event Registration
        </h2>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded-lg"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded-lg"
          required
        />

        <input
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded-lg"
          required
        />

        <input
          name="eventName"
          value={form.eventName}
          readOnly
          className="w-full mb-3 p-3 border rounded-lg bg-gray-100"
        />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded-lg"
          required
        />

        <input
          name="year"
          placeholder="Year (e.g. TY, Final)"
          value={form.year}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-cyan-700 hover:bg-cyan-800 text-white py-3 rounded-lg font-semibold"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default EventRegister;
