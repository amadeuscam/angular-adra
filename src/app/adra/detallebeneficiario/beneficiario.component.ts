import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AdraService} from "../../service/adra.service";

@Component({
  selector: 'app-beneficiario',
  templateUrl: './beneficiario.component.html',
  styleUrls: ['./beneficiario.component.scss']
})
export class BeneficiarioComponent implements OnInit {

  constructor(
    private activeRoute: ActivatedRoute,
    private adraService: AdraService,
  ) {
  }

  ben_id: string = ''
  ben_info: any = {}
  tab_color = "#000"

  ngOnInit(): void {
    // this.ben_id = this.activeRoute.snapshot.params['ben_id']
    // this.ben_id= this.activeRoute.params['ben_id']
    this.activeRoute.params.subscribe(paramsId => {
      this.ben_id = paramsId['ben_id'];
      console.log(this.ben_id);
    });
    console.log(this.activeRoute.snapshot.params['ben_id'])
    this.adraService.getBeneficarios(this.ben_id).subscribe(
      (data: any) => {
        console.log(data);
        this.ben_info = data
      },
      err => {

        console.log(err);

      }
    )
  }

  removeFamiliar(e: any, ben_id: string, fam_id: string) {
    e.preventDefault()
    this.adraService.deleteFamiliar(ben_id, fam_id).subscribe(
      (data: any) => {
        this.ben_info['familiares'] = this.ben_info['familiares'].filter((item: any) => item.id !== fam_id)
      },
      err => {
        console.log(err);
      }
    )
  }

  removeAlimento(e: any, ben_id: string, alm_id: string) {
    e.preventDefault()
    this.adraService.deleteAlimento(ben_id, alm_id).subscribe(
      (data: any) => {
        this.ben_info['alimentos'] = this.ben_info['alimentos'].filter((item: any) => item.id !== alm_id)
      },
      err => {
        console.log(err);
      }
    )
  }

  generateHojaEntrega(e: any, ben_id: string) {
    e.preventDefault()
    this.adraService.getHojaEntrega(ben_id).subscribe(
      (data: any) => {
        console.log(data)
        let blob = new Blob([data], {
          type: 'application/pdf' // must match the Accept type
          // type: 'application/octet-stream' // for excel
        });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${this.ben_info['numeroadra']}.pdf`;
        link.target = '_blank';
        link.click();
        window.URL.revokeObjectURL(link.href);

      },
      // err => {
      //   console.log(err);
      // }
    )
  }

  generateValoracionSocial(e: any, ben_id: string) {
    e.preventDefault()
    this.adraService.getValoracionSocial(ben_id).subscribe(
      (data: any) => {
        console.log(data)
        let blob = new Blob([data], {
          // type: 'application/pdf' // must match the Accept type
          type: 'application/octet-stream' // for excel
        });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${this.ben_info['numeroadra']}.docx`;
        link.target = '_blank';
        link.click();
        window.URL.revokeObjectURL(link.href);

      },
      // err => {
      //   console.log(err);
      // }
    )
  }


}
