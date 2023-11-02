import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CompraDTO } from 'src/app/modelo/compraDTO';
import { Producto } from 'src/app/modelo/producto';
import { CompraService } from 'src/app/services/compra.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-ver-compra',
  templateUrl: './ver-compra.component.html',
  styleUrls: ['./ver-compra.component.css']
})
export class VerCompraComponent {

  compra: CompraDTO = new CompraDTO();
  id: number;
  rol:string;
  constructor(private compraService: CompraService, private route: ActivatedRoute,
    private snack: MatSnackBar, private loginService:LoginService, private userService:UserService) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.compraService.obtenerCompraPorId(this.id).subscribe((compra: CompraDTO) => {
      this.compra = compra;
    }, () => {
      this.snack.open("Error al cargar ticket", "Aceptar", {
        duration: 3000
      })
    })
    this.getUserRol();
  }

  public getUserRol() {
    this.userService.obtenerRol(this.loginService.getUser().dni).subscribe((role: any) => {
      this.rol = role.Role;
    })
  }

  

}









