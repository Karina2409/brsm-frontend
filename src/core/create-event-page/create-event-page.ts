import {Component, inject, OnInit, signal} from '@angular/core';
import {MessageService} from 'primeng/api';
import {EventService} from '@services/event';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Event} from '@interfaces/event';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {DatePickerModule} from 'primeng/datepicker';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {ToggleSwitchModule} from 'primeng/toggleswitch';
import {ToastModule} from 'primeng/toast';
import {RippleModule} from 'primeng/ripple';

@Component({
    selector: 'app-create-event-page',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        InputTextModule,
        DatePickerModule,
        InputNumberModule,
        ToggleSwitchModule,
        ButtonModule,
        ToastModule,
        RippleModule
    ],
    templateUrl: './create-event-page.html',
    styleUrl: './create-event-page.scss',
})
export class CreateEventPage implements OnInit {
    private readonly eventService = inject(EventService);
    private readonly fb = inject(FormBuilder);
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly messageService = inject(MessageService);

    public isEditMode = signal<boolean>(false);
    public loading = signal<boolean>(false);
    public submitting = signal<boolean>(false);

    private eventId: number | null = null;
    public minDate: Date = new Date();

    public eventForm = this.fb.nonNullable.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        date: [null as Date | null, Validators.required],
        time: [null as Date | null, Validators.required],
        place: ['', Validators.required],
        studentCount: [20, [Validators.required, Validators.min(1)]],
        optCount: [0, [Validators.required, Validators.min(0)]],
        forPetition: [false]
    });

    ngOnInit() {
        const idParam = this.route.snapshot.paramMap.get('id');
        if (idParam) {
            this.eventId = +idParam;
            this.isEditMode.set(true);
            this.loadEventData(this.eventId);
        }
    }

    private loadEventData(id: number) {
        this.loading.set(true);
        this.eventService.getById(id.toString()).subscribe({
            next: (event: Event) => {
                console.log(event)
                let timeDate: Date | null = null;
                if (event.time && typeof event.time === 'string') {
                    const [hours, minutes] = event.time.split(':');
                    timeDate = new Date();
                    timeDate.setHours(+hours, +minutes, 0, 0);
                }

                let parsedDate: Date | null = null;
                if (event.date && typeof event.date === 'string') {
                    const parts = event.date.split('-');
                    if (parts.length === 3) {
                        const year = +parts[0];
                        const month = +parts[1] - 1;
                        const day = +parts[2];

                        parsedDate = new Date(year, month, day, 0, 0, 0, 0);
                    }
                }

                this.eventForm.patchValue({
                    name: event.name,
                    date: parsedDate,
                    time: timeDate,
                    place: event.place,
                    studentCount: event.studentCount,
                    optCount: event.optCount,
                    forPetition: event.forPetition
                });
                this.loading.set(false);
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Ошибка',
                    detail: 'Не удалось загрузить данные'
                });
                this.loading.set(false);
            }
        });
    }

    public onSubmit() {
        if (this.eventForm.invalid) {
            this.eventForm.markAllAsTouched();
            this.messageService.add({
                severity: 'warn',
                summary: 'Внимание',
                detail: 'Пожалуйста, заполните все обязательные поля корректно'
            });
            return;
        }

        this.submitting.set(true);
        const formRawValues = this.eventForm.getRawValue();

        const timeValue = formRawValues.time as Date;
        const formattedTime = timeValue.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        const payload: Partial<Event> = {
            name: formRawValues.name,
            date: formRawValues.date!,
            time: formattedTime,
            place: formRawValues.place,
            studentCount: formRawValues.studentCount,
            optCount: formRawValues.optCount,
            forPetition: formRawValues.forPetition
        };

        const request$ = this.isEditMode()
            ? this.eventService.update(this.eventId!, payload as Event)
            : this.eventService.create(payload as Event);

        request$.subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Успешно',
                    detail: this.isEditMode() ? 'Изменения сохранены' : 'Мероприятие добавлено'
                });
                setTimeout(() => this.router.navigate(['/events/all']), 1000);
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Ошибка',
                    detail: err.message || 'Ошибка при сохранении'
                });
                this.submitting.set(false);
            }
        });
    }

    public isFieldInvalid(fieldName: string): boolean {
        const control = this.eventForm.get(fieldName);
        return !!(control && control.invalid && (control.dirty || control.touched));
    }
}
