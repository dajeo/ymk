import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const app = express()

app.use(cors())

app.post('/groups/:department', async (req, res) => {
  const department = req.params.department

  const params = new URLSearchParams()
  params.append('branch', department)

  const httpRes = await fetch('https://xn----8sbaqd1aje6bf1c2g.xn--p1ai/student/list_group.php', {
    method: 'post',
    body: params
  })

  const content = await httpRes.text()

  res.send(content)
})

app.post('/schedule/:department/:group/:week?', async (req, res) => {
  const department = req.params.department
  const group = req.params.group
  const week = req.params.week

  const params = new URLSearchParams()
  params.append('num_group', group)
  params.append('branch', department)
  params.append('week', week)

  const httpRes = await fetch('https://xn----8sbaqd1aje6bf1c2g.xn--p1ai/student/schedule_group.php', {
    method: 'post',
    body: params
  })

  const content = await httpRes.text()

  res.send(content)
})

app.listen(8080, () => {
  console.log('Server is started.')
})
