import {Component, inject, OnInit} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matAccountCircle } from '@ng-icons/material-icons/baseline';
import {MenubarModule} from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import {Router} from '@angular/router';
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
  private router = inject(Router);
  private authService = inject(AuthService);

  items: MenuItem[] = [];
  profileItems: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      { label: 'Студенты', routerLink: '/students', icon: 'pi pi-graduation-cap' },
      { label: 'Пользователи', routerLink: '/users', icon: 'pi pi-users' },
      { label: 'Мероприятия', routerLink: '/events', icon: 'pi pi-calendar-clock' },
      { label: 'Документы', routerLink: '/documents', icon: 'pi pi-file' },
      { label: 'Статистика', routerLink: '/statistic', icon: 'pi pi-chart-bar' },
      { label: 'Календарь', routerLink: '/calendar', icon: 'pi pi-calendar' }
    ];

    this.profileItems = [
      {
        label: 'Профиль',
        icon: 'pi pi-user',
        command: () => this.router.navigate(['/profile'])
      },
      {
        label: 'Настройки',
        icon: 'pi pi-cog',
        command: () => this.router.navigate(['/settings'])
      },
      {
        label: 'Изменить пароль',
        icon: 'pi pi-key',
        command: () => this.router.navigate(['/change-password'])
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
