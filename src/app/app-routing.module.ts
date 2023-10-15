import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { AgregarProductoComponent } from './pages/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './pages/editar-producto/editar-producto.component';

const routes: Routes = [
  {path: '', redirectTo:"nosotros", pathMatch:'full'},
  {path: 'nosotros', component: HomeComponent},
  {path:'productos',component:ProductosComponent},
  {path:'agregar-producto',component:AgregarProductoComponent},
  {path:'editar-producto/:codigo',component:EditarProductoComponent},
  {path: '**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
