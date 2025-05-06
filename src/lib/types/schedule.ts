export interface Schedule {
  id: number;
  agenda: string;
  meeting_start_date: string;
  start_time: string;
  end_time: string;
  day_of_week: string;
  creator: {
    id: number;
    kh_name: string;
    en_name: string;
    avatar: string;
  };
  meeting_status: {
    id: number;
    kh_name: string;
    en_name: string;
  };
  meeting_halls: {
    id: number;
    kh_name: string;
    en_name: string;
  };
  meeting_participants: {
    id: number;
    is_invited: boolean;
    user: {
      id: number;
      kh_name: string;
      en_name: string;
      avatar: string;
    };
    participantType: {
      id: number;
      kh_name: string;
      en_name: string;
    };
  }[];
  description?: string;
  created_at?: string;
  updated_at?: string;
  is_recurring?: boolean;
  recurrence_pattern?: string;
}