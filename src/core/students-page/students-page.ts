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

import { FacultyOptions } from '@interfaces/faculty-options';
import { StudentService } from '@services/students';
import { AllStudents } from '@interfaces/all-students';
import { StudentCard } from '@components/student-card';
import {PaginatorModule} from 'primeng/paginator';
import {FacultyEnum} from '@enums/faculty';

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

    public faculties: FacultyOptions[] = [
        { name: FacultyEnum.FKP, code: 'FKP' },
        { name: FacultyEnum.FITU, code: 'FITU' },
        { name: FacultyEnum.FRE, code: 'FRE' },
        { name: FacultyEnum.FKSIS, code: 'FKSIS' },
        { name: FacultyEnum.FIB, code: 'FIB' },
        { name: FacultyEnum.IEF, code: 'IEF' },
        { name: FacultyEnum.VF, code: 'VF' },
    ];

    public filters = {
        surname: '',
        faculties: [] as FacultyOptions[],
        eventsRange: [0, 50] as [number, number]
    };

    ngOnInit() {
        this.loadStudents();
    }

    public loadStudents() {
        this.loading.set(true);
        this.studentsService.findStudentsInfo().subscribe({
            next: (data) => {
                this.students.set(data);
                this.applyFilters();
                this.loading.set(false);
            },
            error: (err) => {
                console.error('Ошибка при загрузке студентов:', err);
                this.loading.set(false);
            }
        });
    }

    public applyFilters() {
        let result = this.students();

        if (this.filters.surname) {
            const searchStr = this.filters.surname.toLowerCase().trim();
            result = result.filter(s => s.surname.toLowerCase().includes(searchStr));
        }

        if (this.filters.faculties && this.filters.faculties.length > 0) {
            const selectedFacultyNames = this.filters.faculties.map(f => f.name);

            result = result.filter(student =>
                selectedFacultyNames.includes(student.faculty as unknown as string)
            );
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
