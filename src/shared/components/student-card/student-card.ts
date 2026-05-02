import { Component, input } from '@angular/core';
import { AllStudents } from '@interfaces/all-students';
import {TooltipModule} from 'primeng/tooltip';

@Component({
    selector: 'app-student-card',
    imports: [TooltipModule],
    templateUrl: './student-card.html',
    styleUrl: './student-card.scss',
})
export class StudentCard {
    public studentInfo = input<AllStudents>();
}
