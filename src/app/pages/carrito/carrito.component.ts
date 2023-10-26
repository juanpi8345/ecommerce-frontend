import { Component } from '@angular/core';
import { Compra } from 'src/app/modelo/compra';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  envioDomicilio: boolean = false;
  verInstrucciones: boolean = true;
  verPreguntas: boolean = false;
  compra:Compra = new Compra();

  constructor(private loginService:LoginService){}

  ngOnInit() {
    this.obtenerProductosCarrito();
  }

  togglePreguntas() {
    this.verInstrucciones = false;
    this.verPreguntas = true;
  }

  toggleInstrucciones() {
    this.verInstrucciones = true;
    this.verPreguntas = false;
  }

  realizarCompra(){
    this.compra.products = this.obtenerProductosIdCarrito();
    this.compra.user = this.loginService.getUser().dni;
  }

  //sessionStorage
  obtenerProductosCarrito() {
    const productos = JSON.parse(sessionStorage.getItem('productos')) || [];
    return productos;
  }

  obtenerProductosIdCarrito():number[]{
    const productos = JSON.parse(sessionStorage.getItem('productos')) || [];
    let listaDeIds:number[] = [];
    for(let producto of productos){
     listaDeIds.push(producto.code); 
    }
    return listaDeIds;
  }

  eliminarItem(index: number) {
    let i = 0;
    while (i != index) {
      i++;
    }
    const productos = this.obtenerProductosCarrito();
    productos.splice(index, 1);
    sessionStorage.setItem('productos', JSON.stringify(productos));
  }

  obtenerTotal() {
    let productos = this.obtenerProductosCarrito();
    let total = 0;
    for (let p of productos) {
      total += p.price;
    }
    return total;
  }

}
