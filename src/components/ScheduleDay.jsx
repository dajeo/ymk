import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography
} from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

function ScheduleDay ({ table, date }) {
  const isToday = table.getElementsByTagName('table')[0].style.color

  return (
    <Paper
      id={isToday ? 'scrollHere' : ''}
      sx={isToday ? { bgcolor: 'action.hover' } : {}}
    >
      <Toolbar variant={'dense'}>
        <Typography>
          {date + (isToday ? ' (Сегодня)' : '')}
        </Typography>
      </Toolbar>
      <TableContainer sx={{ marginBottom: 1, 'th, td': { paddingTop: '2px', paddingBottom: '2px' } }}>
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
            {[1, 2, 3, 4, 5].map((tableRow) => (
              <TableRow
                key={tableRow}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {[table.getElementsByClassName(`time_background${tableRow}`)[0]].map((lesson, lessonIndex) => (
                  <React.Fragment key={lessonIndex}>
                    <TableCell align={'center'}>
                      {lesson.getElementsByTagName('td')[0].innerText}
                    </TableCell>
                    <TableCell align={'left'} style={{ whiteSpace: 'pre-wrap' }}>
                      {(() => {
                        const item = lesson.getElementsByTagName('td')[1]
                        const link = item.getElementsByTagName('span')[0]

                        if (!link) return item.innerHTML.replace('<br>', '\n')
                        else {
                          // If anything add replace here
                          return <a href={link.getAttribute('data-href')}>
                            {link.getElementsByTagName('u')[0].innerHTML}
                          </a>
                        }
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
  )
}

ScheduleDay.propTypes = {
  table: PropTypes.object,
  date: PropTypes.string
}

export default ScheduleDay
