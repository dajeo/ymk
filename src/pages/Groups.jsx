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
import Progress from '../components/Progress'
import { observer } from 'mobx-react'
import Store from '../stores/GroupsStore'
import { fetchGroups } from '../api'

function GroupsPage () {
  const { department } = useParams()
  const [groups, setGroups] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(false)

    const buffer = Store.groups.get(department)

    if (buffer) {
      setGroups(buffer)
      setIsLoaded(true)
      return
    }

    fetchGroups(department)
      .then((data) => {
        Store.addGroups(department, data)
        setGroups(data)
        setIsLoaded(true)
      })
  }, [department])

  if (!isLoaded) return <Progress />

  return (
    <>
      {[...groups.getElementsByClassName('zag_kurs')].map((course, index) => (
        <div key={index}>
          <h1>{course.innerText}</h1>
          {[...groups.getElementsByClassName(`kurs_container_${index + 1}`)].map((course) => (
            <Grid
              key={index}
              container
              spacing={1}
              columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 10 }}
            >
              {[...course.getElementsByClassName('group_box')].map((group) => {
                const numGroup = group.getElementsByClassName('num_group')[0].innerText
                const nameGroup = group.getElementsByClassName('name_group')[0].innerHTML.toString().replace('<br>', ' ')

                return (
                  <Grid
                    key={group.getAttribute('value') + nameGroup}
                    item xs={4} sm={3} md={2} lg={2} xl={1}
                  >
                    <Tooltip
                      disableInteractive
                      title={nameGroup}
                    >
                      <Card>
                        <CardActionArea
                          component={Link}
                          onContextMenu={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            return false
                          }}
                          to={`/ОТП/${numGroup}`}
                        >
                          <CardContent sx={{ padding: '8px' }}>
                            <Typography noWrap variant={'h6'}>
                              {numGroup}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Tooltip>
                  </Grid>
                )
              })}
            </Grid>
          ))}
        </div>
      ))}
    </>
  )
}

export default observer(GroupsPage)
