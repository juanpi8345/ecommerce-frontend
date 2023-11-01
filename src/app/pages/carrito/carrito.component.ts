import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Compra } from 'src/app/modelo/compra';
import { CompraService } from 'src/app/services/compra.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  envioDomicilio: boolean = false;
  verInstrucciones: boolean = true;
  verPreguntas: boolean = false;
  compra: Compra = new Compra();


  constructor(private loginService: LoginService, private snack: MatSnackBar,
    private compraService: CompraService, private router: Router) {
    this.compra.residence.province = "Buenos Aires";
  }

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

  obtenerTamanioCarrito(): number {
    const productos = this.obtenerProductosCarrito();
    return productos.length;
  }

  validarCampos(...campos): boolean {
    for (const campo of campos) {
      if (campo === '' || campo === undefined) {
        return false;
      }
    }
    return true;
  }

  realizarCompra() {
    this.compra.productsId = this.obtenerProductosIdCarrito();
    this.compra.userDni = this.loginService.getUser().dni;
    if (this.envioDomicilio) {
      if (!this.validarCampos(this.compra.residence.locality, this.compra.residence.street, this.compra.residence.residenceNumber)) {
        this.snack.open("Todos los campos son requeridos", "Aceptar", {
          duration: 3000
        })
        return;
      }
      if (this.compra.residence.locality.length < 3 || this.compra.residence.street.length < 3) {
        this.snack.open("Ingrese direcciones validas", "Aceptar", {
          duration: 3000
        })
      }
      this.compra.type = "Envio a domicilio";
    }
    else {
      this.compra.type = "Entrega presencial";
    }
    if (this.obtenerTamanioCarrito() > 0) {
      Swal.fire({
        title: 'Registrar compra',
        inputPlaceholder: '¿Estas seguro que queres registrar la compra?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#13c2c2'
      }).then((result) => {
        if (result.isConfirmed) {
          this.compraService.registrarCompra(this.compra).subscribe(() => {
            //this.router.navigate(['miscompras']);
            sessionStorage.clear();
            Swal.fire("Compra registrada", "La compra se registro correctamente", "success");
          }, () => {
            this.snack.open("Error al registrar la compra", "Aceptar", {
              duration: 3000
            })
          })
        }
      });
    }else{
      Swal.fire("Carrito vacio","Agrega al menos un producto para registrar la compra","error");
    }

  }

  //sessionStorage
  obtenerProductosCarrito() {
    const productos = JSON.parse(sessionStorage.getItem('productos')) || [];
    return productos;
  }

  obtenerProductosIdCarrito(): number[] {
    const productos = JSON.parse(sessionStorage.getItem('productos')) || [];
    let listaDeIds: number[] = [];
    for (let producto of productos) {
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
