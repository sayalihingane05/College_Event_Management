import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = "http://localhost:5000/event-registration";

const Participants = () => {
  const { eventName } = useParams();
  const navigate = useNavigate();

  const [participants, setParticipants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API}/${eventName}`)
      .then((res) => res.json())
      .then((data) => setParticipants(data.participants || []));
  }, [eventName]);

  const filtered = participants.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e2642] via-[#1d5e79] to-[#248193] p-6">

      {/* HEADER CARD */}
      <div className="max-w-7xl mx-auto mb-10 bg-white/10 backdrop-blur-xl 
                      rounded-3xl p-6 shadow-2xl border border-white/20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">
              👥 Event Participants
            </h1>
            <p className="text-cyan-300 text-lg font-bold mt-1">
              {eventName}
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-xl bg-white/20 hover:bg-white/30 
                       text-white font-semibold transition"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* TOTAL REGISTRATION COUNT */}
      <div className="max-w-7xl mx-auto mb-12 flex justify-center">
        <div
          className="bg-white/15 backdrop-blur-xl rounded-3xl px-16 py-10 
                     text-white shadow-2xl hover:scale-105 transition text-center"
        >
          <p className="text-sm opacity-80 mb-2">
            📋 Total Registrations
          </p>
          <h2 className="text-5xl font-extrabold text-cyan-300">
            {participants.length}
          </h2>
        </div>
      </div>

      {/* SEARCH */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="relative">
          <span className="absolute left-4 top-3 text-white/70">🔍</span>
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 p-3 rounded-2xl bg-white/20 text-white
                       placeholder:text-white/70 backdrop-blur-xl outline-none
                       focus:ring-2 focus:ring-cyan-400 transition"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="max-w-7xl mx-auto bg-white/15 backdrop-blur-xl 
                      rounded-3xl shadow-2xl overflow-hidden">

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-white font-semibold">
            🚫 No participants found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-white text-sm">
              <thead className="bg-black/40 uppercase text-xs">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Mobile</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Year</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, index) => (
                  <tr
                    key={p._id}
                    className={`text-center transition
                      ${index % 2 === 0 ? "bg-white/10" : "bg-white/5"}
                      hover:bg-cyan-500/30`}
                  >
                    <td className="p-4 font-semibold">{p.name}</td>
                    <td className="p-4">{p.email}</td>
                    <td className="p-4">{p.mobile}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full bg-blue-500/30">
                        {p.department}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full bg-green-500/30">
                        {p.year}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Participants;
