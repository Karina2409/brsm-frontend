import { Component, inject, OnInit } from '@angular/core';
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
import { EventCardAdmin } from '@components/event-card-admin/event-card-admin';

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
        EventCardAdmin,
    ],
    templateUrl: './all-events-page.html',
    styleUrl: './all-events-page.scss',
})
export class AllEventsPage implements OnInit {
    allEvents: Event[] = [];
    filteredEvents: Event[] = [];
    loading = true;
    showFilters = false;
    error = '';

    filterState = {
        search: '',
        petition: null as boolean | null,
        optRange: [0, 20],
        studentRange: [0, 100],
        dateRange: null as Date[] | null,
        timeStatus: 'all',
    };

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

    private eventService = inject(EventService);

    ngOnInit(): void {
        this.loadEvents();
    }

    loadEvents() {
        this.eventService.getAll().subscribe({
            next: (data) => {
                this.allEvents = data;
                this.applyFilters();
                this.loading = false;
            },
            error: () => {
                this.error = 'Ошибка загрузки мероприятий';
                this.loading = false;
            },
        });
    }

    applyFilters() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        this.filteredEvents = this.allEvents.filter((event) => {
            const eventDate = new Date(event.date);

            const matchesSearch =
                !this.filterState.search || event.name.toLowerCase().includes(this.filterState.search.toLowerCase());

            const matchesPetition =
                this.filterState.petition === null || event.forPetition === this.filterState.petition;

            const matchesOpt =
                event.optCount >= this.filterState.optRange[0] && event.optCount <= this.filterState.optRange[1];

            const matchesStudents =
                event.studentCount >= this.filterState.studentRange[0] &&
                event.studentCount <= this.filterState.studentRange[1];

            let matchesStatus = true;
            if (this.filterState.timeStatus === 'upcoming') matchesStatus = eventDate >= today;
            if (this.filterState.timeStatus === 'past') matchesStatus = eventDate < today;

            let matchesDateRange = true;
            if (this.filterState.dateRange && this.filterState.dateRange[0] && this.filterState.dateRange[1]) {
                matchesDateRange =
                    eventDate >= this.filterState.dateRange[0] && eventDate <= this.filterState.dateRange[1];
            }

            return (
                matchesSearch && matchesPetition && matchesOpt && matchesStudents && matchesStatus && matchesDateRange
            );
        });
    }

    resetFilters() {
        this.filterState = {
            search: '',
            petition: null,
            optRange: [0, 20],
            studentRange: [0, 100],
            dateRange: null,
            timeStatus: 'all',
        };
        this.applyFilters();
    }
}
