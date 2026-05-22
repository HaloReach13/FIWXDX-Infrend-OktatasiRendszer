import { Routes } from '@angular/router';
import { InstructorList } from './instructor-list/instructor-list';

export const routes: Routes = [
    {
        path: 'instructors',
        component: InstructorList
    }
];
