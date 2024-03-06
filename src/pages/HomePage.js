import React from "react";
import '../styles/HomePage.css';
import { Link } from "react-router-dom";

const HomePage = () => {
    return ( 
    <>
     <img src= "/images/70188496.webp" alt="job website" id="myimage"></img>
     <div className="content">
        <div className="card w-25">
            <img src="/images/download (2).jpg" alt="logo" />
         <hr />
        <div className="card-body">
            <h5 className="card-title"> Find a skilled individual to do the job </h5>
            <p className="card-text">
                Launch a new chapter in your career with us
            </p>
            <div className="d-flex justify-content-between mt-5"/>
            <p>
                <Link to="/login" className="myBtn">Login</Link>
            </p>
            <div>
                <p>Not register yet? <Link to ='/Register'>  click here </Link></p>
            </div>
        </div>
     </div>
     </div>
    </>
    )
};
export default HomePage;