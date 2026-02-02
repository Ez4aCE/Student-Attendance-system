"use client";

import { useState } from "react";
import Link from "next/link";
import { Student } from "@/types";

interface Props {
  initialStudents: Student[];
}

export default function StudentList({ initialStudents }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const filteredStudents = initialStudents
    .filter((s) => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "lowest") return a.attendance - b.attendance;
      if (sortBy === "highest") return b.attendance - a.attendance;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="space-y-6">
      
      {/* CONTROLS BAR (Search + Sort) */}
      <div className="flex flex-col md:flex-row gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#8dce27] focus:border-[#8dce27] sm:text-sm"
            placeholder="Search by name or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-bold text-gray-600 whitespace-nowrap">Sort By:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-[#8dce27] focus:border-[#8dce27] sm:text-sm rounded-lg"
          >
            <option value="name">Name (A-Z)</option>
            <option value="lowest">Attendance (Lowest First)</option>
            <option value="highest">Attendance (Highest First)</option>
          </select>
        </div>
        
        <div className="hidden md:flex items-center">
            <span className="text-xs font-bold text-gray-500 bg-white px-3 py-2 rounded-lg border border-gray-200">
             Result: {filteredStudents.length}
            </span>
        </div>
      </div>

      {/* DESKTOP TABLE VIEW */}
      <div className="hidden md:block border border-[#8dce27]/30 rounded-xl overflow-hidden shadow-sm bg-white">
        <div className="max-h-[70vh] overflow-y-auto">
          <table className="min-w-full text-sm text-left">
            {/* FIX: Removed the comment from inside 'thead' */}
            <thead className="sticky top-0 z-10">
              <tr className="bg-[#8dce27]/20 border-b border-[#8dce27]/20 backdrop-blur-sm">
                <th className="p-4 font-bold text-gray-700 uppercase tracking-wider text-xs">Name</th>
                <th className="p-4 font-bold text-gray-700 uppercase tracking-wider text-xs">Roll No</th>
                <th className="p-4 font-bold text-gray-700 uppercase tracking-wider text-xs">Team</th>
                <th className="p-4 font-bold text-gray-700 uppercase tracking-wider text-xs">Vol. Day</th>
                <th className="p-4 font-bold text-gray-700 uppercase tracking-wider text-xs">Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.map((s) => (
                <tr key={s.rollNo} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-semibold text-gray-800">{s.name}</td>
                  <td className="p-4">
                    <Link href={`/students/${s.rollNo}`} className="text-[#3dd8ff] font-bold hover:underline">
                      {s.rollNo}
                    </Link>
                  </td>
                  <td className="p-4 text-gray-600">
                    {s.team ? <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded border border-purple-100 text-xs font-medium">{s.team}</span> : "-"}
                  </td>
                  <td className="p-4 text-gray-600">
                    {s.volunteerDay ? <span className="bg-orange-50 text-orange-700 px-2 py-1 rounded border border-orange-100 text-xs font-medium">{s.volunteerDay}</span> : "-"}
                  </td>
                  <td className="p-4">
                    <span className={`font-bold px-3 py-1 rounded-lg ${
                      s.attendance < 50 ? 'bg-red-100 text-red-700' : 'bg-[#8dce27]/20 text-green-800'
                    }`}>
                      {s.attendance}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredStudents.length === 0 && (
          <div className="p-10 text-center text-gray-400">No students match your search.</div>
        )}
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="md:hidden space-y-4">
        {filteredStudents.map((s) => (
          <div key={s.rollNo} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:border-[#8dce27]/50 transition-all">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{s.name}</h3>
                <Link href={`/students/${s.rollNo}`} className="text-sm text-[#3dd8ff] font-bold hover:underline">
                  {s.rollNo}
                </Link>
              </div>
              <span className={`font-bold text-xs px-2 py-1 rounded ${
                 s.attendance < 50 ? 'bg-red-100 text-red-700' : 'bg-[#8dce27]/20 text-green-800'
              }`}>
                {s.attendance}%
              </span>
            </div>
            <hr className="border-gray-100 my-2" />
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 mb-2">
              <div>
                 <span className="text-xs uppercase font-bold text-gray-400">Branch</span>
                 <p className="font-medium text-gray-700">{s.branch} - {s.section}</p>
              </div>
              <div>
                 <span className="text-xs uppercase font-bold text-gray-400">Team</span>
                 <p className="font-medium text-purple-700">{s.team || "N/A"}</p>
              </div>
            </div>
             <div className="flex justify-between items-center text-sm">
               <span className="bg-orange-50 text-orange-700 px-2 py-0.5 rounded text-xs border border-orange-100">
                 {s.volunteerDay || "-"}
               </span>
               <Link href={`/students/${s.rollNo}`} className="p-1 rounded-full hover:bg-gray-100">
                 View &rarr;
               </Link>
             </div>
          </div>
        ))}
         {filteredStudents.length === 0 && (
          <div className="p-10 text-center text-gray-400 bg-white rounded-xl">No students match your search.</div>
        )}
      </div>

    </div>
  );
}