const path = require('path')
const chalk = require('chalk')
const express = require('express')
const mongoose = require('mongoose')
const coocieParser = require('cookie-parser')
const { addNote, getNotes, deleteNote, editNote } = require('./note.controler')
const { addUser, loginUser } = require('./user.controler')
const auth = require('./middlewares/auth')
const { title } = require('process')

const port = 3000
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', 'page')
app.use(coocieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/register', async (req, res) => {
  res.render('register', {
    title: 'Register',
    error: undefined,
  })
})

app.post('/register', async (req, res) => {
  try {
    await addUser(req.body.email, req.body.password)
  } catch (error) {
    if (error.code === 11000) {
      res.render('register', {
        title: 'Register',
        error: 'User with this email already exists',
      })
    }
    res.render('register', {
      title: 'Register',
      error: error.message,
    })
  }
})

app.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login',
    error: undefined,
  })
})

app.post('/login', async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password)
    res.cookie('token', token, { httpOnly: true })
    res.redirect('/')
  } catch (error) {
    res.render('login', {
      title: 'Login',
      error: error.message,
    })
  }
})

app.get('/logout', (req, res) => {
  res.clearCookie('token', '', { httpOnly: true })
  res.redirect('/login')
})
app.use(auth())

app.get('/', async (req, res) => {
  try {
    const notes = await getNotes()
    res.render('index', {
      title: 'Node.js Notes',
      notes: await getNotes(),
      userEmail: req.user.email,
      created: req.query.created === 'true',
      error: req.query.error === 'true',
    })
    return notes
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
})

app.post('/', async (req, res) => {
  try {
    await addNote(req.body.title, req.user.email)
    res.render('index', {
      notes: await getNotes(),
      userEmail: req.user.email,
      created: true,
      error: false,
    })
  } catch (error) {
    console.log(error)
    res.render('index', {
      notes: await getNotes(),
      userEmail: req.user.email,
      created: false,
      error: true,
    })
  }
})

app.delete('/:id', async (req, res) => {
  try {
    await deleteNote(req.params.id, req.user.email)
    res.json({ success: true })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
})

app.put('/:id', async (req, res) => {
  try {
    const updatedNote = await editNote(
      { id: req.params.id, title: req.body.title },
      req.user.email
    )
    res.json({ success: true, note: updatedNote })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: error.message })
  }
})

mongoose
  .connect(
    'mongodb+srv://first_db:14022002Natya@cluster0.ep52u7w.mongodb.net/notes?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => {
    app.listen(port, () => {
      console.log(
        chalk.bgGreen(`✅ Server running at http://localhost:${port}`)
      )
    })
  })
