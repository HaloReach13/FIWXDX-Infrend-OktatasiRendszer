import { Routes } from '@angular/router';
import { InstructorList } from './instructor/instructor-list/instructor-list';
import { InstructorEditor } from './instructor/instructor-editor/instructor-editor';
import { StudentList } from './student/student-list/student-list';
import {StudentEditor} from "./student/student-editor/student-editor";
 
export const routes: Routes = [
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
    }
];
