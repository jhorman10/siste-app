import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ProductService } from 'src/app/services/product/product.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let fixture: ComponentFixture<ProductComponent>;
  let component: ProductComponent;
  let mockProductService: jasmine.SpyObj<ProductService>;
  let mockSpinnerService: jasmine.SpyObj<SpinnerService>;

  beforeEach(() => {
    mockProductService = jasmine.createSpyObj('ProductService', [
      'saveProductsIfEmpty',
    ]);
    mockSpinnerService = jasmine.createSpyObj('SpinnerService', ['setSpinner']);

    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: SpinnerService, useValue: mockSpinnerService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoading$ correctly', () => {
    expect(component.isLoading$).toBe(mockSpinnerService.isLoading$);
  });

  it('should call saveProductsIfEmpty and setSpinner on ngOnInit', fakeAsync(() => {
    mockProductService.saveProductsIfEmpty.and.stub();
    mockSpinnerService.setSpinner.and.stub();

    component.ngOnInit();
    tick();

    expect(mockProductService.saveProductsIfEmpty).toHaveBeenCalled();
    expect(mockSpinnerService.setSpinner).toHaveBeenCalled();
  }));
});
