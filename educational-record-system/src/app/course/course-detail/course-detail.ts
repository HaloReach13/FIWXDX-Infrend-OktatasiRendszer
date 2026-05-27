import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CourseEntry, EnrollmentEntry } from '../../interfaces';
import { CourseService } from '../../services/course-service';
import { StudentService } from '../../services/student-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StudentDTO } from '../../../../models';

@Component({
  selector: 'app-course-detail',
  imports: [FormsModule],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css',
})
export class CourseDetail implements OnInit {
  course = signal<CourseEntry | null>(null);
  enrollments = signal<EnrollmentEntry[]>([]);
  allStudents = signal<StudentDTO[]>([]);
  selectedStudentId = signal<number | null>(null);
 
  editingGrades = signal<Record<number, number | null>>({});
 
  courseService = inject(CourseService);
  studentService = inject(StudentService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
 
  enrolledCount = computed(() => this.enrollments().length);
  gradedCount = computed(() => this.enrollments().filter(e => e.grade !== null).length);
  courseAverage = computed(() => {
    const graded = this.enrollments().filter(e => e.grade !== null);
    if (graded.length === 0) return null;
    const sum = graded.reduce((acc, e) => acc + e.grade!, 0);
    return Math.round((sum / graded.length) * 100) / 100;
  });
 
  availableStudents = computed(() => {
    const enrolledIds = this.enrollments().map(e => e.student.id);
    return this.allStudents().filter(s => !enrolledIds.includes(s.id));
  });
 
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
 
    this.courseService.getOne(id).subscribe({
      next: (course) => this.course.set(course),
      error: (err) => {
        alert('Failed to load course.');
        console.error(err);
      }
    });
 
    this.courseService.getStudents(id).subscribe({
      next: (enrollments) => {
        this.enrollments.set(enrollments);
        const grades: Record<number, number | null> = {};
        enrollments.forEach(e => grades[e.enrollmentId] = e.grade);
        this.editingGrades.set(grades);
      },
      error: (err) => console.error(err)
    });
 
    this.studentService.getAll().subscribe({
      next: (students) => this.allStudents.set(students),
      error: (err) => console.error(err)
    });
  }
 
  enrollStudent(): void {
    const studentId = this.selectedStudentId();
    const courseId = this.course()?.id;
    if (!studentId || !courseId) return;
 
    this.courseService.enrollStudent(courseId, studentId).subscribe({
      next: () => {
        this.courseService.getStudents(courseId).subscribe({
          next: (enrollments) => {
            this.enrollments.set(enrollments);
            const grades: Record<number, number | null> = {};
            enrollments.forEach(e => grades[e.enrollmentId] = e.grade);
            this.editingGrades.set(grades);
          }
        });
        this.selectedStudentId.set(null);
      },
      error: (err) => {
        alert('Student enrollment failed. You may have already enrolled in this course before.');
        console.error(err);
      }
    });
  }
 
  unenrollStudent(enrollment: EnrollmentEntry): void {
    const courseId = this.course()?.id;
    if (!courseId) return;
    if (!confirm(`Biztosan eltávolítja ${enrollment.student.firstName} ${enrollment.student.lastName} hallgatót?`)) return;
 
    this.courseService.unenrollStudent(courseId, enrollment.student.id).subscribe({
      next: () => {
        this.enrollments.update(list => list.filter(e => e.enrollmentId !== enrollment.enrollmentId));
      },
      error: (err) => {
        alert('Removal failed.');
        console.error(err);
      }
    });
  }
 
  saveGrade(enrollment: EnrollmentEntry): void {
    const courseId = this.course()?.id;
    const grade = this.editingGrades()[enrollment.enrollmentId];
    if (!courseId || grade === null || grade === undefined) return;
 
    if (grade < 1 || grade > 5) {
      alert('Az érdemjegy 1 és 5 közé kell essen!');
      return;
    }
 
    this.courseService.setGrade(courseId, enrollment.student.id, grade).subscribe({
      next: () => {
        this.enrollments.update(list =>
          list.map(e => e.enrollmentId === enrollment.enrollmentId ? { ...e, grade } : e)
        );
      },
      error: (err) => {
        alert('Saving a badge failed.');
        console.error(err);
      }
    });
  }
 
  updateEditingGrade(enrollmentId: number, value: string): void {
    const grade = value ? Number(value) : null;
    this.editingGrades.update(grades => ({ ...grades, [enrollmentId]: grade }));
  }
 
  gradeClass(grade: number | null): string {
    if (grade === null) return 'bg-secondary';
    if (grade === 1) return 'bg-danger';
    if (grade === 2) return 'bg-warning text-dark';
    if (grade === 3) return 'bg-info text-dark';
    if (grade === 4) return 'bg-primary';
    return 'bg-success';
  }
 
  cancel(): void {
    this.router.navigateByUrl('/courses');
  }
}
