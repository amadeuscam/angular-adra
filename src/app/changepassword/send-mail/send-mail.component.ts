import { Component, OnInit } from '@angular/core';
import { EmailValuesDTO } from 'src/app/models/email-values-dto';
import { EmailPasswordService } from 'src/app/service/email-password.service';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.scss']
})
export class SendMailComponent implements OnInit {

  dto!: EmailValuesDTO
  mailTo!: string
  errMessage: string | undefined
  isLoginFail: boolean | undefined
  emailok:boolean = false

  constructor(
    private emailPasswordService: EmailPasswordService
  ) { }



  ngOnInit(): void {

  }


  onSendEmail(): void {
    this.dto = new EmailValuesDTO(this.mailTo);
    this.emailPasswordService.sendEmail(this.dto).subscribe(
      data => {
        this.isLoginFail = false
        this.emailok = true
      },
      err => {
        this.isLoginFail = true
        this.emailok = false
        console.log(err);
        
        this.errMessage = err.error.response
      }
    );
  }

}
