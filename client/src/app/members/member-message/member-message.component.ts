import { Component, Input } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-message',
  templateUrl: './member-message.component.html',
  styleUrls: ['./member-message.component.css']
})
export class MemberMessageComponent {
@Input() username: string;
messages: Message[];

constructor(private messageService: MessageService) {

}

ngOnInit(): void {
  this.loadMessages();
}
loadMessages(){
  this.messageService.getMessageThread(this.username).subscribe(
    messages => {
      this.messages = messages
    }
  )
}
}
