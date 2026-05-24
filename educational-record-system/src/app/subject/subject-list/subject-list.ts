import { Component, inject, OnInit, signal } from '@angular/core';
import { SubjectDTO } from '../../../../models'
import { SubjectService } from '../../services/subject-service';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject-list',
  imports: [],
  templateUrl: './subject-list.html',
  styleUrl: './subject-list.css',
})
export class SubjectList implements OnInit {
  subjects = signal<SubjectDTO[]>([]);
  subjectService = inject(SubjectService);
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    this.subjectService.getAll().subscribe({
      next: (subjects) => this.subjects.set(subjects),
      error: (err) => {
        alert('Failed to load subjects.');
        console.error(err);
      }
    });
  }

  viewSubject(subject: SubjectDTO): void {
    this.router.navigate(['subject-detail', subject.id]);
  }

  createSubject(): void {
      this.router.navigate(['create-subject']);
    }
  
    editSubject(subject: SubjectDTO) {
      this.router.navigate([ 'edit-subject', subject.id ]);
    }

    deleteSubject(subject: SubjectDTO) {
        this.subjectService.delete(subject.id).subscribe({
          next: () => {
            this.subjects.update((subjects) => subjects.filter(s => s.id !== subject.id));
          },
          error: (err) => {
            alert('Failed to delete subject.');
            console.error(err);
          }
        });
      }
}
