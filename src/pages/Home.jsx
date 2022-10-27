import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { calcFullscreen } from '../utils'
import { Link } from 'react-router-dom'
import ChipAndDesc from '../components/ChipAndDesc'

function HomePage () {
  const [shortcut, setShortcut] = useState(null)

  useEffect(() => {
    const localShortcut = window.localStorage.quickShortcut

    if (localShortcut) setShortcut(JSON.parse(localShortcut))
  }, [])

  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      minHeight={calcFullscreen}
      sx={{ '.block': { margin: '2px' } }}
    >
      <Typography
        sx={{
          zIndex: -999,
          userSelect: 'none',
          msUserSelect: 'none',
          WebkitUserSelect: 'none',
          fontWeight: 'bold',
          fontSize: {
            xs: '20vw',
            xl: '16vw'
          }
        }}
      >YMK</Typography>
      <Box className={'block'}>
        <Button component={Link} to={'students/otp'}>
          ОТП
        </Button>
        <Button disabled={true}>
          ОСГП
        </Button>
        <Button disabled={true}>
          ОЕНП
        </Button>
        <br />
      </Box>
      <Box className={'block'}>
        <Button component={Link} to={'/teachers'}>
          Преподаватели
        </Button>
      </Box>
      <Box className={'block'}>
        {!shortcut
          ? <ChipAndDesc
            label={'Найдите сердечко ❤'}
            description={'Чтобы добавить группу на гланвый экран - нажмите на сердечко в расписании вашей группы'}
          />
          : <Button
            component={Link}
            to={`students/${shortcut.department}/${shortcut.group}`}
          >
            {shortcut.group}
          </Button>}
      </Box>
    </Box>
  )
}

export default HomePage
