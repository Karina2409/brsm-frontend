import { Component, inject } from '@angular/core';
import { EventService } from '@services/event';
import { Event } from '@interfaces/event';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-events-page',
    imports: [DatePipe],
    templateUrl: './events-page.html',
    styleUrl: './events-page.scss',
})
export class EventsPage {
    events: Event[] = [];
    loading = true;
    error = '';

    private eventService = inject(EventService);

    ngOnInit(): void {
        this.loadEvents();
    }

    loadEvents() {
        this.eventService.getAll().subscribe({
            next: (data) => {
                this.events = data;
                this.loading = false;
            },
            error: () => {
                this.error = 'Ошибка загрузки мероприятий';
                this.loading = false;
            },
        });
    }
}
