import { Component } from '@angular/core';
import {TaskService} from '../task.service';
import {Task} from '../Task';

@Component({
  moduleId: module.id,
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent {

  tasks: Task[];
  title: string;
  
  constructor(private taskService:TaskService){
      this.taskService.getTasks()
          .subscribe(tasks => {
              this.tasks = tasks;
          });
  }
  
  addTask(event){
      event.preventDefault();
      var newTask = {
          title: this.title
      }
      
      this.taskService.addTask(newTask)
          .subscribe(task => {
              this.tasks.push(task);
              this.title = '';
          });
  }
  
  deleteTask(id){
      var tasks = this.tasks;
      
      this.taskService.deleteTask(id).subscribe(data => {
            for(var i = 0;i < tasks.length;i++){
                if(tasks[i].id == id){
                    tasks.splice(i, 1);
                }
            }
      });
  }
  
  updateStatus(task){
      var _task = {
          id:task.id,
          title: task.title,
          complete: !task.complete
      };
      
      this.taskService.updateStatus(_task).subscribe(data => {
          task.complete = !task.complete;
      });
  }

}
