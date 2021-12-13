import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseError } from '@firebase/util';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onLogin(login: FormGroup) {
    if (!login.value) {
      return;
    }
    const { email, password } = login.value;
    this.authService.login(email, password)
      .then(() => {
        this.router.navigate(['/']);
      }
      )
      .catch((err: FirebaseError ) => {
        this.loginError = 'Email or Password not correct!';
      });
  }

}
