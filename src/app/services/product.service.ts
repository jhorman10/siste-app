import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private localStorageKey = 'products';

  constructor(private http: HttpClient) {}

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
    const productIndex = products.findIndex(p => p.id === updatedProduct.id);

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

  private loadProductsFromJson() {
    return this.http.get<Product[]>('../../assets/db/data.ts');
  }
}
