import { Component } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_modules/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent {
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  user: User;
  genderList = [{value:'male', display:'Males'}, {value:'female', display:'Females'}];


  constructor(private memberService: MembersService, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    })
  }

  ngOnInit(): void {
    this.loadMembers();
  }
  loadMembers() {
    this.memberService.getMembers(this.userParams).subscribe(response =>{
      this.members = response.results;
      this.pagination = response.pagination;

    })
  }
  resetFilter(){
    this.userParams = new UserParams(this.user)
    this.loadMembers();
  }
  //đổi trang
  pageChanged(event: any){  //khai báo hàm pageChanged với tham số event kiểu any
    this.userParams.pageNumber = event.page; // gán giá trị của thuộc tính page trong đối tượng event vào thuộc tính pageNumber
    this.loadMembers(); //tải danh sách thành viên hoặc dữ liệu 
  }
}
 