import { Component } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  envioDomicilio:boolean = false;
  verInstrucciones:boolean = true;
  verPreguntas:boolean = false;

    ngOnInit(){
      this.obtenerProductosCarrito();
    }

    togglePreguntas(){
      this.verInstrucciones = false;
      this.verPreguntas = true;
    }

    toggleInstrucciones(){
      this.verInstrucciones = true;
      this.verPreguntas = false;
    }

    //sessionStorage
    obtenerProductosCarrito() {
      const productos = JSON.parse(sessionStorage.getItem('productos')) || [];
      return productos;
    }

    eliminarItem(index:number){
      let i = 0;
      while(i != index){
        i++;
      }
      const productos  =this.obtenerProductosCarrito();
      productos.splice(index,1);
      sessionStorage.setItem('productos',JSON.stringify(productos));
    }

    obtenerTotal(){
      let productos = this.obtenerProductosCarrito();
      let total = 0;
      for(let p of productos){
        total += p.price;
      } 
      return total;
    }

}
