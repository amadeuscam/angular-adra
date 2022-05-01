import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-alimentos',
  templateUrl: './add-alimentos.component.html',
  styleUrls: ['./add-alimentos.component.scss']
})
export class AddAlimentosComponent implements OnInit {

  myForm!: FormGroup
  
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  addAlimentos(){
    
  }

}
