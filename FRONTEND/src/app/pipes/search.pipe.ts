import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilterPipe'
})
export class SearchPipe implements PipeTransform {

  transform(data: any, inputValue: string) {

    return data.filter(
      (v: { title: string; author: string; }) => v.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 || v.author.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  }

}
