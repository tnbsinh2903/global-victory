import { Component } from "@angular/core";
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  standalone: true,
  imports: [
    NzLayoutModule
  ],
  selector: "global-victory-header",
  template: `
    <nz-header>
      <div class="logo">
        <img style="width: 60px;" src="./assets/logoGV.png"/>
      </div>

      <div>
        
      </div>
    </nz-header>
  `,
})
export class AppHeaderComponent {}
