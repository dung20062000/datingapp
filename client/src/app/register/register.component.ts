import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //su dung input de nhan du lieu tu component home
  // @Input() usersFromHomeComponent: any;

  //tạo sự kiện mà component cha có thể nghe
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup;

  constructor (private accountService: AccountService, private toastr: ToastrService, 
    private fb: FormBuilder) {

  }

  ngOnInit(): void {  
    this.initializeForm();
  };
  initializeForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
  }
  
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value 
      ? null : {isMatching: true}
    } 
  }

  register() {
    console.log(this.registerForm?.value);
    // this.accountService.register(this.model).subscribe(response => {
    //   console.log(response);
    //   this.cancel();
    // }, err => {
    //   console.log(err);
    //   this.toastr.error(err.error)
    // });
  };
  cancel()  {
    //gọi đến phương thức emit của EventEmitter để xét false đóng model
    this.cancelRegister.emit(false);

  }
}
