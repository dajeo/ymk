import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography
} from '@mui/material'
import Translit from 'cyrillic-to-translit-js'
import config from '../../config.json'
import Progress from '../components/Progress'
import { observer } from 'mobx-react'
import Store from '../stores/GroupsStore'

const translit = new Translit()

function GroupsPage () {
  const { department } = useParams()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (Store.groups) {
      setIsLoaded(true)
      return
    }

    fetch(`${config.apiUrl}/groups/${department}`, { method: 'post' })
      .then((res) => res.text())
      .then((data) => {
        const buffer = document.createElement('div')
        buffer.innerHTML = data
        Store.setGroups(buffer)
        setIsLoaded(true)
      })
  }, [])

  if (!isLoaded) return <Progress />

  return (
    <>
      {[...Store.groups.getElementsByClassName('zag_kurs')].map((course, index) => (
        <div key={index}>
          <h1>{course.innerText}</h1>
          {[...Store.groups.getElementsByClassName(`kurs_container_${index + 1}`)].map((course) => (
            <Grid
              key={index}
              container
              spacing={1}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {[...course.getElementsByClassName('group_box')].map((group) => (
                <Grid
                  key={group.getAttribute('value')}
                  item xs={5} sm={4} md={4}
                >
                  <Card sx={{ minWidth: 275, height: 1 }}>
                    <CardActionArea
                      component={Link}
                      sx={{ height: 1 }}
                      to={`/schedule/${department}/${translit.transform(group.getElementsByClassName('num_group')[0].innerText)}`}
                    >
                      <CardContent>
                        <Typography gutterBottom={true} variant="h5" component="div">
                          {group.getElementsByClassName('num_group')[0].innerText}
                        </Typography>
                        <Typography variant="body2" color={'text.secondary'}>
                          {group.getElementsByClassName('name_group')[0].innerHTML.toString().replace('<br>', ' ')}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ))}
        </div>
      ))}
    </>
  )
}

export default observer(GroupsPage)
