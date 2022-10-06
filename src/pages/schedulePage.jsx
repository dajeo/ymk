import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ScheduleView () {
  const { department, group } = useParams()
  const [isLoaded, setIsLoaded] = useState(false)
  const [html, setHtml] = useState({})

  useEffect(() => {
    fetch(`http://localhost:8080/schedule/${department}/${group}`, { method: 'post' })
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
      <h1>Расписание {group}</h1>
    </>
  )
}

export default ScheduleView
