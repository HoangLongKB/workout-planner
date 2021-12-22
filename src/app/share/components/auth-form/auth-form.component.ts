import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  @Input()
  isRegister: boolean = false;

  @Output()
  submit: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder) {}

  form = this.fb.group({
    email: ['', [Validators.email]],
    password: ['', [Validators.required]],
    password_confirm: [''],
  });

  ngOnInit(): void {}

  get isPasswordEmpty() {
    const control = this.form.get('password');
    return control?.hasError('required') && control.touched;
  }

  get isPasswordMatch() {
    const controlPassword = this.form.get('password');
    const controlPasswordConfirm = this.form.get('password_confirm');
    return (
      controlPassword?.value === controlPasswordConfirm?.value &&
      controlPassword?.touched &&
      controlPasswordConfirm?.touched
    );
  }

  get isPasswordConfirmTouched() {
    return this.form.get('password_confirm')?.touched;
  }

  get isEmailInvalid() {
    const control = this.form.get('email');
    return control?.hasError('email') && control.touched;
  }

  onSubmit() {
    if (this.isRegister && !this.isPasswordMatch) {
      return;
    }
    if (this.form.valid && this.form) {
      this.submit.emit(this.form);
    }
  }
}
