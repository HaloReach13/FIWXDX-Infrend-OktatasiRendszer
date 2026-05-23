import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { StudentDTO } from '../../../../models';
import { StudentCourseEntry, StudentAverage, ClassAverage } from '../../interfaces';
import { StudentService } from '../../services/student-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  imports: [],
  templateUrl: './student-detail.html',
  styleUrl: './student-detail.css',
})
export class StudentDetail implements OnInit {
  student = signal<StudentDTO | null>(null);
  courses = signal<StudentCourseEntry[]>([]);
  averageData = signal<StudentAverage | null>(null);
  classAverageData = signal<ClassAverage | null>(null);

  averageDiff = computed(() => {
    const studentAvg = this.averageData()?.average;
    const classAvg = this.classAverageData()?.average;
    if (studentAvg === null || studentAvg === undefined) return null;
    if (classAvg === null || classAvg === undefined) return null;
    return Math.round((studentAvg - classAvg) * 100) / 100;
  });
 
  studentService = inject(StudentService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
 
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
 
    this.studentService.getOne(id).subscribe({
      next: (student) => {
        this.student.set(student);
        // Tankör átlag lekérése miután megvan a hallgató (kell a class mező)
        this.studentService.getClassAverage(student.class).subscribe({
          next: (data) => this.classAverageData.set(data),
          error: (err) => console.error(err)
        });
      },
      error: (err) => {
        alert('Hallgató betöltése sikertelen.');
        console.error(err);
      }
    });
 
    this.studentService.getCourses(id).subscribe({
      next: (courses) => this.courses.set(courses),
      error: (err) => {
        alert('Kurzusok betöltése sikertelen.');
        console.error(err);
      }
    });
 
    this.studentService.getAverage(id).subscribe({
      next: (data) => this.averageData.set(data),
      error: (err) => console.error(err)
    });
  }
 
  gradeLabel(grade: number | null): string {
    if (grade === null) return '–';
    const labels: Record<number, string> = {
      1: '1 (Elégtelen)',
      2: '2 (Elégséges)',
      3: '3 (Közepes)',
      4: '4 (Jó)',
      5: '5 (Jeles)',
    };
    return labels[grade] ?? String(grade);
  }
 
  gradeClass(grade: number | null): string {
    if (grade === null) return 'bg-secondary';
    if (grade === 1) return 'bg-danger';
    if (grade === 2) return 'bg-warning text-dark';
    if (grade === 3) return 'bg-info text-dark';
    if (grade === 4) return 'bg-primary';
    return 'bg-success';
  }
 
  diffClass(diff: number | null): string {
    if (diff === null) return 'text-muted';
    if (diff > 0) return 'text-success';
    if (diff < 0) return 'text-danger';
    return 'text-muted';
  }
 
  diffIcon(diff: number | null): string {
    if (diff === null) return '';
    if (diff > 0) return 'bi-arrow-up-circle-fill';
    if (diff < 0) return 'bi-arrow-down-circle-fill';
    return 'bi-dash-circle';
  }
 
  cancel(): void {
    this.router.navigateByUrl('/students');
  }
}
