import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public localStorageKey = 'products';
  productDeleted: EventEmitter<number> = new EventEmitter<number>();

  constructor(public http: HttpClient) {}

  saveProductsIfEmpty(): void {
    const storedProducts = localStorage.getItem(this.localStorageKey);
    if (!storedProducts) {
      this.loadProductsFromJson().subscribe((products) => {
        localStorage.setItem(this.localStorageKey, JSON.stringify(products));
      });
    }
  }

  getProducts(): Product[] {
    const storedProducts = localStorage.getItem(this.localStorageKey);
    return storedProducts ? JSON.parse(storedProducts) : [];
  }

  getProductById(id: number): Product | undefined {
    const products = this.getProducts();
    return products.find((product) => product.id === id);
  }

  addProduct(newProduct: Product): void {
    const products = this.getProducts();

    const lastProductId =
      products.length > 0 ? products[products.length - 1].id : 0;

    newProduct.id = lastProductId + 1;

    products.push(newProduct);

    localStorage.setItem(this.localStorageKey, JSON.stringify(products));

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your product has been saved',
      showConfirmButton: false,
      timer: 1500,
    });

    localStorage.setItem(this.localStorageKey, JSON.stringify(products));
  }

  updateProduct(updatedProduct: Product): void {
    const products = this.getProducts();
    const productIndex = products.findIndex((p) => p.id === updatedProduct.id);

    if (productIndex !== -1) {
      products[productIndex] = updatedProduct;
      localStorage.setItem(this.localStorageKey, JSON.stringify(products));

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your product has been updated',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  deleteProductById(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const products = this.getProducts();
        const productIndex = products.findIndex((product) => product.id === id);

        if (productIndex !== -1) {
          products.splice(productIndex, 1);
          localStorage.setItem(this.localStorageKey, JSON.stringify(products));
          this.productDeleted.emit(id);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your product has been deleted',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Your product was not deleted',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

  public loadProductsFromJson() {
    return this.http.get<Product[]>('../../assets/db/data.ts');
  }
}
