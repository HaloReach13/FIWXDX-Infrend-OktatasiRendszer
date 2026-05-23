import { Routes } from '@angular/router';
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
 
export const routes: Routes = [
    { 
        path: '',                         
        component: CourseList
    },
    { 
        path: 'courses',                  
        component: CourseList 
    },
    { 
        path: 'create-course',            
        component: CourseEditor 
    },
    { 
        path: 'edit-course/:id',          
        component: CourseEditor 
    },
    { 
        path: 'course-detail/:id',        
        component: CourseDetail 
    },
    {
        path: 'instructors',
        component: InstructorList
    },
    {
        path: 'create-instructor',
        component: InstructorEditor
    },
    {
        path: 'edit-instructor/:id',
        component: InstructorEditor
    },
    { 
        path: 'instructor-detail/:id',
        component: InstructorDetail
    },
    {
        path: 'students',
        component: StudentList
    },
    {
        path: 'create-student',
        component: StudentEditor
    },
    {
        path: 'edit-student/:id',
        component: StudentEditor
    },
    { 
        path: 'student-detail/:id',
        component: StudentDetail
    },
    {
        path: 'subjects',
        component: SubjectList
    },
    {
        path: 'create-subject',
        component: SubjectEditor
    },
    {
        path: 'edit-subject/:id',
        component: SubjectEditor
    },
    { 
        path: 'subject-detail/:id', 
        component: SubjectDetail 
    }
];