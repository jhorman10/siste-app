import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import Swal from 'sweetalert2';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve products from local storage', () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Camiseta',
        description: 'Camiseta de algodón suave y cómoda.',
        price: 19.99,
      },
      {
        id: 2,
        name: 'Pantalón vaquero',
        description: 'Pantalón vaquero de estilo clásico.',
        price: 39.99,
      },
      {
        id: 3,
        name: 'Zapatillas deportivas',
        description: 'Zapatillas deportivas con suela amortiguada.',
        price: 59.99,
      },
    ];

    localStorage.setItem('products', JSON.stringify(mockProducts));

    const products = service.getProducts();
    expect(products.length).toBe(2);
    expect(products).toEqual(mockProducts);
  });

  it('should add a new product', fakeAsync(() => {
    spyOn(localStorage, 'setItem');
    spyOn(Swal, 'fire');

    const newProduct: Product = {
      id: 1,
      name: 'Camiseta',
      description: 'Camiseta de algodón suave y cómoda.',
      price: 19.99,
    };

    service.addProduct(newProduct);

    tick(1500);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'products',
      jasmine.any(String)
    );
    expect(Swal.fire).toHaveBeenCalled();
  }));

  it('should update an existing product', fakeAsync(() => {
    spyOn(localStorage, 'setItem');
    spyOn(Swal, 'fire');

    const existingProduct: Product = {
      id: 1,
      name: 'Camiseta',
      description: 'Camiseta de algodón suave y cómoda.',
      price: 19.99,
    };
    localStorage.setItem('products', JSON.stringify([existingProduct]));

    const updatedProduct: Product = {
      id: 1,
      name: 'Camiseta',
      description: 'Camiseta de algodón suave y cómoda.',
      price: 19.99,
    };
    service.updateProduct(updatedProduct);

    tick(1500);

    const updatedProducts = JSON.parse(
      localStorage.getItem('products') || '[]'
    );
    expect(updatedProducts[0].name).toBe('Updated Product');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'products',
      jasmine.any(String)
    );
    expect(Swal.fire).toHaveBeenCalled();
  }));

  it('should load products from JSON', () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Camiseta',
        description: 'Camiseta de algodón suave y cómoda.',
        price: 19.99,
      },
      {
        id: 2,
        name: 'Pantalón vaquero',
        description: 'Pantalón vaquero de estilo clásico.',
        price: 39.99,
      },
      {
        id: 3,
        name: 'Zapatillas deportivas',
        description: 'Zapatillas deportivas con suela amortiguada.',
        price: 59.99,
      },
    ];

    service.loadProductsFromJson().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('../../assets/db/data.ts');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should get product by ID', () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Camiseta',
        description: 'Camiseta de algodón suave y cómoda.',
        price: 19.99,
      },
      {
        id: 2,
        name: 'Pantalón vaquero',
        description: 'Pantalón vaquero de estilo clásico.',
        price: 39.99,
      },
      {
        id: 3,
        name: 'Zapatillas deportivas',
        description: 'Zapatillas deportivas con suela amortiguada.',
        price: 59.99,
      },
    ];

    localStorage.setItem('products', JSON.stringify(mockProducts));

    const product = service.getProductById(2);
    expect(product).toEqual(mockProducts[1]);
  });

  it('should save products to local storage if empty', fakeAsync(() => {
    spyOn(service, 'loadProductsFromJson').and.returnValue(of([]));

    spyOn(localStorage, 'setItem');
    spyOn(Swal, 'fire');

    service.saveProductsIfEmpty();

    tick();

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'products',
      jasmine.any(String)
    );
    expect(Swal.fire).toHaveBeenCalled();
  }));
});
