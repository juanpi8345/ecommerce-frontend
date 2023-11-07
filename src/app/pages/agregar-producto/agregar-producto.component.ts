import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Producto } from 'src/app/modelo/producto';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent {

  producto: Producto = new Producto();


  constructor(private productoService: ProductosService, private router: Router, private snack: MatSnackBar) {
    this.producto.size = "S"
  }


  validarCampos(...campos): boolean {
    for (const campo of campos) {
      if (campo === '' || campo === undefined) {
        return false;
      }
    }
    return true;
  }

  agregarProducto() {
    if (!this.validarCampos(this.producto.description, this.producto.imgUrl, this.producto.name, this.producto.price, this.producto.stock, this.producto.size)) {
      this.snack.open("Campos incompletos", "Aceptar", {
        duration: 3000
      });
      return;
    }
    if (this.producto.hasDiscount) {
      if (!this.validarCampos(this.producto.percentageDiscount)) {
        this.snack.open("Por favor ingrese un porcentaje", "Aceptar", {
          duration: 3000
        });
        return;
      }
      if(this.producto.percentageDiscount <= 0 || this.producto.percentageDiscount > 100){
        this.snack.open("Porcentaje incorrecto", "Aceptar", {
          duration: 3000
        });
        return;
      }
    }
    Swal.fire({
      title: 'Agregar producto',
      inputPlaceholder: '¿Estas seguro que queres agregar el producto?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#13c2c2'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.agregarProducto(this.producto).subscribe(() => {
          Swal.fire("Producto agregado", "El producto se agrego correctamente", "success");
          this.router.navigate(['productos']);
        }, err => {
          console.log(err);
        })
      }
    });
  }

  limpiarCampos() {
    this.producto.name = ''; this.producto.imgUrl = ''; this.producto.price = 0; this.producto.size = ''; this.producto.stock = 0; this.producto.description = '';
  }

}
