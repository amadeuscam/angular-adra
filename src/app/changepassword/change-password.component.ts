import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordDTO } from '../models/change-password-dto';
import { EmailPasswordService } from '../service/email-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  dto!: ChangePasswordDTO;
  password!: string
  confirmPassword!: string
  tokenPassword!: string
  errMessage: string | undefined
  hasErrors: boolean = false
  isSentOk: boolean = false

  constructor(
    private emailPasswordService: EmailPasswordService,
    private router: Router,
    private activeRoute: ActivatedRoute

  ) { }

  ngOnInit(): void {

  }


  onChangePassword() {
    if (this.password !== this.confirmPassword) {
      this.hasErrors = true
      this.errMessage = "Las contraseñas no coinciden"
      return;
    } else {
      this.hasErrors = false
    }

    this.tokenPassword = this.activeRoute.snapshot.params['tokenPassword'];
    console.log(this.tokenPassword);

    this.dto = new ChangePasswordDTO(this.password, this.confirmPassword, this.tokenPassword)
    this.emailPasswordService.changePassword(this.dto).subscribe(
      data => {
        // this.isLoginFail = false
        this.isSentOk = true
        this.router.navigate(["/login"])
      },
      err => {
        this.isSentOk = false
        // this.isLoginFail = true
        // this.emailok = false
        // console.log(err);

        this.errMessage = err.error.response
      }
    );
  }
}
