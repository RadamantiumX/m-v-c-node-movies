// El modelo se encarga del tratamiento de los datos, es la logica de negocio
import { readJSON } from '../utils/utils.js'
import { randomUUID } from 'node:crypto' // Crea cadenas codificadas
const movies = readJSON('../movies.json')

// Pasamos OBJETOS como parametros, es porque resulta mas facil de extender a futuro (pasar mas argumentos relacionados)

// Con las clases los MODELOS son intercambiables
export class MovieModel {
  // Recuperamos todas las peliculas con un filtro, en esta funcion estatica
  static async getAll ({ genre }) {
    if (genre) {
      return movies.filter( // Hacemos el filtro por el genero
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }

  // Recuperamos pelicula por ID
  static async getById ({ id }) {
    const movie = movies.find(movie => movie.id === id) // Buscamos por ID
    return movie
  }

  // Creamos una pelicula, no sabemos q va a tener el INPUT (por eso no lo recibimos como objeto)
  static async create ({ input }) {
    // Si valido correctamente
    const newMovie = {
      id: randomUUID(), // uuid Version 4
      ...input// Usamos SPREAD OPERATOR, aquí los datos ya estan validados
    }
    movies.push(newMovie)

    return newMovie
  }

  // Borramos una pelicula por ID
  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false // Si no existe el ID
    movies.splice(movieIndex, 1) // Si exite, quitar esa pelicula
    return true
  }

  // Modificamos parte de una pelicula, le pasamos argumentos relacionados
  static async update ({ id, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false // Si no existe el ID
    // Añadimos las modificaciones segun el ID
    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input
    }
    // Retornamos esa pelicula
    return movies[movieIndex]
  }
}
