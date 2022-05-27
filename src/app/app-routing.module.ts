import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddBeneficiariosComponent} from './adra/add-beneficiarios/add-beneficiarios.component';
import {BeneficiarioComponent} from './adra/detallebeneficiario/beneficiario.component';
import {BeneficiariosComponent} from './adra/listBeneficiarios/beneficiarios.component';
import {LoginComponent} from './auth/login.component';
import {RegistroComponent} from './auth/registro.component';
import {ChangePasswordComponent} from './changepassword/change-password.component';
import {SendMailComponent} from './changepassword/send-mail/send-mail.component';
import {BenGuardService as guard} from './guards/ben-guard.service';
import {IndexComponent} from './index/index.component';
import {MainComponentComponent} from './main/main-component.component';
import {AddAlimentosComponent} from "./adra/add-alimentos/add-alimentos.component";
import {AddFamiliarComponent} from "./adra/add-familiar/add-familiar.component";


const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sendemail',
    component: SendMailComponent
  },
  {
    path: 'change-password/:tokenPassword',
    component: ChangePasswordComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'beneficiarios',
    component: BeneficiariosComponent
  },


  {
    path: '', component: MainComponentComponent,
    children: [

      {
        path: '', component: IndexComponent,
        canActivate: [guard],
        data: {
          expectedRol: ["admin", "user"]
        }
      },
      {
        path: 'detail-beneficiario/:ben_id',
        component: BeneficiarioComponent,
        canActivate: [guard],
        data: {
          expectedRol: ["admin"]
        }
      },
      {
        path: 'add-beneficiario',
        component: AddBeneficiariosComponent,
        canActivate: [guard],
        data: {
          expectedRol: ["admin"]
        }
      },
      {
        path: 'add-alimentos/:ben_id',
        component: AddAlimentosComponent,
        canActivate: [guard],
        data: {
          expectedRol: ["admin"]
        }
      },
      {
        path: 'add-familiar/:ben_id',
        component: AddFamiliarComponent,
        canActivate: [guard],
        data: {
          expectedRol: ["admin"]
        }
      },
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
