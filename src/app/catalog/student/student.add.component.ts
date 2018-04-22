import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from './student.service';
import { CourseService } from '../course/course.service';


@Component({
    selector: 'student-add',
    templateUrl: './student.add.html',
    styleUrls: ['./student.css']
})
export class StudentAddComponent {
    public student: any = {};
    public courses: Array<any> = [];
    public resMessage:string;
    public isSubmited:boolean;

    constructor(private location: Location, private _studentService: StudentService, private _courseService: CourseService) {

    }

    ngOnInit() {
        this._courseService.getAll().subscribe(courses => {
            this.courses = courses;
        })
    }

    save(data) {
        this._studentService.save(data).subscribe(rslt => {
            if (rslt._id) {
                this.student = {};
                this.resMessage = "Student save success!"
                setTimeout(() => {
                    this.resMessage = '';
                    this.location.back();
                }, 2000)
            } else {
                this.resMessage = "Student save failed!"
                setTimeout(() => {
                    this.resMessage = '';
                }, 2000)
            }
        })
    }

    back() {
        this.location.back();
    }
}