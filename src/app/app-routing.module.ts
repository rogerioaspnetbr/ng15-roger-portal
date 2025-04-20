import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'renda-fixa', pathMatch: 'full' },
      {
        path: 'renda-fixa',
        loadChildren: () => import('./components/renda-fixa/renda-fixa.module').then(m => m.RendaFixaModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
