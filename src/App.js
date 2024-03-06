import {Routes, Route} from 'react-router-dom'  
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/routes/privateroute';
import PublicRoute from './components/routes/publicroute';

function App() {
  return (
    <>
    {" "}
    <ToastContainer/>
    <Routes>
     <Route path='/'  element={
     <PublicRoute>
        <HomePage/>
     </PublicRoute>
     }/>
      <Route path="/Login" element={
      <PublicRoute>
           <Login/>
      </PublicRoute>
      }/>
      <Route path='/Register' element={
      <PublicRoute>
      <Register/>
      </PublicRoute>
      }/>
      <Route path='/Dashboard' 
      element={
        <PrivateRoute>
             <Dashboard/>

        </PrivateRoute>
      }/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </>
  );
}

export default App;
