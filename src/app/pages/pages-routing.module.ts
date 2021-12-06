import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const routes: Routes = [
  { 
      path:'dashboard', component: PagesComponent,
      children: [
      { path: '', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'grafica1', component: Grafica1Component },
      { path: 'account-settings', component: AccountSettingsComponent },

      
      

      //{ path: '', redirectTo: '/dashboard', pathMatch: 'full'  },
  
      ]
  
  
  },
  
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )

  ],
  exports: [
    RouterModule
  ]

})
export class PagesRoutingModule { }
