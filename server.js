import 'dotenv/config'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 3000
const PASSWORD = process.env.PASSWORD

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Session simple via cookie signé
app.use((req, res, next) => {
  if (req.path === '/api/login') return next()
  const token = req.headers['x-auth-token'] || req.headers['authorization']?.replace('Bearer ', '')
  if (token === PASSWORD) return next()
  res.status(401).json({ error: 'Unauthorized' })
})

app.post('/api/login', (req, res) => {
  const { password } = req.body
  if (password === PASSWORD) {
    res.json({ token: PASSWORD })
  } else {
    res.status(401).json({ error: 'Invalid password' })
  }
})

app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Henosis Toolbox running on http://localhost:${PORT}`)
})
