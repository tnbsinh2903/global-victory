import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzTypographyModule } from "ng-zorro-antd/typography";

@Component({
  standalone: true,
  imports: [NzTypographyModule, NzButtonModule, RouterModule],
  template: `
    <div
      style="position: relative; top: 30%; margin: auto; padding: 1rem; max-width: 420px;"
    >
      <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 0.5rem">
        <img src="/assets/logoGV.png" style="width: 18%" alt="" srcset="" />
        <h2 style="display: inline-block; transform: translateY(15%); color: #34A8CA" nz-typography>
          <span style="font-size: 90%;">Welcome Administrator</span>
          <!-- <span style="display: inline-block;">Global Victory VN</span> -->
        </h2>
      </div>

      <button
        [routerLink]="['/dashboard']"
        routerLinkActive="router-link-active"
        nzBlock
        nz-button
        nzType="primary"
        nzSize="large"
        nzShape="round"
      >
        Go to ERP
      </button>
    </div>
  `,
})
export class LobbyComponent { }
