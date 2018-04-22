import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { CourseService } from './course.service';
import { AuthManager } from '../../authManager';


@Component({
  selector: 'course-list',
  templateUrl: './course.list.html',
  styleUrls: ['./course.css']
})
export class CourseListComponent {

  public courses: Array<any> = [];
  closeResult: string;
  public selectedCourse: any = {};
  private selectedCourseIndex: number;
  modalReference: any;

  constructor(private _courseService: CourseService, private modalService: NgbModal, public authManager: AuthManager) { }

  ngOnInit() {
    this.getCourseList();
  }

  getCourseList() {
    this._courseService.getAll().subscribe(courses => {
      this.courses = courses;
    })
  }

  delete() {
    this._courseService.delete(this.selectedCourse._id).subscribe(output => {
      if (output.success) {
        this.modalReference.close();
        this.getCourseList();
      }
    })
  }

  open(content, course, index) {
    this.selectedCourse = course;
    this.selectedCourseIndex = index;
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}