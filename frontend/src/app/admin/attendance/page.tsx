"use client";

import { useState, useEffect } from "react";
import { API_BASE } from "@/lib/api"; 
import { Student } from "@/types";

export default function AdminAttendance() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // 1. NEW: State for Date Selection (Defaults to Today)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [attendance, setAttendance] = useState<{ [key: string]: boolean }>({});
  const [status, setStatus] = useState<{ type: "success" | "error" | ""; msg: string }>({ type: "", msg: "" });

  // Fetch Students
  useEffect(() => {
    fetch(`${API_BASE}/students`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        const studentList = Array.isArray(data) ? data : [];
        setStudents(studentList);
        setFilteredStudents(studentList);
        
        const initialState: { [key: string]: boolean } = {};
        studentList.forEach((s) => {
          initialState[s.rollNo] = false;
        });
        setAttendance(initialState);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load students:", err);
        setLoading(false);
      });
  }, []);

  // Search Logic
  useEffect(() => {
    const results = students.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(results);
  }, [searchTerm, students]);

  const handleToggle = (rollNo: string) => {
    setAttendance((prev) => ({ ...prev, [rollNo]: !prev[rollNo] }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setStatus({ type: "", msg: "" });

    const presentRollNos = Object.keys(attendance).filter((rollNo) => attendance[rollNo]);

    if (presentRollNos.length === 0) {
      setStatus({ type: "error", msg: "Please select at least one student." });
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/attendance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ 
            rollNos: presentRollNos,
            date: selectedDate // <--- 2. Send the selected date
        }),
      });

      if (res.ok) {
        setStatus({ type: "success", msg: `Marked ${presentRollNos.length} students present for ${selectedDate}!` });
        // setAttendance({}); // Uncomment if you want to clear selection after submit
      } else {
        setStatus({ type: "error", msg: "Failed to save attendance." });
      }
    } catch (error) {
      setStatus({ type: "error", msg: "Network error occurred." });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
         <p className="text-[#8dce27] font-bold text-lg animate-pulse">Loading class list...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      
      {/* Header + Submit Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Mark Attendance</h1>
          <p className="text-sm text-gray-500 mt-1">Select students present for the selected date.</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full sm:w-auto px-8 py-3 bg-[#8dce27] hover:bg-[#7bc21e] text-gray-900 font-bold rounded-xl shadow-lg shadow-[#8dce27]/20 transition-all disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Submit Attendance"}
        </button>
      </div>

      {status.msg && (
        <div className={`mb-6 p-4 rounded-xl font-bold text-center ${
          status.type === 'success' ? 'bg-[#8dce27]/20 text-green-800' : 'bg-red-50 text-red-700'
        }`}>
          {status.msg}
        </div>
      )}

      {/* 3. CONTROLS ROW: Search + Date Picker */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8dce27]/50 focus:border-[#8dce27] shadow-sm transition-all"
            placeholder="Type to search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Date Input */}
        <div>
           <input 
             type="date" 
             value={selectedDate}
             onChange={(e) => setSelectedDate(e.target.value)}
             className="block w-full px-4 py-3 border border-gray-200 rounded-xl leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-[#8dce27]/50 focus:border-[#8dce27] shadow-sm font-medium text-gray-700"
           />
        </div>
      </div>

      {/* Student List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-2">
        {filteredStudents.map((student) => (
          <div 
            key={student.rollNo}
            onClick={() => handleToggle(student.rollNo)}
            className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between group ${
              attendance[student.rollNo] 
                ? "border-[#8dce27] bg-[#8dce27]/10" 
                : "border-gray-100 bg-white hover:border-[#8dce27]/50"
            }`}
          >
            <div>
              <h3 className="font-bold text-gray-800">{student.name}</h3>
              <div className="flex gap-2 text-xs font-medium text-gray-500 mt-0.5">
                <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{student.rollNo}</span>
                {student.team && <span className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded">{student.team}</span>}
              </div>
            </div>
            
            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
              attendance[student.rollNo]
                ? "bg-[#8dce27] border-[#8dce27]"
                : "border-gray-300 group-hover:border-[#8dce27]"
            }`}>
              {attendance[student.rollNo] && (
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {filteredStudents.length === 0 && (
         <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
           {students.length === 0 ? "No students found in database." : "No matching students found."}
         </div>
      )}
    </div>
  );
}