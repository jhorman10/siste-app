import { Component } from '@angular/core';
import { SocialLink } from 'src/app/models/socialMedia.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  socialLinks: SocialLink[] = [
    { title: 'Email', icon: '../../../assets/images/gmail.png', url: 'mailto:jsojhor@gmail.com.com' },
    { title: 'GitHub', icon: '../../../assets/images/github.png', url: 'https://github.com/jhorman10' },
    { title: 'LinkedIn', icon: '../../../assets/images/linkedin.png', url: 'https://www.linkedin.com/in/jhorman-orozco/' },
    { title: 'WhatsApp', icon: '../../../assets/images/whatsapp.png', url: 'https://wa.me/573007020377' }
  ];
}
