import { Table, TableContainer, Paper, TableHead, TableCell, TableBody, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import config from '../../config.json'
import Progress from '../components/Progress'
import { v4 as uuid } from 'uuid'
import strReplace from 'react-string-replace'

function SchedulePage () {
  const { department, group } = useParams()
  const [isLoaded, setIsLoaded] = useState(false)
  const [html, setHtml] = useState({})

  useEffect(() => {
    fetch(`${config.apiUrl}/schedule/${department}/${group}`, { method: 'post' })
      .then((res) => res.text())
      .then((data) => {
        const buffer = document.createElement('div')
        buffer.innerHTML = data
        console.log(buffer)
        setHtml(buffer)
        setIsLoaded(true)
      })
  }, [])

  if (!isLoaded) return <Progress />

  return (
    <>
      <h1>Расписание группы {group}</h1>
      {[...html.getElementsByClassName('uchen')].map((table, index) => (
        <TableContainer component={Paper} sx={{ marginBottom: 1 }} key={index}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>пара</TableCell>
                <TableCell>предмет</TableCell>
                <TableCell>кабинет</TableCell>
                <TableCell>преподаватель</TableCell>
                <TableCell>время</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[1, 2, 3, 4, 5].map((tableRow) => (
                <TableRow key={uuid()}>
                  {[table.getElementsByClassName(`time_background${tableRow}`)[0]].map((lesson) => (
                    <React.Fragment key={uuid()}>
                      <TableCell>{lesson.getElementsByTagName('td')[0].innerText}</TableCell>
                      <TableCell>
                        {strReplace(lesson.getElementsByTagName('td')[1].innerHTML, '<br>', () => <br />)}
                      </TableCell>
                      <TableCell>
                        {strReplace(lesson.getElementsByTagName('td')[2].innerHTML, '<br>', () => <br />)}
                      </TableCell>
                      <TableCell>
                        {strReplace(lesson.getElementsByTagName('td')[3].innerHTML, '<br>', () => <br />)}
                      </TableCell>
                      <TableCell>
                        {lesson.getElementsByTagName('td')[4].innerText}
                        <br />
                        {table.getElementsByClassName(`time_background${tableRow}`)[1].getElementsByTagName('td')[0].innerText}
                      </TableCell>
                  </React.Fragment>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ))}
    </>
  )
}

export default SchedulePage
