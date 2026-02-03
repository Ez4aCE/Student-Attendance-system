import { getStudentHistory } from "@/lib/api";
import Link from "next/link"; // Import Link


interface Props {
  params: Promise<{ rollNo: string }>;
}

export default async function StudentHistory({ params }: Props) {
  const resolvedParams = await params;
  const rollNo = resolvedParams.rollNo;
  const data = await getStudentHistory(rollNo);

  if (!data || !data.name) {
    return (
      <div className="flex items-center justify-center py-20 text-red-500 font-bold">
        Student not found (ID: {rollNo})
      </div>
    );
  }

  const dates: string[] = data.attendanceDates || [];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#8dce27]/20 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#8dce27]/10 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>
        
        <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
          {/* Avatar */}
          <div className="w-20 h-20 bg-[#3dd8ff]/20 rounded-2xl flex items-center justify-center text-[#3dd8ff] text-2xl font-bold border border-[#3dd8ff]/30 shrink-0">
            {data.name.charAt(0).toUpperCase()}
          </div>
          
          <div className="space-y-1 w-full">
            {/* Header Row: Name + Edit Button */}
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                {data.name}
              </h1>
              
              {/* NEW EDIT BUTTON */}
              <Link 
                href={`/admin/edit-student/${data.rollNo}`}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-[#8dce27] hover:text-white rounded-lg transition-all shadow-sm border border-gray-200 hover:border-[#8dce27]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit
              </Link>
            </div>
            
            {/* Primary Details */}
            <div className="flex flex-wrap gap-2 text-sm font-medium mb-3">
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg border border-gray-200">
                {data.rollNo}
              </span>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg border border-gray-200">
                {data.branch} - {data.section}
              </span>
            </div>

            {/* Team & Volunteer Day Badges */}
            <div className="flex flex-wrap gap-2">
              {data.team && (
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg border border-purple-200 text-sm font-bold flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {data.team}
                </span>
              )}
              {data.volunteerDay && (
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg border border-orange-200 text-sm font-bold flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {data.volunteerDay}
                </span>
              )}
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