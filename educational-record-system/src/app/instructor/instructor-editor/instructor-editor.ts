import { Component, inject, OnInit, signal } from '@angular/core';
import { InstructorDTO } from '../../../../models';
import { FormsModule } from '@angular/forms';
import { InstructorService } from '../../services/instructor-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-instructor-editor',
  imports: [FormsModule],
  templateUrl: './instructor-editor.html',
  styleUrl: './instructor-editor.css',
})
export class InstructorEditor implements OnInit {
  instructor = signal<InstructorDTO>({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  });

  isNewInstructor = true;

  instructorService = inject(InstructorService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.isNewInstructor = false;
      this.instructorService.getOne(id).subscribe({
        next: (instructor) => this.instructor.set(instructor),
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  saveInstructor() {
    if (this.isNewInstructor) {
      this.instructorService.create(this.instructor()).subscribe({
        next: () => this.router.navigateByUrl('/instructors'),
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      this.instructorService.update(this.instructor()).subscribe({
        next: () => this.router.navigateByUrl('/instructors'),
        error: (err) => {
          console.error(err);
        }
      })
    }
  }

  cancel(): void {
    this.router.navigateByUrl('/instructors');
  }
}
