document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('note-form')
  const input = document.getElementById('title')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const title = input.value.trim()

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      })

      const data = await res.json()

      input.value = ''
      window.location.reload()
    } catch (err) {
      console.error('Ошибка при добавлении заметки:', err)
    }
  })
})
