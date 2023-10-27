
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.css'

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<p>Layout here</p>}></Route>
  ))

  return (
    <RouterProvider router={router}/>
  )
}

export default App
