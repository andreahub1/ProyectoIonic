import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonItem,
  IonList,
  IonLabel,
  IonInput,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonReorder,
  IonReorderGroup
} from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular/standalone';

import { Task } from '../../models/task.models';
import { addIcons } from 'ionicons';
import { addOutline, trashOutline } from 'ionicons/icons';

import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonIcon,
    IonLabel,
    IonList,
    IonTitle,
    IonButton,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonItem,
    IonInput,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonReorder,
    IonReorderGroup
  ]
})
export class HomePage implements OnInit {

  newTaskStr: string = '';

  constTasksKey = 'tasks';

  tasks: Task[] = [
    {
      id: 1,
      titulo: 'Configuración de Ionic',
      descripcion: 'Instalar Node.js, AngularCli, Ionic',
      finalizado: true,
      prioridad: 'Alta'
    },
    {
      id: 2,
      titulo: 'Crear app tasklist',
      descripcion: 'Crear el proyecto inicial de Ionic con Angular',
      finalizado: false,
      prioridad: 'Media'
    }
  ];

  constructor(private alertController: AlertController) {
    addIcons({
      addOutline,
      trashOutline
    });
  }

  async ionViewWillEnter() {

    const { value } = await Preferences.get({
      key: this.constTasksKey
    });

    if (value) {
      this.tasks = JSON.parse(value);
    } else {
      await this.guardarTareas();
    }
  }

  async guardarTareas() {

    await Preferences.set({
      key: this.constTasksKey,
      value: JSON.stringify(this.tasks)
    });

  }

  async addTask() {

    const titulo = this.newTaskStr.trim();

    if (!titulo) {
      alert('El título no puede estar vacío');
      this.newTaskStr = '';
      return;
    }

    const existe = this.tasks.some(
      task => task.titulo.toLowerCase() === titulo.toLowerCase()
    );

    if (existe) {
      alert('Ya existe una tarea con ese título');
      this.newTaskStr = '';
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      titulo,
      descripcion: '',
      finalizado: false,
      prioridad: 'Media'
    };

    this.tasks.push(newTask);
    this.newTaskStr = '';

    await this.guardarTareas();
    await this.mostrarExito();
  }

  async mostrarExito() {

    try {

      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Tarea agregada',
        buttons: ['OK']
      });

      await alert.present();

    } catch (error) {

      console.error('ERROR MOSTRAR EXITO:', error);

    }

  }

  async confirmDelete(task: Task) {

    try {

      const alert = await this.alertController.create({
        header: 'Confirmar eliminación',
        message: '¿Deseas eliminar esta tarea?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Aceptar',
            handler: () => {
              this.deleteTask(task);
            }
          }
        ]
      });

      await alert.present();

    } catch (error) {

      console.error('ERROR DELETE:', error);

    }

  }

  async deleteTask(taskRemove: Task) {

    const index = this.tasks.findIndex(
      task => task === taskRemove
    );

    if (index >= 0) {
      this.tasks.splice(index, 1);

      await this.guardarTareas();
    }
  }

  async actualizarPosiciones(event: any) {

    this.tasks = event.detail.complete(this.tasks);

    await this.guardarTareas();

  }

  ngOnInit() {
  }
}