export interface Area {
  id: number;
  area: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface AreaResult {
  data: Area[];
  message: string;
  status: number;
}
