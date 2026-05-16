import {Component, computed, inject, OnInit, signal} from '@angular/core';
import { EventService } from '@services/event';
import { Event } from '@interfaces/event';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SliderModule } from 'primeng/slider';
import { DatePickerModule } from 'primeng/datepicker';
import {EventCardAdmin} from '@components/event-card-admin';
import {PaginatorModule} from 'primeng/paginator';
import {PaginatorState} from 'primeng/types/paginator';

@Component({
    selector: 'app-all-events-page',
    imports: [
        CardModule,
        RouterModule,
        SkeletonModule,
        InputTextModule,
        FormsModule,
        ButtonModule,
        SelectButtonModule,
        IconFieldModule,
        InputIconModule,
        SliderModule,
        DatePickerModule,
        PaginatorModule,
        EventCardAdmin,
    ],
    templateUrl: './all-events-page.html',
    styleUrl: './all-events-page.scss',
})
export class AllEventsPage implements OnInit {
    private eventService = inject(EventService);

    public allEvents = signal<Event[]>([]);
    public loading = signal<boolean>(true);
    public showFilters = signal<boolean>(false);
    public error = signal<string>('');

    public first = signal<number>(0);
    public rows = signal<number>(10);

    public searchFilter = signal<string>('');
    public petitionFilter = signal<boolean | null>(null);
    public optRangeFilter = signal<number[]>([0, 20]);
    public studentRangeFilter = signal<number[]>([0, 200]);
    public dateRangeFilter = signal<Date[] | null>(null);
    public timeStatusFilter = signal<string>('all');

    petitionOptions = [
        { label: 'Все', value: null },
        { label: 'С ходатайством', value: true },
        { label: 'Без', value: false },
    ];

    timeOptions = [
        { label: 'Все', value: 'all' },
        { label: 'Предстоящие', value: 'upcoming' },
        { label: 'Прошедшие', value: 'past' },
    ];

    public filteredEvents = computed(() => {
        const events = this.allEvents();
        const search = this.searchFilter().trim().toLowerCase();
        const petition = this.petitionFilter();
        const optRange = this.optRangeFilter();
        const studentRange = this.studentRangeFilter();
        const dateRange = this.dateRangeFilter();
        const timeStatus = this.timeStatusFilter();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return events.filter((event) => {
            const eventDate = new Date(event.date);

            const matchesSearch = !search || event.name.toLowerCase().includes(search);
            const matchesPetition = petition === null || event.forPetition === petition;
            const matchesOpt = event.optCount >= optRange[0] && event.optCount <= optRange[1];
            const matchesStudents = event.studentCount >= studentRange[0] && event.studentCount <= studentRange[1];

            let matchesStatus = true;
            if (timeStatus === 'upcoming') matchesStatus = eventDate >= today;
            if (timeStatus === 'past') matchesStatus = eventDate < today;

            let matchesDateRange = true;
            if (dateRange && dateRange[0] && dateRange[1]) {
                matchesDateRange = eventDate >= dateRange[0] && eventDate <= dateRange[1];
            }

            return matchesSearch && matchesPetition && matchesOpt && matchesStudents && matchesStatus && matchesDateRange;
        });
    });

    public paginatedEvents = computed(() => {
        const start = this.first();
        const end = start + this.rows();
        return this.filteredEvents().slice(start, end);
    });

    ngOnInit(): void {
        this.loadEvents();
    }

    loadEvents() {
        this.eventService.getAll().subscribe({
            next: (data) => {
                this.allEvents.set(data);
                this.loading.set(false);
            },
            error: () => {
                this.error.set('Ошибка загрузки мероприятий');
                this.loading.set(false);
            },
        });
    }

    public onFilterChange(): void {
        this.first.set(0);
    }

    public onPageChange(event: PaginatorState): void {
        this.first.set(event.first ?? 0);
        this.rows.set(event.rows ?? 10);
    }

    public resetFilters(): void {
        this.searchFilter.set('');
        this.petitionFilter.set(null);
        this.optRangeFilter.set([0, 20]);
        this.studentRangeFilter.set([0, 200]);
        this.dateRangeFilter.set(null);
        this.timeStatusFilter.set('all');
        this.first.set(0);
    }
}
