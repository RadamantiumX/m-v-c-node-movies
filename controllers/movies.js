import { MovieModel } from '../models/movie.js' // Modelo
import { validateMovie, validatePartialMovie } from '../schemas/movies.js' // Validaciones

// En el controlador decidimos que es lo vamos a RENDERIZAR

export class MovieController {
  // Para obtener las peliculas
  static async getAll (req, res) {
    const { genre } = req.query // Le pasamos el query params
    // Utilizamos el MODELO
    const movies = await MovieModel.getAll({ genre }) // Llamamos al metodo estatico para conseguir todas las peliculas
    res.json(movies) // Devolvemos todas las peliculas
  }

  // Obtener una pelicula por ID
  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id }) // Utilizamos el MODELO
    if (movie) return res.json(movie) // Si la encuentra
    res.status(404).json({ message: 'Movie not found' })
  }

  // Crear un pelicula
  static async createMovie (req, res) {
    const result = validateMovie(req.body) // Validamos
    // Si hay ERROR
    if (result.error) {
      // Parseamos para que nos muestre el ERROR correctamente
      return res.status(400).json({ error: JSON.parse(result.error.message) }) // Bad Request
    }
    const newMovie = await MovieModel.create({ input: result.data }) // Utilizamos el MODELO
    res.status(201).json(newMovie) // Codigo: Se ha creado el recurso
  }

  // Modificar parte de una pelicula
  static async updateMovie (req, res) {
    const result = validatePartialMovie(req.body)
    // Si falla la validacion
    if (!result.success) {
      return res.status(400).json({ erro: JSON.parse(result.error.message) })
    }

    // Recuperamos la id de los parametros
    const { id } = req.params
    const updatedMovie = await MovieModel.update({ id, input: result.data }) // Utilizamos el MODELO

    // Devolvemos el JSON de la pelicula actualizada
    return res.json(updatedMovie)
  }

  // Eliminar una pelicula
  static async deleteMovie (req, res) {
    const { id } = req.params
    const result = await MovieModel.delete({ id }) // Utilizamos el MODELO

    if (!result) { // Si la funcion nos devuelve FALSE
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json({ message: 'Movie deleted' })
  }
}
