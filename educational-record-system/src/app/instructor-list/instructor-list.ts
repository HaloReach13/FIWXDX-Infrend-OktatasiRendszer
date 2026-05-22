import { Component, inject, OnInit, signal } from '@angular/core';
import { InstructorDTO } from '../../../models';
import { InstructorService } from '../services/instructor-service';
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
}
