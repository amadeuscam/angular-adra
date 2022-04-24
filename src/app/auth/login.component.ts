import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from '../models/login-usuario';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUsuario!: LoginUsuario;

  username: string | undefined;
  password: string | undefined;
  roles: string[] = []
  errMessage: string | undefined

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities()
    }


  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.username!, this.password!);

    this.authService.login(this.loginUsuario).subscribe(
      data => {
        console.log(data);

        this.isLogged = true;
        this.isLoginFail = false;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.userName)
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities
        this.router.navigate(["/"]);
      },
      err => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.errMessage = err.error.message
        console.log(err);

      }
    )
  }




}
