import { Routes } from '@angular/router';
import { Role } from '@enums/role';
import { guestGuard } from '@guards/guest-guard';
import { authGuard } from '@guards/auth-guard';
import { roleGuard } from '@guards/role-guard';
import { eventsRedirectGuard } from '@guards/events-redirect-guard';
import {numberIdGuard} from '@guards/number-id-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadComponent: () => import('@pages/login-page').then(m => m.Login),
        canActivate: [guestGuard],
    },
    {
        path: 'profile',
        loadComponent: () => import('@pages/profile-page').then(m => m.ProfilePage),
        canActivate: [authGuard],
    },
    {
        path: 'students',
        canActivate: [roleGuard([Role.SECRETARY, Role.CHIEF_SECRETARY])],
        children: [
            {
                path: '',
                loadComponent: () => import('@pages/students-page').then(m => m.StudentsPage)
            },
            {
                path: ':id',
                loadComponent: () => import('@pages/student-detail-page').then(m => m.StudentDetailPage)
            }
        ]
    },
    {
        path: 'users',
        loadComponent: () => import('@pages/users-page').then(m => m.UsersPage),
        canActivate: [roleGuard([Role.CHIEF_SECRETARY])],
    },
    {
        path: 'settings',
        loadComponent: () => import('@pages/settings-page').then(m => m.SettingsPage),
        canActivate: [roleGuard([Role.CHIEF_SECRETARY])],
    },
    {
        path: 'user-actions',
        loadComponent: () => import('@pages/user-actions-page').then(m => m.UserActionsPage),
        canActivate: [roleGuard([Role.CHIEF_SECRETARY])],
    },
    {
        path: 'events',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('@pages/events-page').then(m => m.EventsPage),
                canActivate: [eventsRedirectGuard, roleGuard([Role.STUDENT])],
            },
            {
                path: 'all',
                loadComponent: () => import('@pages/all-events-page').then(m => m.AllEventsPage),
                canActivate: [roleGuard([Role.SECRETARY, Role.CHIEF_SECRETARY])],
            },
            {
                path: 'create',
                loadComponent: () => import('@pages/create-event-page').then(m => m.CreateEventPage),
                canActivate: [roleGuard([Role.SECRETARY, Role.CHIEF_SECRETARY])],
            },
            {
                path: ':id',
                loadComponent: () => import('@pages/event-detail-page').then(m => m.EventDetailPage),
                canActivate: [numberIdGuard, roleGuard([Role.SECRETARY, Role.CHIEF_SECRETARY])],
            },
            {
                path: ':id/edit',
                loadComponent: () => import('@pages/create-event-page').then(m => m.CreateEventPage),
                canActivate: [roleGuard([Role.SECRETARY, Role.CHIEF_SECRETARY])],
            },
            {
                path: ':id/participants',
                loadComponent: () => import('@pages/event-participants-page').then(m => m.EventParticipantsPage),
                canActivate: [roleGuard([Role.SECRETARY, Role.CHIEF_SECRETARY])]
            }
        ],
    },
    {
        path: 'documents',
        loadComponent: () => import('@pages/documents-page').then(m => m.DocumentsPage),
        canActivate: [roleGuard([Role.SECRETARY, Role.CHIEF_SECRETARY])],
        children: [
            {
                path: 'petitions',
                loadComponent: () => import('@pages/petitions-page').then(m => m.PetitionsPage),
            },
            {
                path: 'reports',
                loadComponent: () => import('@pages/reports-page').then(m => m.ReportsPage),
            },
            {
                path: 'exemptions',
                loadComponent: () => import('@pages/exemptions-page').then(m => m.ExemptionsPage),
            },
        ],
    },
    {
        path: 'statistic',
        loadComponent: () => import('@pages/statistics-page').then(m => m.StatisticsPage),
        canActivate: [roleGuard([Role.SECRETARY, Role.CHIEF_SECRETARY])],
    },
    {
        path: 'calendar',
        loadComponent: () => import('@pages/calendar-page').then(m => m.CalendarPage),
        canActivate: [authGuard],
    },
    {
        path: 'main',
        loadComponent: () => import('@pages/main-page').then(m => m.MainPage),
        canActivate: [roleGuard([Role.STUDENT])],
    },
    {
        path: 'my-events',
        loadComponent: () => import('@pages/my-events-page').then(m => m.MyEventsPage),
        canActivate: [roleGuard([Role.STUDENT])],
    },
    {
        path: 'my-settings',
        loadComponent: () => import('@pages/my-settings-page').then(m => m.MySettingsPage),
        canActivate: [authGuard],
    },
    {
        path: '404',
        loadComponent: () => import('@pages/not-found-page').then(m => m.NotFoundPage),
    },
    {
        path: '**',
        redirectTo: '404'
    }
];
