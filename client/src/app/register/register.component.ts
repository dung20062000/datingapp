import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];

  constructor (private accountService: AccountService, 
                private toastr: ToastrService, 
                private fb: FormBuilder,
                private router: Router) {

  }

  ngOnInit(): void {  
    this.initializeForm();

    //thiết lập ngày tháng trong datepicker trên 18t
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  };
  initializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
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
    // console.log(this.registerForm?.value);
    this.accountService.register(this.registerForm.value).subscribe(response => {
      // console.log(response);
      this.router.navigateByUrl('/members');
    }, err => {
      this.validationErrors = err;
    });
  };
  cancel()  {
    //gọi đến phương thức emit của EventEmitter để xét false đóng model
    this.cancelRegister.emit(false);

  }
}
