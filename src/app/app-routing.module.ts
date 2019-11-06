import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home/home.page';
import { AccountPage } from './account/account.page';
import { CategoriesPage } from './categories/categories.page';
import { SearchPage } from './search/search.page';
import { ProductsPage } from './products/products.page';
import { ProductPage } from './product/product.page';
import { MapPage } from './map/map.page';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'  },
  {
    path: 'home',
    children: [
      {
        path: '',
        component: HomePage
      },
      {
        path: 'product/:id',
        children: [
          {
            path: '',
            component: ProductPage
          },
        ]
      },
      {
        path: 'vendor-products',
        children: [
          {
            path: '',
            component: ProductsPage
          },
          {
            path: 'product/:id',
            children: [
              {
                path: '',
                component: ProductPage
              },
            ]
          }
        ]
      }
    ]
  },
  {
    path: 'search',
    children: [
      {
        path: '',
        component: SearchPage
      },
      {
        path: 'product/:id',
        children: [
          {
            path: '',
            component: ProductPage
          },
        ]
      },
      {
        path: 'vendor-products',
        children: [
          {
            path: '',
            component: ProductsPage
          },
          {
            path: 'product/:id',
            children: [
              {
                path: '',
                component: ProductPage
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: 'categories',
    children: [
      {
        path: '',
        component: CategoriesPage
      },
      {
        path: 'products/:id',
        children: [
          {
            path: '',
            component: ProductsPage
          },
          {
            path: 'product/:id',
            children: [
              {
                path: '',
                component: ProductPage
              }
            ]
          }
        ]
      },
      {
        path: 'vendor-products',
        children: [
          {
            path: '',
            component: ProductsPage
          },
          {
            path: 'product/:id',
            children: [
              {
                path: '',
                component: ProductPage
              }
            ]
          }
        ]
      }
    ]
  },
  { path: 'account', component: AccountPage  },
  { path: 'map', component: MapPage  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
