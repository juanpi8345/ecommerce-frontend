import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contacto } from '../modelo/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(private http:HttpClient) { }

  //private apiUrl : string = "http://localhost:81/user-service/admin/";
  private apiUrl : string = "https://clothingstore-foypgsk3.b4a.run/admin/";

  public enviarFormulario(contacto:Contacto){
    return this.http.post(this.apiUrl+"contact",contacto);
  }
}
