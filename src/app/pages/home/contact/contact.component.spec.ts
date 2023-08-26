import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SocialLink } from 'src/app/models/socialMedia.model';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;
  let component: ContactComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display social links', () => {
    const mockSocialLinks: SocialLink[] = [
      { title: 'Link 1', icon: 'icon1.png', url: 'https://example.com/link1' },
      { title: 'Link 2', icon: 'icon2.png', url: 'https://example.com/link2' },
    ];
    component.socialLinks = mockSocialLinks;

    fixture.detectChanges();

    const linkElements = fixture.debugElement.queryAll(By.css('.social-link'));
    expect(linkElements.length).toBe(mockSocialLinks.length);

    linkElements.forEach((linkElement, index) => {
      const link = linkElement.nativeElement as HTMLAnchorElement;
      const socialLink = mockSocialLinks[index];
      expect(link.getAttribute('href')).toBe(socialLink.url);
      expect(link.querySelector('img')?.getAttribute('src')).toContain(socialLink.icon);
      expect(link.querySelector('img')?.getAttribute('alt')).toBe(socialLink.title);
    });
  });

  it('should not display social links if input is empty', () => {
    fixture.detectChanges();

    const linkElements = fixture.debugElement.queryAll(By.css('.social-link'));
    expect(linkElements.length).toBe(0);
  });
});
