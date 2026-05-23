import { Component, inject, OnInit, signal } from '@angular/core';
import { InstructorDTO } from '../../../../models'
import { InstructorService } from '../../services/instructor-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-list',
  imports: [],
  templateUrl: './instructor-list.html',
  styleUrl: './instructor-list.css',
})
export class InstructorList implements OnInit {
  instructors = signal<InstructorDTO[]>([]);
  instructorService = inject(InstructorService);
  router = inject(Router);

  ngOnInit(): void {
    this.instructorService.getAll().subscribe({
      next: (instructors) => this.instructors.set(instructors),
      error: (err) => {
        alert('Failed to load instructors.');
        console.error(err);
      }
    });
  }

  viewInstructor(instructor: InstructorDTO): void {
    this.router.navigate(['instructor-detail', instructor.id]);
  }

  createInstructor(): void {
    this.router.navigate(['create-instructor']);
  }

  editInstructor(instructor: InstructorDTO) {
    this.router.navigate([ 'edit-instructor', instructor.id ]);
  }

  deleteInstructor(instructor: InstructorDTO) {
    this.instructorService.delete(instructor.id).subscribe({
      next: () => {
        this.instructors.update((instructors) => instructors.filter(i => i.id !== instructor.id));
      },
      error: (err) => {
        alert('Failed to delete instructor.');
        console.error(err);
      }
    });
  }
}
