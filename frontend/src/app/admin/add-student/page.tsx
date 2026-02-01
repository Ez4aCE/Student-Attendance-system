"use client";

import { useState } from "react";

export default function AddStudent() {
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    email: "",
    phone: "",
    branch: "",
    section: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:8080/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Student added!");
      setForm({
        name: "",
        rollNo: "",
        email: "",
        phone: "",
        branch: "",
        section: "",
      });
    } else {
      alert("Failed. Maybe duplicate roll no or not logged in.");
    }
  };

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Add Student</h1>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          name={key}
          placeholder={key}
          value={(form as any)[key]}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      ))}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        Add Student
      </button>
    </div>
  );
}
