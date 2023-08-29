import { fakeAsync, tick } from '@angular/core/testing';
import { throwError } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

describe('ProductComponent', () => {

  // Tests that the setSpinner method sets the isLoading$ observable to false after 3 seconds
  it('should set isLoading$ observable to false after 3 seconds', fakeAsync(() => {
    // Mock dependencies
    const productServiceMock = jasmine.createSpyObj('ProductService', [
      'loadProductsFromJson',
    ]);
    const httpClientMock = jasmine.createSpyObj('HttpClient', ['get']);
    const swalMock = jasmine.createSpyObj('Swal', ['fire']);

    // Create instance of SpinnerService with mocked dependencies
    const spinnerService = new SpinnerService();

    // Call the method being tested
    spinnerService.setSpinner();

    // Check that the isLoading$ observable is initially true
    let isLoading = true;
    spinnerService.isLoading$.subscribe((value) => {
      isLoading = value;
    });
    expect(isLoading).toBeTrue();

    // Advance time by 3 seconds
    tick(3000);

    // Check that the isLoading$ observable is now false
    spinnerService.isLoading$.subscribe((value) => {
      isLoading = value;
    });
    expect(isLoading).toBeFalse();
  }));

  // Tests that the setSpinner method sets the isLoading$ observable to false even if there are no products in local storage
  it('should set isLoading$ observable to false even if there are no products in local storage', fakeAsync(() => {
    // Create instance of SpinnerService with mocked dependencies
    const spinnerService = new SpinnerService();

    // Call the method being tested
    spinnerService.setSpinner();

    // Check that the isLoading$ observable is initially true
    let isLoading = true;
    spinnerService.isLoading$.subscribe((value) => {
      isLoading = value;
    });
    expect(isLoading).toBeTrue();

    // Advance time by 3 seconds
    tick(3000);

    // Check that the isLoading$ observable is now false
    spinnerService.isLoading$.subscribe((value) => {
      isLoading = value;
    });
    expect(isLoading).toBeFalse();
  }));

  // Tests that the setSpinner method sets the isLoading$ observable to false even if an error occurs while loading products from JSON
  it('should set isLoading$ observable to false even if an error occurs while loading products from JSON', fakeAsync(() => {
    // Mock dependencies
    const productServiceMock = jasmine.createSpyObj('ProductService', [
      'loadProductsFromJson',
    ]);
    const httpClientMock = jasmine.createSpyObj('HttpClient', ['get']);
    const swalMock = jasmine.createSpyObj('Swal', ['fire']);

    // Set up mock response with error
    productServiceMock.loadProductsFromJson.and.returnValue(
      throwError('Error loading products')
    );

    // Create instance of SpinnerService with mocked dependencies
    const spinnerService = new SpinnerService();

    // Call the method being tested
    spinnerService.setSpinner();

    // Check that the isLoading$ observable is initially true
    let isLoading = true;
    spinnerService.isLoading$.subscribe((value) => {
      isLoading = value;
    });
    expect(isLoading).toBeTrue();

    // Advance time by 3 seconds
    tick(3000);

    // Check that the isLoading$ observable is now false
    spinnerService.isLoading$.subscribe((value) => {
      isLoading = value;
    });
    expect(isLoading).toBeFalse();
  }));
});
