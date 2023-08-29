import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from 'src/app/models/user.model';
import { ClientListComponent } from './client-list.component';

describe('ClientListComponent', () => {
  let fixture: ComponentFixture<ClientListComponent>;
  let component: ClientListComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit user on card click', () => {
    const mockUser: User = {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496',
        },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    };
    spyOn(component.showClientDetails, 'emit');

    component.onCardClick(mockUser);

    expect(component.showClientDetails.emit).toHaveBeenCalledWith(mockUser);
  });
});
