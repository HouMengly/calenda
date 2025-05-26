// Top-level API response interface
interface ApiResponse {
  status: string;
  http_code: number;
  message: string;
  data: ResponseData;
}

// Data object containing statistic, todays, and yesterdays
interface ResponseData {
  statistic: Statistic;
  todays: TodayEntry[];
  yesterdays: YesterdayEntry[];
}

// Statistic object
interface Statistic {
  total: number;
  check_in: number;
  check_out: number;
  permission: number;
  mission: number;
}

// Entry for today's data
interface TodayEntry {
  id: number;
  name_kh: string;
  name_en: string;
  position_name: string;
  file_domain: string;
  file_path: string;
  terminal_log_datetime: string;
}

// Entry for yesterday's data
interface YesterdayEntry {
  id: number;
  date: string;
  sum_hour: string;
  name_kh: string;
  name_en: string;
  position_name: string;
  file_domain: string;
  file_path: string;
}