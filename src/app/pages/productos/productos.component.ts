import { Component, Optional } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from 'src/app/modelo/producto';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  productos: Producto[];
  ordenamiento: string = "name";
  query: string = '';
  numeros: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private productosService: ProductosService, private snack: MatSnackBar) {
    
   }

  ngOnInit(): void {
    this.obtenerProductos(0);
  }

  public obtenerProductos(page: Optional) {
    this.productosService.obtenerProductos(page, this.ordenamiento).subscribe((productos: any) => {
      this.productos = productos.content;
    }, err => {
      console.log(err);
    })
  }

  public buscarProductos() {
    if (this.query == '' || this.query == undefined || this.query == null) {
      this.obtenerProductos(0);
      return;
    }
    this.productosService.buscarProductos(this.query).subscribe((productos: Producto[]) => {
      this.productos = productos;
    })
  }

  public eliminarProducto(codigo: number) {
    Swal.fire({
      title: 'Eliminar producto',
      inputPlaceholder: '¿Estas seguro que queres eliminar el producto?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#13c2c2'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productosService.eliminarProducto(codigo).subscribe(() => {
          this.snack.open("Producto eliminado", "Aceptar", {
            duration: 3000
          })
          this.obtenerProductos(0);
        }, err => {
          console.log(err);
        });
      }
    });
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

  obtenerTamanioCarrito():number{
    const productos  =this.obtenerProductosCarrito();
    return productos.length;
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
