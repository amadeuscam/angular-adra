export class Beneficiario {

  nombreapellido: string;
  dni: string;
  otrosdocumentos: string;
  fechanacimiento: string;
  numeroadra: number;
  nacionalidad: string;
  covid: boolean;
  domicilio: string;
  ciudad: string;
  areacte: boolean;
  telefono: number;
  email: string;
  mensaje: string;
  active: boolean;
  sexo: string;
  discapacidad: boolean;
  categoria: string;
  empadronamiento: boolean;
  librofamilia: boolean;
  fotocopiadni: boolean;
  prestaciones: boolean;
  nomnia: boolean;
  certnegativo: boolean;
  aquilerhipoteca: boolean;
  recibos: boolean;



  constructor(nombreapellido: string, dni: string, otrosdocumentos: string, fechanacimiento: string, numeroadra: number, nacionalidad: string, covid: boolean, domicilio: string, ciudad: string, areacte: boolean, telefono: number, email: string, mensaje: string, active: boolean, sexo: string, discapacidad: boolean, categoria: string, empadronamiento: boolean, librofamilia: boolean, fotocopiadni: boolean, prestaciones: boolean, nomnia: boolean, certnegativo: boolean, aquilerhipoteca: boolean, recibos: boolean) {
    this.nombreapellido = nombreapellido;
    this.dni = dni;
    this.otrosdocumentos = otrosdocumentos;
    this.fechanacimiento = fechanacimiento;
    this.numeroadra = numeroadra;
    this.nacionalidad = nacionalidad;
    this.covid = covid;
    this.domicilio = domicilio;
    this.ciudad = ciudad;
    this.areacte = areacte;
    this.telefono = telefono;
    this.email = email;
    this.mensaje = mensaje;
    this.active = active;
    this.sexo = sexo;
    this.discapacidad = discapacidad;
    this.categoria = categoria;
    this.empadronamiento = empadronamiento;
    this.librofamilia = librofamilia;
    this.fotocopiadni = fotocopiadni;
    this.prestaciones = prestaciones;
    this.nomnia = nomnia;
    this.certnegativo = certnegativo;
    this.aquilerhipoteca = aquilerhipoteca;
    this.recibos = recibos;

  }
}
