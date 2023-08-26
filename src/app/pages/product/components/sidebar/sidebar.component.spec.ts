import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let fixture: ComponentFixture<SidebarComponent>;
  let component: SidebarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display options correctly', () => {
    fixture.detectChanges();

    const optionElements = fixture.debugElement.queryAll(
      By.css('.sidebar-option')
    );
    expect(optionElements.length).toBe(component.options.length);

    optionElements.forEach((optionElement, index) => {
      const option = optionElement.nativeElement as HTMLElement;
      const optionData = component.options[index];
      expect(option.textContent).toContain(optionData.name);
      expect(option.getAttribute('href')).toBe(optionData.url);
    });
  });
});
