import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/modelo/usuario';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent {

  usuario:Usuario = new Usuario();
  claveConfirmar:string;
  

  constructor(private snack:MatSnackBar, private loginService:LoginService,
    private router:Router, private userService:UserService) {}

  validarCampos(...campos): boolean {
    for (const campo of campos) {
      if (campo === '' || campo === undefined) {
        return false;
      }
    }
    return true;
  }

  registrarse(){
    const dniRegular = /^[0-9]{8}$/
    const emailRegular = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(!this.validarCampos(this.usuario.dni,this.usuario.password,this.usuario.email,this.usuario.name,this.usuario.lastname)){
      this.snack.open("Todos los campos son requeridos","Aceptar",{
        duration:3000
      })
    }
    else if(!dniRegular.test(this.usuario.dni) ){
      this.snack.open("El dni es invalido","Aceptar",{
        duration:3000
      })
    }
    else if(!emailRegular.test(this.usuario.email) ){
      this.snack.open("El email es invalido","Aceptar",{
        duration:3000
      })
    }
    else if(this.usuario.password.length < 6){
      this.snack.open("La contraseña debe tener 6 o mas caracteres","Aceptar",{
        duration:3000
      })
    }
    else if(this.usuario.name.length < 3 ){
      this.snack.open("El nombre debe tener 3 o mas caracteres","Aceptar",{
        duration:3000
      })
    }
    else if(this.usuario.lastname.length < 4 ){
      this.snack.open("El apellido debe tener 4 o mas caracteres","Aceptar",{
        duration:3000
      })
    }
    else if(this.usuario.password.length < 6){
      this.snack.open("La contraseña debe tener 6 o mas caracteres","Aceptar",{
        duration:3000
      })
    }
    else if(this.usuario.password !== this.claveConfirmar){
      this.snack.open("Las contraseñas no coinciden","Aceptar",{
        duration:3000
      })
    }
    else{
      this.userService.existeDni(this.usuario.dni).subscribe((existeDni:boolean)=>{
        if(!existeDni){
          this.userService.existeEmail(this.usuario.email).subscribe((existeEmail:boolean)=>{
            if(!existeEmail){
              this.loginService.registrarse(this.usuario).subscribe(()=>{
                this.router.navigate(['/verificar-usuario']);
              })
            }else{
              this.snack.open("Ese email ya esta registrado","Aceptar",{
                duration:3000
              })
            }
          })
        }else{
          this.snack.open("Ese dni ya esta registrado","Aceptar",{
            duration:3000
          })
        }
      })
    }
  }

}
