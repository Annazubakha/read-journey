import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from "react-toastify";

import {App} from './components'

import "react-toastify/dist/ReactToastify.css";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
      <App /> 
      <ToastContainer autoClose={3000} style={{ zIndex: 99999 }} />
      </BrowserRouter>
  
  </React.StrictMode>,
)
