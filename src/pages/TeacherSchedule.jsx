import { Grid, Box } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react'
import Progress from '../components/Progress'
import Store from '../stores/TeacherScheduleStore'
import { calcSchedulePage } from '../utils'
import { fetchTeacherSchedule } from '../api'
import TeacherScheduleDay from '../components/TeacherScheduleDay'
import Title from '../components/Title'

function TeacherSchedulePage () {
  const { teacher } = useParams()
  const [isLoaded, setIsLoaded] = useState(false)
  const [schedule, setSchedule] = useState(Store.schedules.get(teacher))
  const [week, setWeek] = useState(0)
  const [isButtonLoading, setIsButtonLoading] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  function updateSchedule (action) {
    setIsButtonLoading(true)

    const updatedWeek = action === 'next' ? week + 1 : week - 1
    setWeek(updatedWeek)

    fetchTeacherSchedule(teacher, updatedWeek)
      .then((data) => {
        setSchedule(data)
        setIsButtonLoading(false)
      })
  }

  useEffect(() => {
    if (schedule) {
      setIsLoaded(true)
      return
    }

    fetchTeacherSchedule(teacher, 0)
      .then((data) => {
        Store.addSchedule(teacher, data)
        setSchedule(data)
        setIsLoaded(true)
      })
  }, [])

  useEffect(() => {
    if (isScrolled) return
    const el = document.getElementById('scrollHere')
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setIsScrolled(true)
  })

  function previousWeek () {
    updateSchedule('previous')
  }

  function nextWeek () {
    updateSchedule('next')
  }

  if (!isLoaded) return <Progress />

  return (
    <>
      <Title title={teacher} />
      {schedule.getElementsByClassName('container_table')[0]
        ? ''
        : <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          minHeight={calcSchedulePage()}
        >
          <h3>Хм, здесь почему-то пусто 🤔</h3>
        </Box>
      }
      <Grid container columnSpacing={'4px'} columns={{ xs: 4, md: 10 }}>
        <Grid item xs={4} md={5}>
          {[...schedule.getElementsByClassName('container_table')].map((table, tableIndex) => {
            const date = table.getElementsByClassName('back_date')[0].innerText

            if (!date.startsWith('Понедельник') && !date.startsWith('Вторник') && !date.startsWith('Среда')) {
              return null
            }

            return <TeacherScheduleDay key={tableIndex} table={table} date={date} />
          })}
        </Grid>
        <Grid item xs={4} md={5}>
          {[...schedule.getElementsByClassName('container_table')].map((table, tableIndex) => {
            const date = table.getElementsByClassName('back_date')[0].innerText

            if (!date.startsWith('Четверг') && !date.startsWith('Пятница') && !date.startsWith('Суббота')) {
              return null
            }

            return <TeacherScheduleDay key={tableIndex} table={table} date={date} />
          })}
        </Grid>
      </Grid>
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

export default observer(TeacherSchedulePage)
