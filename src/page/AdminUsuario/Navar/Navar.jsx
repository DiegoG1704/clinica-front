import React from 'react';
import '../Navar/navar.css'; 
import { InputText } from 'primereact/inputtext';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* Puedes colocar aquí un logo o título */}
      </div>
      
      <ul className="navbar-links">
        <li>
          <InputText placeholder='Buscar'/>
        </li>
        <li>
          <a href="#"><i className="pi pi-bell"></i></a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
