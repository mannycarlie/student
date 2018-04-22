import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { StudentService } from './student.service';
import { AuthManager } from '../../authManager';


@Component({
  selector: 'student-list',
  templateUrl: './student.list.html',
  styleUrls: ['./student.css']
})
export class StudentListComponent {

  public students: Array<any> = [];
  closeResult: string;
  public selectedStudent: any = {};
  private selectedStudentIndex: number;
  modalReference: any;
  
  constructor(private _studentService: StudentService, private modalService: NgbModal, public authManager: AuthManager) { }

  ngOnInit() {
    this._studentService.getAll().subscribe(students=>{
      this.students=students;
    })
  }

  getStudentList() {
    this._studentService.getAll().subscribe(students => {
      this.students = students;
    })
  }

  delete() {
    this._studentService.delete(this.selectedStudent._id).subscribe(output => {
      if (output.success) {
        this.modalReference.close();
        this.getStudentList();
      }
    })
  }

  open(content, student, index) {
    this.selectedStudent = student;
    this.selectedStudentIndex = index;
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