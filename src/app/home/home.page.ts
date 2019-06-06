import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { PersonaService } from '../service/persona.service';
import { NotificationService } from '../service/notification.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  private mensaje: String = null;
  public mySubject: BehaviorSubject<any>;
  public dataTable = [];
  data: any;

  constructor(
    public personaService: PersonaService,
    public notificationService: NotificationService
  ) {

    this.mySubject = new BehaviorSubject(null);

    this.data =  {
      email: '',
      usuario: ''
    };
  }

  public enviarForm(data) {
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

  public actualizarForm(data) {
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
  public mostrarDatos(data) {
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

  private handleMessageReceived(message: any): void {
    console.log('Menseje recibido' + JSON.stringify(message));
   
  }

  public doNotificationSubscription(): void{

    try{
      this.notificationService.getPersonaNotification().subscribe((result) =>{
        this.handleMessageReceived(result);
  
      });
    } catch(e){
      console.log(e);
    }
  }

  private initData(data) {

    this.data = ({
      email: data.email,
      usuario: data.usuario
    });

  }

  public ProcesarMySubject(result: any): void{
    console.log('hacer algo con: ' + JSON.stringify(result));
    this.mensaje = this.mensaje + '' + JSON.stringify(result);
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log('on after view');
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('on destroy');
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    console.log('on init'),

    this.doNotificationSubscription();

    this.initData(this.data);

    this.mySubject.subscribe((result) => {
      this.ProcesarMySubject(result)
    });

    this.personaService
      .personaList(null)
      .subscribe((result) => {
        console.log('Resultado:' + JSON.stringify(result));
      });
  }
}
