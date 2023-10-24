import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/modelo/producto';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent {
  producto:Producto = new Producto();
  code:number;

  constructor(private productoService:ProductosService, private router:Router, private route:ActivatedRoute
    ,private snack:MatSnackBar){
      this.producto.size = "S"
    }

 

  ngOnInit():void{
    this.code = this.route.snapshot.params['codigo'];
    this.productoService.obtenerProducto(this.code).subscribe((producto:Producto)=>{
      this.producto = producto;
    },()=>{
      this.snack.open("Error al cargar el producto","Aceptar",{
        duration:3000
      })
    });
  }

  validarCampos(...campos): boolean {
    for (const campo of campos) {
      if (campo === '' || campo === undefined) {
        return false;
      }
    }
    return true;
  }

  editarProducto(){
    if (!this.validarCampos(this.producto.description, this.producto.imgUrl, this.producto.name, this.producto.price, this.producto.stock,this.producto.size)) {
      this.snack.open("Campos incompletos", "Aceptar", {
        duration: 3000
      });
      return;
    }
    Swal.fire({
      title: 'Editar producto',
      inputPlaceholder: '¿Estas seguro que queres editar el producto?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#13c2c2'
    }).then((result) => {
      if(result.isConfirmed) {
        this.productoService.editarProducto(this.producto).subscribe(()=>{
          Swal.fire("Producto editado","El producto se edito correctamente","success");
          this.router.navigate(['productos']);
        },err=>console.log(err))
      }
    });
  }

  limpiarCampos(){
    this.producto.name = ''; this.producto.imgUrl = ''; this.producto.price = 0; this.producto.size = ''; this.producto.stock = 0; this.producto.description = '';
  }


}
