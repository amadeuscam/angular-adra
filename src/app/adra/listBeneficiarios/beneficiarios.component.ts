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
  roles: string[] | undefined;
  isAdmin = false

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();

    this.roles.forEach(rol => {
      if (rol === "ROLE_ADMIN") {
        this.isAdmin = true;
      }
    })


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
