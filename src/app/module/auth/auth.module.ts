import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// FireBase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FirebaseOptions } from '@firebase/app';
import { ShareModule } from 'src/app/share/module/share.module';

const firebaseAppConfig: FirebaseOptions = {
  apiKey: "AIzaSyBuSjz__EFErEHLbovc23RP6JkPivyjHR0",
  authDomain: "workout-planner-kb.firebaseapp.com",
  databaseURL: "https://workout-planner-kb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "workout-planner-kb",
  storageBucket: "workout-planner-kb.appspot.com",
  messagingSenderId: "654141871667",
  appId: "1:654141871667:web:0854bad24d707829553546",
  measurementId: "${config.measurementId}"

};

const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
      }
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ShareModule.forRoot()
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule { }
