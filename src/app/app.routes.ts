import { Routes } from '@angular/router';
import { ProfilePage } from '@pages/profile-page';
import { StudentsPage } from '@pages/students-page';
import { UsersPage } from '@pages/users-page';
import { EventsPage } from '@pages/events-page';
import { DocumentsPage } from '@pages/documents-page';
import { StatisticsPage } from '@pages/statistics-page';
import { CalendarPage } from '@pages/calendar-page';
import { PetitionsPage } from '@pages/petitions-page';
import { ReportsPage } from '@pages/reports-page';
import { ExemptionsPage } from '@pages/exemptions-page';
import { SettingsPage } from '@pages/settings-page';
import { UserActionsPage } from '@pages/user-actions-page';
import {Login} from '@pages/login-page';
import {guestGuard} from '../shared/guards/guest-guard';
import {authGuard} from '../shared/guards/auth-guard';
import {roleGuard} from '../shared/guards/role-guard';

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
    canActivate: [roleGuard(['SECRETARY', 'CHIEF_SECRETARY'])]
  },
  {
    path: 'users',
    component: UsersPage,
    canActivate: [roleGuard(['CHIEF_SECRETARY'])]
  },
  {
    path: 'settings',
    component: SettingsPage,
    canActivate: [roleGuard(['CHIEF_SECRETARY'])]
  },
  {
    path: 'user-actions',
    component: UserActionsPage,
    canActivate: [roleGuard(['CHIEF_SECRETARY'])]
  },
  {
    path: 'events',
    component: EventsPage,
    canActivate: [roleGuard(['SECRETARY', 'CHIEF_SECRETARY'])]
  },
  {
    path: 'documents',
    component: DocumentsPage,
    canActivate: [roleGuard(['SECRETARY', 'CHIEF_SECRETARY'])],
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
    canActivate: [roleGuard(['SECRETARY', 'CHIEF_SECRETARY'])]
  },
  {
    path: 'calendar',
    component: CalendarPage,
    canActivate: [roleGuard(['SECRETARY', 'CHIEF_SECRETARY'])]
  },
];
