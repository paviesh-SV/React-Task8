import './App.css';
import Cart from "./Components/Cart.jsx"
import Home from "./Components/Home.jsx"
import Layout from "./Components/Layout.jsx"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />} />
        <Route path='/cart' element={<Cart />} />
      </Route>
    )
  )

  return (
    <>
      <div className='App'>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
