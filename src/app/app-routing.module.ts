import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { AgregarProductoComponent } from './pages/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './pages/editar-producto/editar-producto.component';
import { VerProductoComponent } from './pages/ver-producto/ver-producto.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';

const routes: Routes = [
  {path: '', redirectTo:"nosotros", pathMatch:'full'},
  {path: 'nosotros', component: HomeComponent},
  {path:'productos',component:ProductosComponent},
  {path:'agregar-producto',component:AgregarProductoComponent,canActivate:[AuthGuard]},
  {path:'editar-producto/:codigo',component:EditarProductoComponent,canActivate:[AuthGuard]},
  {path:'ver-producto/:codigo',component:VerProductoComponent},
  {path:'contacto',component:ContactoComponent},
  {path:'carrito',component:CarritoComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'registrarse',component:RegistrarseComponent},
  {path: '**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
