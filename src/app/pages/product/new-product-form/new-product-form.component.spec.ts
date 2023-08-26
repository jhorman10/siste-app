import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from '../../../models/product.model';
import { NewProductFormComponent } from './new-product-form.component';

describe('NewProductFormComponent', () => {
  let fixture: ComponentFixture<NewProductFormComponent>;
  let component: NewProductFormComponent;
  let mockProductService: jasmine.SpyObj<ProductService>;
  let mockActivatedRoute: any;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockProductService = jasmine.createSpyObj('ProductService', [
      'getProductById',
      'updateProduct',
      'addProduct',
    ]);
    mockActivatedRoute = {
      snapshot: {
        params: { id: '1' },
      },
    };
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [NewProductFormComponent],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewProductFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should populate editedProduct when there is an ID', () => {
    const mockProduct: Product = {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
    };
    mockProductService.getProductById.and.returnValue(mockProduct);

    component.ngOnInit();

    expect(component.productId).toBe(1);
    expect(component.editedProduct).toEqual(mockProduct);
  });

  it('should create a new editedProduct when there is no ID', () => {
    mockActivatedRoute.snapshot.params.id = undefined;

    component.ngOnInit();

    expect(component.productId).toBeUndefined();
    expect(component.editedProduct).toEqual({
      id: 0,
      name: '',
      description: '',
      price: 1,
    });
  });

  it('should save editedProduct and navigate to product list', () => {
    component.editedProduct = {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
    };

    component.saveProduct();

    expect(mockProductService.updateProduct).toHaveBeenCalledWith(
      component.editedProduct
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/product/list']);
    expect(component.editedProduct).toEqual({
      id: 0,
      name: '',
      description: '',
      price: 0,
    });
  });

  it('should add new product and navigate to product list', () => {
    component.productId = 0;
    component.editedProduct = {
      id: 0,
      name: 'New Product',
      description: 'Description 2',
      price: 20,
    };

    component.saveProduct();

    expect(mockProductService.addProduct).toHaveBeenCalledWith(
      component.editedProduct
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/product/list']);
    expect(component.editedProduct).toEqual({
      id: 0,
      name: '',
      description: '',
      price: 0,
    });
  });

  it('should not save product if fields are incomplete', () => {
    component.editedProduct = {
      id: 1,
      name: '',
      description: 'Incomplete Product',
      price: 0,
    };

    component.saveProduct();

    expect(mockProductService.updateProduct).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
