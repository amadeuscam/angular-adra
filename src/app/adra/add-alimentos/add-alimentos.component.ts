import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SignaturePad} from 'angular2-signaturepad';
import {AdraService} from "../../service/adra.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {Alimentos} from "../../models/alimentos";

@Component({
  selector: 'app-add-alimentos',
  templateUrl: './add-alimentos.component.html',
  styleUrls: ['./add-alimentos.component.scss']
})
export class AddAlimentosComponent implements OnInit {

  alimentos!: Alimentos
  ben_id!: number
  @ViewChild(SignaturePad) signaturePad: SignaturePad | undefined;

  signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 510,
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
    this.ben_id = parseInt(this.activeRoute.snapshot.params['ben_id'])
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
    console.log('Valid?', this.myForm); // true or false
    console.log('Valid?', this.myForm.valid); // true or false
    console.log('errors?', this.myForm.errors); // true or false
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
      this.adraService.anadirAlimentos(this.alimentos, this.ben_id).subscribe(
        (data: any) => {
          this.toastr.success('Alimentos entregados correctamente', 'Beneficario!');
          this.router.navigate(['/detail-beneficiario/' + this.ben_id])
          // console.log(data);


        },
        err => {
          this.toastr.error('' + err.error.message, 'Beneficario!');
          console.log(err);

        }
      )
    }
  }

}
