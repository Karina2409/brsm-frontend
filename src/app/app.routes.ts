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

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: ProfilePage,
  },
  {
    path: 'students',
    component: StudentsPage,
  },
  {
    path: 'users',
    component: UsersPage,
  },
  {
    path: 'settings',
    component: SettingsPage,
  },
  {
    path: 'user-actions',
    component: UserActionsPage,
  },
  {
    path: 'events',
    component: EventsPage,
  },
  {
    path: 'documents',
    component: DocumentsPage,
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
  },
  {
    path: 'calendar',
    component: CalendarPage,
  },
];
