import { Component, input } from '@angular/core';
import { Event } from '@interfaces/event';
import { RouterModule } from '@angular/router';
import { RelativeDatePipe } from '@pipes/relative-date-pipe';
import { EventTimePipe } from '@pipes/event-time-pipe';

@Component({
    selector: 'app-event-card-admin',
    imports: [RouterModule, RelativeDatePipe, RelativeDatePipe, EventTimePipe],
    templateUrl: './event-card-admin.html',
    styleUrl: './event-card-admin.scss',
})
export class EventCardAdmin {
    event = input.required<Event>();
}
