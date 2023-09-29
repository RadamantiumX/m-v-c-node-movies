import { Router } from 'express'
import { readJSON } from '../utils/utils' // Lee el JSON
import { validateMovie, validatePartialMovie } from '../schemas/movies' // Validaciones
import { randomUUID } from 'node:crypto' // Crea cadenas codificadas
import { MovieModel } from '../models/movie'

// Inicializamos y exportamos ROUTER
export const movieRouter = Router()
const movies = readJSON('../movies.json')

// Ruta: Obtener todas las peliculas
// Utilizamos la ASINCRONIA para los MODELOS
movieRouter.get('/', async (req, res) => {
  const { genre } = req.query // Le pasamos el query params
  // Utilizamos el MODELO
  const movies = await MovieModel.getAll({ genre }) // Llamamos al metodo estatico para conseguir todas las peliculas
  res.json(movies) // Devolvemos todas las peliculas
})

// Para obtener una pelicula por el ID
movieRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id) // Buscamos la movie por el ID
  if (movie) return res.json(movie) // Si la encuentra
  res.status(404).json({ message: 'Movie not found' })
})

// Para crear una pelicula
movieRouter.post('/', (req, res) => {
  const result = validateMovie(req.body) // Validamos

  // Si hay ERROR
  if (result.error) {
    // Parseamos para que nos muestre el ERROR correctamente
    return res.status(400).json({ error: JSON.parse(result.error.message) }) // Bad Request
  }

  // Si valido correctamente
  const newMovie = {
    id: randomUUID(), // uuid Version 4
    ...result.data // Usamos SPREAD OPERATOR, aquí los datos ya estan validados
  }

  // Mutamos el ARRAY
  movies.push(newMovie) // Ponemos dentro de MOVIES
  res.status(201).json(newMovie) // Codigo: Se ha creado el recurso
})

// Para modificar parte de una pelicula
movieRouter.patch('/:id', (req, res) => {
  const result = validatePartialMovie(req.body)
  // Si falla la validacion
  if (!result.success) {
    return res.status(400).json({ erro: JSON.parse(result.error.message) })
  }

  // Recuperamos la id de los parametros
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  // Si no esta esa pelicula con esa ID
  if (!movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }
  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  // Guardamos esta pelicula en el indice
  movies[movieIndex] = updateMovie

  // Devolvemos el JSON de la pelicula actualizada
  return res.json(updateMovie)
})

// Para borrar una pelicula por el ID
movieRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)
  return res.json({ message: 'Movie deleted' })
})
