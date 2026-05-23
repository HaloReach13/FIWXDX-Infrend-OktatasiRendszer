import { Component, inject, OnInit, signal } from '@angular/core';
import { StudentDTO } from '../../../../models';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-editor',
  imports: [FormsModule],
  templateUrl: './student-editor.html',
  styleUrl: './student-editor.css',
})
export class StudentEditor implements OnInit {
  student = signal<StudentDTO>({
    id: 0,
    neptunCode: '',
    firstName: '',
    lastName: '',
    email: '',
    class: '',
    currentSemester: 0
  });

  isNewStudent = true;

  studentService = inject(StudentService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.isNewStudent = false;
      this.studentService.getOne(id).subscribe({
        next: (student) => this.student.set(student),
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  saveStudent() {
    if (this.isNewStudent) {
      this.studentService.create(this.student()).subscribe({
        next: () => this.router.navigateByUrl('/students'),
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      this.studentService.update(this.student()).subscribe({
        next: () => this.router.navigateByUrl('/students'),
        error: (err) => {
          console.error(err);
        }
      })
    }
  }

  cancel(): void {
    this.router.navigateByUrl('/students');
  }
}
