
export const api =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:8080/api'
    : 'https://backend-shopify-oqt1.onrender.com/api'