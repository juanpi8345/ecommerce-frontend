import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelo/usuario';
import { UsuarioDTO } from 'src/app/modelo/usuarioDTO';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verificar-usuario',
  templateUrl: './verificar-usuario.component.html',
  styleUrls: ['./verificar-usuario.component.css']
})
export class VerificarUsuarioComponent {

  codigoEnviado: boolean = false;
  email: string = '';
  usuario: Usuario = new Usuario();
  codigo: string = '';
  registrado: boolean = false;

  constructor(private userService: UserService, private snack: MatSnackBar, private router: Router) { }

  ngOnInit(): void {

  }

  enviarCodigo(): void {
    const emailRegular = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegular.test(this.email)) {
      this.snack.open("El email es inválido", "Aceptar", {
        duration: 3000
      });
      return;
    }
    this.userService.traerUsuarioPorEmail(this.email).subscribe(
      (usuario: Usuario) => {
        this.registrado = true;
        this.usuario = usuario;

        if (this.usuario.verificated) {
          this.snack.open("El email ya está verificado", "Aceptar", {
            duration: 3000
          });
          this.router.navigate(['/login']);
        } else {
          if (this.registrado) {
            this.codigoEnviado = true;
            this.userService.enviarCodigo(this.email).subscribe(
              () => { },
              () => this.snack.open("Ocurrió un error al enviar el correo", "Aceptar", {
                duration: 3000
              })
            );
          }
        }
      },
      () => {
        this.snack.open("El email no está registrado", "Aceptar", {
          duration: 3000
        });
      }
    );
  }

  validarCodigo() {
    this.userService.validarCodigo(this.email, this.codigo).subscribe(() => {
      Swal.fire("Usuario verificado con exito", "El usuario se verifico correctamente", "success");
      this.router.navigate(['/login']);
    }, () => {
      this.snack.open("Codigo incorrecto", "Aceptar", {
        duration: 3000
      })
    })
  }
}
