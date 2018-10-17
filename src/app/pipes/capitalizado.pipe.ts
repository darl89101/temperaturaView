import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizado'
})
export class CapitalizadoPipe implements PipeTransform {

  transform(value: string): string {
    let separado: string[] = value.split(' ');
    for (let index = 0; index < separado.length; index++) {
      separado[index] = separado[index][0].toUpperCase() + separado[index].substr(1, separado[index].length - 1).toLowerCase();
    }
    return separado.join(' ');
  }

}
