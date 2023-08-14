import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  //su dung input de nhan du lieu tu component home
  @Input() usersFromHomeComponent: any;
  model: any = {};

  constructor () {

  }

  ngOnInit() {

  };

  register() {
    console.log(this.model)
  };
  cancel()  {
    console.log('cancel');

  }
}
