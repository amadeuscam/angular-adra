export class Familiares {

  nombreapellido: string;
  parentesco: string;
  sexo: string;
  dni: string;
  otros_documentos: string;
  fechanacimiento: string;
  active: boolean;


  constructor(nombreapellido: string, parentesco: string, sexo: string, dni: string, otros_documentos: string, fechanacimiento: string, active: boolean) {
    this.nombreapellido = nombreapellido;
    this.parentesco = parentesco;
    this.sexo = sexo;
    this.dni = dni;
    this.otros_documentos = otros_documentos;
    this.fechanacimiento = fechanacimiento;
    this.active = active;
  }
}
