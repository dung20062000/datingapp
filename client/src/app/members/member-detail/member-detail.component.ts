import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent {
  member?: Member;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[]= [];

  constructor(
    private memberService: MembersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadMember();
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    
    if (!this.member || !this.member.photos) {
      return [];
    }
    for (const photo of this.member.photos)
    {
      if(photo?.url){
        imageUrls.push({
          small: photo.url,
          medium: photo.url,
          big: photo.url
        })
      }

    }
    return imageUrls;
  }

  loadMember() {
    // const username = this.route.snapshot.paramMap.get('username');
    // if (username !== null) {
    //   this.memberService.getMember(username).subscribe((member) => {
    //     this.member = member;
    //     this.galleryImages= this.getImages();
    //   });
    // } else {
    //   // Xử lý trường hợp không có giá trị 'username'
    //   // Ví dụ: throw một lỗi, thông báo người dùng, hoặc thực hiện hành động khác.
    //   alert('No username provided. Please provide a valid username.');
    // }


    this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe((member) => {
    this.member = member;
    this.galleryImages= this.getImages();
    });

  }
}
