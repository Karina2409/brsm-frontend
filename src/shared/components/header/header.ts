import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matAccountCircle } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  viewProviders: [provideIcons({ matAccountCircle })],
})
export class Header {}
