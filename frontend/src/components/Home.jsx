import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Hero section images
import student1 from "../assets/student1.jpg";
import student2 from "../assets/student2.jpg";
import student3 from "../assets/student3.jpg";
import student4 from "../assets/student4.jpg";
import student5 from "../assets/student5.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

const handleLogout=()=>{
  localStorage.removeItem("user");
  navigate("/")
}
  useEffect(() => {
  const user = localStorage.getItem("user");
  if (!user) {
    navigate("/");
  }
}, []);

  useEffect(() => {
    fetch("https://college-event-backend.onrender.com/event/Eventlist")
      .then((res) => res.json())
      .then((data) => {
        if (data.EventList) {
          const today = new Date();

          const upcomingEvents = data.EventList
            .filter((event) => new Date(event.date) >= today)
            .sort(
              (a, b) => new Date(a.date) - new Date(b.date)
            )
            .slice(0, 3);

          setEvents(upcomingEvents);
        }
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= HERO SECTION ================= */}
      <div className="bg-cyan-900 text-white flex justify-end px-6 py-3">
  <button
    onClick={handleLogout}
    className="bg-red-500 hover:bg-red-400 px-4 py-2 rounded font-semibold transition"
  >
    Logout
  </button>
</div>
      <section className="bg-cyan-700 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome To <span className="text-orange-400">Modern Institute</span>
            </h1>

            <h2 className="text-2xl font-semibold mb-3">
              For <span className="text-orange-400">Higher Education</span>
            </h2>

            <p className="text-gray-200 mb-6 italic">
              "We Build Only Champions"
            </p>

            <div className="flex gap-4">
              <button
                className="bg-cyan-900 border border-white text-white px-6 py-2 rounded font-semibold"
                onClick={() => navigate("/View Event")}
              >
                View Events
              </button>

              <button
                className="bg-cyan-900 border border-white text-white px-6 py-2 rounded font-semibold"
                onClick={() => navigate("/Create Event")}
              >
                Create Event
              </button>
            </div>
          </div>

          {/* Right Images */}
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-3">
              <img src={student1} className="w-28 h-28 object-cover rounded rotate-45 border-4 border-white" />
              <img src={student2} className="w-28 h-28 object-cover rounded rotate-45 border-4 border-white" />
              <img src={student3} className="w-28 h-28 object-cover rounded rotate-45 border-4 border-white" />
              <img src={student4} className="w-28 h-28 object-cover rounded rotate-45 border-4 border-white" />
              <img src={student5} className="w-28 h-28 object-cover rounded rotate-45 border-4 border-white" />
            </div>
          </div>

        </div>
      </section>

      {/* UPCOMING EVENTS  */}
      <section className="bg-gray-200 py-16">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl text-cyan-900 font-bold text-center mb-10">
      Upcoming Events
    </h2>

    <div className="grid md:grid-cols-3 gap-8">
      {events.length > 0 ? (
        events.map((event) => (
          <div
            key={event._id}
            className="bg-gradient-to-br from-cyan-50 to-white p-6 rounded-xl shadow-md 
                       hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            {/* Date Badge */}
            <span className="inline-block bg-cyan-700 text-white text-xs px-3 py-1 rounded-full mb-3">
              {new Date(event.date).toLocaleDateString("en-GB")}
            </span>

            {/* Title */}
            <h3 className="font-bold text-xl text-cyan-900 mb-3">
              {event.Title}
            </h3>

            {/* Button */}
            <button
              className="mt-4 w-full border border-cyan-900 bg-cyan-900 text-white 
                         px-4 py-2 rounded-lg font-medium
                         hover:bg-white hover:text-cyan-900 
                         transition duration-300"
              onClick={() => navigate("/event-details", { state: event })}
            >
              View Details
            </button>
          </div>
        ))
      ) : (
        <p className="col-span-3 text-center font-bold text-red-600">
          No upcoming events
        </p>
      )}
    </div>
  </div>
</section>

{/* FOOTER */}
<footer className="bg-cyan-700 text-white text-center py-4">
  © 2025 College Event Management System <h1>developed by:-sayali_hingane</h1>
</footer>


    </div>
  );
};

export default Home;
