import { useState } from 'react'
import Cart from './components/Cart.jsx'
import ContactForm from './components/ContactForm.jsx'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import ProductDetail from './components/ProductDetail.jsx'
import ProductList from './components/ProductList.jsx'

const currency = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0
})

function App() {
  const [cart, setCart] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [currentView, setCurrentView] = useState('catalog')
  const [cartOpen, setCartOpen] = useState(false)

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id)
      if (existingItem) {
        return currentCart.map((item) => (
          item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
        ))
      }
      return [...currentCart, { ...product, cantidad: 1 }]
    })
    setCartCount((count) => count + 1)
    setCartOpen(true)
  }

  const changeQuantity = (productId, delta) => {
    setCart((currentCart) => currentCart
      .map((item) => item.id === productId
        ? { ...item, cantidad: item.cantidad + delta }
        : item)
      .filter((item) => item.cantidad > 0))
    setCartCount((count) => Math.max(0, count + delta))
  }

  const removeFromCart = (productId) => {
    const item = cart.find((cartItem) => cartItem.id === productId)
    if (!item) return
    setCart((currentCart) => currentCart.filter((cartItem) => cartItem.id !== productId))
    setCartCount((count) => Math.max(0, count - item.cantidad))
  }

  const selectProduct = (product) => {
    setSelectedProduct(product)
    setCurrentView('detail')
    window.scrollTo(0, 0)
  }

  const showCatalog = () => {
    setSelectedProduct(null)
    setCurrentView('catalog')
  }

  const showContact = () => {
    setSelectedProduct(null)
    setCurrentView('contact')
  }

  const cartTotal = cart.reduce((total, item) => total + item.precio * item.cantidad, 0)

  return (
    <div className="app">
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setCartOpen((isOpen) => !isOpen)}
        onNavigate={(view) => (view === 'contact' ? showContact() : showCatalog())}
      />

      <main>
        {currentView === 'contact' && <ContactForm />}
        {currentView === 'detail' && (
          <ProductDetail
            producto={selectedProduct}
            onAddToCart={addToCart}
            onBack={showCatalog}
            currency={currency}
          />
        )}
        {currentView === 'catalog' && (
          <ProductList
            onSelectProduct={selectProduct}
            onAddToCart={addToCart}
            currency={currency}
          />
        )}
      </main>

      <Footer />
      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        carrito={cart}
        productos={cart}
        onCambiarCantidad={changeQuantity}
        onEliminar={removeFromCart}
        total={cartTotal}
        moneda={currency}
      />
    </div>
  )
}

export default App
