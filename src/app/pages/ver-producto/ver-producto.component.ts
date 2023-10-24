import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/modelo/producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent {

  constructor(private route:ActivatedRoute, private productoService:ProductosService){}
  codigo:number = this.route.snapshot.params['codigo'];
  producto:Producto;

  ngOnInit():void{
    this.productoService.obtenerProducto(this.codigo).subscribe((producto:Producto)=>{
      this.producto = producto;
    },err=> console.log(err))
  }

  //sessionStorage

  obtenerProductosCarrito() {
    const productos = JSON.parse(sessionStorage.getItem('productos')) || [];
    return productos;
  }
  
  guardarProductos(productos) {
    sessionStorage.setItem('productos', JSON.stringify(productos));
  }

  agregarProductoCarrito(producto:Producto) {
    const productos = this.obtenerProductosCarrito();
    productos.push(producto);
    this.guardarProductos(productos);
  }

  obtenerStockContandoCarrito(code:number):number{
    const productos  =this.obtenerProductosCarrito();
    let i = 0;
    for(let producto of productos){
      if(producto.code == code ){
        i++;
      }
    }
    return i;
  }


}
