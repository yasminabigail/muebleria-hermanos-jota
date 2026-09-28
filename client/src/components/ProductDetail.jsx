import { useParams } from 'react-router-dom'

function ProductDetail({ productos, loading, error, onAgregarAlCarrito, onVolver, moneda }) {
  const { id } = useParams()
  const productoId = Number(id)

  if (loading) {
    return <p>Cargando producto...</p>
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>
  }

  const producto = productos.find(p => p.id === productoId) || productos[0]

  if (!producto) {
    return <p>Producto no encontrado.</p>
  }

  return (
    <article className="product-detail">
      <div className="product-detail__inner">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="product-detail__img"
        />
        <div className="product-detail__info">
          <h1 className="product-detail__title">{producto.nombre}</h1>
          <p className="product-detail__price">{moneda.format(producto.precio)}</p>
          <p className="product-detail__desc">{producto.descripcion}</p>
          <button
            className="btn btn--primary"
            onClick={() => onAgregarAlCarrito(producto)}
          >
            Agregar al carrito
          </button>
          <button
            className="btn btn--secondary"
            onClick={onVolver}
          >
            Volver al listado
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductDetail
