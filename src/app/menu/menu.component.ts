import {Component, Inject, OnInit} from '@angular/core';
import {TokenService} from '../service/token.service';
import {DOCUMENT} from '@angular/common';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isLogged = false
  username = ''

  constructor(
    private tokenService: TokenService
  ) {
  }

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
