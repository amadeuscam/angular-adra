import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeneficiarioComponent } from './adra/detallebeneficiario/beneficiario.component';
import { BeneficiariosComponent } from './adra/listBeneficiarios/beneficiarios.component';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { BenGuardService as guard } from './guards/ben-guard.service';
import { IndexComponent } from './index/index.component';
import { MainComponentComponent } from './main/main-component.component';


const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent

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
    path: '', component: MainComponentComponent ,
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
          expectedRol: ["admin", "user"]
        }
      },
    ]
  }






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
