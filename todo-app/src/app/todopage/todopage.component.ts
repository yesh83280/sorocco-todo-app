import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { Todo } from '../Todo';

@Component({
  selector: 'app-todopage',
  templateUrl: './todopage.component.html',
  styleUrls: ['./todopage.component.scss']
})
export class TodopageComponent implements OnInit {
  tasks: Todo[] = []
  input: string = ""
  errorMsg: string = ""
  tasksLeft: number = 0
  tasksDone: number = 0

  constructor(private fb: FormBuilder, private todoService: TodoService) { }

  ngOnInit() {
    this.getTodoList()
  }

  getTodoList(){
    this.todoService.getAllTodos().subscribe({
      next: (value) => {
        if(value.success){
          this.tasks = value.data
          this.tasksLeft = this.tasks.filter(val => (val.isdone)?false:true).length
          this.tasksDone = this.tasks.length - this.tasksLeft
          console.log(this.tasks, this.tasksLeft)
        }
        else{
          this.tasks = []
          this.errorMsg = value.message
        }
      }, 
      error: (err) => {
        console.log("Error Occurred!!", err)
      }
    })
  }

  insertTodo(text: string){
    const tmpTodo = new Todo()
    tmpTodo.title = text
    this.todoService.postTodo(tmpTodo).subscribe({
      next: (value) => {
        if(value.success){
          this.getTodoList()
          this.input = ""
        }
        else{
          this.errorMsg = value.message
        }
      }, 
      error: (err) => {
        console.log("Error Occurred!!", err)
      }
    })
  }

  updateTodo(todo: Todo){
    this.todoService.updateTodo(todo).subscribe({
      next: (value) => {
        if(value.success){
          this.getTodoList()
        }
        else{
          this.errorMsg = value.message
        }
      }, 
      error: (err) => {
        console.log("Error Occurred!!", err)
      }
    })
  }

  deleteTodo(id: number){
    this.todoService.deleteTodo(id).subscribe({
      next: (value) => {
        if(value.success){
          this.getTodoList()
        }
        else{
          this.errorMsg = value.message
        }
      }, 
      error: (err) => {
        console.log("Error Occurred!!", err)
      }
    })
  }

  deleteTodosList(list:number[]){
    this.todoService.deleteTodosList(list).subscribe({
      next: (value) => {
        if(value.success){
          this.getTodoList()
        }
        else{
          this.errorMsg = value.message
        }
      }, 
      error: (err) => {
        console.log("Error Occurred!!", err)
      }
    })
  }

  saveTodo(){
    // console.log("Todo: ", this.input)
    this.insertTodo(this.input)
  }

  valueChangeCheckBox(event: Event, task: Todo){
    task.isdone = event.target["checked"]
    this.updateTodo(task)
  }

  deleteAllCompletedTodos(){
    let idsList = []
    this.tasks.forEach(val => {
      if(val.isdone){
        idsList.push(val.todoid)
      }
    })
    this.deleteTodosList(idsList)
  }


}
