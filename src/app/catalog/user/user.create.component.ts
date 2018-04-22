import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';


@Component({
  selector: 'user-create',
  templateUrl: './user.create.html',
  styleUrls: ['./user.create.css']
})
export class UserCreateComponent {
  public user: any = {};
  public usertypes: Array<any> = [];
  public resMessage: string;
  public isSubmited:boolean;

  constructor(private route: ActivatedRoute, private router: Router, private _userService: UserService) { }

  ngOnInit() {
    this.usertypes = [{ name: 'Admin', value: "admin" }, { name: "General", value: "general" }];
    this.user.usertype = "admin";
  }

  signup(user) {
    this._userService.signup(this.user).subscribe(out => {
      if (out._id) {
        this.user = { usertype: "admin" };
        this.resMessage = "User created successfully";
        setTimeout(() => {
          this.resMessage = '';
        }, 2000)
      } else {
        this.resMessage = out.message;
        setTimeout(() => {
          this.resMessage = '';
        }, 2000)
      }
    })
  }

}
