import React from 'react'
import NewsCard from '../components/NewsCard'

function HomePage () {
  return (
    <NewsCard
      title={'Добро пожаловать'}
      description={
        'Так как оригинальный сайт расписания ЯМК не соответствует моим мечтам, был создан этот, красивый, простой и современный.'
      }
    />
  )
}

export default HomePage
