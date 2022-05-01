import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmailValuesDTO } from '../models/email-values-dto';
import { ChangePasswordDTO } from '../models/change-password-dto';

@Injectable({
  providedIn: 'root'
})
export class EmailPasswordService {

  changePasswordUrl = environment.changePasswordUrl;

  constructor(
    private http: HttpClient
  ) { }

  public sendEmail(dto: EmailValuesDTO): Observable<any> {
    return this.http.post<any>(this.changePasswordUrl + "send-email", dto);

  }

  public changePassword(dto: ChangePasswordDTO): Observable<any> {
    return this.http.post<any>(this.changePasswordUrl + "change-password", dto);

  }

}
