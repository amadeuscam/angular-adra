import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Beneficiario} from "../models/beneficiario";
import {Alimentos} from "../models/alimentos";

@Injectable({
  providedIn: 'root'
})
export class AdraService {

  constructor(private http: HttpClient) {
  }

  benUrl = environment.benUrl

  public getAllBeneficarios(): Observable<any> {
    return this.http.get<any>(this.benUrl + "beneficiarios")
  }

  public addBeneficiario(beneficiario: Beneficiario): Observable<any> {
    return this.http.post<any>(this.benUrl + "beneficiarios", beneficiario)
  }

  public anadirAlimentos(alimentos: Alimentos, id: number): Observable<any> {
    return this.http.post<any>(this.benUrl + `beneficiarios/${id}/alimentos`, alimentos)
  }

}
