import { Component } from '@angular/core';
import {Search} from '@components/search';
import {MultiSelectModule} from 'primeng/multiselect';
import {FormsModule} from '@angular/forms';
import {Faculty} from '@interfaces/faculty';
import {StudentSearchParams} from '@interfaces/student-search-params';

@Component({
  selector: 'app-students-page',
  imports: [
    Search,
    MultiSelectModule,
    FormsModule
  ],
  templateUrl: './students-page.html',
  styleUrl: './students-page.scss'
})
export class StudentsPage {
  faculties: Faculty[] = [
    {name: "ФКП", code: "FKP"},
    {name: "ФИТУ", code: "FITU"},
    {name: "ФРЭ", code: "FRE"},
    {name: "ФКСиС", code: "FKSIS"},
    {name: "ФИБ", code: "FIB"},
    {name: "ИЭФ", code: "IEF"},
    {name: "ВФ", code: "VF"}
  ];

  filters: StudentSearchParams = {
    surname: '',
    faculties: []
  };

  onSearch (surname: string) {
    this.filters.surname = surname;
    this.performSearch();
  }

  onFacultyChange() {
    this.performSearch();
  }

  performSearch() {
    console.log('Поиск с параметрами:', this.filters);
    //TODO (сервер): после добавления сервера добавить обращение к сервису
    // this.studentService.search(this.filters).subscribe(...)
  }
}
