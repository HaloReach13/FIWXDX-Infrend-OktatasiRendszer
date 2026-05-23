import { Component, inject, OnInit, signal } from '@angular/core';
import { SubjectDTO } from '../../../../models';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course-service';
import { SubjectService } from '../../services/subject-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseEntry } from '../../interfaces';

@Component({
  selector: 'app-course-editor',
  imports: [FormsModule],
  templateUrl: './course-editor.html',
  styleUrl: './course-editor.css',
})
export class CourseEditor implements OnInit {
  course = signal<CourseEntry | null>(null);

  selectedSubjectId = signal<number | null>(null);
  semester = signal<string>('');
  year = signal<number>(new Date().getFullYear());
 
  subjects = signal<SubjectDTO[]>([]);
  isNewCourse = true;
 
  courseService = inject(CourseService);
  subjectService = inject(SubjectService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
 
  ngOnInit(): void {
    this.subjectService.getAll().subscribe({
      next: (subjects) => this.subjects.set(subjects),
      error: (err) => console.error(err)
    });
 
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.isNewCourse = false;
      this.courseService.getOne(id).subscribe({
        next: (course) => {
          this.course.set(course);
          this.semester.set(course.semester);
          this.year.set(course.year);
          this.selectedSubjectId.set(course.subject.id);
        },
        error: (err) => {
          alert('Failed to load course.');
          console.error(err);
        }
      });
    }
  }
 
  saveCourse(): void {
    if (this.isNewCourse) {
      const subjectId = this.selectedSubjectId();
      if (!subjectId) {
        alert('Válassz tantárgyat!');
        return;
      }
      this.courseService.create({
        subjectId,
        semester: this.semester(),
        year: this.year(),
      }).subscribe({
        next: () => this.router.navigate(['courses']),
        error: (err) => {
          alert('Saving failed.');
          console.error(err);
        }
      });
    } else {
      const current = this.course();
      if (!current) return;
      this.courseService.update({
        ...current,
        semester: this.semester(),
        year: this.year(),
      }).subscribe({
        next: () => this.router.navigate(['courses']),
        error: (err) => {
          alert('Saving failed.');
          console.error(err);
        }
      });
    }
  }
 
  cancel(): void {
    this.router.navigateByUrl('/courses');
  }
}
