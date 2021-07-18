import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import * as FromRoot from 'src/app/store/app.reducer';
import * as AuthActions from './auth/store/auth.actions'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private store: Store<FromRoot.AppState>) {}

  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLogin())
  }
}
