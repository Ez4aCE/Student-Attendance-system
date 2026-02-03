"use client";

import { useState } from "react";
import { API_BASE } from "@/lib/api";
export default function AddStudent() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | ""; msg: string }>({ type: "", msg: "" });

  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    email: "",
    phone: "",
    branch: "",
    section: "",
    team: "",
    volunteerDay: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", msg: "" });

    try {
      const res = await fetch(`${API_BASE}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus({ type: "success", msg: "Student added successfully!" });
        setForm({
          name: "",
          rollNo: "",
          email: "",
          phone: "",
          branch: "",
          section: "",
          team: "",
          volunteerDay: "",
        });
      } else {
        setStatus({ type: "error", msg: "Failed. Duplicate Roll No or Unauthorized." });
      }
    } catch (error) {
      setStatus({ type: "error", msg: "Network error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Add New Student</h1>
        <p className="text-sm text-gray-500 mt-2">Fill in the details below to register a student.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Basic Info */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Full Name</label>
            <input name="name" type="text" placeholder="e.g. John Doe" value={form.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:bg-white focus:border-[#3dd8ff] focus:ring-2 focus:ring-[#3dd8ff]/50 outline-none transition-all" required />
          </div>

          <div>
             <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Roll Number</label>
             <input name="rollNo" type="text" placeholder="e.g. 21BCS001" value={form.rollNo} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:bg-white focus:border-[#3dd8ff] focus:ring-2 focus:ring-[#3dd8ff]/50 outline-none transition-all" required />
          </div>
          
          <div>
             <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Email Address</label>
             <input name="email" type="email" placeholder="john@college.edu" value={form.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:bg-white focus:border-[#3dd8ff] focus:ring-2 focus:ring-[#3dd8ff]/50 outline-none transition-all" />
          </div>

          <div>
             <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Phone</label>
             <input name="phone" type="tel" placeholder="9876543210" value={form.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:bg-white focus:border-[#3dd8ff] focus:ring-2 focus:ring-[#3dd8ff]/50 outline-none transition-all" />
          </div>

          {/* Academic Info */}
          <div>
             <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Branch</label>
             <input name="branch" type="text" placeholder="e.g. CSE" value={form.branch} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:bg-white focus:border-[#3dd8ff] focus:ring-2 focus:ring-[#3dd8ff]/50 outline-none transition-all" />
          </div>
          
          <div>
             <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Section</label>
             <input name="section" type="text" placeholder="e.g. A" value={form.section} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:bg-white focus:border-[#3dd8ff] focus:ring-2 focus:ring-[#3dd8ff]/50 outline-none transition-all" />
          </div>

          {/* UPDATED: Team Dropdown */}
          <div>
             <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Team</label>
             <select 
               name="team" 
               value={form.team} 
               onChange={handleChange} 
               className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:bg-white focus:border-[#3dd8ff] focus:ring-2 focus:ring-[#3dd8ff]/50 outline-none transition-all"
             >
               <option value="">Select Team</option>
               <option value="Communication">Communication</option>
               <option value="Logistics">Logistics</option>
               <option value="Documentation">Documentation</option>
             </select>
          </div>

          {/* Volunteer Day Dropdown */}
          <div>
             <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Volunteer Day</label>
             <select 
               name="volunteerDay" 
               value={form.volunteerDay} 
               onChange={handleChange} 
               className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:bg-white focus:border-[#3dd8ff] focus:ring-2 focus:ring-[#3dd8ff]/50 outline-none transition-all"
             >
               <option value="">Select Day</option>
               <option value="Monday">Monday</option>
               <option value="Tuesday">Tuesday</option>
               <option value="Wednesday">Wednesday</option>
               <option value="Thursday">Thursday</option>
               <option value="Friday">Friday</option>
             </select>
          </div>

        </div>

        {status.msg && (
          <div className={`p-3 rounded-lg text-sm font-medium text-center ${
            status.type === 'success' ? 'bg-[#8dce27]/20 text-green-800' : 'bg-red-50 text-red-700'
          }`}>
            {status.msg}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#8dce27] hover:bg-[#7bc21e] text-gray-900 font-bold py-3.5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin" />
          ) : (
            "Add Student"
          )}
        </button>
      </form>
    </div>
  );
}