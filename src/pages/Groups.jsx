import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Tooltip,
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
              columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 10 }}
            >
              {[...course.getElementsByClassName('group_box')].map((group) => (
                <Grid
                  key={group.getAttribute('value')}
                  item xs={4} sm={3} md={2} lg={2} xl={1}
                >
                  <Tooltip
                    disableInteractive
                    title={group.getElementsByClassName('name_group')[0].innerHTML.toString().replace('<br>', ' ')}
                  >
                    <Card>
                      <CardActionArea
                        component={Link}
                        onContextMenu={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          return false
                        }}
                        to={`/schedule/${department}/${translit.transform(group.getElementsByClassName('num_group')[0].innerText)}`}
                      >
                        <CardContent sx={{ padding: '8px' }}>
                          <Typography noWrap variant={'h6'}>
                            {group.getElementsByClassName('num_group')[0].innerText}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Tooltip>
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
