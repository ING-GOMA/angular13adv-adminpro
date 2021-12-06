import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { Routes, RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';

const routes: Routes = [

  //path '/dashboard' pagesRouting
  //path 'auth' Auth Roting

  { path: '', redirectTo: '/dashboard', pathMatch: 'full'  },
  

  { path: '**', component: NopagefoundComponent }


];

@NgModule({
  declarations: [],
  exports:[
    RouterModule
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot( routes ),
    PagesRoutingModule,
    AuthRoutingModule
    
  ]
})
export class AppRoutingModule { }
