import { Pipe, PipeTransform } from '@angular/core';
import { pluralize } from '@utils/string-utils';

@Pipe({
    name: 'plural',
    standalone: true
})
export class PluralPipe implements PipeTransform {
    transform(value: number, one: string, two: string, five: string): string {
        return pluralize(value, [one, two, five]);
    }
}
