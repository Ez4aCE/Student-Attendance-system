
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function getStudents(){
    const res = await fetch(`${API_BASE}/students`);
    return res.json();
}

export async function getStudentHistory(rollNo: string) {
  const res = await fetch(`${API_BASE}/students/${rollNo}`, {
    cache: "no-store",
  });

  if (!res.ok) return {};
  return res.json();
}

