import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@components/header';
import {AuthService} from '@services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  authService = inject(AuthService);
}
