import { Grid, Box, IconButton } from '@mui/material'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import { LoadingButton } from '@mui/lab'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react'
import Progress from '../components/Progress'
import Store from '../stores/ScheduleStore'
import { calcSchedulePage } from '../utils'
import { fetchSchedule } from '../api'
import ScheduleDay from '../components/ScheduleDay'
import Title from '../components/Title'

function SchedulePage () {
  const { department, group } = useParams()
  const [isLoaded, setIsLoaded] = useState(false)
  const [schedule, setSchedule] = useState(Store.schedules.get(group))
  const [week, setWeek] = useState(0)
  const [isButtonLoading, setIsButtonLoading] = useState(false)
  const [isInShortcut, setIsInShortcut] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  function updateSchedule (action) {
    setIsButtonLoading(true)

    const updatedWeek = action === 'next' ? week + 1 : week - 1
    setWeek(updatedWeek)

    fetchSchedule(department, group, updatedWeek)
      .then((data) => {
        setSchedule(data)
        setIsButtonLoading(false)
      })
  }

  useEffect(() => {
    const shortcut = window.localStorage.quickShortcut

    if (shortcut) {
      const json = JSON.parse(shortcut)
      if (json.group === group) setIsInShortcut(true)
    }

    if (schedule) {
      setIsLoaded(true)
      return
    }

    fetchSchedule(department, group, 0)
      .then((data) => {
        Store.addSchedule(group, data)
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

  function addGroup () {
    if (isInShortcut) {
      window.localStorage.removeItem('quickShortcut')
    } else {
      window.localStorage.quickShortcut = JSON.stringify({ department, group })
    }

    setIsInShortcut(!isInShortcut)
  }

  if (!isLoaded) return <Progress />

  return (
    <>
      <Title title={`Группа ${group}`} />
      {schedule.getElementsByClassName('uchen')[0]
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
          {[...schedule.getElementsByClassName('uchen')].map((table, tableIndex) => {
            const date = table.getElementsByClassName('back_date')[0].innerText

            if (!date.startsWith('Понедельник') && !date.startsWith('Вторник') && !date.startsWith('Среда')) {
              return null
            }

            return <ScheduleDay key={tableIndex} table={table} date={date} />
          })}
        </Grid>
        <Grid item xs={4} md={5}>
          {[...schedule.getElementsByClassName('uchen')].map((table, tableIndex) => {
            const date = table.getElementsByClassName('back_date')[0].innerText

            if (!date.startsWith('Четверг') && !date.startsWith('Пятница') && !date.startsWith('Суббота')) {
              return null
            }

            return <ScheduleDay key={tableIndex} table={table} date={date} />
          })}
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={5}>
          {schedule.getElementsByClassName('previous_week')[0]
            ? <LoadingButton
            loading={isButtonLoading}
            fullWidth
            onClick={previousWeek}
          >Предыдущая</LoadingButton>
            : ''}
        </Grid>
        <Grid item textAlign={'center'} xs={2}>
          <IconButton onClick={addGroup}>
            <FavoriteRoundedIcon sx={isInShortcut ? { color: 'red' } : {}} />
          </IconButton>
        </Grid>
        <Grid item xs={5}>
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
