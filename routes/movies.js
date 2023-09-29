import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'

// Inicializamos y exportamos ROUTER
export const movieRouter = Router()

// Utilizamos la ASINCRONIA para los MODELOS: No esperamos como se pueden manejar los datos
// Llamamos al controlador para realizar las operaciones

// Ruta: Obtener todas las peliculas
movieRouter.get('/', MovieController.getAll)

// Para crear una pelicula
movieRouter.post('/', MovieController.createMovie)

// Para obtener una pelicula por el ID
movieRouter.get('/:id', MovieController.getById)

// Para borrar una pelicula por el ID
movieRouter.delete('/:id', MovieController.deleteMovie)

// Para modificar parte de una pelicula
movieRouter.patch('/:id', MovieController.updateMovie)
