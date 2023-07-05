import React from 'react';
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="not-found d-flex flex-grow-1 justify-content-center align-items-center text-center flex-column">
      <h1>404<br/><span>Not Found</span></h1>
      <Link to="/" ><p className="not-found-link">Back to Home</p></Link>
    </div>
  )
}

export default NotFound