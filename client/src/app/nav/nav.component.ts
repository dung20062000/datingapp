import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  // loggedIn: boolean = false;
  // currentUser$: Observable<User> | undefined;

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {
    // this.getCurrentUser();
    // this.currentUser$ = this.accountService.currentUser$;
  }

  login(){
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
      // this.loggedIn = true;
    }, (err) => {
      console.log(err);
    })
  }

  logout(){
    this.accountService.logout();
    // this.loggedIn = false;
  }
  // getCurrentUser(){
  //   this.accountService.currentUser$.subscribe(user => {
  //     this.loggedIn = !!user;
  //   }, err => {
  //     console.log(err);
  //   });
  // }
}
