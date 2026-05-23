import { Component, inject, OnInit, signal } from '@angular/core';
import { InstructorDTO, SubjectDTO } from '../../../../models';
import { InstructorService } from '../../services/instructor-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-instructor-detail',
  imports: [],
  templateUrl: './instructor-detail.html',
  styleUrl: './instructor-detail.css',
})
export class InstructorDetail implements OnInit {
  instructor = signal<InstructorDTO | null>(null);
  subjects = signal<SubjectDTO[]>([]);
 
  instructorService = inject(InstructorService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
 
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
 
    this.instructorService.getOne(id).subscribe({
      next: (instructor) => this.instructor.set(instructor),
      error: (err) => {
        alert('Failed to load instructor.');
        console.error(err);
      }
    });
 
    this.instructorService.getSubjects(id).subscribe({
      next: (subjects) => this.subjects.set(subjects),
      error: (err) => {
        alert('Failed to load subject.');
        console.error(err);
      }
    });
  }
 
  cancel(): void {
    this.router.navigateByUrl('/instructors');
  }
}
