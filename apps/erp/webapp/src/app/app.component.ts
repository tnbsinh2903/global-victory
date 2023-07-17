import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: "global-victory-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = "Global Victory - ERP";
}
