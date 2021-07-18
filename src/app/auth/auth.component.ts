import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";
import * as fromApp from "src/app/store/app.reducer"
import { Store } from "@ngrx/store";
import * as AuthActions from "../auth/store/auth.actions"

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnDestroy, OnInit {
  isSignUp: boolean = false;
  isloading: boolean = false;
  error: string = null;

  private closeSub: Subscription;
  private StoreSub = new Subscription();

  @ViewChild(PlaceHolderDirective, { static: false })
  alertHost: PlaceHolderDirective;

  ngOnInit() {
    
    this.StoreSub = this.store.select("auth").subscribe( authData => {
      this.error = authData.errorMsg;
      this.isloading = authData.loading;
      if(authData.errorMsg) {
        this.showError(authData.errorMsg)
      }
    })
  }

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store:Store<fromApp.AppState>
    ) {}
    
    
  onSwitchForm() {
    this.isSignUp = !this.isSignUp;
  }

  onSubmit(authform: NgForm) {
    if (!authform.valid) {
      return;
    }

    const email = authform.value.email;
    const password = authform.value.password;
    let authObs: Observable<AuthResponseData>;
    if (this.isSignUp) {
      // authObs = this.authService.signUp(email, password);
      this.store.dispatch(new AuthActions.SignupStart({email:email, password:password}))
    } else {
      // authObs = this.authService.LogIn(email, password);
      console.log("above efffect dispatch")
      this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}));
      
    }

    authform.reset();
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());  
  }

  private showError(message: string) {
    const alertCompFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const alertComptRef = this.alertHost.viewContainerRef;
    alertComptRef.clear();
    const alertComp = alertComptRef.createComponent(alertCompFactory);
    alertComp.instance.message = message;
    this.closeSub = alertComp.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      alertComptRef.clear();
    });
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if(this.StoreSub) {
      this.StoreSub.unsubscribe();
    }
  }
}
