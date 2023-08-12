import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  loggedIn: boolean = false;
  constructor(private accuountService: AccountService) {}

  ngOnInit(): void {

  }

  login(){
    this.accuountService.login(this.model).subscribe(response => {
      console.log(response);
      this.loggedIn = true;
    }, (err) => {
      console.log(err);
    })
  }

  logout(){
    this.loggedIn = false;
  }
}
