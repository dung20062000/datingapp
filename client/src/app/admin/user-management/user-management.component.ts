import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { RoleModalComponent } from 'src/app/modals/role-modal/role-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {
  users: Partial<User[]>
  bsModalRef: BsModalRef;
  constructor(private adminService: AdminService, private modalService: BsModalService){

  }
  
  ngOnInit() : void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe(
      users => {
        this.users = users
      }
    )
  }
  openRolesModal(){
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title:'Modal with component'
    };
    this.bsModalRef = this.modalService.show(RoleModalComponent,{initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
