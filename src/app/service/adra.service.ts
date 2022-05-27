import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Beneficiario} from "../models/beneficiario";
import {Alimentos} from "../models/alimentos";
import {Familiares} from "../models/familiares";


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

  public getBeneficarios(id: string): Observable<any> {
    return this.http.get<any>(this.benUrl + `beneficiarios/${id}`)
  }

  public addBeneficiario(beneficiario: Beneficiario): Observable<any> {
    return this.http.post<any>(this.benUrl + "beneficiarios", beneficiario)
  }

  public updateBeneficiario(beneficiario: Beneficiario, id: string): Observable<any> {
    return this.http.put<any>(this.benUrl + `beneficiarios/${id}`, beneficiario)
  }

  public deleteBeneficiario(id: string): Observable<any> {
    return this.http.delete<any>(this.benUrl + `beneficiarios/${id}`)
  }

  public anadirAlimentos(alimentos: Alimentos, id: string): Observable<any> {
    return this.http.post<any>(this.benUrl + `beneficiarios/${id}/alimentos`, alimentos)
  }

  public updateAlimento(alimentos: Alimentos, ben_id: string, alm_id: string): Observable<any> {
    return this.http.put<any>(this.benUrl + `beneficiarios/${ben_id}/alimentos/${alm_id}`, alimentos)
  }

  public getAlimentos(ben_id: string, alm_id: string): Observable<any> {
    return this.http.get<any>(this.benUrl + `beneficiarios/${ben_id}/alimentos/${alm_id}`)
  }

  public deleteAlimento(ben_id: string, alm_id: string): Observable<any> {
    return this.http.delete<any>(this.benUrl + `beneficiarios/${ben_id}/alimentos/${alm_id}`)
  }


  public getFamiliar(ben_id: string, fam_id: string): Observable<any> {
    return this.http.get<any>(this.benUrl + `beneficiarios/${ben_id}/familiares/${fam_id}`)
  }

  public anadirFamiliar(familiar: Familiares, id: string): Observable<any> {
    return this.http.post<any>(this.benUrl + `beneficiarios/${id}/familiares`, familiar)
  }

  public updateFamiliar(familiar: Familiares, ben_id: string, fam_id: string): Observable<any> {
    return this.http.put<any>(this.benUrl + `beneficiarios/${ben_id}/familiares/${fam_id}`, familiar)
  }

  public deleteFamiliar(ben_id: string, fam_id: string): Observable<any> {
    return this.http.delete<any>(this.benUrl + `beneficiarios/${ben_id}/familiares/${fam_id}`)
  }

  public getHojaEntrega(ben_id: string): any {
    // let headerOptions = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   // 'Accept': 'application/pdf',
    //
    //   'Accept': 'application/octet-stream', // for excel file
    // });
    // let requestOptions = {headers: headerOptions, responseType: 'blob' as 'blob'};
    //
    // const headers = new Headers({
    //   'Content-Type': 'application/json',
    //   responseType: 'blob'
    // });

    // return this.http.post<any>(this.benUrl + `hoja-entrega/${ben_id}`, requestOptions)
    return this.http.get(this.benUrl + `hoja-entrega/${ben_id}`, {responseType: 'blob'})
  }

  public getValoracionSocial(ben_id: string): any {
    // let headerOptions = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   // 'Accept': 'application/pdf',
    //
    //   'Accept': 'application/octet-stream', // for excel file
    // });
    // let requestOptions = {headers: headerOptions, responseType: 'blob' as 'blob'};
    //
    // const headers = new Headers({
    //   'Content-Type': 'application/json',
    //   responseType: 'blob'
    // });

    // return this.http.post<any>(this.benUrl + `hoja-entrega/${ben_id}`, requestOptions)
    return this.http.get(this.benUrl + `valoracion-social/${ben_id}`, {responseType: 'blob'})
  }


}
