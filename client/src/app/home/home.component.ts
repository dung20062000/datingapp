import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  registerMode = false;
  // users: any;  //bien de nhan du lieu tu component cha

  constructor() {}
  //ham khoi tao der chay component
  ngOnInit(): void{

  }
  registerToggle(){
    this.registerMode = !this.registerMode;
  }
  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }
}
