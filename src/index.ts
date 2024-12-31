import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-pages'

const app = new Hono<{ Bindings: { FLAG: string } }>()

app.get('/answer', (c) => {
  const n1 = Number(c.req.query('n1'))
  const n2 = Number(c.req.query('n2'))
  const [n3a, n3b, n3c] = c.req.queries('n3')?.map(n => Number(n)) ?? []
  if (!(n1 === 1 + 1)) {
    return c.text('Wrong answer for question 1!')
  }
  if (!(n2 + n2 === n2 && n2 !== 0)) {
    return c.text('Wrong answer for question 2!')
  }
  if (!(n3a + n3b + n3c === n3a + n3b + n3c && n3a + n3b + n3c !== n3c + n3b + n3a)) {
    return c.text('Wrong answer for question 3!')
  }
  return c.text(`The flag is: ${c.env.FLAG}`)
})
app.get('/*', serveStatic())

export default app
