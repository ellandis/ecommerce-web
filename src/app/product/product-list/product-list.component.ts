import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/product';
import {BreakpointObserver, Breakpoints, LayoutModule} from '@angular/cdk/layout';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  products : Product[] = []
  cols:any;
  rowheight:any;
  handsetPortait = false;
  
  constructor(
    private productService: ProductService, 
    private responsive: BreakpointObserver, 
    private snackbar: MatSnackBar,
    private cartService : CartService){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      data => this.products = data)
    
    this.responsive.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape,
      Breakpoints.TabletPortrait,
      Breakpoints.TabletLandscape]).subscribe(
        result => {
          const breakpointsPer = result.breakpoints;
          this.cols = 5;
          this.rowheight = "250";
          this.handsetPortait = false;

          if(breakpointsPer[Breakpoints.TabletPortrait]){
            this.cols = 3;
            this.rowheight = "300";
            console.log(result.breakpoints);
            
          }
          else if (breakpointsPer[Breakpoints.TabletLandscape]){
            this.cols = 4;
            this.rowheight = "200"
            console.log(result.breakpoints);
          }
          else if (breakpointsPer[Breakpoints.HandsetPortrait]){
            this.cols = 1;
            this.rowheight = "300"
            // this.handsetPortait = true;
            console.log(result.breakpoints);
          }
          else if (breakpointsPer[Breakpoints.HandsetLandscape]){
            this.cols = 3;
            console.log(result.breakpoints);
          }
        }
      )}

      addToCart(product: Product): void{
        this.cartService.addToCart(product).subscribe({
          next: () => {
            this.snackbar.open("Product added to cart","",{
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            })
          }
        });
      }

  }
