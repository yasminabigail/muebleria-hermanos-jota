function Cart({ open, onClose, carrito, productos, onCambiarCantidad, onEliminar, total, moneda }) {
  const carritoConProductos = carrito
    .map(item => ({
      ...item,
      producto: productos.find(p => p.id === item.id)
    }))
    .filter(item => item.producto)

  return (
    <aside className={`cart-sidebar ${open ? 'cart-sidebar--open' : ''}`} aria-label="Carrito de compras">
      <div className="cart-sidebar__header">
        <h2>Tu carrito</h2>
        <button type="button" onClick={onClose} aria-label="Cerrar carrito">×</button>
      </div>

      <ul className="cart-items">
        {carritoConProductos.length === 0 ? (
          <li className="cart-empty">Tu carrito está vacío.</li>
        ) : (
          carritoConProductos.map(({ producto, cantidad }) => (
            <li key={producto.id} className="cart-item">
              <div>
                <strong>{producto.nombre}</strong>
                <span>{moneda.format(producto.precio)} c/u</span>
              </div>
              <div className="cart-item__controls">
                <button
                  type="button"
                  onClick={() => onCambiarCantidad(producto.id, -1)}
                  aria-label={`Restar ${producto.nombre}`}
                >
                  -
                </button>
                <span>{cantidad}</span>
                <button
                  type="button"
                  onClick={() => onCambiarCantidad(producto.id, 1)}
                  aria-label={`Sumar ${producto.nombre}`}
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => onEliminar(producto.id)}
                  aria-label={`Eliminar ${producto.nombre}`}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      <div className="cart-sidebar__total">
        <span>Total</span>
        <strong>{moneda.format(total)}</strong>
      </div>
    </aside>
  )
}

export default Cart
