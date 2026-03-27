import 'dotenv/config'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import jwt from 'jsonwebtoken'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 3000
const PASSWORD = process.env.PASSWORD
const JWT_SECRET = process.env.JWT_SECRET || 'henosis-secret-key'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Fichiers statiques publics (page de login incluse dans le build React)
app.use(express.static(path.join(__dirname, 'dist')))

// Fichiers statiques publics — templates accessibles sans authentification
app.use('/templates', express.static(path.join(__dirname, 'templates')))

// Middleware d'authentification JWT — uniquement pour /api/* sauf /api/login
app.use('/api', (req, res, next) => {
  if (req.path === '/login') return next()

  const authHeader = req.headers['authorization']
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) return res.status(401).json({ error: 'Unauthorized' })

  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
})

app.post('/api/login', (req, res) => {
  const { password } = req.body
  if (password === PASSWORD) {
    const token = jwt.sign({ authenticated: true }, JWT_SECRET, { expiresIn: '7d' })
    res.json({ token })
  } else {
    res.status(401).json({ error: 'Invalid password' })
  }
})

app.get('/api/check-auth', (req, res) => {
  res.json({ authenticated: true })
})

// SPA fallback — toutes les routes non-API renvoient index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Henosis Toolbox running on http://localhost:${PORT}`)
})
