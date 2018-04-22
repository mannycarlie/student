import { Routes, RouterModule } from '@angular/router';
import { CatalogComponent } from './catalog.component';
import { ModuleWithProviders } from '@angular/core';
import { StudentListComponent } from './student/student.list.component';
import { CourseListComponent } from './course/course.list.component';
import { StudentAddComponent } from './student/student.add.component';
import { CourseAddComponent } from './course/course.add.component';
import { CourseEditComponent } from './course/course.edit.component';
import { StudentEditComponent } from './student/student.edit.component';
import { UserCreateComponent } from './user/user.create.component';
import { AuthManager } from '../authManager';

export const routes: Routes = [

  {
    path: '',
    component: CatalogComponent,
    children: [
      { path: '', redirectTo: 'student', pathMatch: 'full' },

      { path: 'register', component: UserCreateComponent, canActivate: [AuthManager] },

      { path: 'student', component: StudentListComponent, canActivate: [AuthManager] },
      { path: 'student/add', component: StudentAddComponent, canActivate: [AuthManager] },
      { path: 'student/edit/:id', component: StudentEditComponent, canActivate: [AuthManager] },

      { path: 'course', component: CourseListComponent, canActivate: [AuthManager] },
      { path: 'course/add', component: CourseAddComponent, canActivate: [AuthManager] },
      { path: 'course/edit/:id', component: CourseEditComponent, canActivate: [AuthManager] },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
