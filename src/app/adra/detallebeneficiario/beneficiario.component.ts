import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-beneficiario',
  templateUrl: './beneficiario.component.html',
  styleUrls: ['./beneficiario.component.scss']
})
export class BeneficiarioComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute) {
  }

  ben_id: string = ''

  ngOnInit(): void {
    this.ben_id = this.activeRoute.snapshot.params['ben_id']
    console.log(this.activeRoute.snapshot.params['ben_id'])
  }

}
