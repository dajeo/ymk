import { Box, Typography } from "@mui/material";
import { Changelog, Item, Container } from "../components";

export default function Home() {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography variant="h1" sx={{ fontWeight: "bold" }}>
        ЯМК
      </Typography>
      <Typography variant="body2" sx={{ mt: "-20px", mb: "6px" }}>
        Developed by <a style={{ color: "inherit" }} href="https://github.com/HeadcrabJ">Headcrab</a>
      </Typography>

      <Container>
        <Changelog v="3.1">
          <Item>Вкладка отделений и преподавателей перенесена в меню</Item>
          <Item>Кнопка добавить группу в избранные перенесена наверх напротив заголовка</Item>
        </Changelog>

        <Changelog v="3.0">
          <Item>Сайт полностью переписан на Next.js и TypeScript</Item>
          <Item>Вся серверная часть переписана на Next.js</Item>
          <Item>Добавлены новогодние снежинки</Item>
        </Changelog>

        <Changelog v="2.3">
          <Item>Добавлено уведомление о выходе новой версии</Item>
          <Item>Исправлено состояние сердечка на странице расписания</Item>
          <Item>Для получения данных теперь используеться Vercel SWR, тем самым решив все проблемы с кэшированием и дальнейшей поддержкой</Item>
          <Item>Удален MobX</Item>
          <Item>Очистка зависимостей и оптимизация кода</Item>
        </Changelog>

        <Changelog v="2.2">
          <Item>Добавлен чейнджлог</Item>
          <Item>Изменен дизайн карточек групп и преподавателей</Item>
          <Item>Исправлена ошибка из-за которой не обновляется контент расписания</Item>
        </Changelog>

        <Changelog v="2.1">
          <Item>Исправлена ширина полосы загрузки на экранах выше 1100 пикселей</Item>
          <Item>Добавлено диалоговое окно переезда на новый домен</Item>
          <Item>Удалены неиспользуемые утилиты</Item>
          <Item>Изменена полоса загрузки</Item>
          <Item>Добавлена надпись Developed by под заголовком</Item>
          <Item>Добавлены иконки в меню навигации</Item>
        </Changelog>

        <Changelog v="2.0">
          <Item>Добавлено нижнее меню навигации вместо шапки</Item>
        </Changelog>
      </Container>
    </Box>
  );
}
