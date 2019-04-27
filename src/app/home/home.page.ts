import { Component } from '@angular/core';
import { PersonaService } from '../service/persona.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  data: any;

  constructor(
    public personaService: PersonaService
  ) {

    this.data =  {
      nombre: '',
      apellido: '',
      edad: null
    }
  }

  enviarForm(data) {
    console.log(data)

    let datosAEnviar: any = {
      primerNombre: data.nombre,
      segundoNombre: data.apellido,
      edad: data.edad
    };

    console.log('Datos a enviar:' + JSON.stringify(datosAEnviar));

    this.personaService.create(datosAEnviar).subscribe(result => {
      console.log('Datos from server:' + JSON.stringify(result));
    });
  }

  actualizarForm(data) {
    console.log(data)
  
    let datosAEnviar: any = {
      primerNombre: data.nombre,
      segundoNombre: data.apellido,
      edad: data.edad
    };

    console.log('Datos a enviar:' + JSON.stringify(datosAEnviar));

    this.personaService.update(datosAEnviar).subscribe(result => {
      console.log('Datos from server:' + JSON.stringify(result));
    });

  }

}
