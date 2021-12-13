import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from 'src/app/module/share/components/auth-form/auth-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';



@NgModule({
  declarations: [AuthFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    AuthFormComponent
  ]
})
export class ShareModule {
  static forRoot(): ModuleWithProviders<ShareModule> {
    return {
      ngModule: ShareModule,
      providers: [
        AuthService
      ]
    }
  }
}
