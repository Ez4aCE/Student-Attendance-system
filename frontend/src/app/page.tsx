import { getStudents } from "@/lib/api";
import { Student } from "@/types";
import Link from "next/link";

export default async function Home() {
  const students: Student[] = await getStudents();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Students Attendance</h1>

      <table className="min-w-full border border-gray-200 rounded overflow-hidden">
  <thead className="bg-gray-50">
    <tr>
      <th className="p-3 text-left">Name</th>
      <th className="p-3 text-left">Roll No</th>
      <th className="p-3 text-left">Branch</th>
      <th className="p-3 text-left">Section</th>
      <th className="p-3 text-left">Attendance</th>
    </tr>
  </thead>
  <tbody>
    {students.map((s) => (
      <tr key={s.rollNo} className="border-t hover:bg-gray-50">
        <td className="p-3">{s.name}</td>
        <td className="p-3 text-blue-600 font-semibold underline">
          <Link href={`/students/${s.rollNo}`}>{s.rollNo}</Link>
        </td>
        <td className="p-3">{s.branch}</td>
        <td className="p-3">{s.section}</td>
        <td className="p-3 font-bold">{s.attendance}</td>
      </tr>
    ))}
  </tbody>
</table>


    </div>
  );
}
