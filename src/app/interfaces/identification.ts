interface TipoIdentificacion {
  id: number;
  tipo_identificacion: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface TypeIdentificationResult {
  data: TipoIdentificacion[];
  message: string;
  status: number;
}
