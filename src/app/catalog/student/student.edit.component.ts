import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from './student.service';
import { CourseService } from '../course/course.service';


@Component({
    selector: 'student-edit',
    templateUrl: './student.edit.html',
    styleUrls: ['./student.css']
})
export class StudentEditComponent {
    public student: any = {};
    private editingStudentId: string;
    public resMessage: string;
    public courses: Array<any> = [];
    public isSubmited:boolean;
    

    constructor(private location: Location, private _studentService: StudentService,
        private _courseService: CourseService,
        private route: ActivatedRoute) {
        this.editingStudentId = this.route.snapshot.params['id'];

    }

    ngOnInit() {
        this._courseService.getAll().subscribe(courses => {
            this._studentService.get(this.editingStudentId).subscribe(student => {
                this.courses = courses;
                this.student = student;
            })
        })

    }

    update(data) {
        this._studentService.update(data).subscribe(rslt => {
            if (rslt._id) {
                this.student = {};
                this.resMessage = "Student update success!"
                setTimeout(() => {
                    this.resMessage = '';
                    this.location.back();
                }, 2000)
            } else {
                this.resMessage = "Student update failed!"
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