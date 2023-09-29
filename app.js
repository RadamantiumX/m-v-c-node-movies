import express, { json } from 'express'

// import movies from './movies.json' assert { type: 'json' } Forma no oficial

import { movieRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'
// import { type } from 'node:os'
// import fs from 'node:fs'

// Como leer un JSON en ESModules
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8')) // Alternativa: Parseamos a JSON

const app = express()

// MIDDLEWARE
app.use(json())

// CORS
app.use(corsMiddleware())

app.disable('x-powered-by')

// Cargamos las rutas del enrrutador, siempre utilizando el mismo recurso de movies
app.use('/movies', movieRouter)

const PORT = process.env.PORT ?? 1234 // Utilizamos la variable de entorno del proceso

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
