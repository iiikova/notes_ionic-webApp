import { TasksService } from './../services/tasks.service';
import { Tasks } from './../models/Tasks';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  task: Tasks = {
    title: '',
  };

  constructor(private tasksService: TasksService) { }

  ngOnInit() { }


  onSubmit() {
    if (this.task.title !== '') {
      this.tasksService.addTask(this.task)
    }
    this.task.title = '';
  }
}


