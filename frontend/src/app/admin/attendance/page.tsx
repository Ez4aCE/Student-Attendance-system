"use client";

import { useEffect, useState } from "react";

export default function AdminAttendance() {
  const [students, setStudents] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  const toggleSelect = (rollNo: string) => {
    setSelected((prev) =>
      prev.includes(rollNo)
        ? prev.filter((r) => r !== rollNo)
        : [...prev, rollNo]
    );
  };

  const submitAttendance = async () => {
    const res = await fetch("http://localhost:8080/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ date, rollNos: selected }),
    });

    if (res.ok) {
      alert("Attendance marked!");
      setSelected([]);
    } else {
      alert("Failed. Are you logged in?");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Mark Attendance</h1>

      <input
        type="date"
        className="border p-2 mb-4"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <div className="space-y-2">
        {students.map((s) => (
          <div key={s.rollNo} className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selected.includes(s.rollNo)}
              onChange={() => toggleSelect(s.rollNo)}
            />
            <span>
              {s.rollNo} — {s.name}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={submitAttendance}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit Attendance
      </button>
    </div>
  );
}
