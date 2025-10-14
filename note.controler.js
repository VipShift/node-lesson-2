const Note = require('./models/note')
const chalk = require('chalk')

async function getNotes() {
  try {
    const notes = await Note.find()
    return notes
  } catch (error) {
    console.error(chalk.red('Error getting notes:'), error)
    throw error
  }
}

async function addNote(title) {
  try {
    await Note.create({ title, length: title.length })
    console.log(chalk.green('Note added'))
  } catch (error) {
    console.error(chalk.red('Error adding note:'), error)
    throw error
  }
}

async function deleteNote(id) {
  try {
    const result = await Note.findByIdAndDelete(id)
    if (!result) {
      throw new Error('Note not found')
    }
    console.log(chalk.green('Note deleted'))
  } catch (error) {
    console.error(chalk.red('Error deleting note:'), error)
    throw error
  }
}

async function editNote(id, title) {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title: title },
      { new: true }  
    )
    if (!updatedNote) {
      throw new Error('Note not found')
    }
    console.log(chalk.green('Note edited'))
    return updatedNote  
  } catch (error) {
    console.error(chalk.red('Error editing note:'), error)
    throw error
  }
}


module.exports = { addNote, getNotes, deleteNote, editNote }
