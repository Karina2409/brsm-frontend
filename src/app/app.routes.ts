import { Routes } from '@angular/router';
import { ProfilePage } from '@pages/profile-page';
import { StudentsPage } from '@pages/students-page';
import { UsersPage } from '@pages/users-page';
import { AllEventsPage } from '@pages/all-events-page';
import { DocumentsPage } from '@pages/documents-page';
import { StatisticsPage } from '@pages/statistics-page';
import { CalendarPage } from '@pages/calendar-page';
import { PetitionsPage } from '@pages/petitions-page';
import { ReportsPage } from '@pages/reports-page';
import { ExemptionsPage } from '@pages/exemptions-page';
import { SettingsPage } from '@pages/settings-page';
import { UserActionsPage } from '@pages/user-actions-page';
import { MainPage } from '@pages/main-page';
import { Login } from '@pages/login-page';
import { guestGuard } from '../shared/guards/guest-guard';
import { authGuard } from '../shared/guards/auth-guard';
import { roleGuard } from '../shared/guards/role-guard';
import { Role } from '@enums/role';
import { MyEventsPage } from '@pages/my-events-page';
import { MySettingsPage } from '@pages/my-settings-page';
import { EventsPage } from '@pages/events-page';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: Login,
        canActivate: [guestGuard],
    },
    {
        path: 'profile',
        component: ProfilePage,
        canActivate: [authGuard],
    },
    {
        path: 'students',
        component: StudentsPage,
        canActivate: [roleGuard([Role.SECRETARY, Role.CHIEF_SECRETARY])],
    },
    {
        path: 'users',
        component: UsersPage,
        canActivate: [roleGuard([Role.CHIEF_SECRETARY])],
    },
    {
        path: 'settings',
        component: SettingsPage,
        canActivate: [roleGuard([Role.CHIEF_SECRETARY])],
    },
    {
        path: 'user-actions',
        component: UserActionsPage,
        canActivate: [roleGuard([Role.CHIEF_SECRETARY])],
    },
    {
        path: 'all-events',
        component: AllEventsPage,
        canActivate: [roleGuard([Role.SECRETARY, Role.CHIEF_SECRETARY])],
    },
    {
        path: 'documents',
        component: DocumentsPage,
        canActivate: [roleGuard([Role.SECRETARY, Role.CHIEF_SECRETARY])],
        children: [
            {
                path: 'petitions',
                component: PetitionsPage,
            },
            {
                path: 'reports',
                component: ReportsPage,
            },
            {
                path: 'exemptions',
                component: ExemptionsPage,
            },
        ],
    },
    {
        path: 'statistic',
        component: StatisticsPage,
        canActivate: [roleGuard([Role.SECRETARY, Role.CHIEF_SECRETARY])],
    },
    {
        path: 'calendar',
        component: CalendarPage,
        canActivate: [authGuard],
    },
    {
        path: 'main',
        component: MainPage,
        canActivate: [roleGuard([Role.STUDENT])],
    },
    {
        path: 'events',
        component: EventsPage,
        canActivate: [roleGuard([Role.STUDENT])],
    },
    {
        path: 'my-events',
        component: MyEventsPage,
        canActivate: [roleGuard([Role.STUDENT])],
    },
    {
        path: 'my-settings',
        component: MySettingsPage,
        canActivate: [authGuard],
    },
];
