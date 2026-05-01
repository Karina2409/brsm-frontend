import {Component, computed, inject, input, OnInit, signal} from '@angular/core';
import {EventService} from '@services/event';
import {Event} from '@interfaces/event'
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {RelativeDatePipe} from '@pipes/relative-date-pipe';
import {ButtonModule} from 'primeng/button';
import {TagModule} from 'primeng/tag';
import {ProgressBarModule} from 'primeng/progressbar';
import {DividerModule} from 'primeng/divider';
import {PluralPipe} from '@pipes/plural-pipe';
import {AuthService} from '@services/auth';
import {DialogModule} from 'primeng/dialog';
import {EventParticipantsDialog} from '@components/event-participants-dialog';

@Component({
    selector: 'app-event-detail-page',
    imports: [CommonModule, RouterModule, RelativeDatePipe, PluralPipe, ButtonModule,
        TagModule,
        ProgressBarModule,
        DividerModule, DialogModule, EventParticipantsDialog],
    templateUrl: './event-detail-page.html',
    styleUrl: './event-detail-page.scss',
})
export class EventDetailPage implements OnInit {
    id = input.required<string>();
    event = signal<Event | null>(null);
    loading = signal(true);
    showStudentList = signal(false);

    public authService = inject(AuthService);
    private eventService = inject(EventService);

    ngOnInit() {
        this.loadEvent();
    }

    private loadEvent() {
        this.eventService.getById(this.id()).subscribe({
            next: (data: Event) => {
                this.event.set(data);
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }

    registrationPercent = computed(() => {
        const e = this.event();
        return e ? (e.studentsRegistered / e.studentCount) * 100 : 0;
    });

    openStudentList() {
        if (this.authService.isSecretary() || this.authService.isChiefSecretary()) {
            this.showStudentList.set(true);
        }
    }
}
