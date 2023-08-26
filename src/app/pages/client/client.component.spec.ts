import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ClientService } from 'src/app/services/client/client.service';
import Swal from 'sweetalert2';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { ClientComponent } from './client.component';

describe('ClientComponent', () => {
  let fixture: ComponentFixture<ClientComponent>;
  let component: ClientComponent;
  let mockClientService: jasmine.SpyObj<ClientService>;
  let mockSpinnerService: jasmine.SpyObj<SpinnerService>;

  beforeEach(() => {
    mockClientService = jasmine.createSpyObj('ClientService', ['getAllUsers']);
    mockSpinnerService = jasmine.createSpyObj('SpinnerService', ['setSpinner']);

    TestBed.configureTestingModule({
      declarations: [ClientComponent],
      providers: [
        { provide: ClientService, useValue: mockClientService },
        { provide: SpinnerService, useValue: mockSpinnerService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoading$ correctly', () => {
    expect(component.isLoading$).toBe(mockSpinnerService.isLoading$);
  });

  it('should call setSpinner and fetch users on ngOnInit', fakeAsync(() => {
    const mockUsers: User[] = [
      {
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
      },
      {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        address: {
          street: 'Victor Plains',
          suite: 'Suite 879',
          city: 'Wisokyburgh',
          zipcode: '90566-7771',
          geo: {
            lat: '-43.9509',
            lng: '-34.4618',
          },
        },
        phone: '010-692-6593 x09125',
        website: 'anastasia.net',
        company: {
          name: 'Deckow-Crist',
          catchPhrase: 'Proactive didactic contingency',
          bs: 'synergize scalable supply-chains',
        },
      },
    ];
    mockClientService.getAllUsers.and.returnValue(of(mockUsers));

    component.ngOnInit();
    tick();

    expect(mockSpinnerService.setSpinner).toHaveBeenCalled();
    expect(mockClientService.getAllUsers).toHaveBeenCalled();
    expect(component.users).toEqual(mockUsers);
  }));

  it('should show client details using Swal', () => {
    spyOn(Swal, 'fire');

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

    component.showClientDetails(mockUser);

    expect(Swal.fire).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: 'Client Details',
        html: jasmine.any(String),
        icon: 'info',
        showCloseButton: true,
        customClass: {
          container: 'custom-swal-container',
          title: 'custom-swal-title',
          htmlContainer: 'custom-swal-html-container',
        },
      })
    );
  });
});
