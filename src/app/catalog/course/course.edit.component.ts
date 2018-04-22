import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from './course.service';


@Component({
    selector: 'course-edit',
    templateUrl: './course.edit.html',
    styleUrls: ['./course.css']
})
export class CourseEditComponent {
    public course: any = {};
    private editingCourseId:string;
    public resMessage: string;
    public isSubmited:boolean;
    
    constructor(private location: Location, private _courseService: CourseService, private route: ActivatedRoute) {
        this.editingCourseId=this.route.snapshot.params['id'];
        
    }

    ngOnInit() {
        this._courseService.get(this.editingCourseId).subscribe(course=>{
            this.course=course;
        })
    }

    update(data) {
        this._courseService.update(data).subscribe(rslt => {
            if (rslt._id) {
                this.course = {};
                this.resMessage = "Course update success!"
                setTimeout(() => {
                    this.resMessage = '';
                    this.location.back();
                }, 2000)
            } else {
                this.resMessage = "Course update failed!"
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