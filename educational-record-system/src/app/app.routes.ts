import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { Register } from './auth/register/register';
import { Login } from './auth/login/login';
import { CourseList } from './course/course-list/course-list';
import { CourseEditor } from './course/course-editor/course-editor';
import { CourseDetail } from './course/course-detail/course-detail';
import { InstructorList } from './instructor/instructor-list/instructor-list';
import { InstructorEditor } from './instructor/instructor-editor/instructor-editor';
import { InstructorDetail } from './instructor/instructor-detail/instructor-detail';
import { StudentList } from './student/student-list/student-list';
import { StudentEditor } from "./student/student-editor/student-editor";
import { StudentDetail } from "./student/student-detail/student-detail";
import { SubjectList } from './subject/subject-list/subject-list';
import { SubjectEditor } from './subject/subject-editor/subject-editor';
import { SubjectDetail } from './subject/subject-detail/subject-detail';
import { AuthService } from './services/auth';

export const routes: Routes = [
    {
        path: '',
        component: CourseList
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'courses',
        component: CourseList
    },
    {
        path: 'create-course',
        component: CourseEditor,
        canActivate: [ () => inject(AuthService).preventGuestAccess() ]
    },
    {
        path: 'edit-course/:id',
        component: CourseEditor,
        canActivate: [ () => inject(AuthService).preventGuestAccess() ]
    },
    {
        path: 'course-detail/:id',
        component: CourseDetail,
        canActivate: [ () => inject(AuthService).preventGuestAccess() ]
    },
    {
        path: 'instructors',
        component: InstructorList
    },
    {
        path: 'create-instructor',
        component: InstructorEditor,
        canActivate: [ () => inject(AuthService).preventGuestAccess() ]
    },
    {
        path: 'edit-instructor/:id',
        component: InstructorEditor,
        canActivate: [ () => inject(AuthService).preventGuestAccess() ]
    },
    {
        path: 'instructor-detail/:id',
        component: InstructorDetail,
        canActivate: [ () => inject(AuthService).preventGuestAccess() ]
    },
    {
        path: 'students',
        component: StudentList
    },
    {
        path: 'create-student',
        component: StudentEditor,
        canActivate: [ () => inject(AuthService).preventGuestAccess() ]
    },
    {
        path: 'edit-student/:id',
        component: StudentEditor,
        canActivate: [ () => inject(AuthService).preventGuestAccess() ]
    },
    {
        path: 'student-detail/:id',
        component: StudentDetail,
        canActivate: [ () => inject(AuthService).preventGuestAccess() ]
    },
    {
        path: 'subjects',
        component: SubjectList
    },
    {
        path: 'create-subject',
        component: SubjectEditor,
        canActivate: [ () => inject(AuthService).preventGuestAccess() ]
    },
    {
        path: 'edit-subject/:id',
        component: SubjectEditor,
        canActivate: [ () => inject(AuthService).preventGuestAccess() ]
    },
    {
        path: 'subject-detail/:id',
        component: SubjectDetail,
        canActivate: [ () => inject(AuthService).preventGuestAccess() ]
    }
];