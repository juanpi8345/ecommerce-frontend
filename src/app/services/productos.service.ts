import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Producto } from '../modelo/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http:HttpClient) { }

  //private apiUrl:String = "http://localhost:81/products-service/products/";
  private apiUrl:String = "https://clothingstore-foypgsk3.b4a.run/products/";

  public obtenerProductos(page:Optional,ordenamiento:Optional){
    if(page== null || undefined || ordenamiento == null || ordenamiento == undefined){
      page = 0;
      ordenamiento = 'name';
    } 
    return this.http.get(this.apiUrl + "get"+"?page="+page+"&sortField="+ordenamiento);
  }

  public obtenerProducto(code:number){
    return this.http.get(this.apiUrl+"get/"+code);
  }

  public buscarProductos(query:string){
    return this.http.get(this.apiUrl+"search"+"?query="+query);
  }

  public eliminarProducto(codigo:number){
    return this.http.delete(this.apiUrl + "delete/"+codigo);
  }

  public editarProducto(producto:Producto){
    return this.http.put(this.apiUrl+"edit",producto);
  }

  public agregarProducto(producto:Producto){
    return this.http.post(this.apiUrl + "create",producto);
  }

}
