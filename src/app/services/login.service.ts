import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../modelo/usuario';
import { UsuarioDTO } from '../modelo/usuarioDTO';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient,private userService:UserService,) { }

  private apiUrl:string = "http://localhost:81/user-service/user/";

  public Login(usuarioDTO:UsuarioDTO){
    return this.http.post(this.apiUrl+ "login",usuarioDTO);
  }

  public registrarse(usuario:Usuario){
    return this.http.post(this.apiUrl+"register",usuario);
  } 

  //localStorage

  public logOut(){
    localStorage.removeItem("usuario");
  }

  public isLoggedIn():boolean{
    let user = localStorage.getItem("usuario");
    if(user != undefined && user != null && user != '') return true;
    return false;
  }

  public setUser(usuario:Usuario){
    localStorage.setItem("usuario",JSON.stringify(usuario));
  }

  public getUser(){
    let userStr = localStorage.getItem("usuario");
    if(userStr != null){
      return JSON.parse(userStr);
    }
  }


 
}
