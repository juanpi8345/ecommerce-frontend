import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http:HttpClient) { }

  private apiUrl:String = "http://localhost:81/products-service/products/";

  public obtenerProductos(){
    return this.http.get(this.apiUrl + "get");
  }

  public eliminarProducto(codigo:number){
    return this.http.delete(this.apiUrl + "delete/"+codigo);
  }
}
