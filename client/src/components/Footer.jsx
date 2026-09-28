function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <section className="site-footer__col" aria-labelledby="footer-direccion">
          <h2 id="footer-direccion" className="site-footer__heading">Dirección</h2>
          <address className="site-footer__address">
            Mueblería Hermanos Jota<br />
            Av. San Juan 2847, C1232AAB<br />
            San Cristóbal, CABA, Argentina
          </address>
        </section>

        <section className="site-footer__col" aria-labelledby="footer-horarios">
          <h2 id="footer-horarios" className="site-footer__heading">Horarios</h2>
          <p>Lunes a viernes: 10:00 – 19:00</p>
          <p>Sábados: 10:00 – 14:00</p>
        </section>

        <section className="site-footer__col" aria-labelledby="footer-contacto">
          <h2 id="footer-contacto" className="site-footer__heading">Contacto</h2>
          <p><a href="mailto:info@hermanosjota.com.ar">info@hermanosjota.com.ar</a></p>
          <p><a href="mailto:ventas@hermanosjota.com.ar">ventas@hermanosjota.com.ar</a></p>
          <p>
            WhatsApp: <a href="https://wa.me/541145678900" rel="noopener noreferrer">+54 11 4567-8900</a>
            {' · '}
            <a href="tel:+541145678900">Llamar</a>
          </p>
        </section>

        <nav className="site-footer__col" aria-label="Redes sociales">
          <h2 className="site-footer__heading">Redes sociales</h2>
          <ul className="site-footer__social">
            <li>
              <a href="https://www.instagram.com/hermanosjota_ba/" rel="noopener noreferrer" aria-label="Instagram de Hermanos Jota">
                @hermanosjota_ba
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="site-footer__bottom">
        <p>&copy; 2026 Hermanos Jota. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
