const API_URL = '/api/productos'

export async function fetchProductos() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error(`Error ${response.status}: No se pudieron cargar los productos`)
  }

  const data = await response.json()
  return data
}
