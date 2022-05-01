import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-beneficiarios',
  templateUrl: './add-beneficiarios.component.html',
  styleUrls: ['./add-beneficiarios.component.scss']
})
export class AddBeneficiariosComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }
  myForm!: FormGroup

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  addBeneficiario() {

  }

}
