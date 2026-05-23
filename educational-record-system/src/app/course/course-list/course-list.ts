import { Component, inject, OnInit, signal } from '@angular/core';
import { CourseEntry } from '../../interfaces';
import { CourseService } from '../../services/course-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  imports: [],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  courses = signal<CourseEntry[]>([]);
  courseService = inject(CourseService);
  router = inject(Router);
 
  ngOnInit(): void {
    this.courseService.getAll().subscribe({
      next: (courses) => this.courses.set(courses),
      error: (err) => {
        alert('Failed to load courses.');
        console.error(err);
      }
    });
  }
 
  createCourse(): void {
    this.router.navigate(['create-course']);
  }
 
  viewCourse(course: CourseEntry): void {
    this.router.navigate(['course-detail', course.id]);
  }
 
  editCourse(course: CourseEntry): void {
    this.router.navigate(['edit-course', course.id]);
  }
 
  deleteCourse(course: CourseEntry): void {
    if (!confirm(`Biztosan törli a(z) "${course.subject.name}" kurzust (${course.year} / ${course.semester})?`)) return;
 
    this.courseService.delete(course.id).subscribe({
      next: () => {
        this.courses.update((list) => list.filter(c => c.id !== course.id));
      },
      error: (err) => {
        alert('Delete failed.');
        console.error(err);
      }
    });
  }
}
