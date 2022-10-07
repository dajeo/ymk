import React from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography
} from '@mui/material'
import PropTypes from 'prop-types'

export function NewsCard (props) {
  const { title, description } = props

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardMedia
        component={'img'}
        height={140}
        image={'https://mui.com/static/images/cards/contemplative-reptile.jpg'}
        alt={'Header image'}
      />
      <CardContent>
        <Typography gutterBottom={true} variant="h5" component="div">
          { title }
        </Typography>
        <Typography variant="body2" color={'text.secondary'}>
          { description }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Поделиться</Button>
        <Button size="small">Подробнее</Button>
      </CardActions>
    </Card>
  )
}

NewsCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string
}
