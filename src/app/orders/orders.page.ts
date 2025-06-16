import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SqliteService } from '../services/sqlite.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: false,
})
export class OrdersPage  {
  
  public orders:any;
  public totalAmount: number;
  constructor(
    private sqlite: SqliteService,
    private router: Router,
     public toastController: ToastController,
  ) {
    this.totalAmount = 0.00;
   }

  ionViewWillEnter(){
    this.read();    
  }

  read(){
    this.sqlite.read().then( (orders: []) => {    
      this.orders = orders;
       this.totalAmount = this.orders
      .reduce((total, order) => total + (order.price * 1), 0)
      .toFixed(2);
    }).catch(err => {
      console.error(err);
      console.error("Error al leer");
    })
  }

  delete(id: number){
    this.sqlite.delete(id).then( (changes) => {
      this.read(); 
    }).catch(err => {
      console.error(err);
      console.error("Error al borrar");
    })
  }


  goToHome(){
    this.router.navigate(['/home'])
  }

  pagar() {
     this.router.navigate(['/payment-success'])
  }

}
