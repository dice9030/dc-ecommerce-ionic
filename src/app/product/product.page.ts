import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { SqliteService } from '../services/sqlite.service';
import { ToastController } from '@ionic/angular';


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
     private sqlite: SqliteService,
     private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
     public toastController: ToastController,
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
  
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });
    toast.present();
  }

  create(name:string, price:number, url:string){

   const today = new Date();
   const date = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    this.sqlite.create(name,date,price,url).then( (changes) =>{
      this.presentToast("Se agrego correctamente");      
      // this.read(); 
    }).catch(err => {
      console.error(err);
      console.error("Error al crear");
    })
  }

}
