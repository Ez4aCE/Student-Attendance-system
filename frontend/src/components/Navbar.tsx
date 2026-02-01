export default function Navbar() {
  return (
    <div className="bg-slate-800 text-white px-10 py-4 flex justify-between items-center shadow">
      <h1 className="font-bold text-xl tracking-wide">Placecom Attendance</h1>
      <div className="space-x-6 text-sm">
        <a href="/" className="hover:text-gray-300">Students</a>
        <a href="/admin/attendance" className="hover:text-gray-300">Attendance</a>
        <a href="/admin/add-student" className="hover:text-gray-300">Add Student</a>
        <a href="/admin/login" className="hover:text-gray-300">Admin</a>
      </div>
    </div>
  );
}
