import {Component, OnInit} from '@angular/core';
import {AdraService} from 'src/app/service/adra.service';
import {TokenService} from 'src/app/service/token.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-beneficiarios',
  templateUrl: './beneficiarios.component.html',
  styleUrls: ['./beneficiarios.component.scss']
})
export class BeneficiariosComponent implements OnInit {

  constructor(
    private adraService: AdraService,
    private tokenService: TokenService,
    private router: Router,
  ) {
  }

  beneficiarios_list: any[] = []
  isAdmin = false

  ngOnInit(): void {

    this.isAdmin = this.tokenService.getIsAdmin();
    this.beneficiarios_list = []
    this.adraService.getAllBeneficarios().subscribe(
      (data: any) => {
        console.log(data);
        this.beneficiarios_list = data['contenido']
        console.log(this.beneficiarios_list);

      },
      err => {

        console.log(err);

      }
    )
  }

  removeBeneficiar(e: any, id: any) {
    e.preventDefault()
    this.adraService.deleteBeneficiario(id).subscribe(
      (data: any) => {
        this.beneficiarios_list = this.beneficiarios_list.filter(item=> item.id !== id)
      },
      err => {
        console.log(err);
      }
    )
  }
}
