import { Domicilio } from "./domicilio";
import { Producto } from "./producto";
import { UsuarioCompraDTO } from "./usuarioCompraDTO";

export class Compra {
    productsId:number[] = [];
    userDni:string;
    type:string;
    residence:Domicilio = new Domicilio();
}
