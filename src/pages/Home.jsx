import React from 'react'
import { Box, Typography } from '@mui/material'
import Changelog from '../components/Changelog'
import Item from '../components/Item'
import Container from '../components/Container'

function HomePage () {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      flexDirection={'column'}
    >
      <Typography variant={'h1'} sx={{ fontWeight: 'bold' }}>
        YMK
      </Typography>
      <Typography variant={'body2'} sx={{ mb: '20px' }}>
        Developed by Danil
      </Typography>

      <Container>
        <Changelog v={'2.7'}>
          <Item>Добавлен чейнджлог</Item>
        </Changelog>

        <Changelog v={'2.6'}>
          <Item>Исправлена ошибка из-за которой не обновляется контент расписания</Item>
        </Changelog>

        <Changelog v={'2.5'}>
          <Item>Исправлена ширина полосы загрузки на экранах выше 1100 пикселей</Item>
        </Changelog>

        <Changelog v={'2.4'}>
          <Item>Добавлено диалоговое окно переезда на новый домен</Item>
        </Changelog>

        <Changelog v={'2.3'}>
          <Item>Удалены неиспользуемые утилиты</Item>
          <Item>Изменена полоса загрузки</Item>
        </Changelog>

        <Changelog v={'2.2'}>
          <Item>Добавлена надпись Developed by под заголовком</Item>
        </Changelog>

        <Changelog v={'2.1'}>
          <Item>Добавлены иконки в меню навигации</Item>
        </Changelog>

        <Changelog v={'2.0'}>
          <Item>Добавлено нижнее меню навигации вместо шапки</Item>
        </Changelog>
      </Container>
    </Box>
  )
}

export default HomePage
