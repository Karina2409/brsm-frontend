import { inject, Pipe, PipeTransform } from '@angular/core';
import { DateUtilsService } from '@utils/date-utils';
import { Event } from '@interfaces/event';

@Pipe({
    name: 'eventTime',
})
export class EventTimePipe implements PipeTransform {
    private dateUtils = inject(DateUtilsService);

    transform(event: Event): string {
        if (!event) return '';
        return this.dateUtils.formatTime(event.date, event.time);
    }
}
