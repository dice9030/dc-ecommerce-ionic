import { Component } from '@angular/core';
import { Device } from '@capacitor/device';
import { MenuController, Platform } from '@ionic/angular';
import { SqliteService } from './services/sqlite.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public isLoggedIn = false;
  public isWeb: boolean;
  public load: boolean;
  
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Orders', url: '/orders', icon: 'cart' },
  ];
  public labels = [];

  constructor(
    private platform: Platform,
    private sqlite: SqliteService,
    private menu: MenuController, private router: Router) {
    this.isWeb = false;
    this.load = false;
    this.initApp();
    this.checkLoginStatus(); 
  }

  initApp(){

    this.platform.ready().then( async () => {
      const info = await Device.getInfo();
      this.isWeb = info.platform == 'web';
      this.sqlite.init();
      this.sqlite.dbReady.subscribe(load => {
          this.load = load;
      })
    })

  }

  async checkLoginStatus() {
    const { value } = await Preferences.get({ key: 'tk' });
    this.isLoggedIn = !!value; 
  }

  async logout() {
    await Preferences.remove({ key: 'tk' });
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
    this.menu.close();
  }

  navigateTo(route: string) {
  this.router.navigate([route]);
  this.menu.close();  // Cierra el menú
}
}
