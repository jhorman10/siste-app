import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product/product.service';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productServiceMock: jasmine.SpyObj<ProductService>;
  let routerMock: jasmine.SpyObj<Router>;

  const existingProduct: Product = {
    id: 1,
    name: 'Camiseta',
    description: 'Camiseta de algodón suave y cómoda.',
    price: 19.99,
  };

  beforeEach(() => {
    productServiceMock = jasmine.createSpyObj('ProductService', [
      'getProducts',
      'deleteProductById',
      'loadProductsFromJson',
    ]);

    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { data: { products: [] } } } },
        { provide: Router, useValue: routerMock },
        { provide: ProductService, useValue: productServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize products from ProductService', () => {
    // Arrange
    productServiceMock.getProducts.and.returnValue([existingProduct]);

    // Act
    component.ngOnInit();

    // Assert
    expect(component.products).toEqual([existingProduct]);
  });

  it('should navigate to edit page when edit button is clicked', () => {
    // Arrange
    const productId = 1;

    // Act
    component.editProduct(productId);

    // Assert
    expect(routerMock.navigate).toHaveBeenCalledWith(['/product/edit', productId]);
  });

  it('should delete a product and navigate to /list', () => {
    // Arrange
    const productId = 1;

    // Act
    component.deleteProduct(productId);

    // Assert
    expect(productServiceMock.deleteProductById).toHaveBeenCalledWith(productId);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/list']);
  });
});
