export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function getStudents() {
  try {
    const res = await fetch(`${API_BASE}/students`, {
      cache: "no-store", // Ensure we don't cache bad data
    });

    // 1. Check if the request itself failed (e.g., 404 or 500)
    if (!res.ok) {
      console.error(`Failed to fetch students: ${res.status}`);
      return []; // Return empty list instead of crashing
    }

    // 2. Safely parse JSON
    const data = await res.json();

    // 3. If data is null/undefined, return empty array
    if (!data) return [];

    return data;
  } catch (error) {
    console.error("Network error in getStudents:", error);
    return []; // Return empty list on network failure
  }
}

export async function getStudentHistory(rollNo: string) {
  try {
    const res = await fetch(`${API_BASE}/students/${rollNo}`, {
      cache: "no-store",
    });

    if (!res.ok) return null; // Return null (not {}) for easier checking
    return res.json();
  } catch (error) {
    console.error("Network error in getStudentHistory:", error);
    return null;
  }
}