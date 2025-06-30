import React, { useState } from "react";
import "../assets/css/header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">SUPER QUADS</h1>
      </div>

      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`header-center ${menuOpen ? "active" : ""}`}>
        <a href="#tour" className="nav-link" onClick={closeMenu}>
          Tour
        </a>
        <a href="#galeria" className="nav-link" onClick={closeMenu}>
          Galería de Aventuras
        </a>
        <a href="#acerca" className="nav-link" onClick={closeMenu}>
          Acerca de
        </a>

        <div className="header-right">
          <a
            href="https://wa.me/tu-numero"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link"
            onClick={closeMenu}
          >
            <i className="fab fa-whatsapp"></i>
          </a>
          <a
            href="https://www.tiktok.com/@tuusuario"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link"
            onClick={closeMenu}
          >
            <i className="fab fa-tiktok"></i>
          </a>
          <a
            href="https://www.instagram.com/tuusuario"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link"
            onClick={closeMenu}
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#reservar" className="btn-reservar" onClick={closeMenu}>
            RESERVAR
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
