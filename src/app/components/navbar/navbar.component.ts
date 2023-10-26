import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private loginService:LoginService, private router:Router){}

  estaLogueado():boolean{
    return this.loginService.isLoggedIn();
  }

  logout(){
     this.loginService.logOut();
     this.router.navigate(['/nosotros']);
  }

  //sessionStorage

  obtenerProductosCarrito() {
    const productos = JSON.parse(sessionStorage.getItem('productos')) || [];
    return productos;
  }

  obtenerTamanioCarrito():number{
    const productos  =this.obtenerProductosCarrito();
    return productos.length;
  }
}
