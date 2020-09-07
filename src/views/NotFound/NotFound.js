import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

function NotFound() {
  return (
    <main className="NotFound container">
      <h1>Sorry, page was not found.</h1>
      <Link className="link" to="/">
        Return to Home
      </Link>
    </main>
  );
}

export default NotFound;
