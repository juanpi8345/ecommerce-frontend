import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  userRol:string;
  constructor(private loginService:LoginService,private userService:UserService, private router:Router){}

  ngOnInit():void{
    if(this.loginService.isLoggedIn)
      this.obtenerUsuario();
  }

  obtenerUsuario():string{
    this.userService.obtenerRol(this.loginService.getUser().dni).subscribe((userRol:any)=>{
      this.userRol= userRol.Role;
    })
   return this.userRol;
  }
  
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
