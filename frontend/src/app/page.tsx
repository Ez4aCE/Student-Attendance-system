import { getStudents } from "@/lib/api";
import { Student } from "@/types";
import Link from "next/link";

export default async function Home() {
  const students: Student[] = await getStudents();

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Student Attendance</h1>
        <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
          Total: {students.length}
        </span>
      </div>

      {/* ========================================================
          DESKTOP VIEW: Table (Hidden on Mobile)
         ======================================================== */}
      <div className="hidden md:block border border-[#8dce27]/30 rounded-xl overflow-hidden shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-[#8dce27]/20 border-b border-[#8dce27]/20">
              <th className="p-4 font-bold text-gray-700 uppercase tracking-wider text-xs">Name</th>
              <th className="p-4 font-bold text-gray-700 uppercase tracking-wider text-xs">Roll No</th>
              <th className="p-4 font-bold text-gray-700 uppercase tracking-wider text-xs">Branch</th>
              <th className="p-4 font-bold text-gray-700 uppercase tracking-wider text-xs">Section</th>
              <th className="p-4 font-bold text-gray-700 uppercase tracking-wider text-xs">Attendance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((s) => (
              <tr key={s.rollNo} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-semibold text-gray-800">{s.name}</td>
                <td className="p-4">
                  <Link 
                    href={`/students/${s.rollNo}`}
                    className="text-[#3dd8ff] font-bold hover:text-[#2bbadd] hover:underline transition-colors"
                  >
                    {s.rollNo}
                  </Link>
                </td>
                <td className="p-4 text-gray-600">{s.branch}</td>
                <td className="p-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-600">
                    {s.section}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-800 bg-[#8dce27]/20 px-3 py-1 rounded-lg text-green-800">
                      {s.attendance}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ========================================================
          MOBILE VIEW: Cards (Hidden on Desktop)
         ======================================================== */}
      <div className="md:hidden space-y-4">
        {students.map((s) => (
          <div 
            key={s.rollNo} 
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:border-[#8dce27]/50 transition-all"
          >
            {/* Card Header: Name & Attendance Badge */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{s.name}</h3>
                <Link 
                  href={`/students/${s.rollNo}`}
                  className="text-sm text-[#3dd8ff] font-bold hover:underline"
                >
                  {s.rollNo}
                </Link>
              </div>
              <span className="font-bold text-xs bg-[#8dce27]/20 text-green-800 px-2 py-1 rounded">
                {s.attendance}
              </span>
            </div>
            
            <hr className="border-gray-100 my-2" />
            
            {/* Card Details: Branch, Section, Arrow */}
            <div className="flex justify-between items-center text-sm text-gray-500">
              <div className="flex gap-4">
                <span>Branch: <span className="font-medium text-gray-700">{s.branch}</span></span>
                <span>Sec: <span className="font-medium text-gray-700">{s.section}</span></span>
              </div>
              <Link href={`/students/${s.rollNo}`} className="p-1 rounded-full hover:bg-gray-100">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (Visible on both views) */}
      {students.length === 0 && (
        <div className="p-10 text-center text-gray-400 bg-gray-50 rounded-xl mt-4 border border-dashed border-gray-200">
          No student records found.
        </div>
      )}
    </div>
  );
}