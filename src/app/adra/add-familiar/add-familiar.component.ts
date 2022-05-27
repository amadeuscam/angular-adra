import {Component, OnInit} from '@angular/core';
import {AdraService} from "../../service/adra.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {Familiares} from "../../models/familiares";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Beneficiario} from "../../models/beneficiario";

@Component({
  selector: 'app-add-familiar',
  templateUrl: './add-familiar.component.html',
  styleUrls: ['./add-familiar.component.scss']
})
export class AddFamiliarComponent implements OnInit {
  familiares!: Familiares
  ben_id: string
  fam_id: string
  edit_mode: boolean

  myForm: FormGroup = new FormGroup({
    nombreapellido: new FormControl(null, Validators.required),
    parentesco: new FormControl(null, Validators.required),
    sexo: new FormControl(null, Validators.required),
    dni: new FormControl(null),
    otros_documentos: new FormControl(null),
    fechanacimiento: new FormControl(null, Validators.required),

  })


  constructor(
    private adraService: AdraService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    let vm = this;
    this.ben_id = this.route.snapshot.params['ben_id'],
      this.route.queryParams
        .subscribe(params => {
            console.log(params); // { order: "popular" }
            this.edit_mode = params['update'] == 'true'
            this.fam_id = params['fam_id']

            console.log(this.ben_id)
            console.log(this.edit_mode)
            if (vm.edit_mode) {

              vm.adraService.getFamiliar(this.ben_id, this.fam_id).subscribe(
                (data: any) => {
                  console.log(data);
                  this.myForm = new FormGroup({
                    nombreapellido: new FormControl(data['nombreapellido'], Validators.required),
                    parentesco: new FormControl(data['parentesco'], Validators.required),
                    sexo: new FormControl(data['sexo'], Validators.required),
                    dni: new FormControl(data['dni']),
                    otros_documentos: new FormControl(data['otros_documentos']),
                    fechanacimiento: new FormControl(data['fechanacimiento'], Validators.required),

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

  addFamiliar() {
    console.log("dsadas")
    console.log('Valid?', this.myForm.valid); // true or false
    console.log('errors?', this.myForm.errors); // true or false
    let vm = this;
    if (!(this.myForm.value.dni && this.myForm.value.otros_documentos)) {
      if (this.myForm.valid) {
        this.familiares = new Familiares(
          this.myForm.value.nombreapellido,
          this.myForm.value.parentesco,
          this.myForm.value.sexo,
          this.myForm.value.dni,
          this.myForm.value.otros_documentos,
          this.myForm.value.fechanacimiento,
          true
        );

        if (vm.edit_mode) {
          this.adraService.updateFamiliar(this.familiares, vm.ben_id, vm.fam_id).subscribe(
            (data: any) => {
              this.toastr.success('Modificado correctamente', 'Beneficario!');
              this.router.navigate(['/detail-beneficiario/' + vm.ben_id])
            },
            err => {
              this.toastr.error('' + err.error.message, 'Beneficario!');
            }
          )
        } else {
          this.adraService.anadirFamiliar(this.familiares, this.ben_id).subscribe(
            (data: any) => {
              this.toastr.success('Añadido correctamente', 'Familiar!');
              this.router.navigate(['/detail-beneficiario/' + this.ben_id])
            },
            err => {
              this.toastr.error('' + err.error.message, 'Familiar!');
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
