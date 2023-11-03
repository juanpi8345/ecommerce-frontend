import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/modelo/usuario';
import { UsuarioDTO } from 'src/app/modelo/usuarioDTO';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.css']
})
export class VerUsuariosComponent {

  usuarios:UsuarioDTO[] = [];
  roles:string[] = [];
  query: string = '';
  ordenamiento:string = 'dni';
  numeros: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(private userService:UserService,private snack:MatSnackBar){}

  ngOnInit():void{
    this.traerTodos(0,"dni");

  }

  traerTodos(page:number,sortField:string){
    this.userService.traerTodos(page,sortField).subscribe((usuarios:any)=>{
      this.usuarios = usuarios.content;
    },()=>{
      this.snack.open("Error al traer usuarios","Aceptar",{
        duration:3000
      })
    })
  }

  asignarRol(userId:number){
    Swal.fire({
      title: 'Asignar nuevo rol',
      inputPlaceholder: '¿Estas seguro que queres cambiar el rol de este usuario?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#13c2c2'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.asignarRol(userId).subscribe();
        location.reload();
      }
    });
  }

  public buscarUsuarios() {
    if (this.query == '' || this.query == undefined || this.query == null) {
      this.traerTodos(0,"dni");
      return;
    }
     this.userService.buscarUsuarios(this.query).subscribe((usuarios: UsuarioDTO[]) => {
       this.usuarios = usuarios;
     })
  }





}
