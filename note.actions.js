const fs = require('fs/promises')
const path = require('path')

const filePath = path.join(__dirname, 'db.json')

async function saveTitle(title) {
  const data = await fs.readFile(filePath, 'utf-8')
  const titles = JSON.parse(data)

  titles.push({
    id: Date.now().toString(),
    title,
    length: title.length,
  })

  await fs.writeFile(filePath, JSON.stringify(titles, null, 2))
}

async function getNotes() {
  const data = await fs.readFile(filePath, 'utf-8')
  const notes = JSON.parse(data)
  return notes
}

async function deleteNote(id) {
  const data = await fs.readFile(filePath, 'utf-8')
  const notes = JSON.parse(data)
  const newNotes = notes.filter((note) => note.id !== id)
  await fs.writeFile(filePath, JSON.stringify(newNotes, null, 2))
}

async function editNote(id, title) {
  const data = await fs.readFile(filePath, 'utf-8')
  const notes = JSON.parse(data)
  const newNotes = notes.map((note) => {
    if (note.id === id) {
      return {
        ...note,
        title,
        length: title.length,
      }
    }
    return note
  })
  await fs.writeFile(filePath, JSON.stringify(newNotes, null, 2))
}

module.exports = { saveTitle, getNotes, deleteNote, editNote }
