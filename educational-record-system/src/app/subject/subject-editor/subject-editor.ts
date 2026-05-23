import { Component, inject, OnInit, signal } from '@angular/core';
import { SubjectDTO } from '../../../../models';
import { FormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { SubjectService } from '../../services/subject-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-subject-editor',
  imports: [ɵInternalFormsSharedModule, FormsModule],
  templateUrl: './subject-editor.html',
  styleUrl: './subject-editor.css',
})
export class SubjectEditor implements OnInit {
  subject = signal<SubjectDTO>({
    id: 0,
    code: '',
    name: '',
    credits: 0
  });

  isNewSubject = true;

  subjectService = inject(SubjectService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.isNewSubject = false;
      this.subjectService.getOne(id).subscribe({
        next: (subject) => this.subject.set(subject),
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  saveSubject() {
    if (this.isNewSubject) {
      this.subjectService.create(this.subject()).subscribe({
        next: () => this.router.navigateByUrl('/subjects'),
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      this.subjectService.update(this.subject()).subscribe({
        next: () => this.router.navigateByUrl('/subjects'),
        error: (err) => {
          console.error(err);
        }
      })
    }
  }

  cancel(): void {
    this.router.navigateByUrl('/subjects');
  }
}
