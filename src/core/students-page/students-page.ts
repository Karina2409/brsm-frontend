import {Component, inject, signal, OnInit, computed} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';

import { Faculty } from '@interfaces/faculty';
import { StudentService } from '@services/students';
import { AllStudents } from '@interfaces/all-students';
import { StudentCard } from '@components/student-card';
import {PaginatorModule} from 'primeng/paginator';

@Component({
    selector: 'app-students-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MultiSelectModule,
        SkeletonModule,
        ButtonModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        SliderModule,
        PaginatorModule,
        StudentCard
    ],
    templateUrl: './students-page.html',
    styleUrl: './students-page.scss'
})
export class StudentsPage implements OnInit {
    public students = signal<AllStudents[]>([]);
    public filteredStudents = signal<AllStudents[]>([]);
    public loading = signal(true);
    public showFilters = signal(false);

    public first = signal(0);
    public rows = signal(10);

    private readonly studentsService = inject(StudentService);

    public paginatedStudents = computed(() => {
        const start = this.first();
        return this.filteredStudents().slice(start, start + this.rows());
    });

    public faculties: Faculty[] = [
        { name: 'ФКП', code: 'FKP' },
        { name: 'ФИТУ', code: 'FITU' },
        { name: 'ФРЭ', code: 'FRE' },
        { name: 'ФКСиС', code: 'FKSIS' },
        { name: 'ФИБ', code: 'FIB' },
        { name: 'ИЭФ', code: 'IEF' },
        { name: 'ВФ', code: 'VF' },
    ];

    public filters = {
        surname: '',
        faculties: [] as Faculty[],
        eventsRange: [0, 50] as [number, number]
    };

    ngOnInit() {
        this.loadStudents();
    }

    public loadStudents() {
        this.loading.set(true);
        setTimeout(() => {
            const data = this.studentsService.findStudentsInfo();
            this.students.set(data);
            this.applyFilters();
            this.loading.set(false);
        }, 400);
    }

    public applyFilters() {
        let result = this.students();

        if (this.filters.surname) {
            const searchStr = this.filters.surname.toLowerCase().trim();
            result = result.filter(s => s.surname.toLowerCase().includes(searchStr));
        }

        //todo: пофиксить фильтр по факультету, чтобы работало
        if (this.filters.faculties && this.filters.faculties.length > 0) {
            const selectedCodes = this.filters.faculties.map(f => f.code);
        }

        const [min, max] = this.filters.eventsRange;
        result = result.filter(s => (s.eventsCount || 0) >= min && (s.eventsCount || 0) <= max);

        this.filteredStudents.set(result);
        this.first.set(0);
    }

    public onPageChange(event: any) {
        this.first.set(event.first);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    public resetFilters() {
        this.filters = {
            surname: '',
            faculties: [],
            eventsRange: [0, 50]
        };
        this.applyFilters();
    }
}
