"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { API_BASE } from "@/lib/api";

export default function EditStudent() {
  const { rollNo } = useParams();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [status, setStatus] = useState<{ type: "success" | "error" | ""; msg: string }>({ type: "", msg: "" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
    section: "",
    team: "",
    volunteerDay: "",
  });

  // 1. Fetch existing student data when page loads
  useEffect(() => {
    fetch(`${API_BASE}/students/${rollNo}`)
      .then((res) => {
        if (!res.ok) throw new Error("Student not found");
        return res.json();
      })
      .then((data) => {
        setForm({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          branch: data.branch || "",
          section: data.section || "",
          team: data.team || "",
          volunteerDay: data.volunteerDay || "",
        });
        setInitialLoading(false);
      })
      .catch((err) => {
        setStatus({ type: "error", msg: "Could not load student data." });
        setInitialLoading(false);
      });
  }, [rollNo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", msg: "" });

    try {
      const res = await fetch(`${API_BASE}/students/${rollNo}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus({ type: "success", msg: "Student updated successfully!" });
        // Optional: Redirect back to profile after 1 second
        setTimeout(() => router.push(`/students/${rollNo}`), 1000);
      } else {
        setStatus({ type: "error", msg: "Failed to update. Check server logs." });
      }
    } catch (error) {
      setStatus({ type: "error", msg: "Network error occurred." });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-20">
         <p className="text-[#8dce27] font-bold text-lg animate-pulse">Loading student details...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Edit Student</h1>
        <p className="text-sm text-gray-500 mt-2">Update details for Roll No: <span className="font-bold">{rollNo}</span></p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Full Name */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Full Name</label>
            <input 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:bg-white focus:border-[#3dd8ff] focus:ring-2 focus:ring-[#3dd8ff]/50 outline-none transition-all" 
            />
          </div>

          {/* Contact Info */}
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Email</label>
            <input 
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:bg-white focus:border-[#3dd8ff] focus:ring-2 focus:ring-[#3dd8ff]/50 outline-none transition-all" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Phone</label>
            <input 
              name="phone" 
              value={form.phone} 
              onChange={handleChange} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:bg-white focus:border-[#3dd8ff] focus:ring-2 focus:ring-[#3dd8ff]/50 outline-none transition-all" 
            />
          </div>

          {/* Academic Info */}
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Branch</label>
            <input 
              name="branch" 
              value={form.branch} 
              onChange={handleChange} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:bg-white focus:border-[#3dd8ff] focus:ring-2 focus:ring-[#3dd8ff]/50 outline-none transition-all" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Section</label>
            <input 
              name="section" 
              value={form.section} 
              onChange={handleChange} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:bg-white focus:border-[#3dd8ff] focus:ring-2 focus:ring-[#3dd8ff]/50 outline-none transition-all" 
            />
          </div>

          {/* Team Dropdown */}
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

        {/* Status Message */}
        {status.msg && (
          <div className={`p-3 rounded-lg text-sm font-medium text-center ${
            status.type === 'success' ? 'bg-[#8dce27]/20 text-green-800' : 'bg-red-50 text-red-700'
          }`}>
            {status.msg}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-xl transition-all"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="w-2/3 bg-[#8dce27] hover:bg-[#7bc21e] text-gray-900 font-bold py-3.5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? "Updating..." : "Update Student"}
          </button>
        </div>
      </form>
    </div>
  );
}