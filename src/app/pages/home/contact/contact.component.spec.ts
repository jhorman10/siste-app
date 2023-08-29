import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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

  it('should not display social links if input is empty', () => {
    fixture.detectChanges();

    const linkElements = fixture.debugElement.queryAll(By.css('.social-link'));
    expect(linkElements.length).toBe(0);
  });
});
