import { VideoDashboardModule } from './../modules/video-dashboard/video-dashboard.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [


  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '', component: LayoutComponent,  
    children : [
      {
        path: 'dashboard', 
        loadChildren: () => import('../modules/dashboard/dashboard.module').then(m => m.DashboardModule),

      },
      {
        path: 'video', 
        loadChildren: () => import('../modules/video-dashboard/video-dashboard.module').then(m => m.VideoDashboardModule),
      }
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
