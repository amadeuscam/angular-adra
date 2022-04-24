import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  isLogged = false;
  isRegisterFail = false;
  nuevoUsuario!: NuevoUsuario;

  name: string | undefined;
  email: string | undefined;
  username: string | undefined;
  password: string | undefined;
  errMessage: string | undefined

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLogged = true;

    }
  }




  onRegister(): void {
    this.nuevoUsuario = new NuevoUsuario(this.name!, this.username!, this.email!, this.password!);

    this.authService.nuevo(this.nuevoUsuario).subscribe(
      data => {
        console.log(data);

        this.isLogged = true;
        this.isRegisterFail = false;
        this.router.navigate(["/login"]);
      },
      err => {
        this.isLogged = false;
        this.isRegisterFail = true;
        this.errMessage = err.error.response
        console.log(err);

      }
    )
  }

}
