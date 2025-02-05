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
  todos: Todo[] = [];
  todoService: TodosService = inject(TodosService);
  hidden: boolean = true;
  todoTitle: string="";
  idx!: number;
  todo!: Todo;
  snackBar: {
    flag: boolean,
    msg: string
  } = {
    flag: false,
    msg: "",
  }

  constructor() {
    this.todoService.getTodos().then((todos)=>{
      this.todos = todos;
    }); 
  }


  showSnack (msg: string) {
    this.snackBar.flag=true;
    this.snackBar.msg=msg;
    setTimeout(()=>{
      this.snackBar.flag=false;
    },1000); 
  }


  showModal() {
    this.hidden = false;
    this.showSnack("Modal is Showing!");
      
  }


  hideModal() {
    this.hidden = true;
    this.todoTitle="";
  }


  isTodoCompleted (idx: number, todo: Todo) {
    if (todo) {
      const obj: Todo = {
        ...todo,
        completed: !todo.completed
      }

      this.todos![idx] = obj;
      this.todoService.updateTodo(obj);
      if (!todo.completed)
        this.showSnack("Task is Completed :) ");
      else
        this.showSnack("Task is Undo!");
    }
  }

  
  deleteTodo (idx: number) {
    const datum = this.todos?.splice(idx,1);
    if (datum.length) {
      this.todoService.deleteTodo(datum[0].id)
      this.showSnack("Task is deleted!");
    }
  }


  updateTodo (modifiedTitle: string) {
    if (modifiedTitle !== "") {
      const obj = {
        ...this.todo,
        title: modifiedTitle,
      }
  
      this.todos[this.idx] = obj;
      this.todoService.updateTodo(obj);
      this.showSnack("Task is updated!");
    }
    this.hideModal();
  }


  updateItemCall (idx:number, todo:Todo) {
    this.idx = idx; 
    this.todo = todo;
    this.todoTitle=todo.title;
    this.showModal();
  }


  createTodo (title: string) {
    const len: number = this.todos.length;
    if (title!=="") {
      const id = Number(this.todos[len - 1].id) +1;
      const obj: Todo = {
        userId: Math.floor(Math.random() * 3) + 1,
        id: id.toString(10),
        title,
        completed: false
      }

      this.todos.push(obj);
      this.todoService.createTodo(obj);
      this.showSnack("Task is inserted!!!");
    }

    this.hideModal();
  }
  
}
