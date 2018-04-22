import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
// import { CatalogComponent } from './catalog/catalog.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'catalog', loadChildren: 'app/catalog/catalog.module#CatalogModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
