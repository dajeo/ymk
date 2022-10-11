import React from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box
} from '@mui/material'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { calcFullscreen } from '../utils'

function NewsCard (props) {
  const { title, description } = props

  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      minHeight={calcFullscreen}
    >
      <Card sx={{ minWidth: 275, maxWidth: { sm: 500 } }}>
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
    </Box>
  )
}

NewsCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string
}

export default NewsCard
