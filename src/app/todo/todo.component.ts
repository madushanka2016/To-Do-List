import { Component, OnInit } from '@angular/core';
import { TodoService } from '../servise/todo.service';
import { element } from '@angular/core/src/render3';
import { Key } from 'protractor';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers:[TodoService]
})
export class TodoComponent implements OnInit {
  todoListArry:any[];
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getToDoList().snapshotChanges()
    .subscribe(item => {
      this.todoListArry = [];
      item.forEach(element => {
        var x = element.payload.toJSON();
        x["$key"] = element.key;
        this.todoListArry.push(x);
      })
      //sort array ischecked false, true
      this.todoListArry.sort((a,b) => {
        return a.isChecked - b.isChecked;
      })
    });
  }
  onAdd(itemTitle){
    this.todoService.addTitle(itemTitle.value);
    itemTitle.value = null;
  }
  chaneCheckStatus($key: string,isCheeck:boolean){
    this.todoService.checkOrUncheckTitle($key,!isCheeck);
  }
  deleteDoItem($key: string){
    this.todoService.removeTitle($key);
  }

}
