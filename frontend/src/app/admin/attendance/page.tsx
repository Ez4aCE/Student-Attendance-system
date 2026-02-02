"use client";

import { useEffect, useState } from "react";

export default function AdminAttendance() {
  const [students, setStudents] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | ""; msg: string }>({ type: "", msg: "" });

  useEffect(() => {
    fetch("http://localhost:8080/students")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setStudents(data);
        } else {
          setStudents([]);
        }
      })
      .catch(() => setStudents([]));
  }, []);

  const toggleSelect = (rollNo: string) => {
    setSelected((prev) =>
      prev.includes(rollNo)
        ? prev.filter((r) => r !== rollNo)
        : [...prev, rollNo]
    );
  };

  const submitAttendance = async () => {
    setLoading(true);
    setStatus({ type: "", msg: "" });

    try {
      const res = await fetch("http://localhost:8080/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ date, rollNos: selected }),
      });

      if (res.ok) {
        setStatus({ type: "success", msg: "Attendance marked successfully!" });
        setSelected([]);
      } else {
        setStatus({ type: "error", msg: "Failed. Are you logged in?" });
      }
    } catch (error) {
      setStatus({ type: "error", msg: "Network error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    // Removed outer wrapper to fit into RootLayout
    <div className="w-full max-w-3xl mx-auto space-y-6">
      
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#8dce27]/20 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Mark Attendance
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Select students to mark them as present.
          </p>
        </div>
        
        <div className="w-full md:w-auto">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full md:w-auto px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:bg-white focus:border-[#3dd8ff] focus:ring-2 focus:ring-[#3dd8ff]/50 outline-none transition-all"
          />
        </div>
      </div>

      {/* Student List Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#8dce27]/20">
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {students.map((s) => {
            const isSelected = selected.includes(s.rollNo);
            return (
              <div 
                key={s.rollNo} 
                onClick={() => toggleSelect(s.rollNo)}
                className={`p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all duration-200 border ${
                  isSelected 
                    ? "bg-[#8dce27]/20 border-[#8dce27] shadow-sm" 
                    : "bg-white border-transparent hover:bg-gray-50 border-b-gray-50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="w-5 h-5 accent-[#8dce27] cursor-pointer"
                  />
                  <div>
                    <span className={`font-bold text-sm block ${isSelected ? "text-gray-900" : "text-gray-700"}`}>
                       {s.name}
                    </span>
                    <span className="text-xs font-mono text-gray-400">
                      {s.rollNo}
                    </span>
                  </div>
                </div>
                
                {isSelected && (
                  <span className="text-xs font-bold text-green-800 bg-[#8dce27]/30 px-2 py-1 rounded">
                    PRESENT
                  </span>
                )}
              </div>
            );
          })}
           
           {students.length === 0 && (
             <div className="text-center py-8 text-gray-400 text-sm">
               No students found...
             </div>
           )}
        </div>

        {/* Action Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          {status.msg && (
            <div className={`mb-4 p-3 rounded-lg text-sm font-medium text-center ${
              status.type === 'success' ? 'bg-[#8dce27]/20 text-green-800' : 'bg-red-50 text-red-700'
            }`}>
              {status.msg}
            </div>
          )}

          <button
            onClick={submitAttendance}
            disabled={loading}
            className="w-full bg-[#8dce27] hover:bg-[#7bc21e] text-gray-900 font-bold py-3.5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin" />
            ) : (
              <>
                <span>Submit Attendance</span>
                {selected.length > 0 && (
                  <span className="bg-white/40 px-2 py-0.5 rounded text-xs">
                    {selected.length}
                  </span>
                )}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}