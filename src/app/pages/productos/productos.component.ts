import { Component } from '@angular/core';
import { Producto } from 'src/app/modelo/producto';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  productos : Producto[];

  constructor(private productosService:ProductosService){}

  ngOnInit():void{
    this.obtenerProductos();
  }

  public obtenerProductos(){
    this.productosService.obtenerProductos().subscribe((productos:Producto[])=>{
      this.productos = productos;
    },err=>{
      console.log(err);
    })
  }

  public eliminarProducto(codigo:number){
    Swal.fire({
      title: 'Eliminar producto',
      inputPlaceholder: '¿Estas seguro que queres eliminar el producto?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#13c2c2'
    }).then((result) => {
      if(result.isConfirmed) {
        this.productosService.eliminarProducto(codigo).subscribe(()=>{
          this.obtenerProductos();
        },err=>{
          console.log(err);
        });
      }
    });
  }

}
