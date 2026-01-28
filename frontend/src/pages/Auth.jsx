// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import collegeBg from "../assets/eventformbg.jpg";

// const API = "https://college-event-management-backend.onrender.com/user";


// const Auth = () => {
//   const navigate = useNavigate();
//   const [isLogin, setIsLogin] = useState(true);


//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: ""
//   });


//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const [otp, setOtp] = useState("");
//   const [isOtpSent, setIsOtpSent] = useState(false);




//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // SEND OTP
//     if (!isLogin && !isOtpSent) {
//       const res = await fetch(`${API}/send-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: form.email })
//       });

//       const data = await res.json();
//       alert(data.message);

//       if (res.ok) setIsOtpSent(true);
//       return;
//     }

//     // VERIFY OTP
//     if (!isLogin && isOtpSent) {
//       const res = await fetch(`${API}/verify-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...form, otp })
//       });

//       const data = await res.json();
//       alert(data.message);

//       if (res.ok) {
//         setIsLogin(true);
//         setIsOtpSent(false);
//       }
//       return;
//     }

//     // LOGIN (UNCHANGED)
//     const res = await fetch(`${API}/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         email: form.email,
//         password: form.password
//       })
//     });

//     const data = await res.json();
//     alert(data.message);

//     if (res.ok) {
//       localStorage.setItem("user", JSON.stringify(data.user));
//       navigate("/home");
//     }
//   };


//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-center"
//       style={{ backgroundImage: `url(${collegeBg})` }}
//     >
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg"
//       >
//         <h2 className="text-2xl font-bold text-center text-cyan-700 mb-4">
//           College Events
//         </h2>

//         {!isLogin && (
//           <input
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full mb-3 p-2 border rounded"
//             required
//           />
//         )}

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           className="w-full mb-3 p-2 border rounded"
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           className="w-full mb-4 p-2 border rounded"
//           required
//         />
//         {!isLogin && isOtpSent && (
//           <input
//             type="text"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             className="w-full mb-3 p-2 border rounded"
//             required
//           />
//         )}


//         <button className="w-full bg-cyan-700 text-white py-2 rounded">
//           {!isLogin
//             ? isOtpSent
//               ? "Verify OTP"
//               : "Send OTP"
//             : "Login"}
//         </button>


//         <p
//           className="text-center mt-3 text-cyan-700 cursor-pointer"
//           onClick={() => setIsLogin(!isLogin)}
//         >
//           {isLogin
//             ? "New user? Register"
//             : "Already registered? Login"}
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Auth;




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import collegeBg from "../assets/eventformbg.jpg";

const API =`${API_BASE}/user`;


const Auth = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      // ================= SEND OTP =================
      if (!isLogin && !isOtpSent) {
        const res = await fetch(`${API}/send-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email.trim()
          })
        });

        const data = await res.json();
        alert(data.message);

        if (res.ok) setIsOtpSent(true);
        setLoading(false);
        return;
      }

      // ================= VERIFY OTP =================
      if (!isLogin && isOtpSent) {
        const res = await fetch(`${API}/verify-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            password: form.password.trim(),
            otp: otp.trim()
          })
        });

        const data = await res.json();
        alert(data.message);

        if (res.ok) {
          setIsLogin(true);
          setIsOtpSent(false);
          setForm({ name: "", email: "", password: "" });
          setOtp("");
        }

        setLoading(false);
        return;
      }

      // ================= LOGIN =================
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password.trim()
        })
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/home");
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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

        {!isLogin && isOtpSent && (
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
            required
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-700 text-white py-2 rounded disabled:opacity-60"
        >
          {loading
            ? "Please wait..."
            : !isLogin
              ? isOtpSent
                ? "Verify OTP"
                : "Send OTP"
              : "Login"}
        </button>

        <p
          className="text-center mt-3 text-cyan-700 cursor-pointer"
          onClick={() => {
            setIsLogin(!isLogin);
            setIsOtpSent(false);
            setOtp("");
          }}
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
