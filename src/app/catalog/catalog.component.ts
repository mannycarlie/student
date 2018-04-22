import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { AuthManager } from '../authManager';


@Component({
  selector: 'catalog',
  templateUrl: './catalog.html',
  styleUrls: ['./catalog.css']
})
export class CatalogComponent {
  public loggedInUser: any = {};
  constructor(private route: ActivatedRoute, private router: Router, private _coockieService: CookieService, public authManager: AuthManager) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.loggedInUser = JSON.parse(window.localStorage.getItem('user'));
  }

  logout() {
    this._coockieService.remove('token');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    this.router.navigateByUrl('/');
  }

}
