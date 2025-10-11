const server = http.createServer(async (req, res) => {
  if (req.method === 'GET') {
    const html = await fs.readFile(path.join(basePath, 'index.html'))
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(html)
  }

  if (req.method === 'POST') {
    let body = []

    req.on('data', (chunk) => {
      body.push(chunk)
    })

    req.on('end', async () => {
      body = Buffer.concat(body).toString()

      if (!body.includes('title=')) {
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' })
        return res.end('<h3>Ошибка: не найден параметр title</h3>')
      }

      const title = decodeURIComponent(
        body.split('title=')[1].replace(/&.*/g, '')
      )

      await saveTitle(title)

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(`<h2>Заголовок сохранён: ${title}</h2>`)
    })
  }
})
