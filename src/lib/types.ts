interface ResponseData {
  message: string;
  success: boolean;
  data?: Record<string, unknown>;
}

interface Ping {
  id: string;
  user_id: string;
  latitude: string;
  longitude: string;
  parent_ping_id: string | null;
  created_at: string;
  user_first_name: string;
  user_last_name: string;
}

type TrailedPing = Ping & {
  level: number;
  isLastInTrail?: boolean;
  childCount?: number;
};

export type { Ping, ResponseData, TrailedPing };
