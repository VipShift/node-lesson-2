document.addEventListener('click', async (event) => {
  const button = event.target.closest('button[data-type]')
  if (!button) return  

  const { type, id } = button.dataset

  if (type === 'delete') {
    try {
      await deleteNote(id)
      window.location.href = '/?deleted=true'
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  if (type === 'edit') {
    const newTitle = prompt('Введите новый заголовок')
    if (!newTitle || newTitle.trim() === '') return
    try {
      const data = await editNote(id, newTitle)
      window.location.href = '/?edited=true'
    } catch (error) {
      console.error('Error editing note:', error)
    }
  }
})




async function deleteNote(id) {
  try {
    const response = await fetch(`/${id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error('Failed to delete note')
    return response.json()
  } catch (error) {
    console.error('Error deleting note:', error)
    throw error
  }
}

async function editNote(id, newTitle) {
  try {
    const response = await fetch(`/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle }),
    })

    if (!response.ok) throw new Error('Failed to update note')

    return response.json()
  } catch (error) {
    console.error('Error editing note:', error)
    throw error
  }
}
