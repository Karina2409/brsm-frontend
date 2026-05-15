import {Component, effect, inject, input, model, signal} from '@angular/core';
import {EventService} from '@services/event';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {StudentFullName} from '@interfaces/student-full-name';
import {Router} from '@angular/router';

@Component({
    selector: 'app-event-participants-dialog',
    imports: [DialogModule, ButtonModule, TableModule],
    templateUrl: './event-participants-dialog.html',
    styleUrl: './event-participants-dialog.scss',
})
export class EventParticipantsDialog {
    visible = model<boolean>(false);
    eventId = input.required<string>();

    participants = signal<StudentFullName[]>([]);
    loading = signal(false);

    private eventService = inject(EventService);
    private router = inject(Router);

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

    navigateToFullList() {
        this.visible.set(false);
        document.body.style.overflow = 'auto';
        this.router.navigate(['/events', this.eventId(), 'participants']);
    }
}
