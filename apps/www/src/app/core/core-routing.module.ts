import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@ab/home').then((module) => module.HomeModule),
  },
  {
    path: 'about',
    loadChildren: () => import('@ab/about').then((module) => module.AboutModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('@ab/auth').then((module) => module.AuthModule),
  },
  {
    path: 'category',
    loadChildren: () => import('@ab/category').then((module) => module.CategoryModule),
  },
  {
    path: 'contact',
    loadChildren: () => import('@ab/contact').then((module) => module.ContactModule),
  },
  {
    path: 'not-found',
    loadChildren: () => import('@ab/not-found').then((module) => module.NotFoundModule),
  },
  {
    path: 'resource',
    loadChildren: () => import('@ab/resource').then((module) => module.ResourceModule),
  },
  {
    path: 'resource-new',
    loadChildren: () => import('@ab/resource-new').then((module) => module.ResourceNewModule),
  },
  {
    path: 'search',
    loadChildren: () => import('@ab/search').then((module) => module.SearchModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        ...routes,
        {
          path: '**',
          redirectTo: 'not-found',
        },
      ],
      {
        initialNavigation: 'enabled',
      }
    ),
  ],
  exports: [RouterModule],
})
export class CoreRoutingModule {
  constructor() {}
}
