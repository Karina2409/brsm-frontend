import {Component, inject, OnInit, signal} from '@angular/core';
import {ToastModule} from 'primeng/toast';
import {SkeletonModule} from 'primeng/skeleton';
import {ButtonModule} from 'primeng/button';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {StudentService} from '@services/students';
import {MessageService} from 'primeng/api';
import {AllStudents} from '@interfaces/all-students';
import {Event} from '@interfaces/event';
import {forkJoin} from 'rxjs';

@Component({
    selector: 'app-student-detail-page',
    imports: [CommonModule, RouterModule, ButtonModule, SkeletonModule, ToastModule],
    templateUrl: './student-detail-page.html',
    styleUrl: './student-detail-page.scss',
})
export class StudentDetailPage implements OnInit {
    private readonly route = inject(ActivatedRoute);
    private readonly studentService = inject(StudentService);
    private readonly messageService = inject(MessageService);

    public student = signal<AllStudents | null>(null);
    public studentEvents = signal<Event[]>([]);
    public loading = signal<boolean>(true);
    public photoPreview = signal<string | null>(null);

    ngOnInit() {
        const studentId = Number(this.route.snapshot.paramMap.get('id'));
        if (studentId) {
            this.loadStudentProfile(studentId);
        }
    }

    private loadStudentProfile(id: number) {
        this.loading.set(true);
        forkJoin({
            profile: this.studentService.getById(id),
            events: this.studentService.getStudentEvents(id)
        }).subscribe({
            next: ({ profile, events }) => {
                this.student.set(profile);

                const sortedEvents = events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                this.studentEvents.set(sortedEvents);

                if (profile.photo) {
                    this.photoPreview.set(`data:image/jpeg;base64,${profile.photo}`);
                }
                this.loading.set(false);
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Ошибка',
                    detail: 'Не удалось загрузить данные студента'
                });
                this.loading.set(false);
            }
        });
    }

    public getRegistrationStatus(event: Event): 'REGISTERED' | 'ATTENDED' {
        return this.isEventPast(event) ? 'ATTENDED' : 'REGISTERED';
    }

    public isEventPast(event: Event): boolean {
        const now = new Date();
        const eventDate = new Date(event.date);

        if (typeof event.time === 'string' && event.time.includes(':')) {
            const [hours, minutes] = event.time.split(':').map(Number);
            eventDate.setHours(hours, minutes, 0, 0);
        } else if (event.time instanceof Date) {
            eventDate.setHours(event.time.getHours(), event.time.getMinutes(), 0, 0);
        } else {
            eventDate.setHours(23, 59, 59, 999);
        }

        return eventDate.getTime() < now.getTime();
    }
}
