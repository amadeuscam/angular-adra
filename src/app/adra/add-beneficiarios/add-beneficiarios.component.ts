import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Beneficiario} from "../../models/beneficiario";
import {AdraService} from "../../service/adra.service";
import {ToastrService} from 'ngx-toastr';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-beneficiarios',
  templateUrl: './add-beneficiarios.component.html',
  styleUrls: ['./add-beneficiarios.component.scss']
})
export class AddBeneficiariosComponent implements OnInit {

  beneficiario!: Beneficiario

  constructor(
    private adraService: AdraService,
    private toastr: ToastrService,
    private router: Router
  ) {
  }


  myForm: FormGroup = new FormGroup({
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
    certificado: new FormControl(false),
    fotocopia_recibo_propiedad: new FormControl(false),
    fotocopia_recibo_gastos: new FormControl(false),
    fotocopia_certificado_negativo: new FormControl(false),
  })

  ngOnInit(): void {

  }

  addBeneficiario() {
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

        this.adraService.addBeneficiario(this.beneficiario).subscribe(
          (data: any) => {
            this.toastr.success('Añadido correctamente', 'Beneficario!');
            this.router.navigate(["/"])
            // console.log(data);


          },
          err => {
            this.toastr.error('' + err.error.message, 'Beneficario!');
            console.log(err);

          }
        )

      }
    } else {
      this.toastr.warning('Solo se pude rellenar un campo dni o otros documentos', 'Beneficario!');
      return
    }
  }

}
