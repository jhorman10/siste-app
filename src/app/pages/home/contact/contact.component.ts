import { Component, Input } from '@angular/core';
import { SocialLink } from 'src/app/models/socialMedia.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  @Input() socialLinks: SocialLink[] = [];
}
