import { Tasks } from './../models/Tasks';
import { TasksService } from './../services/tasks.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  tasks: Tasks[];
  editState: boolean = false;
  taskToEdit: Tasks;
  showForm: boolean = false;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.tasksService.getTasks().subscribe(item => {
      this.tasks = item;
    });
  }


  deleteTask(event, item: Tasks) {
    this.clearState();
    this.tasksService.deleteTask(item);
  }

  clearState() {
    this.editState = false;
    this.taskToEdit = null;
  }

  editTask(event, item) {
    this.editState = true;
    this.taskToEdit = item;
    console.log('clicked editTask');

  }

  updateTask(task) {
    this.clearState();
    this.tasksService.updateTask(task);
    console.log('clicked updateTask in ts');

  }

  showAddForm() {
    this.showForm = !this.showForm;
  }
}

