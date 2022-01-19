import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderFilterPipe'
})
export class BookFilterPipe implements PipeTransform {

  transform(data: any, radioValue: string) {

    return data.filter(
      (v: { gender: string; }) => v.gender.toLowerCase().indexOf(radioValue.toLowerCase()) > -1 );
  }

}
