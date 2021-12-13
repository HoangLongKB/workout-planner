import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseError } from '@firebase/util';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onRegister(form: FormGroup) {
    if (!form.value) {
      return;
    }
    const { email, password } = form.value;
    this.authService.createUser(email, password).then(() => {
      this.router.navigate(['/']);
    }).catch((error: FirebaseError) => {
      this.registerError = 'Something when wrong, please try again later!'
    });

  }

}
