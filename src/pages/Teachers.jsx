import React, { useEffect, useState } from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography
} from '@mui/material'
import Progress from '../components/Progress'
import { observer } from 'mobx-react'
import Store from '../stores/TeachersStore'
import { fetchTeachers } from '../api'

function TeachersPage () {
  const [teachers, setTeachers] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(false)

    const buffer = Store.teachers

    if (buffer) {
      setTeachers(buffer)
      setIsLoaded(true)
      return
    }

    fetchTeachers()
      .then((data) => {
        Store.setTeachers(data)
        setTeachers(data)
        setIsLoaded(true)
      })
  }, [])

  if (!isLoaded) return <Progress />

  return (
    <>
      <Typography variant={'h4'} mt={'4px'} mb={'4px'}>Преподаватели</Typography>
      <Grid
        container
        spacing={'4px'}
        columns={{ xs: 6, sm: 12, md: 12, lg: 12, xl: 8 }}
      >
        {[...teachers.getElementsByClassName('box_prepod')].map((teacher) => (
          <React.Fragment key={teacher.innerText}>
            {(() => {
              const name = teacher.innerText

              return (
                <Grid item xs={3} sm={4} md={3} lg={2} xl={1}>
                  <Card>
                    <CardActionArea
                      component={'a'}
                      onContextMenu={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        return false
                      }}
                      href={`https://ямк-салехард.рф/mobile/teacher/shedule/?name=${name}&last=last`}
                    >
                      <CardContent sx={{ padding: '8px' }}>
                        <Typography noWrap variant={'h6'}>
                          {name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              )
            })()}
          </React.Fragment>
        ))}
      </Grid>
    </>
  )
}

export default observer(TeachersPage)
