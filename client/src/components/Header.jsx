import { Link } from 'react-router-dom'

function Header({ cantidadCarrito, onCartToggle, busqueda, onBusquedaChange, onNavigateHome }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="logo" onClick={onNavigateHome}>
          <img src="/img/logo.svg" alt="Logotipo de Mueblería Hermanos Jota" />
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Abrir menú"
          aria-expanded="false"
        >
          <span className="nav-toggle__bar"></span>
          <span className="nav-toggle__bar"></span>
          <span className="nav-toggle__bar"></span>
        </button>

        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/" className="nav__link">Inicio</Link>
            </li>
            <li className="nav__item">
              <Link to="/productos" className="nav__link">Productos</Link>
            </li>
            <li className="nav__item">
              <Link to="/contacto" className="nav__link">Contacto</Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="cart"
          onClick={onCartToggle}
          aria-label="Ver carrito"
          aria-expanded={cantidadCarrito > 0}
        >
          <svg className="cart__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13L5.4 5M7 13l-1.5 6h11M9 21a1 1 0 100-2 1 1 0 000 2zM18 21a1 1 0 100-2 1 1 0 000 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="cart__count">{cantidadCarrito}</span>
        </button>
      </div>
    </header>
  )
}

export default Header
