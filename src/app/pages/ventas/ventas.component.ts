import { Component } from '@angular/core';
import { Compra } from 'src/app/modelo/compra';
import { CompraService } from 'src/app/services/compra.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {

  compras:Compra[] = [];
  numeros: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private compraService:CompraService, private loginService:LoginService){}

  ngOnInit():void{
    this.obtenerVentasDePagina(0,'date');
  }


  obtenerVentasDePagina(page:number,ordenamiento:string):void{
    this.compraService.obtenerComprasPaginadas(page,ordenamiento).subscribe((compras:any)=>{
      this.compras = compras.content;
    })
  }


}
