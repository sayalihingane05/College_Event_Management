





import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qrImage from "../assets/upi-qr.jpg";

const API = `${API_BASE}/event-registration`;


const EventRegister = () => {
  const { state } = useLocation();
  const navigate = useNavigate(); // ✅ added

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    eventName: state?.eventName || "",
    department: "",
    year: ""
  });

  const [showPayment, setShowPayment] = useState(false);

  const [payment, setPayment] = useState({
    amount: 100,
    method: "UPI",
    transactionId: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!payment.transactionId) {
      alert("Please enter transaction ID after payment");
      return;
    }

    try {
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          isPaid: true,
          payment
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert(data.message);
      navigate(-1); // ✅ go back after success
    } catch (err) {
      alert("Server not responding");
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

        {!showPayment && (
          <button
            type="button"
            onClick={() => setShowPayment(true)}
            className="w-full bg-cyan-700 hover:bg-cyan-800 text-white py-3 rounded-lg font-semibold"
          >
            Pay ₹100
          </button>
        )}

        {showPayment && (
          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            <p className="text-center font-semibold mb-2">
              Scan & Pay ₹100
            </p>

            <img
              src={qrImage}
              alt="UPI QR Code"
              className="mx-auto w-48 h-48 mb-3"
            />

            <input
              placeholder="Enter Transaction ID"
              value={payment.transactionId}
              onChange={(e) =>
                setPayment({ ...payment, transactionId: e.target.value })
              }
              className="w-full p-3 border rounded-lg mb-3"
              required
            />

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
            >
              Confirm & Register
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default EventRegister;
