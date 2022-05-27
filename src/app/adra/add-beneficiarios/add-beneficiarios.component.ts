import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Beneficiario} from "../../models/beneficiario";
import {AdraService} from "../../service/adra.service";
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-beneficiarios',
  templateUrl: './add-beneficiarios.component.html',
  styleUrls: ['./add-beneficiarios.component.scss']
})
export class AddBeneficiariosComponent implements OnInit {

  beneficiario!: Beneficiario

  ben_id: string
  edit_mode: boolean = false
  // myForm: FormGroup

  myForm = new FormGroup({
    nombre_beneficiario: new FormControl(null, Validators.required),
    dni: new FormControl(null),
    otros_documentos: new FormControl(null),
    fecha_nacimiento: new FormControl(null, Validators.required),
    numar_adra: new FormControl(null, Validators.required),
    nacionalidad: new FormControl(null, Validators.required),
    domicilio: new FormControl(null, Validators.required),
    mensaje: new FormControl(null),
    ciudad: new FormControl(null, Validators.required),
    telefono: new FormControl(null, Validators.required),
    sexo: new FormControl(null, Validators.required),
    categoria: new FormControl(null, Validators.required),
    email: new FormControl(null),
    papeles: new FormControl(false),
    discapacidad: new FormControl(false),
    covid: new FormControl(false),
    empadronamiento: new FormControl(false),
    fotocopia_libro_familia: new FormControl(false),
    fotocopia_documentacion: new FormControl(false),
    fotocopia_prestacion: new FormControl(false),
    fotocopia_nomina: new FormControl(false),
    fotocopia_recibo_propiedad: new FormControl(false),
    fotocopia_recibo_gastos: new FormControl(false),
    fotocopia_certificado_negativo: new FormControl(false),
  })

  constructor(
    private adraService: AdraService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }


  ngOnInit(): void {
    let vm = this;
    this.route.queryParams
      .subscribe(params => {
          console.log(params); // { order: "popular" }
          this.ben_id = params['id']
          this.edit_mode = params['update'] == 'true'

          console.log(this.ben_id)
          console.log(this.edit_mode)
          if (vm.edit_mode) {

            vm.adraService.getBeneficarios(this.ben_id!).subscribe(
              (data: any) => {
                console.log(data);
                // this.ben_info = data
                vm.myForm = new FormGroup({
                  nombre_beneficiario: new FormControl(data['nombreapellido'], Validators.required),
                  dni: new FormControl(data['dni']),
                  otros_documentos: new FormControl(data['otrosdocumentos']),
                  fecha_nacimiento: new FormControl(data['fechanacimiento'], Validators.required),
                  numar_adra: new FormControl(data['numeroadra'], Validators.required),
                  nacionalidad: new FormControl(data['nacionalidad'], Validators.required),
                  domicilio: new FormControl(data['domicilio'], Validators.required),
                  mensaje: new FormControl(data['mensaje']),
                  ciudad: new FormControl(data['ciudad'], Validators.required),
                  telefono: new FormControl(data['telefono'], Validators.required),
                  sexo: new FormControl(data['sexo'], Validators.required),
                  categoria: new FormControl(data['categoria'], Validators.required),
                  email: new FormControl(data['email']),
                  papeles: new FormControl(data['areacte']),
                  discapacidad: new FormControl(data['discapacidad']),
                  covid: new FormControl(data['covid']),
                  empadronamiento: new FormControl(data['empadronamiento']),
                  fotocopia_libro_familia: new FormControl(data['librofamilia']),
                  fotocopia_documentacion: new FormControl(data['fotocopiadni']),
                  fotocopia_prestacion: new FormControl(data['prestaciones']),
                  fotocopia_nomina: new FormControl(data['nomnia']),
                  fotocopia_recibo_propiedad: new FormControl(data['aquilerhipoteca']),
                  fotocopia_recibo_gastos: new FormControl(data['recibos']),
                  fotocopia_certificado_negativo: new FormControl(data['certnegativo']),
                })
              },
              err => {

                console.log(err);

              }
            )
          } else {
            vm.myForm.reset();

          }

        }
      );

  }

  cancel(e: any) {
    e.preventDefault()
    this.location.back(); // <-- go back to previous location on cancel
  }

  addBeneficiario() {
    let vm = this
    // console.log("dsadas")
    // console.log('Valid?', this.myForm.valid); // true or false
    // console.log('errors?', this.myForm.errors); // true or false
    // console.log('nombre_beneficiario', this.myForm.value.nombre_beneficiario);
    // console.log('fotocopia_certificado_negativo', this.myForm.value.fotocopia_certificado_negativo);
    // console.log('form', this.myForm);
    if (!(this.myForm.value.dni && this.myForm.value.otros_documentos)) {
      if (this.myForm.valid) {
        this.beneficiario = new Beneficiario(
          this.myForm.value.nombre_beneficiario,
          this.myForm.value.dni,
          this.myForm.value.otros_documentos,
          this.myForm.value.fecha_nacimiento,
          this.myForm.value.numar_adra,
          this.myForm.value.nacionalidad,
          this.myForm.value.covid,
          this.myForm.value.domicilio,
          this.myForm.value.ciudad,
          this.myForm.value.papeles,
          this.myForm.value.telefono,
          this.myForm.value.email,
          this.myForm.value.mensaje,
          true,
          this.myForm.value.sexo,
          this.myForm.value.discapacidad,
          this.myForm.value.categoria,
          this.myForm.value.empadronamiento,
          this.myForm.value.fotocopia_libro_familia,
          this.myForm.value.fotocopia_documentacion,
          this.myForm.value.fotocopia_prestacion,
          this.myForm.value.fotocopia_nomina,
          this.myForm.value.fotocopia_certificado_negativo,
          this.myForm.value.fotocopia_recibo_propiedad,
          this.myForm.value.fotocopia_recibo_gastos
        );

        if (vm.edit_mode) {
          this.adraService.updateBeneficiario(this.beneficiario, vm.ben_id).subscribe(
            (data: any) => {
              this.toastr.success('Modificado correctamente', 'Beneficario!');
              this.router.navigate(['/detail-beneficiario/' + vm.ben_id])
            },
            err => {
              this.toastr.error('' + err.error.message, 'Beneficario!');
              console.log(err);

            }
          )
        } else {
          this.adraService.addBeneficiario(this.beneficiario).subscribe(
            (data: any) => {
              this.toastr.success('Añadido correctamente', 'Beneficario!');
              this.router.navigate(["/"])
            },
            err => {
              this.toastr.error('' + err.error.message, 'Beneficario!');
              console.log(err);

            }
          )
        }


      }
    } else {
      this.toastr.warning('Solo se pude rellenar un campo dni o otros documentos', 'Beneficario!');
      return
    }
  }

}
