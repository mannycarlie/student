import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
@Injectable()
export class CourseService {
  headers;
  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  get(id) {
    return this.http.get('/api/course/' + id).map(res => res.json())
  }

  getAll() {
    return this.http.get('/api/course').map(res => res.json())
  }

  save(data) {
    return this.http.post('/api/course', JSON.stringify(data), { headers: this.headers }).map(res => res.json())
  }

  update(data) {
    return this.http.put('/api/course/' + data._id, JSON.stringify(data), { headers: this.headers }).map(res => res.json())
  }

  delete(id) {
    return this.http.delete('/api/course/' + id).map(res => res.json())
  }

}
