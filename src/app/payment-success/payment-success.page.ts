import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.page.html',
  styleUrls: ['./payment-success.page.scss'],
  standalone: false,
})
export class PaymentSuccessPage implements OnInit {

  constructor(
      private router: Router,
  ) { }

  ngOnInit() {
  }

  

  goToHome(){
    this.router.navigate(['/home'])
  }


}
