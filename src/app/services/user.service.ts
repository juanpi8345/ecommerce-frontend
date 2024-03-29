import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  //private apiUrl:string = "http://localhost:81/user-service/user/";
  //private apiUrlAdmin:string = "http://localhost:81/user-service/admin/";

  private apiUrl:string = "https://clothingstore-foypgsk3.b4a.run/user/";
  private apiUrlAdmin:string = "https://clothingstore-foypgsk3.b4a.run/admin/";


  public obtenerRol(dni:string){
    return this.http.get<String>(this.apiUrl+dni+"/getRole");
  }

  public traerTodos(page:number,sortField:string){
    return this.http.get(this.apiUrl+"get"+"?page="+page+"&sortField="+sortField);
  }

  public traerUsuarioPorDni(dni:string){
    return this.http.get(this.apiUrl+ "find/dni/"+dni);
  }
  public traerUsuarioPorEmail(username:string){
    return this.http.get(this.apiUrl+ "find/email/"+username);
  }
  
  public existeDni(dni:string){
    return this.http.get(this.apiUrl+"exists/dni/"+dni);
  }

  public existeEmail(email:string){
    return this.http.get(this.apiUrl+"exists/email/"+email);
  }

  public buscarUsuarios(query:string){
    return this.http.get(this.apiUrl+"search"+"?query="+query);
  }

  public asignarRol(userId:number){
    return this.http.put(this.apiUrl + "/changeRole/user/"+userId,null);
  }

  public enviarCodigo(email:string){
    return this.http.post(this.apiUrlAdmin + "sendCode?email="+email,null);
  }

  public validarCodigo(email:string,code:string){
    return this.http.post(this.apiUrlAdmin + "verificateCode?email="+email+"&code="+code,null);
  }
}
