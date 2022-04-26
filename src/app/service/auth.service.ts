import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDTO } from '../models/jwt-dto';
import { LoginUsuario } from '../models/login-usuario';
import { NuevoUsuario } from '../models/nuevo-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = environment.authUrl;

  constructor(private http: HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.http.post<any>(this.authUrl + "register", nuevoUsuario)
  }

  public login(loginUser: LoginUsuario): Observable<JwtDTO> {
    return this.http.post<any>(this.authUrl + "login", loginUser)
  }

  public refresh(dto: JwtDTO): Observable<JwtDTO> {
    return this.http.post<any>(this.authUrl + "refresh", dto)
  }

}
