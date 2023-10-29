
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, redirect } from 'react-router-dom'
import './App.css'
import Layout from './components/common/Layout'
import Table, {action as tableAction, loader as tableLoader} from './components/Table'
import UrlInfo,{ loader as urlInfoLoader} from './components/UrlInfo'
import {loader as easyLoader} from './components/Easy'
import Register, {action as registerAction} from './components/Register'
import Login, {action as loginAction} from './components/Login'
import About from './components/About'
function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
        <Route 
          index
          element={<About />}
        />
        <Route
        path='url' 
        action={tableAction}
        loader={tableLoader}
        element={<Table />}
        />
        <Route 
        path='url/:urlId'
        loader={urlInfoLoader}
        element={<UrlInfo/>}
        />
        <Route
        path='easy/:shortenedUrl'
        loader={easyLoader}
        />
        <Route
        path='register'
        element={<Register />}
        action={registerAction}
        />
       <Route
       path='login'
       element={<Login/>}
       action={loginAction}
       />
    </Route>
  ))

  return (
    <RouterProvider router={router}/>
  )
}

export default App
