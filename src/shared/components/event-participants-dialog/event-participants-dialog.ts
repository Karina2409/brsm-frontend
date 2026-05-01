import {Component, effect, inject, input, model, signal} from '@angular/core';
import {EventService} from '@services/event';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {RouterModule} from '@angular/router';

@Component({
    selector: 'app-event-participants-dialog',
    imports: [DialogModule, ButtonModule, TableModule, RouterModule],
    templateUrl: './event-participants-dialog.html',
    styleUrl: './event-participants-dialog.scss',
})
export class EventParticipantsDialog {
    visible = model<boolean>(false);
    eventId = input.required<string>();

    //todo: заменить на интерфейс студентов
    participants = signal<any[]>([]);
    loading = signal(false);

    private eventService = inject(EventService);

    constructor() {
        effect(() => {
            if (this.visible() && this.eventId()) {
                this.loadParticipants();
            }
        });
    }

    loadParticipants() {
        this.loading.set(true);
        this.eventService.getParticipants(this.eventId()).subscribe({
            next: (data) => {
                this.participants.set(data);
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }
}
