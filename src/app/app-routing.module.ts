import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { AuthComponent } from "./auth/auth.component";
import { LoginGuardService } from "./auth/auth.guard.login.service";

const appRoutes: Routes = [
  { path: "", redirectTo: "/auth", pathMatch: "full" },
  
  
  {path: "auth", component: AuthComponent, canActivate:[LoginGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
