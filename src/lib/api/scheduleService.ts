import { Schedule } from "../types/schedule";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

interface ApiResponse {
  statusCode: number;
  success: boolean;
  data: Schedule[];
  message: string;
  meta: {
    timestamp: string;
  };
}

export const fetchSchedules = async (lcd_id: string): Promise<Schedule[]> => {
  try {
    const res = await fetch(`${baseUrl}/api/lcd/meeting/${lcd_id}`, {
      method: "GET",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    const result: ApiResponse = await res.json();

    if (!Array.isArray(result.data)) {
      throw new Error("Expected array in response.data");
    }

    return result.data;
  } catch (error) {
    console.error(
      "Failed to fetch schedules:",
      error instanceof Error ? error.message : error
    );
    return [];
  }
};
