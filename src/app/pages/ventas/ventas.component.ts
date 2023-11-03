import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Compra } from 'src/app/modelo/compra';
import { CompraService } from 'src/app/services/compra.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {

  compras:Compra[] = [];
  numeros: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  ordenamiento:string = "date";
  query: string = '';

  constructor(private compraService:CompraService, private loginService:LoginService, private snack:MatSnackBar){}

  ngOnInit():void{
    this.obtenerVentasDePagina(0,'date');
  }

  public buscarVentas() {
    if (this.query == '' || this.query == undefined || this.query == null) {
      this.obtenerVentasDePagina(0,this.ordenamiento);
      return;
    }
    this.compraService.buscarCompras(this.query).subscribe((compras: Compra[]) => {
      this.compras = compras;
    })
  }


  obtenerVentasDePagina(page:number,ordenamiento:string):void{
    this.compraService.obtenerComprasPaginadas(page,ordenamiento).subscribe((compras:any)=>{
      this.compras = compras.content;
    })
  }

  marcarComoPaga(id:number):void{
    Swal.fire({
      title: 'Marcar venta como pagada',
      text:'¿Estas seguro que queres marcar la venta como paga?, esta accion no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#13c2c2'
    }).then((result) => {
      if (result.isConfirmed) {
        this.compraService.marcarComoPaga(id).subscribe(()=>{},err=>this.snack.open("Ocurrio un error","Aceptar",{
          duration:3000
        }));
        location.reload();
      }
    });
 
  }

  marcarComoLista(id:number):void{
    Swal.fire({
      title: 'Marcar venta como lista',
      text:'¿Estas seguro que queres marcar la venta como lista?, esta accion no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#13c2c2'
    }).then((result) => {
      if (result.isConfirmed) {
        this.compraService.marcarComoLista(id).subscribe(()=>{},err=>this.snack.open("Ocurrio un error","Aceptar",{
          duration:3000
        }));
        location.reload();
      }
    });
 
  }

  eliminar(id:number){
    Swal.fire({
      title: 'Eliminar venta',
      text:'¿Estas seguro que queres eliminar la venta?, por favor elimine la venta en caso de considerar que es invalida y no esta pagada.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#13c2c2'
    }).then((result) => {
      if (result.isConfirmed) {
        this.compraService.eliminarVenta(id).subscribe();
        location.reload();
      }
    });
  }

  marcarComoCompletada(id:number):void{
    Swal.fire({
      title: 'Marcar venta como completada',
      text:'¿Estas seguro que queres marcar la venta como completada?, ( desaparecera de su visualizacion ) ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#13c2c2'
    }).then((result) => {
      if (result.isConfirmed) {
        this.compraService.marcarComoCompletada(id).subscribe(()=>{},err=>this.snack.open("Ocurrio un error","Aceptar",{
          duration:3000
        }));
        location.reload();
      }
    });
 
  }


}
