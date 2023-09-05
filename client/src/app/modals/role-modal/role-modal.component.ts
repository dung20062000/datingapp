import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.css']
})
export class RoleModalComponent {
  title: string;
  list: any;
  closeBtnName: string;

  constructor(public bsModalRef: BsModalRef){

  }
  ngOnInit() : void {
    
  }

}
