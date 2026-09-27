# # 🪑 Mueblería Hermanos Jota - E-commerce

## 📖 Descripción

Mueblería Hermanos Jota es una plataforma e-commerce completa, con frontend en React y backend propio con Node.js y Express. El frontend consume una API REST para obtener el catálogo de productos y mostrarlo dinámicamente, simulando una experiencia de compra real con carrito y formulario de contacto.

## 🛠️ Tecnologías Utilizadas

**Frontend**

- React (creado con `create-react-app`)
- Componentes: Navbar, Footer, ProductCard, ProductList, ProductDetail
- Hooks `useState`) para manejo de estado y formularios controlados
- Consumo de API mediante `fetch`, con manejo de estados de carga y error

**Backend**

- Node.js + Express
- Rutas organizadas de forma modular con `express.Router()`
- Middleware de logging personalizado
- Manejo de errores centralizado (404 y errores generales)

## 🛒 Funcionalidades Principales

- Catálogo de productos obtenido dinámicamente desde la API propia.
- Vista de detalle de producto con renderizado condicional.
- Carrito de compras con estado en `App.js` y contador visible en el Navbar.
- Formulario de contacto controlado con validación.

## 👥 Integrantes del Equipo

- Antonella Caminotti
- Bianca Gomez Baez
- Yasmin Rodriguez
- Ariadna Yael Fernandez

## 🏗️ Arquitectura del Proyecto

/backend   → API REST con Node.js y Express

/client    → Aplicación de React (frontend)

Ambas partes son independientes y se ejecutan por separado (ver instrucciones abajo).

## 🚀 Instalación y ejecución

Este proyecto requiere correr **dos servidores en paralelo**, cada uno en su propia terminal.

### Backend (Express)

```bash

cd backend

npm install

npm run dev

```

El servidor queda disponible en `http://localhost:3001`.

**Endpoints disponibles:**

| Método | Ruta | Descripción |

|--------|------|-------------|

| GET | `/api/productos` | Devuelve el listado completo de productos |

| GET | `/api/productos/:id` | Devuelve un producto por su id (404 si no existe) |

### Frontend (React)

```bash

cd client

npm install

npm start

```

La aplicación queda disponible en `http://localhost:3000`.

## 🧩 Decisiones técnicas

- **Datos:** los productos se almacenan en un archivo local `backend/data/productos.js`) como array de objetos, sin base de datos, para simplificar el alcance del proyecto.
- **Middlewares del backend:**
  - `logger.js`: registra en consola el método HTTP y la URL de cada request recibida.
  - `express.json()`: preparado para futuras rutas POST que reciban datos en el body.
- **Manejo de errores:** se implementó un manejador de rutas no encontradas (404) y un manejador de errores centralizado en `server.js`.

