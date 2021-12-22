import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from 'src/app/components/auth/register/register.component';
import { ShareModule } from 'src/app/share/module/share.module';


const ROUTES: Routes = [
  {
    path: '',
    component: RegisterComponent
  }
]

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(ROUTES),
  ]
})
export class RegisterModule { }
