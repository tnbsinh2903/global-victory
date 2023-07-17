import { Component, OnInit } from '@angular/core';
import { User_InfoDetailDTO } from 'libs/erp/api-interfaces/src/modules/users/UserDTOs';
import { HOST_API } from 'libs/erp/api-interfaces/src/modules/api-service/APIService';
import { UserService } from '../user-service/UserService';

@Component({
  selector: "global-victory-user-details",
  templateUrl: './UserDetailsComponent.html',
  styleUrls: ["./UserDetailsComponent.css"]
})
export class UserDetailsComponent implements OnInit {

  loading: boolean = false;
  errorMessage!: string;
  userDetail: User_InfoDetailDTO = {} as User_InfoDetailDTO;
  host_api = HOST_API;
  isVisible =   false;

  constructor(private readonly userService: UserService) { }

  ngOnInit() {
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showUserDetail(email: string) {
      this.loading = true;
      this.userService.getUserByEmail(email).subscribe(user => {
        this.userDetail = user;
        this.loading = false;
      }, (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
      )
      this.isVisible = true;
  }

  isNotEmpty() {
    return Object.keys(this.userDetail).length > 0;
  }

  close(): void {
    this.isVisible = false;
  };
}