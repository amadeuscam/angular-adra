import { Component, OnInit } from '@angular/core';
import {TokenService} from "../service/token.service";

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss']
})
export class MainComponentComponent implements OnInit {


  isLogged = false
  username = ''

  constructor( private tokenService: TokenService) {}



  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLogged = this.tokenService.isLogged();
      console.log(this.tokenService.getUserName()!);

      this.username = this.tokenService.getUserName()!
      console.log(this.tokenService.getUserName())
    } else {
      this.isLogged = false
    }
  }

  onLogout() {
    this.tokenService.logOut();
    // window.location.reload();
  }

}
