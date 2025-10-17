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

async function addNote(title, owner) {
  try {
    await Note.create({ title, owner })
    console.log(chalk.green('Note added'))
  } catch (error) {
    console.error(chalk.red('Error adding note:'), error)
    throw error
  }
}

async function deleteNote(id, owner) {
  try {
    const result = await Note.deleteOne({ _id: id, owner })
    if (!result) {
      throw new Error('Note not found')
    }
    if (result.deletedCount === 0) {
      throw new Error('No note deleted, possibly due to ownership mismatch')
    }
    console.log(chalk.green('Note deleted'))
  } catch (error) {
    console.error(chalk.red('Error deleting note:'), error)
    throw error
  }
}

async function editNote(newData, owner) {
  try {
    const updatedNote = await Note.updateOne(
      { _id: newData.id, owner },
      { title: newData.title }
    )
    if (!updatedNote) {
      throw new Error('Note not found')
    }
    if (updatedNote.matchedCount === 0) {
      throw new Error('No note updated, possibly due to ownership mismatch')
    }
    console.log(chalk.green('Note edited'))
    return updatedNote
  } catch (error) {
    console.error(chalk.red('Error editing note:'), error)
    throw error
  }
}

module.exports = { addNote, getNotes, deleteNote, editNote }
