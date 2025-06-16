import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SqliteService } from '../services/sqlite.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public cartCount: number = 0;
  // public order: string;
  public orders: [];
  public products: any = [];
  public searchedProducts: any;

  constructor(
      private sqlite: SqliteService,
      private router: Router,
      private http: HttpClient,
      public toastController: ToastController,
  ) {   
    this.orders = [];
  }


  ionViewWillEnter(){
    this.read();
     this.getProducts().subscribe(res => {
      this.products = res;
      this.searchedProducts = this.products;
    });
  }

  goToOrders(){
     this.router.navigate(['/orders'])
  }


  getProducts() {
      return this.http.get('https://fakestoreapi.com/products').pipe(
      map((res: any) => {
        return res;
      }))
       
  }

  searchCustomer(event: any) {
    const searchTerm = event.target.value;
    this.searchedProducts = this.products;
    if (searchTerm && searchTerm.trim() !== '') {
      this.searchedProducts = this.searchedProducts.filter((product: any) => {
        return product.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ;
      });
    } 
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
      this.read(); 
    }).catch(err => {
      console.error(err);
      console.error("Error al crear");
    })
  }

  read(){
    this.sqlite.read().then( (orders: string[]) => {
      // this.orders = orders;
      this.cartCount = orders.length;

    }).catch(err => {
      console.error(err);
      console.error("Error al leer");
    })
  }
  
  // update(order: string){
  //   this.sqlite.update('', order).then( (changes) => {
  //     // this.order = '';
  //     this.read(); 
  //   }).catch(err => {
  //     console.error(err);
  //     console.error("Error al actualizar");
  //   })
  // }

}
