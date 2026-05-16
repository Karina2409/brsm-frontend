import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectModule} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ConfirmationService, MessageService} from 'primeng/api';
import {UserService} from '@services/user';
import {User} from '@interfaces/user';
import {Role} from '@enums/role';
import {HttpErrorResponse} from '@angular/common/http';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {MultiSelectModule} from 'primeng/multiselect';
import {PaginatorModule} from 'primeng/paginator';
import {PaginatorState} from 'primeng/types/paginator';

@Component({
    selector: 'app-users-page',
    imports: [
        CommonModule,
        SelectModule,
        FormsModule,
        ToastModule,
        ConfirmDialogModule,
        ProgressSpinnerModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        ButtonModule,
        MultiSelectModule,
        PaginatorModule
    ],
    templateUrl: './users-page.html',
    styleUrl: './users-page.scss',
})
export class UsersPage implements OnInit {
    private readonly userService = inject(UserService);
    private readonly messageService = inject(MessageService);
    private readonly confirmationService = inject(ConfirmationService);

    public users = signal<User[]>([]);
    public loading = signal<boolean>(true);
    public showFilters = signal<boolean>(false);

    public first = signal<number>(0);
    public rows = signal<number>(10);

    public filters = {
        searchQuery: '',
        faculties: [] as string[]
    };

    public faculties = signal<{ name: string; value: string }[]>([]);

    private previousRolesCache = new Map<number, Role>();

    public rolesList = [
        { label: 'Студент', value: Role.STUDENT },
        { label: 'Секретарь', value: Role.SECRETARY },
        { label: 'Руководитель', value: Role.CHIEF_SECRETARY }
    ];

    private filterTrigger = signal<number>(0);

    public filteredUsers = computed(() => {
        this.filterTrigger();
        const query = this.filters.searchQuery.trim().toLowerCase();
        const selectedFaculties = this.filters.faculties;

        return this.users().filter(user => {
            const fio = this.getFio(user).toLowerCase();
            const login = (user.login || '').toLowerCase();
            const matchesSearch = fio.includes(query) || login.includes(query);

            const matchesFaculty = selectedFaculties.length === 0 ||
                (user.faculty && selectedFaculties.includes(user.faculty));

            return matchesSearch && matchesFaculty;
        });
    });

    public paginatedUsers = computed(() => {
        const start = this.first();
        const end = start + this.rows();
        return this.filteredUsers().slice(start, end);
    });

    ngOnInit() {
        this.loadUsers();
    }

    private loadUsers() {
        this.loading.set(true);
        this.userService.getUsers().subscribe({
            next: (data) => {
                this.users.set(data);
                data.forEach(u => this.previousRolesCache.set(u.userId, u.role));
                const uniqueFaculties = Array.from(new Set(data.map(u => u.faculty).filter(Boolean)));
                this.faculties.set(uniqueFaculties.map(f => ({ name: f!, value: f! })));
                this.loading.set(false);
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить пользователей' });
                this.loading.set(false);
            }
        });
    }

    public applyFilters() {
        this.first.set(0);
        this.filterTrigger.update(v => v + 1);
    }

    public resetFilters() {
        this.filters.searchQuery = '';
        this.filters.faculties = [];
        this.applyFilters();
    }

    public onPageChange(event: PaginatorState) {
        this.first.set(event.first ?? 0);
        this.rows.set(event.rows ?? 10);
    }

    public onRoleChange(user: User, newRole: Role) {
        const oldRole = this.previousRolesCache.get(user.userId) || Role.STUDENT;
        if (oldRole === newRole) return;
        this.executeRoleChange(user, newRole, oldRole, false);
    }

    private executeRoleChange(user: User, newRole: Role, oldRole: Role, force: boolean) {
        this.userService.changeRole(user.userId, newRole, force).subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'Успешно', detail: `Роль пользователя ${user.surname} изменена` });
                this.previousRolesCache.set(user.userId, newRole);
                if (force) {
                    this.loadUsers();
                }
            },
            error: (err: HttpErrorResponse) => {
                if (err.status === 409) {
                    const facultyName = user.faculty || 'выбранного факультета';
                    this.showConflictModal(user, newRole, oldRole, facultyName);
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось изменить роль' });
                    this.rollbackUserRole(user, oldRole);
                }
            }
        });
    }

    private showConflictModal(user: User, newRole: Role, oldRole: Role, faculty: string) {
        this.confirmationService.confirm({
            message: `Секретарь факультета ${faculty} уже назначен. Если вы выберете Да, роль текущего секретаря ${faculty} станет Студент, а выбранный пользователь станет секретарем ${faculty}.`,
            header: 'Вы уверены, что хотите сменить секретаря?',
            icon: 'pi pi-exclamation-triangle',
            rejectLabel: 'Отмена',
            acceptLabel: 'Да',
            rejectButtonProps: { severity: 'secondary', text: true },
            acceptButtonProps: { severity: 'danger' },
            accept: () => {
                this.executeRoleChange(user, newRole,  oldRole, true);
            },
            reject: () => {
                this.rollbackUserRole(user, oldRole);
            }
        });
    }

    private rollbackUserRole(user: User, oldRole: Role) {
        this.users.update(currentUsers =>
            currentUsers.map(u => u.userId === user.userId ? { ...u, role: oldRole } : u)
        );
    }

    public getFio(user: User): string {
        return `${user.surname || ''} ${user.name || ''} ${user.patronymic || ''}`.trim() || 'Пользователь без ФИО';
    }
}
