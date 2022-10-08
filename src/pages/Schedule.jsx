import {
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Toolbar,
  Typography,
  Grid
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import config from '../../config.json'
import Progress from '../components/Progress'
import { v4 as uuid } from 'uuid'
import strReplace from 'react-string-replace'
import Translit from 'cyrillic-to-translit-js'
import { observer } from 'mobx-react'
import Store from '../stores/ScheduleStore'

const translit = new Translit()

function SchedulePage () {
  const { department, group } = useParams()
  const [isLoaded, setIsLoaded] = useState(false)
  const [schedule, setSchedule] = useState(Store.schedules.get(group))
  const [week, setWeek] = useState(0)
  const [isButtonLoading, setIsButtonLoading] = useState(false)

  const reverseGroup = translit.reverse(group)
  const departmentReverse = translit.reverse(department).toUpperCase()

  function updateSchedule (action) {
    setIsButtonLoading(true)

    const updatedWeek = action === 'next' ? week + 1 : week - 1
    setWeek(updatedWeek)

    fetch(`${config.apiUrl}/schedule/${departmentReverse}/${reverseGroup}/${updatedWeek}`, { method: 'post' })
      .then((res) => res.text())
      .then((data) => {
        const buffer = document.createElement('div')
        buffer.innerHTML = data
        setSchedule(buffer)
        setIsButtonLoading(false)
      })
  }

  useEffect(() => {
    if (schedule) {
      setIsLoaded(true)
      return
    }

    fetch(`${config.apiUrl}/schedule/${departmentReverse}/${reverseGroup}/0`, { method: 'post' })
      .then((res) => res.text())
      .then((data) => {
        const buffer = document.createElement('div')
        buffer.innerHTML = data
        Store.addSchedule(group, buffer)
        setSchedule(buffer)
        setIsLoaded(true)
      })
  }, [])

  function previousWeek () {
    updateSchedule('previous')
  }

  function nextWeek () {
    updateSchedule('next')
  }

  if (!isLoaded) return <Progress />

  return (
    <>
      <h1>Расписание группы {reverseGroup}</h1>
      {[...schedule.getElementsByClassName('uchen')].map((table, index) => (
        <Paper
          key={index}
          id={table.getElementsByTagName('table')[0].style.color ? 'scrollTo' : ''}
          sx={table.getElementsByTagName('table')[0].style.color ? { bgcolor: 'action.hover' } : {}}
        >
          <Toolbar>
            <Typography>
              {table.getElementsByClassName('back_date')[0].innerText}
              {table.getElementsByTagName('table')[0].style.color ? ' (Сегодня)' : ''}
            </Typography>
          </Toolbar>
          <TableContainer sx={{ marginBottom: 1 }}>
            <Table size={'small'}>
              <TableHead>
                <TableRow>
                  <TableCell align={'center'}>пара</TableCell>
                  <TableCell align={'left'}>предмет</TableCell>
                  <TableCell align={'center'}>кабинет</TableCell>
                  <TableCell align={'center'}>преподаватель</TableCell>
                  <TableCell align={'center'}>время</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[1, 2, 3, 4, 5].map((tableRow) => (
                  <TableRow
                    key={uuid()}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {[table.getElementsByClassName(`time_background${tableRow}`)[0]].map((lesson) => (
                      <React.Fragment key={uuid()}>
                        <TableCell align={'center'}>
                          {lesson.getElementsByTagName('td')[0].innerText}
                        </TableCell>
                        <TableCell align={'left'}>
                          {(() => {
                            let result
                            const item = lesson.getElementsByTagName('td')[1]
                            const link = item.getElementsByTagName('span')[0]

                            if (!link) result = item.innerHTML
                            else {
                              result = <a href={link.getAttribute('data-href')}>
                                {link.getElementsByTagName('u')[0].innerHTML}
                              </a>
                            }

                            return strReplace(result, '<br>', () => <br />)
                          })()}
                        </TableCell>
                        <TableCell align={'center'}>
                          {strReplace(lesson.getElementsByTagName('td')[2].innerHTML, '<br>', () => <br />)}
                        </TableCell>
                        <TableCell align={'center'}>
                          {strReplace(lesson.getElementsByTagName('td')[3].innerHTML, '<br>', () => <br />)}
                        </TableCell>
                        <TableCell align={'center'} style={{ whiteSpace: 'nowrap' }}>
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
        </Paper>
      ))}
      <Grid container spacing={1}>
        <Grid item xs={6}>
          {schedule.getElementsByClassName('previous_week')[0]
            ? <LoadingButton
            loading={isButtonLoading}
            fullWidth
            onClick={previousWeek}
          >Предыдущая</LoadingButton>
            : ''}
        </Grid>
        <Grid item xs={6}>
          {schedule.getElementsByClassName('next_week')[0]
            ? <LoadingButton
            loading={isButtonLoading}
            fullWidth
            onClick={nextWeek}
          >Следующая</LoadingButton>
            : ''}
        </Grid>
      </Grid>
    </>
  )
}

export default observer(SchedulePage)
