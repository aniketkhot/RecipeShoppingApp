import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";
import { LoginGuardService } from "./auth.guard.login.service";

@NgModule({
  declarations: [AuthComponent],

  imports: [
    FormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: AuthComponent,
        canActivate: [LoginGuardService],
      },
    ]),
    SharedModule
  ],
})
export class AuthModule {

}


