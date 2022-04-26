import { Component, OnInit } from '@angular/core';
import { AdraService } from 'src/app/service/adra.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-beneficiarios',
  templateUrl: './beneficiarios.component.html',
  styleUrls: ['./beneficiarios.component.scss']
})
export class BeneficiariosComponent implements OnInit {

  constructor(
    private adraService: AdraService,
    private tokenService: TokenService
  ) { }

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

}
