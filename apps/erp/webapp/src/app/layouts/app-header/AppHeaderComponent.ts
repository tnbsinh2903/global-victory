import { Component } from "@angular/core";
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  standalone: true,
  imports: [
    NzLayoutModule
  ],
  selector: "global-victory-header",
  templateUrl: "AppHeaderComponent.html",
})
export class AppHeaderComponent { }
