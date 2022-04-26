import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = "AuthToken";


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor(
    private router: Router
  ) { }

  public setToken(token: string): void {
    console.log("set", token);

    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    console.log(TOKEN_KEY);
    return localStorage.getItem(TOKEN_KEY)!;
  }


  public isLogged(): boolean {

    if (this.getToken()) {
      return true
    }
    return false
  }

  public decodedToken() {
    const token = this.getToken()
    if (token) {
      const payload = token.split(".")[1];
      const payloadDecoded = atob(payload);


      return JSON.parse(payloadDecoded);
    }
    return null

  }


  public getUserName() {


    const values: any = this.decodedToken()
    const username = values.sub;
    console.log(username);

    return username;
  }


  public getIsAdmin(): boolean {
    const values: any = this.decodedToken()


    if (values && values['roles'].indexOf("ROLE_ADMIN") < 0) {
      return false
    }
    return true;

  }


  public logOut(): void {
    window.localStorage.clear();
    this.router.navigate(["/login"])
  }

}
