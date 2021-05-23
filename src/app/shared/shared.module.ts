import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceHolderDirective } from "./placeholder/placeholder.directive";

@NgModule({
    declarations:[
        LoadingSpinnerComponent,
        AlertComponent,
        DropdownDirective,
        PlaceHolderDirective
    ],
    imports:[
        CommonModule
    ],
    exports: [
        LoadingSpinnerComponent,
        AlertComponent,
        DropdownDirective,
        PlaceHolderDirective,
        CommonModule
    ]
})
export class SharedModule {}