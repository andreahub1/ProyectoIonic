import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { Task } from '../models/task.models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {

  // arreglo de tareas
  tasks: Task[] = [
    {
      id: 1,
      titulo: 'Configuracion ionic',
      descripcion: 'Instalar Node.js, Angular CLI',
      finalizado: true,
      prioridad: 'Alta'
    },
    {
      id: 2,
      titulo: 'Configurar proyecto',
      descripcion: 'Crear proyecto con Angular CLI',
      finalizado: true,
      prioridad: 'Alta'
    }
  ];

  constructor() {
    console.log(this.tasks);
  }

}