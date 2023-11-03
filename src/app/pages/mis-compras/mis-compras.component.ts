import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Compra } from 'src/app/modelo/compra';
import { CompraDTO } from 'src/app/modelo/compraDTO';
import { CompraService } from 'src/app/services/compra.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrls: ['./mis-compras.component.css']
})
export class MisComprasComponent {

  compras:CompraDTO[] = [];

  constructor(private compraService:CompraService, private loginService:LoginService,
    private snack:MatSnackBar){}

  ngOnInit():void{
    this.compraService.obtenerCompraPorUsuario(this.loginService.getUser().dni).subscribe((compras:CompraDTO[])=>{
      this.compras = compras.reverse();
    })
  }

  eliminarCompra(id:number){
    Swal.fire({
      title: 'Eliminar ticket de compra',
      text:'¿Estas seguro que queres eliminar el ticket de la compra?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#13c2c2'
    }).then((result) => {
      if (result.isConfirmed) {
        this.compraService.eliminarVenta(id).subscribe(()=>{},err=>this.snack.open("Ocurrio un error","Aceptar",{
          duration:3000
        }));
        location.reload();
      }
    });
  }

}
