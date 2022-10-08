import React from 'react'
import NewsCard from '../components/NewsCard'

function HomePage () {
  return (
    <NewsCard
      title={'Добро пожаловать'}
      description={
        'Так как оригинальный сайт расписания ЯМК невыносимо ужасен, был создан этот, красивый, простой и понятный.'
      }
    />
  )
}

export default HomePage
