import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StockAlimentos } from 'src/app/models/stockAlimentos';
import { AdraService } from 'src/app/service/adra.service';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.scss']
})
export class StockFormComponent implements OnInit {

  alm_id: number
  stock: StockAlimentos

  constructor(
    private adraService: AdraService,
    private toastr: ToastrService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

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
    // fechas
    arroz_blanco_cad: new FormControl(null, Validators.required),
    alubia_cocida_cad: new FormControl(null, Validators.required),
    conserva_atun_cad: new FormControl(null, Validators.required),
    pasta_macarron_cad: new FormControl(null, Validators.required),
    conserva_tomate_frito_cad: new FormControl(null, Validators.required),
    galletas_cad: new FormControl(null, Validators.required),
    macedonia_verduras_cad: new FormControl(null, Validators.required),
    fruta_conserva_cad: new FormControl(null, Validators.required),
    cacao_cad: new FormControl(null, Validators.required),
    tarritos_pollo_cad: new FormControl(null, Validators.required),
    tarritos_fruta_cad: new FormControl(null, Validators.required),
    leche_cad: new FormControl(null, Validators.required),
    aceite_cad: new FormControl(null, Validators.required),
  })

  ngOnInit(): void {
    this.alm_id = parseInt(this.activeRoute.snapshot.params['alm_id'])
    console.log(this.alm_id);
    this.adraService.getAllStockAlimentos(this.alm_id).subscribe(
      (data: any) => {
        console.log(data);
        let count = 1
        this.myForm = new FormGroup({
          arroz_blanco: new FormControl(data.response.alimento1, Validators.required),
          alubia_cocida: new FormControl(data.response.alimento2, Validators.required),
          conserva_atun: new FormControl(data.response.alimento3, Validators.required),
          pasta_macarron: new FormControl(data.response.alimento4, Validators.required),
          conserva_tomate_frito: new FormControl(data.response.alimento5, Validators.required),
          galletas: new FormControl(data.response.alimento6, Validators.required),
          macedonia_verduras: new FormControl(data.response.alimento7, Validators.required),
          fruta_conserva: new FormControl(data.response.alimento8, Validators.required),
          cacao: new FormControl(data.response.alimento9, Validators.required),
          tarritos_pollo: new FormControl(data.response.alimento10, Validators.required),
          tarritos_fruta: new FormControl(data.response.alimento11, Validators.required),
          leche: new FormControl(data.response.alimento12, Validators.required),
          aceite: new FormControl(data.response.alimento13, Validators.required),
          // fechas
          arroz_blanco_cad: new FormControl(data.response.alimento1_cad, Validators.required),
          alubia_cocida_cad: new FormControl(data.response.alimento2_cad, Validators.required),
          conserva_atun_cad: new FormControl(data.response.alimento3_cad, Validators.required),
          pasta_macarron_cad: new FormControl(data.response.alimento4_cad, Validators.required),
          conserva_tomate_frito_cad: new FormControl(data.response.alimento5_cad, Validators.required),
          galletas_cad: new FormControl(data.response.alimento6_cad, Validators.required),
          macedonia_verduras_cad: new FormControl(data.response.alimento7_cad, Validators.required),
          fruta_conserva_cad: new FormControl(data.response.alimento8_cad, Validators.required),
          cacao_cad: new FormControl(data.response.alimento9_cad, Validators.required),
          tarritos_pollo_cad: new FormControl(data.response.alimento10_cad, Validators.required),
          tarritos_fruta_cad: new FormControl(data.response.alimento11_cad, Validators.required),
          leche_cad: new FormControl(data.response.alimento12_cad, Validators.required),
          aceite_cad: new FormControl(data.response.alimento13_cad, Validators.required),
        })
        // vm.id_alm = data['response']['id']
        // console.log(data['response']);
        // for (let index = 1; index < 14; index++) {
        //   console.log(data['response']['alimento' + index]);
        //   console.log(data['response']['alimento' + index + '_cad']);
        //   console.log(index);

        //   Object.assign(vm.stock_data, {
        //     [this.stock_alimentos_names['alimento' + index]]: {
        //       quantity: data['response']['alimento' + index],
        //       cad: data['response']['alimento' + index + '_cad']
        //     },
        //   });



        // }
        // this.stock_data = data['response']
        // console.log(this.stock_data);

      },
      err => {
        console.log(err);

      }
    )

  }

  modificarAlimentos() {
    console.log(this.myForm);
    console.log(this.myForm.valid);


    if (this.myForm.valid) {
      this.stock = new StockAlimentos(
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
        // fechas
        this.myForm.value.arroz_blanco_cad,
        this.myForm.value.alubia_cocida_cad,
        this.myForm.value.conserva_atun_cad,
        this.myForm.value.pasta_macarron_cad,
        this.myForm.value.conserva_tomate_frito_cad,
        this.myForm.value.galletas_cad,
        this.myForm.value.macedonia_verduras_cad,
        this.myForm.value.fruta_conserva_cad,
        this.myForm.value.cacao_cad,
        this.myForm.value.tarritos_pollo_cad,
        this.myForm.value.tarritos_fruta_cad,
        this.myForm.value.leche_cad,
        this.myForm.value.aceite_cad,
      )
      console.log(this.stock);

      this.adraService.modificarAlimentosStock(this.stock, this.alm_id).subscribe(
        (data: any) => {
          this.toastr.success('Modificado correctamente', 'Stock Alimentos!');
          this.router.navigate(['/stock-alimentos/'])
        },
        err => {
          this.toastr.error('' + err.error.message, 'Stock Alimentos!');
          console.log(err);

        }
      )

    }

  }

}
