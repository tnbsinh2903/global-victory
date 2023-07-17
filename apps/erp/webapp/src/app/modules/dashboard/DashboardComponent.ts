// import { Component, OnInit } from "@angular/core";
// import { RoleService } from "../roles-management/role-service/RoleService";
// import { Router } from "@angular/router";

// @Component({
//     templateUrl: './DashboardComponent.html',
//     styleUrls: ['./DashboardComponent.css'],
// })
// export class DashboardComponent implements OnInit {

//     news: boolean = false;
//     newsCount: number = 10;
//     product: boolean = false;
//     productCount: number = 10;
//     banner: boolean = false;
//     bannerCount: number = 10;
//     user: boolean = false;
//     userCount: number = 10;
//     role: boolean = false;

//     constructor(
//         private roleService: RoleService,
//         private router : Router,
//         ) { }
//     ngOnInit(): void {
//         const { user } = JSON.parse(localStorage.getItem('authState') || '{}');
//         this.roleService.getPermissionOfUserByEmail(user.email).subscribe((res) => {
//             if (res.includes('@Permission/User/View')) {
//                 this.user = true;
//             }
//             if (res.includes('@Permission/Banner/View')) {
//                 this.banner = true;
//             }
//             if (res.includes('@Permission/Product/View')) {
//                 this.product = true;
//             }
//             if (res.includes('@Permission/News/View')) {
//                 this.news = true;
//             }
//             if (res.includes('@Permission/Role/View')) {
//                 this.role = true;
//             }
//         });
//     }

//     formatOne = (percent: number): string => `${percent} Days`;
//     formatTwo = (): string => `Done`;

//     handleUserManagement(): void {
//         this.router.navigateByUrl('user-management')
//     }
//     handleNewsManagement(): void {
//         this.router.navigateByUrl('news-management')
//     }
//     handleProductManagement(): void {
//         this.router.navigateByUrl('product-management')
//     }
//     handleBannerManagement(): void {
//         this.router.navigateByUrl('banner-management')
//     }
//     handleRoleManagement(): void {
//         this.router.navigateByUrl('role-management')
//     }
// }