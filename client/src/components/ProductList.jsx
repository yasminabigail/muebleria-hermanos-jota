import ProductCard from './ProductCard.jsx'

function ProductList({
  productos,
  loading,
  error,
  busqueda,
  onBusquedaChange,
  onVerDetalle,
  onAgregarAlCarrito,
  moneda
}) {
  return (
    <>
      <section className="page-header">
        <div className="page-header__inner">
          <h1 className="page-header__title">Productos</h1>
          <p className="page-header__subtitle">
            Cada pieza cuenta una historia de manos expertas y materiales nobles
          </p>
        </div>
      </section>

      <section className="catalog">
        <div className="catalog__inner">
          <div className="catalog__search">
            <input
              type="search"
              className="catalog__search-input"
              placeholder="Buscar producto..."
              aria-label="Buscar producto"
              value={busqueda}
              onChange={(e) => onBusquedaChange(e.target.value)}
            />
          </div>

          {loading ? (
            <p>Cargando productos...</p>
          ) : error ? (
            <p className="error-message">Error: {error}</p>
          ) : productos.length === 0 ? (
            <p>No se encontraron productos que coincidan con la búsqueda.</p>
          ) : (
            <div className="catalog__grid">
              {productos.map(producto => (
                <ProductCard
                  key={producto.id}
                  producto={producto}
                  onVerDetalle={onVerDetalle}
                  onAgregarAlCarrito={onAgregarAlCarrito}
                  moneda={moneda}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default ProductList
