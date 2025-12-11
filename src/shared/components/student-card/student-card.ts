import { Component, input } from '@angular/core';
import { AllStudents } from '@interfaces/all-students';

@Component({
  selector: 'app-student-card',
  imports: [],
  templateUrl: './student-card.html',
  styleUrl: './student-card.scss',
})
export class StudentCard {
  public studentInfo = input<AllStudents>();
}
