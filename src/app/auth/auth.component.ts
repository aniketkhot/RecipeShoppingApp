import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnDestroy {
  isSignUp: boolean = false;
  isloading: boolean = false;
  error: string = null;

  private closeSub : Subscription;

  @ViewChild(PlaceHolderDirective,{static: false}) alertHost: PlaceHolderDirective; 

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {}

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
		this.showError(errorMessage);
		this.isloading = false;
	  }
	)

	authform.reset();
  }

  onHandleError() {
	this.error = null;
  }

  private showError(message: string) {
	
	const alertCompFactory= this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
	const alertComptRef = this.alertHost.viewContainerRef;
	alertComptRef.clear();
	const alertComp = alertComptRef.createComponent(alertCompFactory);
	alertComp.instance.message = message;
	this.closeSub = alertComp.instance.close.subscribe(()=> {
	  this.closeSub.unsubscribe();
	  alertComptRef.clear();
	});

  }


  ngOnDestroy() {
  
	if(this.closeSub) {
	  this.closeSub.unsubscribe();
	}
  
  }
}
