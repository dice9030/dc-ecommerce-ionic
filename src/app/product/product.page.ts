import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone: false,
})
export class ProductPage implements OnInit {

  id: any;
  detailProduct: any;
  lodaing: boolean = false;
  constructor(
     private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit() {
   this.id = this.activatedRoute.snapshot.paramMap.get('id');
     this.getProductDetail(this.id).subscribe(res => {
      this.detailProduct = res;     
      this.lodaing = true;
    });
  }

   goToHome(){
    this.router.navigate(['/home'])
  }

  getProductDetail(id: any) {
    return this.http.get((`https://fakestoreapi.com/products/${id}`)).pipe(
           map((res: any) => {
             return res;
           }))
          
  }

}
