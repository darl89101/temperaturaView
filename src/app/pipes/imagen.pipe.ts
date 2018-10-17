import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): string {
    let url = URL_SERVICIOS + '/img/';

    if (!img) {
      return url + 'notipo/123';
    }
    if (img.startsWith('https')) {
      return img;
    }

    switch (tipo) {
      case 'usuario':
      url += `/usuarios/${img}`;
      break;
      case 'medico':
      url += `/medicos/${img}`;
      break;
      case 'hospital':
      url += `/hospitales/${img}`;
      break;
      default:
      url += 'notipo/123';
      break;
    }
    return url;
  }

}
