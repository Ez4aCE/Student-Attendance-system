import StudentList from "@/components/StudentList";
import { getStudents } from "@/lib/api";
import { Student } from "@/types";


export default async function Home() {
  // Fetch data on the server (FAST)
  const students: Student[] = await getStudents();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Student Attendance</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and track attendance for all students.
        </p>
      </div>

      {/* Pass data to the client component for sorting/filtering */}
      <StudentList initialStudents={students} />
      
    </div>
  );
}