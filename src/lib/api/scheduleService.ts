import { Schedule } from "../types/schedule";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchSchedules = async (): Promise<Schedule[]> => {
  try {
    const res = await fetch(`${baseUrl}/api/lcd/meeting`, {
      method: "GET",
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error details:", {error});
    return [];
  }
};