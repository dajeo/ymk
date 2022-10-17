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
  const prop = { paddingTop: '2px', paddingBottom: '2px' }

  return (
    <Paper
      id={isToday ? 'scrollHere' : ''}
      sx={isToday ? { bgcolor: 'action.hover' } : {}}
    >
      <Toolbar>
        <Typography>
          {date} {isToday ? ' (Сегодня)' : ''}
        </Typography>
      </Toolbar>
      <TableContainer sx={{ marginBottom: 1 }}>
        <Table size={'small'}>
          <TableHead>
            <TableRow>
              <TableCell sx={prop} align={'center'}>№</TableCell>
              <TableCell sx={prop} align={'left'}>предмет</TableCell>
              <TableCell sx={prop} align={'right'}>каб</TableCell>
              <TableCell sx={prop} align={'right'}>преподаватель</TableCell>
              <TableCell sx={prop} align={'right'}>время</TableCell>
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
                    <TableCell sx={prop} align={'center'}>
                      {lesson.getElementsByTagName('td')[0].innerText}
                    </TableCell>
                    <TableCell sx={prop} align={'left'} style={{ whiteSpace: 'pre-wrap' }}>
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
                    <TableCell sx={prop} align={'right'} style={{ whiteSpace: 'pre-wrap' }}>
                      {lesson.getElementsByTagName('td')[2].innerHTML.replace('<br>', '\n')}
                    </TableCell>
                    <TableCell sx={prop} align={'right'} style={{ whiteSpace: 'pre-wrap' }}>
                      {lesson.getElementsByTagName('td')[3].innerHTML.replace('<br>', '\n')}
                    </TableCell>
                    <TableCell sx={prop} align={'right'} style={{ whiteSpace: 'nowrap' }}>
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
