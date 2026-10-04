function ProductCard({ producto, onSelectProduct, onAddToCart, currency }) {
  const imageSource = producto.imagen.startsWith('/') ? producto.imagen : `/${producto.imagen}`

  return (
    <article className="product-card">
      <img
        src={imageSource}
        alt={producto.nombre}
        className="product-card__img"
      />
      <div className="product-card__body">
        <p className="product-card__category">{producto.categoria}</p>
        <h3 className="product-card__title">{producto.nombre}</h3>
        <p className="product-card__desc">{producto.descripcion}</p>
        <div className="product-card__footer">
          <p className="product-card__price">{currency.format(producto.precio)}</p>
          <div className="product-card__actions">
            <button
              className="btn btn--secondary"
              onClick={() => onSelectProduct(producto)}
            >
              Ver más
            </button>
            <button
              className="btn btn--primary"
              onClick={() => onAddToCart(producto)}
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
