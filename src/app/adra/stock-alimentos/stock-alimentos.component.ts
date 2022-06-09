import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdraService } from 'src/app/service/adra.service';



@Component({
  selector: 'app-stock-alimentos',
  templateUrl: './stock-alimentos.component.html',
  styleUrls: ['./stock-alimentos.component.scss']
})
export class StockAlimentosComponent implements OnInit {

  stock_data: object = {}
  id_alm:undefined

  stock_alimentos_names: any = {
    alimento1: "Arroz Blanco",
    alimento2: "Alubia Cocida",
    alimento3: "Conserva Atun",
    alimento4: "Pasta Macarron",
    alimento5: "Tomate Frito",
    alimento6: "Galletas",
    alimento7: "Macedonia Verduras",
    alimento8: "Fruta Conserva",
    alimento9: "Cacao Soluble",
    alimento10: "Tarritos Pollo",
    alimento11: "Tarritos Fruta",
    alimento12: "Leche UHT",
    alimento13: "Aceite Oliva",
  }

  constructor(
    private adraService: AdraService,
    private toastr: ToastrService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }



  ngOnInit(): void {
    let vm = this;
    this.adraService.getAllStockAlimentos(1).subscribe(
      (data: any) => {
        // console.log(data);
        let count = 1
        vm.id_alm = data['response']['id']
        console.log(data['response']);
        for (let index = 1; index < 14; index++) {
          console.log(data['response']['alimento' + index]);
          console.log(data['response']['alimento' + index + '_cad']);
          console.log(index);

          Object.assign(vm.stock_data, {
            [this.stock_alimentos_names['alimento' + index]]: {
              quantity: data['response']['alimento' + index],
              cad: data['response']['alimento' + index + '_cad']
            },
          });



        }
        // this.stock_data = data['response']
        console.log(this.stock_data);

      },
      err => {
        console.log(err);

      }
    )
  }

}
