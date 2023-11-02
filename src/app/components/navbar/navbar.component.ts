import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { window } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  userRol:string = undefined;
  logueado:boolean;
  constructor(private loginService:LoginService,private userService:UserService, private router:Router){}

  ngOnInit():void{
    this.estaLogueado();
    if(this.logueado)
      this.obtenerUsuarioRol();
  }

  obtenerUsuarioRol():void{
    this.userService.obtenerRol(this.loginService.getUser().dni).subscribe((userRol:any)=>{
      this.userRol= userRol.Role;
    })
  }
  
  estaLogueado():void{
    this.logueado = this.loginService.isLoggedIn();
  }

  logout(){
     this.loginService.logOut();
     location.reload();
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
