import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/components/auth/login/login.component';
import { ShareModule } from 'src/app/share/module/share.module';


const ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent
  }
]

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ShareModule
  ],
})
export class LoginModule { }
