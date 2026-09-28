function ProductCard({ producto, onVerDetalle, onAgregarAlCarrito, moneda }) {
  return (
    <article className="product-card">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="product-card__img"
      />
      <div className="product-card__body">
        <p className="product-card__category">{producto.categoria}</p>
        <h3 className="product-card__title">{producto.nombre}</h3>
        <p className="product-card__desc">{producto.descripcion}</p>
        <div className="product-card__footer">
          <p className="product-card__price">{moneda.format(producto.precio)}</p>
          <div className="product-card__actions">
            <button
              className="btn btn--secondary"
              onClick={() => onVerDetalle(producto)}
            >
              Ver más
            </button>
            <button
              className="btn btn--primary"
              onClick={() => onAgregarAlCarrito(producto)}
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
