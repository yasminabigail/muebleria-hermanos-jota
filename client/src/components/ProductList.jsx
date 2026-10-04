import { useEffect, useState } from 'react'
import ProductCard from './ProductCard.jsx'

function ProductList({ onSelectProduct, onAddToCart, currency }) {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        setError('')
        const response = await fetch('http://localhost:3000/api/productos')
        if (!response.ok) {
          throw new Error('No se pudieron cargar los productos.')
        }
        const data = await response.json()
        setProductos(data)
      } catch (fetchError) {
        setError(fetchError.message || 'No se pudieron cargar los productos.')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const filteredProducts = productos.filter((producto) => {
    const normalizedSearch = searchTerm.trim().toLowerCase()
    return !normalizedSearch
      || producto.nombre.toLowerCase().includes(normalizedSearch)
      || producto.categoria.toLowerCase().includes(normalizedSearch)
  })

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
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          {loading ? (
            <div className="loading-state" role="status" aria-live="polite">
              <span className="loading-state__spinner" aria-hidden="true" />
              <span>Cargando productos...</span>
            </div>
          ) : error ? (
            <p className="error-message">Error: {error}</p>
          ) : filteredProducts.length === 0 ? (
            <p>No se encontraron productos que coincidan con la búsqueda.</p>
          ) : (
            <div className="catalog__grid">
              {filteredProducts.map((producto) => (
                <ProductCard
                  key={producto.id}
                  producto={producto}
                  onSelectProduct={onSelectProduct}
                  onAddToCart={onAddToCart}
                  currency={currency}
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
