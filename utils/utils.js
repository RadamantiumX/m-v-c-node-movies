// COmo leer un JSON en ESModules (Recomendado)
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url) // Creamos el metodo require (hecho por nosotros)
export const readJSON = (path) => require('../movies.json') // Utilizamos ese metodo para leer el JSON