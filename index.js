const path = require('path')
const chalk = require('chalk')
const express = require('express')
const mongoose = require('mongoose')
const { addNote, getNotes, deleteNote, editNote } = require('./note.actions')

const port = 3000
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', 'page')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async (req, res) => {
  try {
    const notes = await getNotes()
    res.render('index', {
      title: 'Node.js Notes',
      notes,
      created: req.query.created === 'true',
      deleted: req.query.deleted === 'true',
      edited: req.query.edited === 'true',
      error: req.query.error === 'true',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
})

app.post('/', async (req, res) => {
  try {
    await addNote(req.body.title)
    res.json({ success: true })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
})

app.delete('/:id', async (req, res) => {
  try {
    await deleteNote(req.params.id)
    res.json({ success: true })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
})

app.put('/:id', async (req, res) => {
  try {
    await editNote(req.params.id, req.body.title)
    res.json({ success: true })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
})

mongoose
  .connect(
    'mongodb+srv://first_db:14022002Natya@cluster0.ep52u7w.mongodb.net/notes?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => {
    app.listen(port, () => {
      console.log(chalk.green(`✅ Server running at http://localhost:${port}`))
    })
  })
