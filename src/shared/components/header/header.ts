import {Component, inject, OnInit} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matAccountCircle } from '@ng-icons/material-icons/baseline';
import {MenubarModule} from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import {AuthService} from '@services/auth';
import {TieredMenuModule} from 'primeng/tieredmenu';

@Component({
  selector: 'app-header',
  imports: [MenubarModule, TieredMenuModule, NgIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  viewProviders: [provideIcons({ matAccountCircle })],
})
export class Header implements OnInit {
  private authService = inject(AuthService);

  items: MenuItem[] = [];
  profileItems: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      ...(this.authService.isStudent() ? [
        { label: 'Главная', routerLink: '/main', icon: 'pi pi-home' },
      ] : []),

      ...(this.authService.isSecretary() || this.authService.isChiefSecretary() ? [
        { label: 'Студенты', routerLink: '/students', icon: 'pi pi-graduation-cap' },
      ] : []),

      { label: 'Мероприятия', routerLink: '/events', icon: 'pi pi-calendar-clock' },

      ...(this.authService.isSecretary() || this.authService.isChiefSecretary() ? [
        { label: 'Документы', routerLink: '/documents', icon: 'pi pi-file' },
        { label: 'Статистика', routerLink: '/statistic', icon: 'pi pi-chart-bar' }
      ] : []),

      ...(this.authService.isChiefSecretary() ? [
        { label: 'Пользователи', routerLink: '/users', icon: 'pi pi-users' },
        { label: 'Настройки', routerLink: '/settings', icon: 'pi pi-cog' },
      ] : []),

      { label: 'Календарь', routerLink: '/calendar', icon: 'pi pi-calendar' }
    ];

    this.profileItems = [
      {
        label: 'Профиль',
        routerLink: '/profile',
        icon: 'pi pi-user',
      },
      ...(this.authService.isStudent() ? [
        {
          label: 'Мои мероприятия',
          routerLink: '/my-events',
          icon: 'pi pi-calendar' },
      ] : []),
      {
        label: 'Настройки',
        routerLink: '/my-settings',
        icon: 'pi pi-cog',
      },
      {
        label: 'Изменить пароль',
        routerLink: '/change-password',
        icon: 'pi pi-key',
      },
      {
        separator: true
      },
      {
        label: 'Выход',
        icon: 'pi pi-sign-out',
        command: () => this.authService.logout()
      }
    ]
  }
}
