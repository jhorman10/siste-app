import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product/product.service';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let router: Router;

  beforeEach(() => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts', 'deleteProductById']);
    const activatedRouteMock = {
      snapshot: {
        data: {
          products: [],
        },
      },
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProductListComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: ProductService, useValue: productServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products from route data on init', () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Product 1', description: 'Description 1', price: 10.0 },
      { id: 2, name: 'Product 2', description: 'Description 2', price: 20.0 },
    ];
    const route = TestBed.inject(ActivatedRoute);
    route.snapshot.data['products'] = mockProducts;

    fixture.detectChanges();

    expect(component.products).toEqual(mockProducts);
  });

  it('should remove deleted product', () => {
    const deletedProductId = 1;
    const remainingProducts: Product[] = [
      { id: 2, name: 'Product 2', description: 'Description 2', price: 20.0 },
      { id: 3, name: 'Product 3', description: 'Description 3', price: 30.0 },
    ];
    component.products = [
      { id: deletedProductId, name: 'Product 1', description: 'Description 1', price: 10.0 },
      ...remainingProducts,
    ];

    productService.productDeleted = new EventEmitter<number>();
    productService.productDeleted.next(deletedProductId);

    expect(component.products).toEqual(remainingProducts);
  });

  it('should navigate to edit product page', () => {
    spyOn(router, 'navigate');
    const productId = 1;

    component.editProduct(productId);

    expect(router.navigate).toHaveBeenCalledWith(['/product/edit', productId]);
  });

  it('should delete product and navigate to list page', () => {
    spyOn(router, 'navigate');
    const productId = 1;

    component.deleteProduct(productId);

    expect(productService.deleteProductById).toHaveBeenCalledWith(productId);
    expect(router.navigate).toHaveBeenCalledWith(['/list']);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
