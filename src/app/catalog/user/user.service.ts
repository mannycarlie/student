import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
@Injectable()
export class UserService {
    headers;
    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    signup(data) {
        return this.http.post('/api/signup', JSON.stringify(data), { headers: this.headers }).map(res => res.json())
    }

}
