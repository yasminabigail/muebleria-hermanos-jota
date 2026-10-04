# # 🪑 Mueblería Hermanos Jota - E-commerce

## 📖 Descripción

Mueblería Hermanos Jota es una plataforma e-commerce completa, con frontend en React y backend propio con Node.js y Express. El frontend consume una API REST para obtener el catálogo de productos y mostrarlo dinámicamente, simulando una experiencia de compra real con carrito y formulario de contacto.

## 🛠️ Tecnologías Utilizadas

**Frontend**

- React (creado con Vite)
- Componentes: Navbar, Footer, ProductCard, ProductList, ProductDetail, Cart, ContactForm
- Hooks `useState`, `useEffect`) para manejo de estado, formularios controlados y carga de datos
- Consumo de API mediante `fetch`, con manejo de estados de carga y error

**Backend**

- Node.js + Express
- Rutas organizadas de forma modular con `express.Router()`
- Middleware de logging personalizado
- Middleware `cors` para permitir peticiones desde el frontend (puerto distinto)
- Manejo de errores centralizado (404 y errores generales)



## 🛒 Funcionalidades Principales

- Catálogo de productos obtenido dinámicamente desde la API propia.
- Vista de detalle de producto con renderizado condicional.
- Carrito de compras con estado en `App.jsx` y contador visible en el Navbar.
- Formulario de contacto controlado con validación.
- Buscador de productos conectado al listado.



## 👥 Integrantes del Equipo

- Antonella Caminotti
- Bianca Gomez Baez
- Yasmin Rodriguez
- Ariadna Yael Fernandez



## 🏗️ Arquitectura del Proyecto

