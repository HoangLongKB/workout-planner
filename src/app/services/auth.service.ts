import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { tap } from 'rxjs';
import { Store } from 'store';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  authState: any;
  constructor(private af: AngularFireAuth, private store: Store) {}

  auth$ = this.af.authState.pipe(
    tap((next) => {
      this.authState = next;
      if (!next) {
        this.store.set('user', null!);
        return;
      }
      this.store.set('user', {
        email: next.email,
        uid: next.uid,
        authenticated: true,
      } as User);
    })
  );

  createUser(email: string, password: string) {
    return this.af.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.af.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.af.signOut();
  }

  get authState$() {
    return this.af.authState;
  }

  getAuthState() {
    return this.authState;
  }
}
