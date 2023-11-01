import { Domicilio } from "./domicilio";
import { Producto } from "./producto";
import { UsuarioCompraDTO } from "./usuarioCompraDTO";
import { UsuarioDTO } from "./usuarioDTO";

export class CompraDTO {
    id:number;
    date:Date;
    products:Producto[] = [];
    paid:boolean;
    ready:boolean;
    completed:boolean;
    total:number;
    user:UsuarioDTO;
    type:string;
    residence:Domicilio = new Domicilio();
}
