import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Compra } from '../modelo/compra';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private http:HttpClient) { }

  private apiUrl : string = "http://localhost:81/sales-service/sales/";

  public registrarCompra(compra:Compra){
    return this.http.post(this.apiUrl + "add",compra);
  }

  public obtenerCompraPorId(id:number){
    return this.http.get(this.apiUrl+"get/"+id);
  }

  public obtenerCompraPorUsuario(dni:string){
    return this.http.get(this.apiUrl + "get/user/"+dni);
  }

  public obtenerComprasPaginadas(page:number,sortField:string){
    return this.http.get(this.apiUrl+"get/paginated?page="+page+"&"+"sortField="+sortField);
  }
}
