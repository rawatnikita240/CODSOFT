import React from 'react'
import { Link } from 'react-router-dom';
const notFound = () => {
  return (
    <div>
      <h1> error </h1>
    <Link className='btn btn-success ' to="/"> click here </Link>
    </div>
  )
}

export default notFound;
