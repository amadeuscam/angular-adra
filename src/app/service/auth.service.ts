import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDTO } from '../models/jwt-dto';
import { LoginUsuario } from '../models/login-usuario';
import { NuevoUsuario } from '../models/nuevo-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = "http://localhost:8080/api/v1/auth/"

  constructor(private http: HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.http.post<any>(this.authUrl + "register", nuevoUsuario)
  }

  public login(loginUser: LoginUsuario): Observable<JwtDTO> {
    return this.http.post<any>(this.authUrl + "login", loginUser)
  }

}
