import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from '../_models/member';
import { Observable, map, of } from 'rxjs';

// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
//   })
// }
@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl= environment.apiUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) { }
  getHttpOptions() {
    const userToken = localStorage.getItem('user');
    if(userToken !== null ){
      return {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + JSON.parse(userToken)?.token
        })
      }
    }else{
      return {};
    }
  }

  getMembers(): Observable<Member[]> {
    if(this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl+'users').pipe(
      map(members => {
        this.members = members;
        return members;
      })
    )
  }

  getMember (username: string) {
    const member = this.members.find(x => x.username === username);
    if(member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl+ 'users/' + username);
  }
  updateMember(member : Member) {
    return this.http.put(this.baseUrl+'users',member).pipe(
      map(() => {
        const index =this.members.indexOf(member)
        this.members[index] = member;
      })
    )
  }

}
  