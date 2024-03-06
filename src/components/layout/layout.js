import React from 'react';
import {Link, useLocation,useNavigate} from 'react-router-dom';
import {toast} from "react-toastify";
import '../../styles/layout.css';
import { userMenu } from './Menus/UserMenu';
const Layout = ({children}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const sidebarMenu= userMenu;

// logout
const handleLogout = () =>{
    localStorage.clear();
    toast.success('Logout Successfully');
    navigate("/login");
}

    return(
        <>
        <div className='row'>
            <div className='col-md-3 sidebar'>Menu</div>
                  <div className="logo">
                    <h6>Job portal</h6>
                    </div>
                    <hr />
                    <p className='text-center text warning'> welcome : username </p>
                    <hr/>
                    <div className='menu'>
                    {sidebarMenu.map((menu ) => {
                        const isActive = location.pathname === menu.path
                      return (
                        <div className={`menu-item ${isActive && "active"}`}>
                            <i className='{menu.icon}'></i>
                            <Link
                            to={menu.path}>{menu.name}
                            </Link>
                        </div>
                      );
                })}
                  <div className={`menu-item `} onClick={handleLogout()}>
                            <i className='<i class="fa-solid fa-right-from-bracket"></i>'></i>
                            <Link
                            to='/login'>Logout
                            </Link>
                        </div>
                </div>
                <hr />  
                </div>
                          
                <div className='col-md-3'>{children}
        </div>
        </>
    );
};

export default Layout;