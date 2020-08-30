import React from 'react';
import { Link } from 'react-router-dom'; 

function NotFound() {
  return (
    <div className="NotFound center container vh">
      <h1>Sorry, page was not found.</h1>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default NotFound;
