export interface Country {
  id: number;
  pais_empleo: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface CountryResult {
  data: Country[];
  message: string;
  status: number;
}
