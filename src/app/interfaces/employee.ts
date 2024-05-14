export interface Area {
  id: number;
  area: string;
}

export interface Country {
  id: number;
  pais_empleo: string;
}

export interface Identification {
  id: number;
  tipo_identificacion: string;
}

export interface Employee {
  id: number;
  primer_apellido: string;
  segundo_apellido: string;
  primer_nombre: string;
  otros_nombres: string;
  numero_identificacion: string;
  estado: 'ACTIVO' | 'INACTIVO';
  correo_electronico: string;
  fecha_ingreso: string;
  area_id: number;
  country_id: number;
  identification_id: number;
  fecha_registro: string;
  fecha_modificacion: string | null;
  area: Area;
  country: Country;
  identification: Identification;
}

export interface EmployeeResultId {
  data: Employee;
  message: string;
  status: number;
}

export interface EmployeeResult {
  data: Employee[];
  message: string;
  status: number;
}


export interface EmployeeRequest {
  primer_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  otros_nombres: string;
  area_id: number;
  country_id: number;
  identification_id: number;
  numero_identificacion: string;
  estado: string;
  correo_electronico: string;
  fecha_ingreso: string;
}
