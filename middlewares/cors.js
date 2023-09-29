import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234',
  'https://movies.com',
  'https://midu.dev'
]

// Creamos una funcion que nos devuelve la funcionalidad de CORS
// El valor por defecto de ACCEPTED_ORIGINS, tambien, es un objeto vacio
export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    // Si incluye el origen
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    // Si no lo incluye o es el mismo
    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
})
