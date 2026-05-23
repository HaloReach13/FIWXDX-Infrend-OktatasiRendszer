import { Component, inject, OnInit, signal } from '@angular/core';
import { InstructorDTO, SubjectDTO } from '../../../../models';
import { SubjectService } from '../../services/subject-service';
import { InstructorService } from '../../services/instructor-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subject-detail',
  imports: [FormsModule],
  templateUrl: './subject-detail.html',
  styleUrl: './subject-detail.css',
})
export class SubjectDetail implements OnInit {
  subject = signal<SubjectDTO | null>(null);
  assignedInstructors = signal<InstructorDTO[]>([]);
  allInstructors = signal<InstructorDTO[]>([]);
  selectedInstructorId = signal<number | null>(null);
 
  subjectService = inject(SubjectService);
  instructorService = inject(InstructorService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
 
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
 
    this.subjectService.getOne(id).subscribe({
      next: (subject) => this.subject.set(subject),
      error: (err) => {
        alert('Failed to load subject.');
        console.error(err);
      }
    });
 
    this.subjectService.getInstructors(id).subscribe({
      next: (instructors) => this.assignedInstructors.set(instructors),
      error: (err) => console.error(err)
    });
 
    this.instructorService.getAll().subscribe({
      next: (instructors) => this.allInstructors.set(instructors),
      error: (err) => console.error(err)
    });
  }
 
  availableInstructors() {
    const assignedIds = this.assignedInstructors().map(i => i.id);
    return this.allInstructors().filter(i => !assignedIds.includes(i.id));
  }
 
  assignInstructor(): void {
    const instructorId = this.selectedInstructorId();
    const subjectId = this.subject()?.id;
    if (!instructorId || !subjectId) return;
 
    this.subjectService.assignInstructor(subjectId, instructorId).subscribe({
      next: () => {
        const instructor = this.allInstructors().find(i => i.id === instructorId)!;
        this.assignedInstructors.update(list => [...list, instructor]);
        this.selectedInstructorId.set(null);
      },
      error: (err) => {
        alert('Assignment failed.');
        console.error(err);
      }
    });
  }
 
  removeInstructor(instructor: InstructorDTO): void {
    const subjectId = this.subject()?.id;
    if (!subjectId) return;
 
    this.subjectService.removeInstructor(subjectId, instructor.id).subscribe({
      next: () => {
        this.assignedInstructors.update(list => list.filter(i => i.id !== instructor.id));
      },
      error: (err) => {
        alert('Removal failed.');
        console.error(err);
      }
    });
  }
 
  cancel(): void {
    this.router.navigateByUrl('/subjects');
  }
}
