import {Component, ElementRef, inject, OnInit, signal, ViewChild} from '@angular/core';
import {MessageService} from 'primeng/api';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {StudentService} from '@services/students';
import {AuthService} from '@services/auth';
import {AllStudents} from '@interfaces/all-students';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {CommonModule} from '@angular/common';
import {ToggleSwitchModule} from 'primeng/toggleswitch';
import {RippleModule} from 'primeng/ripple';

@Component({
    selector: 'app-profile-page',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        ToastModule,
        ToggleSwitchModule,
        RippleModule
    ],
    templateUrl: './profile-page.html',
    styleUrl: './profile-page.scss',
})
export class ProfilePage implements OnInit {
    private readonly authService = inject(AuthService);
    private readonly studentService = inject(StudentService);
    private readonly fb = inject(FormBuilder);
    private readonly messageService = inject(MessageService);

    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

    public student = signal<AllStudents | null>(null);
    public loading = signal<boolean>(true);
    public isEditMode = signal<boolean>(false);
    public submitting = signal<boolean>(false);

    public photoPreview = signal<string | null>(null);

    public profileForm = this.fb.nonNullable.group({
        surname: ['', Validators.required],
        name: ['', Validators.required],
        patronymic: [''],
        phoneNumber: [''],
        telegramUsername: [''],
        email: [''],
        dormitoryResidence: [false],
        dormBlockNumber: [''],
        dormNumber: [null as number | null]
    });

    ngOnInit() {
        this.loadProfile();

        this.profileForm.get('dormitoryResidence')?.valueChanges.subscribe(residence => {
            const blockControl = this.profileForm.get('dormBlockNumber');
            const roomControl = this.profileForm.get('dormNumber');
            if (residence) {
                blockControl?.setValidators([Validators.required]);
                roomControl?.setValidators([Validators.required]);
            } else {
                blockControl?.clearValidators();
                roomControl?.clearValidators();
                blockControl?.setValue('');
                roomControl?.setValue(null);
            }
            blockControl?.updateValueAndValidity();
            roomControl?.updateValueAndValidity();
        });
    }

    private loadProfile() {
        this.loading.set(true);
        const currentStudentId = this.authService.getUser().id;

        this.studentService.getById(currentStudentId).subscribe({
            next: (data: AllStudents) => {
                console.log(data);
                this.student.set(data);

                if (data.photo) {
                    this.photoPreview.set(`data:image/jpeg;base64,${data.photo}`);
                }

                this.profileForm.patchValue({
                    surname: data.surname,
                    name: data.name,
                    patronymic: data.patronymic,
                    phoneNumber: data.phoneNumber || '',
                    telegramUsername: data.telegramUsername || '',
                    email: data.email || '',
                    dormitoryResidence: data.dormitoryResidence,
                    dormBlockNumber: data.dormBlockNumber || '',
                    dormNumber: data.dormNumber || null
                });
                this.loading.set(false);
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Ошибка',
                    detail: 'Не удалось загрузить данные профиля'
                });
                this.loading.set(false);
            }
        });
    }

    public triggerFileInput() {
        this.fileInput.nativeElement.click();
    }

    public onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            const file = input.files[0];

            if (file.size > 2 * 1024 * 1024) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Ошибка',
                    detail: 'Размер фото не должен превышать 2 МБ'
                });
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                const base64Result = reader.result as string;
                this.photoPreview.set(base64Result);

                this.uploadPhoto(base64Result.split(',')[1]);
            };
            reader.readAsDataURL(file);
        }
    }

    private uploadPhoto(pureBase64: string) {
        if (!this.student()) return;

        const currentId = this.student()!.studentId;
        const updatedPayload = { ...this.student()!, photo: pureBase64 };

        this.studentService.update(currentId, updatedPayload).subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'Успешно', detail: 'Фото профиля обновлено' });
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось сохранить фото' });
            }
        });
    }

    public onSubmit() {
        if (this.profileForm.invalid) {
            this.profileForm.markAllAsTouched();
            return;
        }

        this.submitting.set(true);
        const formValues = this.profileForm.getRawValue();
        const currentId = this.student()!.studentId;

        const payload: AllStudents = {
            ...this.student()!,
            surname: formValues.surname,
            name: formValues.name,
            patronymic: formValues.patronymic,
            phoneNumber: formValues.phoneNumber,
            telegramUsername: formValues.telegramUsername,
            email: formValues.email,
            dormitoryResidence: formValues.dormitoryResidence,
            dormBlockNumber: formValues.dormBlockNumber,
            dormNumber: formValues.dormNumber!
        };

        this.studentService.update(currentId, payload).subscribe({
            next: (updatedData) => {
                this.student.set(updatedData);
                this.isEditMode.set(false);
                this.submitting.set(false);
                this.messageService.add({ severity: 'success', summary: 'Успешно', detail: 'Профиль обновлен' });
            },
            error: () => {
                this.submitting.set(false);
                this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Ошибка при сохранении данных' });
            }
        });
    }

    public isFieldInvalid(fieldName: string): boolean {
        const control = this.profileForm.get(fieldName);
        return !!(control && control.invalid && (control.dirty || control.touched));
    }
}
