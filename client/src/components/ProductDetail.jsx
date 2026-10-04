function ProductDetail({ producto, onAddToCart, onBack, currency }) {
  if (!producto) return <p>Producto no encontrado.</p>

  const imageSource = producto.imagen.startsWith('/') ? producto.imagen : `/${producto.imagen}`

  return (
    <article className="product-detail">
      <div className="product-detail__inner">
        <img
          src={imageSource}
          alt={producto.nombre}
          className="product-detail__img"
        />
        <div className="product-detail__info">
          <h1 className="product-detail__title">{producto.nombre}</h1>
          <p className="product-detail__price">{currency.format(producto.precio)}</p>
          <p className="product-detail__desc">{producto.descripcion}</p>
          <button
            className="btn btn--primary"
            onClick={() => onAddToCart(producto)}
          >
            Agregar al carrito
          </button>
          <button
            className="btn btn--secondary"
            onClick={onBack}
          >
            Volver al listado
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductDetail
