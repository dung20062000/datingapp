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
  openRolesModal(user: User){
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        user,
        roles: this.getRolesArray(user)
      }
    }
    this.bsModalRef = this.modalService.show(RoleModalComponent, config);
    this.bsModalRef.content.updateSelectedRoles.subscribe(
      values => {
        const rolesToUpdate = {
          roles: [...values.filter(el => el.checked === true).map(el => el.name)]
        };
        // console.log(rolesToUpdate);
        if(rolesToUpdate) {
          this.adminService.updateUserRoles(user.username, rolesToUpdate.roles).subscribe(
            () => {
              user.roles = [...rolesToUpdate.roles];
            }
          )
        }
      }
    )
  }

  private getRolesArray(user) {
    const roles = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      {name: 'Admin', value:'Admin'},
      {name: 'Moderator', value:'Moderator'},
      {name: 'Member', value:'Member'},
    ];

    availableRoles.forEach(
      role => {
        let isMatch = false;
        for(const userRole of userRoles ){
          if(role.name === userRole){
            isMatch = true;
            role.checked = true;
            roles.push(role);
            break;
          }
        }

        if(!isMatch) {
          role.checked = false;
          roles.push(role);
        }
      }
    )

    return roles;
  }

}
