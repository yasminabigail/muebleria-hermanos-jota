import { useState, useEffect, useCallback } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ProductList from './components/ProductList.jsx'
import ProductDetail from './components/ProductDetail.jsx'
import Cart from './components/Cart.jsx'
import ContactForm from './components/ContactForm.jsx'
import { fetchProductos } from './api/productos.js'

const CART_KEY = 'hermanos-jota-carrito'

const currency = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0
})

const getCart = () => {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_KEY))
    return Array.isArray(cart) ? cart : []
  } catch {
    return []
  }
}

const saveCart = (cart) => localStorage.setItem(CART_KEY, JSON.stringify(cart))

function App() {
  // Estado global
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [carrito, setCarrito] = useState(getCart)
  const [busqueda, setBusqueda] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [vista, setVista] = useState('listado') // 'listado' | 'detalle'
  const [productoDetalle, setProductoDetalle] = useState(null)

  const navigate = useNavigate()

  // Fetch a GET /api/productos con estados de carga y error
  useEffect(() => {
    const loadProductos = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchProductos()
        setProductos(data)
      } catch (err) {
        setError(err.message || 'No se pudieron cargar los productos')
      } finally {
        setLoading(false)
      }
    }
    loadProductos()
  }, [])

  // Lógica del carrito de compras
  const agregarAlCarrito = useCallback((producto) => {
    setCarrito(prev => {
      const existing = prev.find(item => item.id === producto.id)
      let updated
      if (existing) {
        updated = prev.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      } else {
        updated = [...prev, { id: producto.id, cantidad: 1 }]
      }
      saveCart(updated)
      return updated
    })
    setCartOpen(true)
  }, [])

  const cambiarCantidad = useCallback((productId, delta) => {
    setCarrito(prev => {
      const updated = prev
        .map(item =>
          item.id === productId
            ? { ...item, cantidad: item.cantidad + delta }
            : item
        )
        .filter(item => item.cantidad > 0)
      saveCart(updated)
      return updated
    })
  }, [])

  const eliminarDelCarrito = useCallback((productId) => {
    setCarrito(prev => {
      const updated = prev.filter(item => item.id !== productId)
      saveCart(updated)
      return updated
    })
  }, [])

  const totalCarrito = carrito.reduce((sum, item) => {
    const producto = productos.find(p => p.id === item.id)
    return sum + (producto ? producto.precio * item.cantidad : 0)
  }, 0)

  const cantidadTotal = carrito.reduce((sum, item) => sum + item.cantidad, 0)

  // Filtrar productos por texto de búsqueda
  const productosFiltrados = productos.filter(producto => {
    const query = busqueda.trim().toLowerCase()
    if (!query) return true
    return (
      producto.nombre.toLowerCase().includes(query) ||
      producto.categoria.toLowerCase().includes(query)
    )
  })

  // Navegación entre vistas
  const verDetalle = (producto) => {
    setProductoDetalle(producto)
    setVista('detalle')
    window.scrollTo(0, 0)
  }

  const verListado = () => {
    setVista('listado')
    setProductoDetalle(null)
  }

  // Renderizado condicional: detalle vs. listado
  return (
    <div className="app">
      <Header
        cantidadCarrito={cantidadTotal}
        onCartToggle={() => setCartOpen(!cartOpen)}
        busqueda={busqueda}
        onBusquedaChange={setBusqueda}
        onNavigateHome={verListado}
      />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section className="hero">
                  <div className="hero__inner">
                    <h1 className="hero__title">
                      Muebles con oficio, alma de los sesenta y mirada de mañana
                    </h1>
                    <p className="hero__subtitle">
                      En Hermanos Jota cada pieza cuenta la historia de manos expertas
                      y materiales nobles. Diseñamos con el optimismo cálido de los 60
                      y la sustentabilidad de 2026.
                    </p>
                    <button className="btn btn--primary" onClick={() => navigate('/productos')}>
                      Ver productos
                    </button>
                  </div>
                </section>

                <section className="featured" aria-labelledby="destacados-titulo">
                  <div className="featured__inner">
                    <h2 id="destacados-titulo" className="featured__title">
                      Piezas destacadas
                    </h2>
                    {loading ? (
                      <p>Cargando productos...</p>
                    ) : error ? (
                      <p className="error-message">Error: {error}</p>
                    ) : (
                      <div className="featured__grid">
                        {productos.slice(0, 3).map(producto => (
                          <div
                            key={producto.id}
                            className="product-card"
                            onClick={() => verDetalle(producto)}
                          >
                            <img
                              src={producto.imagen}
                              alt={producto.nombre}
                              className="product-card__img"
                            />
                            <div className="product-card__body">
                              <h3 className="product-card__title">{producto.nombre}</h3>
                              <p className="product-card__price">
                                {currency.format(producto.precio)}
                              </p>
                              <button className="btn btn--secondary">Ver detalle</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              </>
            }
          />

          <Route
            path="/productos"
            element={
              <ProductList
                productos={productosFiltrados}
                loading={loading}
                error={error}
                busqueda={busqueda}
                onBusquedaChange={setBusqueda}
                onVerDetalle={verDetalle}
                onAgregarAlCarrito={agregarAlCarrito}
                moneda={currency}
              />
            }
          />

          <Route
            path="/producto/:id"
            element={
              <ProductDetail
                productos={productos}
                loading={loading}
                error={error}
                onAgregarAlCarrito={agregarAlCarrito}
                onVolver={verListado}
                moneda={currency}
              />
            }
          />

          <Route
            path="/contacto"
            element={<ContactForm />}
          />
        </Routes>
      </main>

      <Footer />

      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        carrito={carrito}
        productos={productos}
        onCambiarCantidad={cambiarCantidad}
        onEliminar={eliminarDelCarrito}
        total={totalCarrito}
        moneda={currency}
      />
    </div>
  )
}

export default App
