import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent {
  members: Member[];
  pagination: Pagination;
  pageNumber= 1;
  pageSize = 5;
  constructor(private memberService: MembersService) {}

  ngOnInit(): void {
    this.loadMembers();
  }
  loadMembers() {
    this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe(response =>{
      this.members = response.results;
      this.pagination = response.pagination;

    })
  }
  //đổi trang
  pageChanged(event: any){  //khai báo hàm pageChanged với tham số event kiểu any
    this.pageNumber = event.page; // gán giá trị của thuộc tính page trong đối tượng event vào thuộc tính pageNumber
    this.loadMembers(); //tải danh sách thành viên hoặc dữ liệu 
  }
}
 