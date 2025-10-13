document.addEventListener('click', async (event) => {
  if (event.target.dataset.type === 'delete') {
    const id = event.target.dataset.id
    try {
      await deleteNote(id)
      window.location.href = '/?deleted=true'
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }
})

async function deleteNote(id) {
  try {
    const response = await fetch(`/${id}`, { method: 'DELETE' })
    if (!response.ok) {
      throw new Error('Failed to delete note')
    }
    return response.json()
  } catch (error) {
    console.error('Error deleting note:', error)
    throw error
  }
}

document.addEventListener('click', async (event) => {
  if (event.target.dataset.type === 'edit') {
    const id = event.target.dataset.id
    const newTitle = prompt('Введите новый заголовок')
    if (newTitle && newTitle.trim() !== '') {
      try {
        await editNote(id, newTitle)
        window.location.href = '/?edited=true'
      } catch (error) {
        console.error('Error editing note:', error)
      }
    }
  }
})

async function editNote(id, newTitle) {
  try {
    const response = await fetch(`/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle }),
    })
    if (!response.ok) {
      throw new Error('Failed to update note')
    }
    return response.json()
  } catch (error) {
    console.error('Error editing note:', error)
    throw error
  }
}
