const express = require('express')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()

const app = express()
app.use(cors())
app.use(express.json())

// Banco
const db = new sqlite3.Database('./database.db')

// Criar tabela
db.run(`
CREATE TABLE IF NOT EXISTS atletas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  categoria TEXT,
  posicao TEXT
)
`)

// 🔹 ROTA: listar atletas
app.get('/atletas', (req, res) => {
  db.all('SELECT * FROM atletas', [], (err, rows) => {
    res.json(rows)
  })
})

// 🔹 ROTA: criar atleta
app.post('/atletas', (req, res) => {
  const { nome, categoria, posicao } = req.body

  db.run(
    'INSERT INTO atletas (nome, categoria, posicao) VALUES (?, ?, ?)',
    [nome, categoria, posicao],
    function (err) {
      res.json({ id: this.lastID })
    }
  )
})

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
