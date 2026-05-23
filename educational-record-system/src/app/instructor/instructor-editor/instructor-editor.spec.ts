import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorEditor } from './instructor-editor';

describe('InstructorEditor', () => {
  let component: InstructorEditor;
  let fixture: ComponentFixture<InstructorEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorEditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
