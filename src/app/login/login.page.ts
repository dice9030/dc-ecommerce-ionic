import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router, public toastController: ToastController,) { }
 async  ngOnInit() {
    const { value } = await Preferences.get({ key: 'tk' });
    if (value) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    this.authService.login(this.email, this.password)
      .then((userCredential) => {
        userCredential.user.getIdToken().then(async (token) => {
          await Preferences.set({ key: 'tk', value: token });
          localStorage.setItem('token', token);   
          window.location.reload(); 

        });
      })
      .catch(err => {
        // console.error(err);
        this.presentToast('Correo o contraseña incorrectos');
        // alert('Correo o contraseña incorrectos');
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }

}
