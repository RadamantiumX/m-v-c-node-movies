// El modelo se encarga del tratamiento de los datos, es la logica de negocio
import { readJSON } from '../utils/utils'

const movies = readJSON('../movies.json')

// Con las clases los MODELOS son intercambiables
export class MovieModel {
  // Recuperamos todas las peliculas con un filtro, en esta funcion estatica
  static getAll ({ genre }) {
    if (genre) {
      return movies.filter( // Hacemos el filtro por el genero
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }
}
