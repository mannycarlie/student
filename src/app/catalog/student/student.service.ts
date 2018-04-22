import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
@Injectable()
export class StudentService {
  headers;
  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

   get(id) {
    return this.http.get('/api/student/' + id).map(res => res.json())
  }

  getAll() {
    return this.http.get('/api/student').map(res => res.json())
  }

  save(data){
    return this.http.post('/api/student', JSON.stringify(data), {headers: this.headers}).map(res=>res.json())
  }

  update(data) {
    return this.http.put('/api/student/' + data._id, JSON.stringify(data), { headers: this.headers }).map(res => res.json())
  }

  delete(id) {
    return this.http.delete('/api/student/' + id).map(res => res.json())
  }

}
