import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdraService } from 'src/app/service/adra.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  statisticas_benefiricarios: any = {}

  constructor(
    private adraService: AdraService,
    private toastr: ToastrService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.adraService.getAllBeneficiarioEstatisticas().subscribe(
      (data: any) => {
        console.log(data);
        this.statisticas_benefiricarios = data


      },
      err => {
        console.log(err);

      }
    )

  }

  generateExcelBeneficarios(e: any) {
    e.preventDefault()
    this.adraService.getBeneficiariosExcel().subscribe(
      (data: any) => {
        console.log(data)
        let blob = new Blob([data], {
          // type: 'application/pdf' // must match the Accept type
          type: 'application/octet-stream' // for excel
        });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'beneficarios.xlsx';
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
