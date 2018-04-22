import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
@Injectable()
export class LoginService {
  headers;
  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  login(data){
    return this.http.post('/api/signin', JSON.stringify(data), {headers: this.headers}).map(res=>res.json())
  }

}
