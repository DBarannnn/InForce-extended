
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.css'
import Layout from './components/common/Layout'
import Table from './components/Table'

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route index element={<Table />}/>
    </Route>
  ))

  return (
    <RouterProvider router={router}/>
  )
}

export default App
