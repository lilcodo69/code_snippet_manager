import {  Route, Routes } from 'react-router-dom'

import Home from "./pages/Home";

import Login from './pages/Login'
import Layout from './components/Layout'
import { SnippetForm } from './components/snippet/SnippetForm';
import AuthLayout from './components/AuthLayout';

function App() {
      return(
        
    <Layout>
      <Routes>
        <Route path='/login' element={<Login/>}/>
         <Route element={<AuthLayout />}>
        <Route path='/' element={<Home/>}/>
        <Route path ='/createSnippet' element={<SnippetForm/>}/>
         </Route>
      </Routes>
    </Layout>

  )
}

export default App
