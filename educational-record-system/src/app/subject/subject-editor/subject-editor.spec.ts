import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectEditor } from './subject-editor';

describe('SubjectEditor', () => {
  let component: SubjectEditor;
  let fixture: ComponentFixture<SubjectEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectEditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
