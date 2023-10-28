
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.css'
import Layout from './components/common/Layout'
import Table, {
  action as tableAction,
  loader as tableLoader
} from './components/Table'

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route
      index 
      action={tableAction}
      loader={tableLoader}
      element={<Table />}
      />
    </Route>
  ))

  return (
    <RouterProvider router={router}/>
  )
}

export default App
