import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Compra } from '../modelo/compra';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private http:HttpClient) { }

  //private apiUrl : string = "http://localhost:81/sales-service/sales/";
  private apiUrl : string = "https://clothingstore-foypgsk3.b4a.run/sales/";

  public registrarCompra(compra:Compra){
    return this.http.post(this.apiUrl + "add",compra);
  }

  public obtenerCompraPorId(id:number){
    return this.http.get(this.apiUrl+"get/"+id);
  }

  public obtenerCompraPorUsuario(dni:string){
    return this.http.get(this.apiUrl + "get/user/"+dni);
  }

  public obtenerCantidadDeComprasSinCompletarDelUsuario(dni:number){
    return this.http.get(this.apiUrl+ "getQuantityWithoutComplete/user/"+dni);
  }

  public obtenerComprasPaginadas(page:number,sortField:string){
    return this.http.get(this.apiUrl+"get/paginated?page="+page+"&"+"sortField="+sortField);
  }

  public marcarComoPaga(saleId:number){
    return this.http.put(this.apiUrl + "markAsPaid/sale/"+saleId,null);
  }

  public marcarComoLista(saleId:number){
    return this.http.put(this.apiUrl + "markAsReady/sale/"+saleId,null);
  }

  public marcarComoCompletada(saleId:number){
    return this.http.put(this.apiUrl + "markAsCompleted/sale/"+saleId,null);
  }

  public eliminarVenta(saleId:number){
    return this.http.delete(this.apiUrl+"delete/sale/"+saleId);
  }

  public buscarCompras(query:string){
    return this.http.get(this.apiUrl+"search"+"?query="+query);
  }


}
