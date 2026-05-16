import {Component, computed, input} from '@angular/core';
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

    public studentPhoto = computed(() => {
        const info = this.studentInfo();
        if (info && info.photo) {
            return info.photo.startsWith('data:')
                ? info.photo
                : `data:image/jpeg;base64,${info.photo}`;
        }
        return null;
    });
}
