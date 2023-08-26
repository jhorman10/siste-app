import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/product.model';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let fixture: ComponentFixture<ProductListComponent>;
  let component: ProductListComponent;
  let mockActivatedRoute: any;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: {
        data: {
          products: [
            { id: 1, name: 'Product 1' },
            { id: 2, name: 'Product 2' },
          ] as Product[],
        },
      },
    };

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should populate products on ngOnInit', () => {
    component.ngOnInit();
    expect(component.products.length).toBe(2);
    expect(component.products[0].name).toBe('Product 1');
    expect(component.products[1].name).toBe('Product 2');
  });

  it('should navigate to edit page when editProduct is called', () => {
    component.editProduct(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/product/edit', 1]);
  });
});
