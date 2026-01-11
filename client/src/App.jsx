import { useState } from 'react'
import { Routes, Route } from 'react-router';
import './App.css'
import Navbar from './components/common/Navbar';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';


function App() {
const [user, setUser] = useState(localStorage.getItem('token'))

const LogIn = (data) =>{
  localStorage.setItem('token', data);
  setUser(data)
}

const signOut = () => {
  localStorage.removeItem('token');
  setUser('');
}


  return (
    <>
      <h1>Welcome to Portfolio</h1>

    <Navbar signOut={signOut} user={user} />
    <Routes>
        <Route path="/signup" element={<SignUp LogIn={LogIn} />} />
        <Route path="/" element={<SignIn LogIn={LogIn} />} />
    </Routes>
    </>
  )
}

export default App
