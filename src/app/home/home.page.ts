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
      email: '',
      usuario: ''
    };
  }

  enviarForm(data) {
    console.log(data)

    let datosAEnviar: any = {
      email: data.email,
      usuario: data.usuario
    };

    console.log('Datos a enviar:' + JSON.stringify(datosAEnviar));

    this.personaService.create(datosAEnviar).subscribe(result => {
      console.log('Datos from server:' + JSON.stringify(result));
    });
  }

  actualizarForm(data) {
    console.log(data);
      let datosAEnviar: any = {
      email: data.email,
      usuario: data.usuario
    };

    console.log('Datos a enviar:' + JSON.stringify(datosAEnviar));

    this.personaService.update(datosAEnviar).subscribe(result => {
      console.log('Datos from server:' + JSON.stringify(result));
    });

  }
  mostrarDatos(data) {
    console.log(data);

    const datosAEnviar: any = {
      email: data.email,
      usuario: data.usuario
    };
    console.log('Todos los registros:' + JSON.stringify(datosAEnviar));

    this.personaService.getAll(datosAEnviar).subscribe(result => {
      console.log('Datos from server:' + JSON.stringify(result));
    });
  }
}
