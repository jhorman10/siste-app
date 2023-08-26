import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpinnerService],
    });
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isLoading$ should start with true', () => {
    service.isLoading$.subscribe((isLoading) => {
      expect(isLoading).toBe(true);
    });
  });

  it('setSpinner should change isLoading$ to false after 3 seconds', fakeAsync(() => {
    const originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 3100;

    spyOn(window, 'setTimeout').and.callThrough();

    service.setSpinner();

    tick(3000);

    service.isLoading$.subscribe((isLoading) => {
      expect(isLoading).toBe(false);
    });

    expect(window.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 3000);

    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  }));
});
