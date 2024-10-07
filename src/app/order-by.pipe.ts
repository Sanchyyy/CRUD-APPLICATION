import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(value: any[], column: string | null, direction: string): any[] {
    if (!value || !column || !direction) {
      return value;
    }
    return value.sort((a, b) => {
      let aValue = a[column];
      let bValue = b[column];
      if (aValue == null) aValue = '';
      if (bValue == null) bValue = '';

      let comparison = 0;
      if (aValue > bValue) {
        comparison = 1;
      } else if (aValue < bValue) {
        comparison = -1;
      }

      return direction === 'asc' ? comparison : -comparison;
    });
  }
}
