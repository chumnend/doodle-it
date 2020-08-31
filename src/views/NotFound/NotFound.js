import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

function NotFound() {
  return (
    <div className="NotFound container view">
      <h1>Sorry, page was not found.</h1>
      <Link className="link" to="/">Return to Home</Link>
    </div>
  );
}

export default NotFound;
