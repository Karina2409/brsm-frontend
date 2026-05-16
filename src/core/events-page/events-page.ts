import {Component, inject, OnInit, signal} from '@angular/core';
import {EventService} from '@services/event';
import {MessageService} from 'primeng/api';
import {EventRegistration} from '@services/event-registration';
import {EventForStudent} from '@interfaces/event-for-student';
import {EventCardStudent} from '@components/event-card-student/event-card-student';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ToastModule} from 'primeng/toast';
import {AuthService} from '@services/auth';
import {forkJoin} from 'rxjs';

@Component({
    selector: 'app-events-page',
    imports: [EventCardStudent, ProgressSpinnerModule, ToastModule],
    providers: [MessageService],
    templateUrl: './events-page.html',
    styleUrl: './events-page.scss',
})
export class EventsPage implements OnInit {
    private eventService = inject(EventService);
    private eventRegistration = inject(EventRegistration);
    private authService = inject(AuthService);
    private messageService = inject(MessageService);

    events = signal<EventForStudent[]>([]);
    registeredEventIds = signal<Set<number>>(new Set());
    loading = signal(true);
    actionLoadingId = signal<number | null>(null);

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.loading.set(true);

        forkJoin({
            upcomingEvents: this.eventService.getUpcoming(),
            myEventIds: this.eventRegistration.getRegisteredEventIds(this.authService.getUser().id),
        }).subscribe({
            next: ({ upcomingEvents, myEventIds }) => {
                this.events.set(upcomingEvents);
                this.registeredEventIds.set(new Set(myEventIds));
                this.loading.set(false);
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные' });
                this.loading.set(false);
            }
        });
    }

    handleEventAction(eventId: number) {
        const isRegistered = this.registeredEventIds().has(eventId);
        const currentStudentId = this.authService.getUser().id;

        this.actionLoadingId.set(eventId);

        if (isRegistered) {
            this.eventRegistration.unregisterStudent(currentStudentId, eventId).subscribe({
                next: () => this.processSuccess(eventId, 'Запись отменена', false),
                error: () => this.actionLoadingId.set(null)
            });
        } else {
            this.eventRegistration.registerStudent(currentStudentId, eventId).subscribe({
                next: () => this.processSuccess(eventId, 'Вы успешно записаны!', true),
                error: () => this.actionLoadingId.set(null)
            });
        }
    }

    private processSuccess(eventId: number, message: string, add: boolean) {
        const currentSet = new Set(this.registeredEventIds());
        if (add) currentSet.add(eventId); else currentSet.delete(eventId);

        this.registeredEventIds.set(currentSet);
        this.actionLoadingId.set(null);

        this.messageService.add({
            severity: 'success',
            summary: 'Успешно',
            detail: message
        });

        this.loadData();
    }
}
