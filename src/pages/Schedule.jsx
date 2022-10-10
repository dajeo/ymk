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
  Grid,
  Box
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Translit from 'cyrillic-to-translit-js'
import { observer } from 'mobx-react'
import config from '../../config.json'
import Progress from '../components/Progress'
import Store from '../stores/ScheduleStore'
import { calcSchedulePage } from '../utils'

const translit = new Translit()

function SchedulePage () {
  const { department, group } = useParams()
  const [isLoaded, setIsLoaded] = useState(false)
  const [schedule, setSchedule] = useState(Store.schedules.get(group))
  const [week, setWeek] = useState(0)
  const [isButtonLoading, setIsButtonLoading] = useState(false)

  const groupReverse = translit.reverse(group).replace('Е', 'Э')
  const departmentReverse = translit.reverse(department).toUpperCase()

  function updateSchedule (action) {
    setIsButtonLoading(true)

    const updatedWeek = action === 'next' ? week + 1 : week - 1
    setWeek(updatedWeek)

    fetch(`${config.apiUrl}/schedule/${departmentReverse}/${groupReverse}/${updatedWeek}`, { method: 'post' })
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

    fetch(`${config.apiUrl}/schedule/${departmentReverse}/${groupReverse}/0`, { method: 'post' })
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
      <h1 id={'schedule_title'}>Расписание группы {groupReverse}</h1>
      {schedule.getElementsByClassName('uchen')[0]
        ? ''
        : <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          minHeight={calcSchedulePage(document)}
        >
          <h3>Хм, здесь почему-то пусто 🤔</h3>
        </Box>
      }
      {[...schedule.getElementsByClassName('uchen')].map((table, tableIndex) => (
        <Paper
          key={tableIndex}
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
                  <TableCell align={'center'}>№</TableCell>
                  <TableCell align={'left'}>предмет</TableCell>
                  <TableCell align={'right'}>каб</TableCell>
                  <TableCell align={'right'}>преподаватель</TableCell>
                  <TableCell align={'right'}>время</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[1, 2, 3, 4, 5].map((tableRow, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {[table.getElementsByClassName(`time_background${tableRow}`)[0]].map((lesson, lessonIndex) => (
                      <React.Fragment key={lessonIndex}>
                        <TableCell align={'center'}>
                          {lesson.getElementsByTagName('td')[0].innerText}
                        </TableCell>
                        <TableCell align={'left'} style={{ whiteSpace: 'pre-wrap' }}>
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

                            return result.replace('<br>', '\n')
                          })()}
                        </TableCell>
                        <TableCell align={'right'} style={{ whiteSpace: 'pre-wrap' }}>
                          {lesson.getElementsByTagName('td')[2].innerHTML.replace('<br>', '\n')}
                        </TableCell>
                        <TableCell align={'right'} style={{ whiteSpace: 'pre-wrap' }}>
                          {lesson.getElementsByTagName('td')[3].innerHTML.replace('<br>', '\n')}
                        </TableCell>
                        <TableCell align={'right'} style={{ whiteSpace: 'nowrap' }}>
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
