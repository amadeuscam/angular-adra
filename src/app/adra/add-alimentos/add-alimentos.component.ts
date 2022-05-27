import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SignaturePad} from 'angular2-signaturepad';
import {AdraService} from "../../service/adra.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {Alimentos} from "../../models/alimentos";

// @ts-ignore
@Component({
  selector: 'app-add-alimentos',
  templateUrl: './add-alimentos.component.html',
  styleUrls: ['./add-alimentos.component.scss']
})
export class AddAlimentosComponent implements OnInit {

  alimentos!: Alimentos
  ben_id!: string
  edit_mode: boolean
  alm_id: string

  @ViewChild(SignaturePad) signaturePad: SignaturePad;


  signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 490,
    'canvasHeight': 200
  };

  myForm: FormGroup = new FormGroup({
    arroz_blanco: new FormControl(null, Validators.required),
    alubia_cocida: new FormControl(null, Validators.required),
    conserva_atun: new FormControl(null, Validators.required),
    pasta_macarron: new FormControl(null, Validators.required),
    conserva_tomate_frito: new FormControl(null, Validators.required),
    galletas: new FormControl(null, Validators.required),
    macedonia_verduras: new FormControl(null, Validators.required),
    fruta_conserva: new FormControl(null, Validators.required),
    cacao: new FormControl(null, Validators.required),
    tarritos_pollo: new FormControl(null, Validators.required),
    tarritos_fruta: new FormControl(null, Validators.required),
    leche: new FormControl(null, Validators.required),
    aceite: new FormControl(null, Validators.required),
  })

  constructor(
    private adraService: AdraService,
    private toastr: ToastrService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    let vm = this;
    this.ben_id = this.activeRoute.snapshot.params['ben_id']
    this.activeRoute.queryParams
      .subscribe(params => {
          console.log(params); // { order: "popular" }
          this.edit_mode = params['update'] == 'true'
          this.alm_id = params['alm_id']

          // console.log(this.ben_id)
          // console.log(this.edit_mode)
          if (vm.edit_mode) {

            vm.adraService.getAlimentos(this.ben_id, this.alm_id).subscribe(
              (data: any) => {
                console.log(data);
                this.myForm = new FormGroup({
                  arroz_blanco: new FormControl(data['alimento1'], Validators.required),
                  alubia_cocida: new FormControl(data['alimento2'], Validators.required),
                  conserva_atun: new FormControl(data['alimento3'], Validators.required),
                  pasta_macarron: new FormControl(data['alimento4'], Validators.required),
                  conserva_tomate_frito: new FormControl(data['alimento5'], Validators.required),
                  galletas: new FormControl(data['alimento6'], Validators.required),
                  macedonia_verduras: new FormControl(data['alimento7'], Validators.required),
                  fruta_conserva: new FormControl(data['alimento8'], Validators.required),
                  cacao: new FormControl(data['alimento9'], Validators.required),
                  tarritos_pollo: new FormControl(data['alimento10'], Validators.required),
                  tarritos_fruta: new FormControl(data['alimento11'], Validators.required),
                  leche: new FormControl(data['alimento12'], Validators.required),
                  aceite: new FormControl(data['alimento13'], Validators.required),
                })
                this.signaturePad.fromDataURL(data['signature'])

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

  drawComplete() {
    console.log(this.signaturePad!.toDataURL());
  }

  drawStart() {
    console.log('begin drawing');
  }

  clearSignature() {
    this.signaturePad!.clear();
  }

  addAlimentos() {
    let vm = this;
    // console.log('Valid?', this.myForm); // true or false
    // console.log('Valid?', this.myForm.valid); // true or false
    // console.log('errors?', this.myForm.errors); // true or false
    if (this.myForm.valid) {
      this.alimentos = new Alimentos(
        this.myForm.value.arroz_blanco,
        this.myForm.value.alubia_cocida,
        this.myForm.value.conserva_atun,
        this.myForm.value.pasta_macarron,
        this.myForm.value.conserva_tomate_frito,
        this.myForm.value.galletas,
        this.myForm.value.macedonia_verduras,
        this.myForm.value.fruta_conserva,
        this.myForm.value.cacao,
        this.myForm.value.tarritos_pollo,
        this.myForm.value.tarritos_fruta,
        this.myForm.value.leche,
        this.myForm.value.aceite,
        this.signaturePad!.toDataURL()
      )
      console.log(this.alimentos)
      if (vm.edit_mode) {
        this.adraService.updateAlimento(this.alimentos, vm.ben_id, vm.alm_id).subscribe(
          (data: any) => {
            this.toastr.success('Modificado correctamente', 'Alimentos!');
            this.router.navigate(['/detail-beneficiario/' + vm.ben_id])
          },
          err => {
            this.toastr.error('' + err.error.message, 'Alimentos!');
            console.log(err);

          }
        )
      } else {
        this.adraService.anadirAlimentos(this.alimentos, this.ben_id).subscribe(
          (data: any) => {
            this.toastr.success('Alimentos entregados correctamente', 'Alimentos!');
            this.router.navigate(['/detail-beneficiario/' + this.ben_id])
          },
          err => {
            this.toastr.error('' + err.error.message, 'Alimentos!');
            console.log(err);

          }
        )
      }

    }
  }

}
