import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Todo } from '../Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public url = environment.baseUrl

  getAllTodos() {
    return this.http.get<ResponseDTO>(`${this.url}/api/todo`);
  }

  postTodo(data: Todo) {
    return this.http.post<ResponseDTO>(`${this.url}/api/todo`, data);
  }

  updateTodo(data: Todo) {
    return this.http.put<ResponseDTO>(`${this.url}/api/todo/${data.todoid}`,data);
  }

  deleteTodo(id: number) {
    return this.http.delete<ResponseDTO>(`${this.url}/api/todo/${id}`);
  }

  deleteTodosList(idsList: number[]) {
    return this.http.delete<ResponseDTO>(`${this.url}/api/todo`, {
      body: idsList
    });
  }

  constructor(private http: HttpClient) { }
}

export interface ResponseDTO{
  success:boolean,
  data: Todo[],
  message: string
}
