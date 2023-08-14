import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  registerMode = false;
  users: any;  //bien de nhan du lieu tu component cha

  constructor(private http: HttpClient) {}
  //ham khoi tao der chay component
  ngOnInit(): void{
    this.getUsers();
  }
  registerToggle(){
    this.registerMode = !this.registerMode;
  }
  getUsers(){
    this.http.get('https://localhost:5001/api/users').subscribe(users =>  this.users = users = users);

  }
  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }
}
