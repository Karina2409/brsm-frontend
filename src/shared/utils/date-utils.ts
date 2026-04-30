import { Injectable } from '@angular/core';
import { pluralize } from '@utils/string-utils';

@Injectable({
    providedIn: 'root',
})
export class DateUtilsService {
    /**
     * Форматирует время мероприятия (HH:mm)
     */
    formatTime(date: string | Date, time: string | Date): string {
        const d = new Date(`${date}T${time}`);
        return d.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    /**
     * Возвращает дату с относительным указанием дней (сегодня, завтра, через X дней)
     */
    formatDateWithRelative(date: string | Date): string {
        const d = new Date(date);
        const formattedDate = d.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const diffTime = d.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return `${formattedDate} (${this.getRelativeDaysWord(diffDays)})`;
    }

    private getRelativeDaysWord(days: number): string {
        if (days === 0) return 'сегодня';
        if (days === 1) return 'завтра';
        if (days < 0) return 'прошло';

        const word = pluralize(days, ['день', 'дня', 'дней']);
        return `через ${days} ${word}`;
    }
}
