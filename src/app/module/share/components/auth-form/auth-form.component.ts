import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {

  @Input()
  isRegister: boolean = false;

  @Output()
  submit: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  password_confirm: string = '';
  constructor(private fb: FormBuilder) { }

  form = this.fb.group(
    {
      email: ['', [Validators.email]],
      password: ['', [Validators.required]]
    }
  )

  ngOnInit(): void {
  }

  get isPasswordEmpty() {
    const control = this.form.get('password');
    return control?.hasError('required') && control.touched;
  }

  get isPasswordMatch() {
    const controlPassword = this.form.get('password');
    return controlPassword?.value === this.password_confirm;
  }

  get isEmailInvalid() {
    const control = this.form.get('email');
    return control?.hasError('email') && control.touched;
  }

  onSubmit() {
    if (this.isRegister && !this.isPasswordMatch) {
      return;
    }

    if (this.form.valid && this.form ) {
      this.submit.emit(this.form);
    }
  }
  onPasswordConfirmInput(event: Event) {
    this.password_confirm = (event.target as HTMLInputElement)?.value;
  }

}
