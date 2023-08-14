import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating App';
  users: any;
  constructor(private http: HttpClient, private accountService: AccountService){}
  
  ngOnInit() {
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser(){
    //kiểm tra , nấu không có người dùng thì bỏ lưu userCurrent
    const userString: string | null = localStorage.getItem('user');
    if(userString !== null)
      {
        const user: User = JSON.parse(userString); ///ko co {}
        this.accountService.setCurrentUser(user);
      }
  }
  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe(response => {
      this.users = response;
    }, error => {
      console.log(error);
    })
  }
}
