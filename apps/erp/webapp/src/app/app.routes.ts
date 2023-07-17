import { Route } from "@angular/router";
import { AppLayoutComponent } from "./layouts/app-layout/AppLayoutComponent";
import { LobbyComponent } from "./lobby/LobbyComponent";
import { PageNotFoundComponent } from "./404/PageNotFoundComponent";
import { AuthGuard } from "./guard/AuthGuard";
import { PermissionGuard } from "./guard/PermissionGuard";

export const appRoutes: Route[] = [
  {
    path: "",
    component: LobbyComponent,
  },
  {
    path: "sign-in",
    loadChildren: () => import("./auth/AuthModule").then((m) => m.AuthModule),
  },
  {
    path: "",
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./modules/dashboard/DashboardModule").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "user-management",
        canActivate: [PermissionGuard],
        data: { permission: "@Permission/User/View", next_url: "role-management" },
        loadChildren: () =>
          import("./modules/user-management/UserManagementModule").then(
            (m) => m.UserManagementModule
          ),
      },
      {
        path: "permission-management",
        canActivate: [PermissionGuard],
        data: { permission: "@Permission/Role/View" },
        loadChildren: () =>
          import("./modules/permission-management/PermissionManagementModule").then(
            (m) => m.PermissionManagementModule
          ),
      },
      {
        path: "role-management",
        canActivate: [PermissionGuard],
        data: { permission: "@Permission/Role/View" },
        loadChildren: () =>
          import("./modules/roles-management/RolesManagementModule").then(
            (m) => m.RolesManagementModule
          ),
      },
      {
        path: "news-management",
        canActivate: [PermissionGuard],
        data: { permission: "@Permission/News/View", next_url: "banner-management" },
        loadChildren: () =>
          import("./modules/news-management/NewsManagementModule").then(
            (m) => m.NewsManagementModule
          ),
      },
      {
        path: "banner-management",
        canActivate: [PermissionGuard],
        data: { permission: "@Permission/Banner/View", next_url: "product-management" },
        loadChildren: () =>
          import("./modules/banner-management/BannerManagementModule").then(
            (m) => m.BannerManagementModule
          ),
      },
      {
        path: "product-management",
        canActivate: [PermissionGuard],
        data: { permission: "@Permission/Product/View", next_url: "user-management" },
        loadChildren: () =>
          import("./modules/product-management/ProductManagementModule").then(
            (m) => m.ProductManagementModule
          ),
      },

    ],
  },
  {
    path: "**", pathMatch: 'full',
    component: PageNotFoundComponent,
  },
];
