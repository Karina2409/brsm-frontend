import { inject, Pipe, PipeTransform } from '@angular/core';
import { DateUtilsService } from '@utils/date-utils';

@Pipe({
    name: 'relativeDate',
})
export class RelativeDatePipe implements PipeTransform {
    private dateUtils = inject(DateUtilsService);

    transform(value: string | Date): string {
        if (!value) return '';
        return this.dateUtils.formatDateWithRelative(value);
    }
}
