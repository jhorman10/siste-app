import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display options correctly', () => {
    fixture.detectChanges();

    const optionElements = fixture.debugElement.queryAll(
      By.css('.header-option')
    );
    expect(optionElements.length).toBe(component.options.length);

    optionElements.forEach((optionElement, index) => {
      const option = optionElement.nativeElement as HTMLElement;
      const optionData = component.options[index];
      expect(option.textContent).toContain(optionData.name);
      expect(option.getAttribute('routerLink')).toBe('/' + optionData.url);
    });
  });

  it('should set activeOption correctly', () => {
    component.activeOption = 'client';
    fixture.detectChanges();

    const activeOptionElement = fixture.debugElement.query(
      By.css('.active-option')
    );
    expect(activeOptionElement.nativeElement.textContent).toContain('Client');
  });
});
