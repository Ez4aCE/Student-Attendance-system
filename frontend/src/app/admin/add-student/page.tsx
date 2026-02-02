"use client";

import { useState } from "react";

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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", msg: "" });

    try {
      const res = await fetch("http://localhost:8080/students", {
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

  const fields = [
    { name: "name", label: "Full Name", type: "text", placeholder: "e.g. John Doe", width: "full" },
    { name: "rollNo", label: "Roll Number", type: "text", placeholder: "e.g. 21BCS001", width: "full" },
    { name: "email", label: "Email Address", type: "email", placeholder: "john@college.edu", width: "half" },
    { name: "phone", label: "Phone Number", type: "tel", placeholder: "9876543210", width: "half" },
    { name: "branch", label: "Branch", type: "text", placeholder: "e.g. CSE", width: "half" },
    { name: "section", label: "Section", type: "text", placeholder: "e.g. A", width: "half" },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Add New Student</h1>
        <p className="text-sm text-gray-500 mt-2">Fill in the details below to register a student.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {fields.map((field) => (
            <div 
              key={field.name} 
              className={field.width === "full" ? "col-span-1 md:col-span-2" : "col-span-1"}
            >
              <label 
                htmlFor={field.name} 
                className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider"
              >
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={(form as any)[field.name]}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder:text-gray-400 focus:bg-white focus:border-[#3dd8ff] focus:ring-2 focus:ring-[#3dd8ff]/50 outline-none transition-all duration-200"
                required
              />
            </div>
          ))}
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