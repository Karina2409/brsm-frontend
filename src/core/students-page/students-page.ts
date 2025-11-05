import {Component, inject} from '@angular/core';
import {Search} from '@components/search';
import {MultiSelectModule} from 'primeng/multiselect';
import {FormsModule} from '@angular/forms';
import {Faculty} from '@interfaces/faculty';
import {StudentSearchParams} from '@interfaces/student-search-params';
import {Students} from '@services/students';
import {AllStudents} from '@interfaces/all-students';
import {StudentCard} from '@components/student-card/student-card';

@Component({
  selector: 'app-students-page',
  imports: [
    Search,
    MultiSelectModule,
    FormsModule,
    StudentCard
  ],
  templateUrl: './students-page.html',
  styleUrl: './students-page.scss'
})
export class StudentsPage {

  public students: AllStudents[];

  private readonly studentsService = inject(Students);

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

  constructor() {
    this.students = this.studentsService.findStudentsInfo();
  }

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
