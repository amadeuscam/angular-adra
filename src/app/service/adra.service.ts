import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdraService {
  
  constructor(private http: HttpClient) { }

  benUrl = environment.benUrl

  public getAllBeneficarios(): Observable<any> {
    return this.http.get<any>(this.benUrl + "beneficiarios")
  }
}
