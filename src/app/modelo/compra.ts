import { Domicilio } from "./domicilio";
import { Producto } from "./producto";
import { UsuarioCompraDTO } from "./usuarioCompraDTO";

export class Compra {
    products:number[] = [];
    user:string;
    type:string;
    residence:Domicilio;
}
