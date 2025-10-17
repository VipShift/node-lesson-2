document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('note-form')
  const input = document.getElementById('title')

  form.addEventListener('submit', async e => {
    e.preventDefault()
    const title = input.value.trim()

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      })

      window.location.href = '/?created=true'
    } catch (err) {
      console.error('Ошибка при добавлении заметки:', err)
    }
  })
})
