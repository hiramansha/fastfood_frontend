import { Product } from "../../models/product.model";
import { CategoryService } from "../../services/category-data.service";

import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Category } from '../../models/category.model';


@Component({
  selector: 'app-products',

  imports: [],

  templateUrl: './products.html',

  styleUrl: './products.css'
})
export class Products implements OnInit {

  private readonly productService = inject(ProductService);

  private readonly categoryService = inject(CategoryService);


  products: Product[] = [];

  categories: Category[] = [];


  selectedCategoryId: number | null = null;


  loading = false;

  categoriesLoading = false;


  errorMessage = '';

  categoryErrorMessage = '';


  ngOnInit(): void {

    this.loadCategories();

    this.loadProducts();

  }


  // ================================
  // LOAD CATEGORIES
  // ================================

  loadCategories(): void {

    this.categoriesLoading = true;

    this.categoryErrorMessage = '';


    this.categoryService.getCategories().subscribe({

      next: (data) => {

        console.log('Categories from API:', data);


        this.categories = data.filter(

          category => category.isActive && !category.isDeleted

        );


        this.categoriesLoading = false;

      },


      error: (error) => {

        console.error('Category API Error:', error);


        this.categoriesLoading = false;

        this.categoryErrorMessage =
          'Categories load nahi ho sake.';

      }

    });

  }


  // ================================
  // LOAD ALL PRODUCTS
  // ================================

  loadProducts(): void {

    this.loading = true;

    this.errorMessage = '';

    this.selectedCategoryId = null;


    this.productService.getProducts().subscribe({

      next: (data) => {

        console.log('Products from API:', data);


        this.products = data.filter(

          product => product.isActive && product.isAvailable

        );


        this.loading = false;

      },


      error: (error) => {

        console.error('Product API Error:', error);


        this.loading = false;

        this.errorMessage =
          'Products load nahi ho sake.';

      }

    });

  }


  // ================================
  // FILTER BY CATEGORY
  // ================================

  selectCategory(categoryId: number | null): void {

    this.selectedCategoryId = categoryId;

    this.loading = true;

    this.errorMessage = '';


    console.log(

      'Loading products for category:',

      categoryId

    );


    (categoryId === null
      ? this.productService.getProducts()
      : this.productService.getProductsByCategory(categoryId)
    ).subscribe({

        next: (data) => {

          console.log(

            'Products by category:',

            data

          );


          this.products = data.filter(

            product =>

              product.isActive &&

              product.isAvailable

          );


          this.loading = false;

        },


        error: (error) => {

          console.error(

            'Category Product API Error:',

            error

          );


          this.loading = false;


          this.errorMessage =
            'Is category ke products load nahi ho sake.';

        }

      });

  }


  // ================================
  // ALL PRODUCTS BUTTON
  // ================================

  showAllProducts(): void {

    this.loadProducts();

  }

}