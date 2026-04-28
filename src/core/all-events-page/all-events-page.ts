import { Component, inject } from '@angular/core';
import { EventService } from '@services/event';
import { Event } from '@interfaces/event';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-all-events-page',
    imports: [CardModule, RouterModule],
    templateUrl: './all-events-page.html',
    styleUrl: './all-events-page.scss',
})
export class AllEventsPage {
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

    formatTime(event: Event): string {
        const date = new Date(`${event.date}T${event.time}`);
        return date.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    formatDate(date: Date): string {
        const d = new Date(date);

        const formatted = d.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const diffTime = d.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return `${formatted} (${this.getDaysWord(diffDays)})`;
    }

    getDaysWord(days: number): string {
        if (days === 0) return 'сегодня';
        if (days === 1) return 'завтра';
        if (days < 0) return 'прошло';

        return `через ${days} ${this.pluralize(days, 'день', 'дня', 'дней')}`;
    }

    formatStudents(count: number): string {
        return `${count} ${this.pluralize(count, 'студент', 'студента', 'студентов')}`;
    }

    pluralize(n: number, one: string, two: string, five: string): string {
        const n10 = n % 10;
        const n100 = n % 100;

        if (n10 === 1 && n100 !== 11) return one;
        if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return two;
        return five;
    }
}
