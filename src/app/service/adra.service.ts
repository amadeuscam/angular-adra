import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Alimentos } from "../models/alimentos";
import { Beneficiario } from "../models/beneficiario";
import { Familiares } from "../models/familiares";
import { StockAlimentos } from '../models/stockAlimentos';



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
    return this.http.get(this.benUrl + `hoja-entrega/${ben_id}`, { responseType: 'blob' })
  }

  public getValoracionSocial(ben_id: string): any {
    return this.http.get(this.benUrl + `valoracion-social/${ben_id}`, { responseType: 'blob' })
  }


  public modificarAlimentosStock(alimentos: StockAlimentos, id: number): Observable<any> {
    console.log(alimentos);

    return this.http.put<any>(this.benUrl + `stock-alimentos/${id}`, alimentos)
  }

  public getAllStockAlimentos(id: number): Observable<any> {
    return this.http.get<any>(this.benUrl + `stock-alimentos/${id}`)
  }

  public getAllBeneficiarioEstatisticas(): Observable<any> {
    return this.http.get<any>(this.benUrl + `beneficiarios/estatisticas`)
  }

  public getBeneficiariosExcel(): any {
    return this.http.get(this.benUrl + `beneficarios-excel`, { responseType: 'blob' })
  }




}
