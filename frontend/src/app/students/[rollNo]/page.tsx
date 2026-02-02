"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function StudentHistory() {
  const params = useParams();
  const rollNo = params.rollNo as string;

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/students/${rollNo}`)
      .then((res) => res.json())
      .then((d) => setData(d));
  }, [rollNo]);

  if (!data) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-[#8dce27] font-bold text-lg animate-pulse">Loading student profile...</p>
      </div>
    );
  }

  const dates: string[] = data.attendanceDates || [];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#8dce27]/20 relative overflow-hidden">
        {/* Decorative Circle */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#8dce27]/10 rounded-bl-full -mr-8 -mt-8"></div>
        
        <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
          <div className="w-20 h-20 bg-[#3dd8ff]/20 rounded-2xl flex items-center justify-center text-[#3dd8ff] text-2xl font-bold border border-[#3dd8ff]/30 shrink-0">
            {data.name.charAt(0).toUpperCase()}
          </div>
          
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              {data.name}
            </h1>
            <div className="flex flex-wrap gap-2 text-sm font-medium">
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg border border-gray-200">
                {data.rollNo}
              </span>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg border border-gray-200">
                {data.branch}
              </span>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg border border-gray-200">
                Sec: {data.section}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance History */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#8dce27]/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Attendance History</h2>
          <span className="bg-[#8dce27]/20 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
            {dates.length} Days Present
          </span>
        </div>

        {dates.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">No attendance records found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {dates.map((date) => (
              <div 
                key={date} 
                className="bg-green-50 border border-green-100 p-3 rounded-xl text-center text-sm font-semibold text-green-800 flex items-center justify-center gap-2 hover:bg-green-100 transition-colors"
              >
                <svg className="w-4 h-4 text-[#8dce27]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {date}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}