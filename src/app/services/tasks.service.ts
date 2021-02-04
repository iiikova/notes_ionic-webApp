import { Tasks } from './../models/Tasks';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasksCollection: AngularFirestoreCollection<Tasks>;
  tasks: Observable<Tasks[]>;
  tasksDoc: AngularFirestoreDocument<Tasks>;

  constructor(public afs: AngularFirestore) {
    this.tasksCollection = this.afs.collection('Tasks', ref => ref.orderBy('title', 'asc'));

    this.tasks = this.afs.collection('Tasks').snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Tasks;
          data.id = a.payload.doc.id;
          return data;
        });
      }));

    // only for get data from DB
    // this.tasks = this.afs.collection('Tasks').valueChanges();
  }

  getTasks() {
    return this.tasks;
  }

  addTask(tasks: Tasks) {
    this.tasksCollection.add(tasks);
  }

  deleteTask(item: Tasks) {
    this.tasksDoc = this.afs.doc(`Tasks/${item.id}`);
    this.tasksDoc.delete();
  }

  updateTask(task: Tasks) {
    this.tasksDoc = this.afs.doc(`Tasks/${task.id}`);
    this.tasksDoc.update(task);
    console.log('update in service');

  }

}