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

  if (!data) return <p>Loading...</p>;

  const dates: string[] = data.attendanceDates || [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {data.name} ({data.rollNo})
      </h1>

      <p className="mb-4">
        {data.branch} - Section {data.section}
      </p>

      <h2 className="text-xl font-semibold mb-3">Attendance Dates</h2>

      {dates.length === 0 ? (
        <p className="text-gray-500">No attendance records yet.</p>
      ) : (
        <ul className="list-disc pl-6 space-y-2">
          {dates.map((date) => (
            <li key={date} className="bg-gray-100 p-2 rounded">
              {date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
