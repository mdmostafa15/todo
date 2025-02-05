import { Component, inject } from '@angular/core';
import { MatIconModule} from '@angular/material/icon'
import { Todo } from './todo';
import { TodosService } from './todos.service';
import { ModalComponent } from "./modal/modal.component";

@Component({
  selector: 'app-root',
  imports: [MatIconModule, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  todos: Todo[] =[];
  todoService: TodosService = inject(TodosService);
  hidden: boolean = true;

  constructor() {
    this.todoService.getTodos().then((todos)=>{
      this.todos = todos;
    }); 
  }


  // showing Modal
  showModal() {
    this.hidden = false;
    console.log("showModal function is called!! ");
  }


  hideModal() {
    this.hidden = true;
  }


  isTodoCompleted (idx: number, todo: Todo) {
    if (todo) {
      const obj: Todo = {
        ...todo,
        completed: !todo.completed
      }

      this.todos![idx] = obj;
      this.todoService.updateTodo(obj);
      console.log("is completed function is clicked!!! :) ");
    }
  }

  
  deleteTodo (idx: number) {
    const datum = this.todos?.splice(idx,1);
    if (datum.length) {
      this.todoService.deleteTodo(datum[0].id)
    }
  }


  updateTodo (idx:number, todo:Todo) {
    this.todos[idx] = {
      ...todo,
      title: "hello for updating"
    }

    console.log("Button is clicked for updating!!!");
  }

  
}
