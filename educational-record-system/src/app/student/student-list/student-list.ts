import { Component, inject, OnInit, signal } from '@angular/core';
import { StudentDTO } from '../../../../models'
import { StudentService } from '../../services/student-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  imports: [],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList implements OnInit {
  students = signal<StudentDTO[]>([]);
  studentService = inject(StudentService);
  router = inject(Router);

  ngOnInit(): void {
    this.studentService.getAll().subscribe({
      next: (students) => this.students.set(students),
      error: (err) => {
        alert('Failed to load students.');
        console.error(err);
      }
    });
  }

  viewStudent(student: StudentDTO): void {
    this.router.navigate(['student-detail', student.id]);
  }

  createStudent() {
    this.router.navigate(['create-student']);
  }

  editStudent(student: StudentDTO) {
    this.router.navigate(['edit-student', student.id]);
  }

  deleteStudent(student: StudentDTO) {
    this.studentService.delete(student.id).subscribe({
      next: () => {
        this.students.update((students) => students.filter(s => s.id !== student.id));
      },
      error: (err) => {
        alert('Failed to delete student.');
        console.error(err);
      }
    });
  }
}
