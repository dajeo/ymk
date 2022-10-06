import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, CardActionArea, CardContent, Container, Typography } from '@mui/material'
import Translit from 'cyrillic-to-translit-js'

const translit = new Translit()

function DepartmentView () {
  const { department } = useParams()
  const [isLoaded, setIsLoaded] = useState(false)
  const [html, setHtml] = useState({})

  useEffect(() => {
    fetch(`http://localhost:8080/groups/${department}`, { method: 'post' })
      .then((res) => res.text())
      .then((data) => {
        const buffer = document.createElement('div')
        buffer.innerHTML = data
        console.log(buffer)
        setHtml(buffer)
        setIsLoaded(true)
      })
  }, [])

  if (!isLoaded) return <h1>Загрузка...</h1>

  return (
    <>
      {[...html.getElementsByClassName('zag_kurs')].map((course, index) => (
        <div key={index}>
          <h1>{course.innerText}</h1>
          {[...html.getElementsByClassName(`kurs_container_${index + 1}`)].map((course) => (
            <div key={index}>
              {[...course.getElementsByClassName('group_box')].map((group) => (
                <Card
                  sx={{ minWidth: 275, marginBottom: 1 }}
                  key={group.getAttribute('value')}
                >
                  <CardActionArea component={Link} to={`/schedule/${translit.reverse(department).toUpperCase()}/${group.getElementsByClassName('num_group')[0].innerText}`}>
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
              ))}
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

export default DepartmentView
