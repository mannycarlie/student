import { Injectable } from '@angular/core'
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';


@Injectable()
export class AuthManager implements CanActivate {
    menu_permission: any = [];
    constructor(private router: Router, private _cookieService: CookieService) {

    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        let token = this._cookieService.get('token');
        let user = JSON.parse(window.localStorage.getItem('user'));
        let isLoggedIn = token && token != '';
        let urls = state.url.split('/');
        let last_segment = urls[urls.length - 1];

        if (!isLoggedIn || !user) {
            this.router.navigateByUrl('/home');
            return false;
        }
        if (user.usertype == "general" && (last_segment == "add" || last_segment.length == 24 || last_segment == "register")) {
            return false;
        }

        return true;
    }

    get isAdmin() {
        let user = JSON.parse(window.localStorage.getItem('user'));
        if (user.usertype == "admin")
            return true;
        else
            return false;
    }
}