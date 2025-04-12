
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import { Outlet } from 'react-router-dom'
import authService from './appwrite/auth'


import { login, logout } from './store/authSlice'
import { Footer, Header } from './components/index.js'
function App() {

    const [loading, setLoading ] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {     
    authService.getCurrentUser()
      .then((userData) => {
        if(userData)
        {
          console.log("User session exists", userData);
          
          dispatch(login(userData))
        }
        else{
          console.log("User Not Found");
          
          dispatch(logout())
        }
      }).catch((error)=> {
        console.log("User NOt Found", error);
        
      })
      .finally(() => setLoading(false))
    }
    ,[])

    if(loading){
      return (
        <div className="w-full h-screen flex items-center justify-center">
          <p className="text-lg text-white">Loading...</p>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
    )
}

export default App
