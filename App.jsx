import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './component/home/Home'
import Register from './component/auth/Register'
import Login from './component/auth/Login'
import Customer from './component/customer/Customer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
       
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register/>} />
        <Route path='/login' element={<Login/>}></Route>
        <Route path="/customer" element={<Customer/>} />
      </Routes>
    </Router>
    </main>
  )
}

export default App
