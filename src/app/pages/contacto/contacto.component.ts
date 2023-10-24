import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contacto } from 'src/app/modelo/contacto';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ContactoService } from 'src/app/services/contacto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {

  contacto:Contacto = new Contacto();
  

  constructor(private snack:MatSnackBar, private contactoService:ContactoService) {
    this.contacto.reason = 'Consulta';
  }

 
  validarCampos(...campos): boolean {
    for (const campo of campos) {
      if (campo === '' || campo === undefined) {
        return false;
      }
    }
    return true;
  }

  enviarFormulario(){
    if(!this.validarCampos(this.contacto.name,this.contacto.lastname,this.contacto.phone,this.contacto.message,this.contacto.reason,this.contacto.email)){
      this.snack.open("Campos sin completar","Aceptar",{
        duration:3000
      });
      return;
    }
    Swal.fire("Formulario enviado","El formulario se envio correctamente, pronto obtendra una respuesta.","success");
    this.limpiarCampos;
    this.contactoService.enviarFormulario(this.contacto).subscribe(()=>{},err=>console.log(err));
  }

  limpiarCampos(){
    this.contacto.name = ''; this.contacto.lastname = ''; this.contacto.message = ''; this.contacto.email = ''; this.contacto.phone = ''; this.contacto.reason = ''; 
  }

}
