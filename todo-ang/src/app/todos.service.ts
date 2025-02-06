import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private url = "http://localhost:3000/todos";

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url)
  }

  createTodo (obj: Todo) {
    return this.http.post<Todo>(`${this.url}`, JSON.stringify(obj));
  }


  updateTodo (todo: Todo) {
    return this.http.put<Todo>(`${this.url}/${todo.id}`, JSON.stringify(todo));
  }


  deleteTodo (id: string) {
    return this.http.delete<string>(`${this.url}/${id}`);
  }

}
