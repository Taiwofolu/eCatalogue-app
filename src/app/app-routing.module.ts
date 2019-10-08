import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderSummaryPage } from './checkout/order-summary/order-summary.page';
import { HomePage } from './home/home.page';
import { AccountPage } from './account/account.page';
import { CategoriesPage } from './categories/categories.page';
import { SearchPage } from './search/search.page';
import { ProductsPage } from './products/products.page';
import { ProductPage } from './product/product.page';
import { ReviewPage } from './review/review.page';
import { BlogPage } from './account/blog/blog.page';
import { BlogsPage } from './account/blogs/blogs.page';
import { PostPage } from './post/post.page';
import { PostsPage } from './posts/posts.page';
import { FavoritePage } from './favorite/favorite.page';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'  },
  // { path: 'home', component: HomePage  },
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
          {
            path: 'review/:id',
            children: [
              {
                path: '',
                component: ReviewPage
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
              },
              {
                path: 'review/:id',
                component: ReviewPage
              }
            ]
          }
        ]
      }
    ]
  },
  // { path: 'search', component: SearchPage  },
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
          {
            path: 'review/:id',
            children: [
              {
                path: '',
                component: ReviewPage
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
              },
              {
                path: 'review/:id',
                component: ReviewPage
              }
            ]
          }
        ]
      }
    ]
  },
  // { path: 'categories', component: CategoriesPage  },
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
              },
              {
                path: 'review/:id',
                component: ReviewPage
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
              },
              {
                path: 'review/:id',
                component: ReviewPage
              }
            ]
          }
        ]
      }
    ]
  },
  { path: 'account', component: AccountPage  },
  { path: 'blogs', component: BlogsPage  },
  // { path: 'posts/:id', loadChildren: './post/post.module#PostPageModule' },
  { path: 'posts/:id', component: PostPage },
  { path: 'posts', component: PostsPage },
  // { path: 'favorite', loadChildren: './favorite/favorite.module#FavoritePageModule' },
  {
    path: 'favourite',
    children: [
      {
        path: '',
        component: FavoritePage
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
              },
              {
                path: 'review/:id',
                component: ReviewPage
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
              },
              {
                path: 'review/:id',
                component: ReviewPage
              }
            ]
          }
        ]
      }
    ]
  },
  // { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', },
  // { path: '', component: OrderSummaryPage },
  // { path: 'favourites', loadChildren: './favourites/favourites.module#FavouritesPageModule' },
  //{ path: 'edit-address', loadChildren: './account/edit-address/edit-address.module#EditAddressPageModule' },
  //{ path: 'map', loadChildren: './account/map/map.module#MapPageModule' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
