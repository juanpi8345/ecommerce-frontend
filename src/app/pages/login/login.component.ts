import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelo/usuario';
import { UsuarioDTO } from 'src/app/modelo/usuarioDTO';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuarioDTO:UsuarioDTO = new UsuarioDTO();

  constructor(private loginService:LoginService, private router:Router, private snack:MatSnackBar){}

  validarCampos(...campos): boolean {
    for (const campo of campos) {
      if (campo === '' || campo === undefined) {
        return false;
      }
    }
    return true;
  }

  iniciarSesion():void{
    if(this.validarCampos(this.usuarioDTO.dni, this.usuarioDTO.password)){
      this.loginService.Login(this.usuarioDTO).subscribe((usuario:Usuario)=>{
          this.loginService.setUser(usuario);
          this.router.navigate(['productos']);
      },()=>{
        this.snack.open("Autenticacion incorrecta","Aceptar",{
          duration:3000
        })
      })
    }
  }



}
