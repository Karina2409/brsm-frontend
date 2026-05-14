import {Component, input, output} from '@angular/core';
import {EventForStudent} from '@interfaces/event-for-student'
import {ButtonModule} from 'primeng/button';
import {TagModule} from 'primeng/tag';
import {TooltipModule} from 'primeng/tooltip';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-event-card-student',
    imports: [CommonModule, ButtonModule, TagModule, TooltipModule],
    templateUrl: './event-card-student.html',
    styleUrl: './event-card-student.scss',
})
export class EventCardStudent {
    event = input.required<EventForStudent>();
    isRegistered = input<boolean>(false);
    loading = input<boolean>(false);

    onAction = output<number>();

    // Расчет заполненности в процентах
    get fillPercentage(): number {
        return (this.event().studentsRegistered / this.event().studentCount) * 100;
    }

    // Проверка наличия свободных мест
    get isFull(): boolean {
        return this.event().studentsRegistered >= this.event().studentCount;
    }
}
