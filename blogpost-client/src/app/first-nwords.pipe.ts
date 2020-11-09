import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstNWords'
})
export class FirstNWordsPipe implements PipeTransform {

  transform(value: string, n: number): string {
    if (value == null) {
      return value;
    }
    let words = value.split(' ');
    let numOfWords = words.length < n ? words.length : n;
    let firstNWords = words.slice(0, numOfWords);
    return firstNWords.join(" ");

  }

}
