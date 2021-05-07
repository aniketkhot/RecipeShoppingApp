import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent {
  isSignUp: boolean = false;
  isloading: boolean = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchForm() {
    this.isSignUp = !this.isSignUp;
  }

  onSubmit(authform: NgForm) {
    if(!authform.valid) {return}

    const email = authform.value.email;
    const password = authform.value.password;
    let authObs: Observable<AuthResponseData>
    this.isloading = true;
    this.error = null;
    if (this.isSignUp) {
      authObs= this.authService.signUp(email, password);
    } else {
      authObs= this.authService.LogIn(email, password);
    }

    authObs.subscribe(
      (res) => {
        console.log('in respose in login sub');
        console.log(res);
        this.isloading = false;
        this.router.navigate(['recipes']);

      },
      (errorMessage) => {
        console.log('in error');
        this.error = errorMessage;
        this.isloading = false;
      }
    )

    authform.reset();
  }
}
