import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'store';
import { User } from './models/user.model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  user$: Observable<User> = null!;
  private subscription$: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private store: Store,
    private router: Router
  ){}

  ngOnInit() {
    this.subscription$ = this.authService.auth$.subscribe();
    this.user$ = this.store.get('user');
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
