import { Component } from '@angular/core';
import { Compra } from 'src/app/modelo/compra';
import { CompraDTO } from 'src/app/modelo/compraDTO';
import { CompraService } from 'src/app/services/compra.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrls: ['./mis-compras.component.css']
})
export class MisComprasComponent {

  compras:CompraDTO[] = [];

  constructor(private compraService:CompraService, private loginService:LoginService){}

  ngOnInit():void{
    this.compraService.obtenerCompraPorUsuario(this.loginService.getUser().dni).subscribe((compras:CompraDTO[])=>{
      this.compras = compras.reverse();
    })
  }

}
