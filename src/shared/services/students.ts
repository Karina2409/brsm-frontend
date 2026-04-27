import { Injectable } from '@angular/core';
import { AllStudents } from '@interfaces/all-students';

@Injectable({
  providedIn: 'root',
})
export class Students {
  public findStudentsInfo(): AllStudents[] {
    return [
      {
        id: 1,
        surname: 'Иванов',
        name: 'Иван',
        patronymic: 'Иванович',
        photo: null,
        groupNumber: 'ИТ-21',
        eventsCount: 2,
      },
      {
        id: 2,
        surname: 'Петрова',
        name: 'Анна',
        patronymic: 'Сергеевна',
        photo: null,
        groupNumber: 'ИТ-21',
        eventsCount: 3,
      },
      {
        id: 3,
        surname: 'Сидоров',
        name: 'Дмитрий',
        patronymic: 'Александрович',
        photo: null,
        groupNumber: 'ЭК-22',
        eventsCount: 1,
      },
      {
        id: 4,
        surname: 'Козлова',
        name: 'Екатерина',
        patronymic: 'Владимировна',
        photo: null,
        groupNumber: 'ИТ-21',
        eventsCount: 5,
      },
      {
        id: 5,
        surname: 'Морозов',
        name: 'Алексей',
        patronymic: 'Павлович',
        photo: null,
        groupNumber: 'МН-20',
        eventsCount: 3,
      },
      {
        id: 6,
        surname: 'Новикова',
        name: 'Ольга',
        patronymic: 'Николаевна',
        photo: null,
        groupNumber: 'ЭК-22',
        eventsCount: 0,
      },
      {
        id: 7,
        surname: 'Волков',
        name: 'Сергей',
        patronymic: 'Андреевич',
        photo: null,
        groupNumber: 'ИТ-21',
        eventsCount: 4,
      },
      {
        id: 8,
        surname: 'Лебедева',
        name: 'Мария',
        patronymic: 'Денисовна',
        photo: null,
        groupNumber: 'МН-20',
        eventsCount: 3,
      },
      {
        id: 9,
        surname: 'Федоров',
        name: 'Артем',
        patronymic: 'Максимович',
        photo: null,
        groupNumber: 'ЭК-22',
        eventsCount: 7,
      },
      {
        id: 10,
        surname: 'Смирнова',
        name: 'Дарья',
        patronymic: 'Романовна',
        photo: null,
        groupNumber: 'ИТ-21',
        eventsCount: 11,
      },
    ];
  }
}
