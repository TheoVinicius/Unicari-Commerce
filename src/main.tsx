import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { HomePage } from './pages/Home';
import { Header } from './components/Header';
import { ProductPage } from './pages/Product';
import { Footer } from './components/Footer';
import { NotFoundPage } from './pages/NotFound';
import { CartPage } from './pages/Cart';

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <Header />
      <HomePage />
      <Footer />
    </>,
    errorElement: <NotFoundPage />
  },
  {
    path: "/product",
    element: <>
      <Header />
      <ProductPage />
      <Footer />
    </>
  }
  ,
  {
    path: "/cart",
    element: <>
      <Header />
      <CartPage />
      <Footer />
    </>
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
