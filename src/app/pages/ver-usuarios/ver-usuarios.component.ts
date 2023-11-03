import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/modelo/usuario';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.css']
})
export class VerUsuariosComponent {

  usuarios:Usuario[] = [];
  roles:string[] = [];

  constructor(private userService:UserService,private snack:MatSnackBar){}

  ngOnInit():void{
    this.traerTodos();

  }

  traerTodos(){
    this.userService.traerTodos().subscribe((usuarios:Usuario[])=>{
      this.usuarios = usuarios;
    },()=>{
      this.snack.open("Error al traer usuarios","Aceptar",{
        duration:3000
      })
    })
  }





}
