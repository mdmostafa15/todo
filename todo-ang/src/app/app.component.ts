import { Component, inject } from '@angular/core';
import { MatIconModule} from '@angular/material/icon';
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
    this.todoService.getTodos()
    .subscribe((todos: Todo[])=>{
      this.todos = todos;
    }); 
  }


  showTost (msg: string) {
    this.snackBar.flag=true;
    this.snackBar.msg=msg;
    setTimeout(()=>{
      this.snackBar.flag=false;
    },1000); 
  }


  showModal() {
    this.hidden = false;
    this.showTost("Modal is Showing!");
      
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
      this.todoService.updateTodo(obj).subscribe((response)=>{
        this.todos[idx]=response;
      });
      if (!todo.completed)
        this.showTost("Task is Completed :) ");
      else
        this.showTost("Task is Undo!");
    }
  }

  
  deleteTodo (index: number) {
      this.todoService.deleteTodo(this.todos[index].id).subscribe((response)=>{
        console.log(response && this.todos.splice(index,1));
      })
      this.showTost("Task is deleted!");
  }


  updateTodo (modifiedTitle: string) {
    if (modifiedTitle !== "") {
      const obj = {
        ...this.todo,
        title: modifiedTitle,
      }
      this.todoService.updateTodo(obj).subscribe((response)=>{
        this.todos[this.idx]=response;
      });
      this.showTost("Task is updated!");
    }
    this.hideModal();
  }


  itemUpdateCall (idx:number, todo:Todo) {
    this.idx = idx; 
    this.todo = todo;
    this.todoTitle=todo.title;
    this.showModal();
  }


  createTodo (title: string) {
    if (title!=="") {
      const id = Number(this.todos[this.todos.length - 1].id) +1;
      const obj: Todo = {
        userId: Math.floor(Math.random() * 3) + 1,
        id: id.toString(10),
        title,
        completed: false
      }
      
      this.todoService.createTodo(obj).subscribe((response)=>{
        this.todos.push(response);
      });
      this.showTost("Task is inserted!!!");
    }
    this.hideModal();
  }
  
}
