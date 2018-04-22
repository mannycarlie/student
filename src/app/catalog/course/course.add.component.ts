import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from './course.service';


@Component({
    selector: 'course-add',
    templateUrl: './course.add.html',
    styleUrls: ['./course.css']
})
export class CourseAddComponent {
    public course: any = {};
    public resMessage: string;
    public isSubmited:boolean;
    constructor(private location: Location, private _courseService: CourseService) {

    }

    ngOnInit() {
    }

    save(data) {
        this._courseService.save(data).subscribe(rslt => {
            if (rslt._id) {
                this.course = {};
                this.resMessage = "Course save success!"
                setTimeout(() => {
                    this.resMessage = '';
                    this.location.back();
                }, 2000)
            } else {
                this.resMessage = "Course save failed!"
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