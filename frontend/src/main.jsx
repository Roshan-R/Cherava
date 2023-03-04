import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Home from './Home'
import './index.css'
// import('preline')
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <>
    <Toaster
      position="bottom-right"
      reverseOrder={false}
    />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="new/" element={<App />} />
      </Routes>
    </BrowserRouter>,
  </>
  // </React.StrictMode>
)
