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
import { Link } from 'react-router-dom'

function NewsCard (props) {
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
        {/* This is placeholder */}
        {/* <Button size="small">Поделиться</Button> */}
        {/* <Button size="small">Подробнее</Button> */}
        <Button component={Link} to={'/groups/otp'}>ОТП</Button>
        <Button disabled={true}>ОСГП</Button>
        <Button disabled={true}>ОЕНП</Button>
      </CardActions>
    </Card>
  )
}

NewsCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string
}

export default NewsCard
