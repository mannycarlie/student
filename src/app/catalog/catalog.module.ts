import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './catalog.routing';
import { StudentListComponent } from './student/student.list.component';
import { CatalogComponent } from './catalog.component';
import { CourseListComponent } from './course/course.list.component';
import { StudentAddComponent } from './student/student.add.component';
import { StudentService } from './student/student.service';
import { CourseAddComponent } from './course/course.add.component';
import { CourseService } from './course/course.service';
import { CourseEditComponent } from './course/course.edit.component';
import { StudentEditComponent } from './student/student.edit.component';
import { UserCreateComponent } from './user/user.create.component';
import { UserService } from './user/user.service';
import { AuthManager } from '../authManager';
import { CookieService } from 'angular2-cookie/core';


@NgModule({
  imports: [
    routing,
    CommonModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  declarations: [
    CatalogComponent,

    UserCreateComponent,

    CourseListComponent,
    CourseAddComponent,
    CourseEditComponent,

    StudentListComponent,
    StudentAddComponent,
    StudentEditComponent
  ],
  providers: [StudentService, CourseService, UserService, AuthManager, CookieService]
})
export class CatalogModule { }
