import { Domicilio } from "./domicilio";
import { Producto } from "./producto";
import { UsuarioCompraDTO } from "./usuarioCompraDTO";

export class Compra {
    saleId:number;
    productsId:number[] = [];
    date:Date;
    userDni:string;
    type:string;
    total:number;
    paid:boolean;
    ready:boolean;
    completed:boolean;
    residence:Domicilio = new Domicilio();
}
