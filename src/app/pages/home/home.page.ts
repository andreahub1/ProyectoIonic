import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonList, IonIcon } from '@ionic/angular/standalone';
import { Task } from '../../models/task.models';
import { addIcons } from 'ionicons';
import {addOutline} from 'ionicons/icons';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonList, IonIcon],
})
export class HomePage {

  newTaskStr: string = '';
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
    addIcons({addOutline})
  }

  addTask() {
  console.log(this.newTaskStr);

  const newTask: Task = {
    id: Date.now(),
    titulo: this.newTaskStr,
    descripcion: '',
    finalizado: false,
    prioridad: 'Media'
  };

  this.tasks.push(newTask);
  this.newTaskStr = '';
  console.log(this.tasks);
}
}