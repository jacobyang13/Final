import React from 'react';

function Nav() {
  return (
    <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">COMP 426</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" tabIndex="1" href="#">Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Features</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="">Pricing</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Log Out</a>
      </li>
      {/* <li className="nav-item">
        <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
      </li> */}
    </ul>
  </div>
</nav>
    </div>
  );
}

export default Nav;
