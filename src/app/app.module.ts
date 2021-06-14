import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";


import { AppRoutingModule } from "./app-routing.module";
import { RecipeService } from "./recipes/recipe.service";
import { AuthInterceptorService } from "./auth/auth.interceptor.service";
import { SharedModule } from "./shared/shared.module";
import { StoreModule } from "@ngrx/store";
import * as fromRoot from "./store/app.reducer"

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot(fromRoot.appReducers),
  ],
  providers: [

    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
