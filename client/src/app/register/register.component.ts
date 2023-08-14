import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  //su dung input de nhan du lieu tu component home
  // @Input() usersFromHomeComponent: any;

  //tạo sự kiện mà component cha có thể nghe
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor (private accountService: AccountService) {

  }

  ngOnInit() {

  };

  register() {
    this.accountService.register(this.model).subscribe(response => {
      console.log(response);
      this.cancel();
    }, err => {
      console.log(err);
    });
  };
  cancel()  {
    //gọi đến phương thức emit của EventEmitter để xét false đóng model
    this.cancelRegister.emit(false);

  }
}
