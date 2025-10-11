document.addEventListener('click', (event) => {
  if (event.target.dataset.type === 'delete') {
    const id = event.target.dataset.id

    deleteNote(id)
  }
})

async function deleteNote(id) {
  await fetch(`/${id}`, {
    method: 'DELETE',
  })
  window.location.href = '/?deleted=true'
}

document.addEventListener('click', (event) => {
  if (event.target.dataset.type === 'edit') {
    const id = event.target.dataset.id
    const newTitle = prompt('Введите новый заголовок')
    if (newTitle && newTitle.trim() !== '') {
      editNote(id, newTitle)
    }
  }
})

async function editNote(id, newTitle) {
  await fetch(`/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: newTitle,
    }),
  })
  window.location.href = '/?edited=true'
}
