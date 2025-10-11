const express = require('express')
const chalk = require('chalk')
const { saveTitle, getNotes, deleteNote, editNote } = require('./note.actions')
const path = require('path')
const port = 3000
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', 'page')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async (req, res) => {
  const notes = await getNotes()
  res.render('index', {
    title: 'Node.js',
    notes,
    created: req.query.created === 'true',
    deleted: req.query.deleted === 'true',
    edited: req.query.edited === 'true',
  })
})

app.post('/', async (req, res) => {
  await saveTitle(req.body.title)
  res.redirect('/?created=true')
})

app.delete('/:id', async (req, res) => {
  await deleteNote(req.params.id)
  res.redirect('/?deleted=true')
})

app.put('/:id', async (req, res) => {
  await editNote(req.params.id, req.body.title)
  res.redirect('/?edited=true')
})

app.listen(port, () => {
  console.log(chalk.green(`✅ Server running at http://localhost:${port}`))
})
