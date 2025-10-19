import { Component } from '@angular/core';
import {Search} from '@components/search';

@Component({
  selector: 'app-students-page',
  imports: [
    Search
  ],
  templateUrl: './students-page.html',
  styleUrl: './students-page.scss'
})
export class StudentsPage {
  onSearch (surname: string) {
    console.log(surname);
  }
}
