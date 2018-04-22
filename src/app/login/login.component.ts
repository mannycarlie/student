import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Routes } from '@angular/router';

import { LoginService } from "./login.service";

@Component({
    selector: 'login',
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})
export class LoginComponent {

    public loginMessage: string;
    public user: any = {};
    public selected_type: string;

    // public user_types: Array<any> = [
    //     { name: "General", val: 'general' },
    //     { name: "Admin", val: 'admin' },
    // ];

    // isAuthenticate: boolean = false;
    // allItems: any = [];
    // rootParent: any = {};
    // arrangedItems: any = {};
    // menuPermission: any = [];


    constructor(private loginService: LoginService, private router: Router) { }

    ngOnInit() {
        this.user.type = "general";
        // let token = window.localStorage.getItem('auth_key');
        // let menu_permission = window.localStorage.getItem('menu_permission');
        // let languages = JSON.parse(window.localStorage.getItem('languages'));
        // let menu = window.localStorage.getItem('menu');

        // let isLoggedIn = token && token != '' && menu_permission && menu_permission != '' && languages && Array.isArray(languages) && languages.length > 0 && menu && menu != '';
        // if (isLoggedIn) {
        //     this.router.navigateByUrl('/pages/dashboard');
        // }
    }


    submit(data) {
        this.loginService.login(data).subscribe((result) => {
            if (result._id) {
                window.localStorage.setItem('token', result.token);
                window.localStorage.setItem('user', JSON.stringify({_id:result._id, username: result.username, usertype:result.usertype}));
                this.router.navigateByUrl('/catalog/student');
            } else {
                this.loginMessage = result.message;
                setTimeout(() => {
                    this.loginMessage = '';
                }, 2000)
            }
        })
    }
}
