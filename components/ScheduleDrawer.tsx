import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton
} from "@mui/material";
import {
  PeopleRounded,
  ReorderRounded
} from "@mui/icons-material";
import Link from "next/link";

interface Props {
  handleClose: () => void
}

export function ScheduleDrawer({ handleClose }: Props) {
  return (
    <Box
      sx={{ width: "auto" }}
      onClick={handleClose}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/students/otp">
            <ListItemIcon>
              <ReorderRounded />
            </ListItemIcon>
            <ListItemText>ОТП</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/teachers">
            <ListItemIcon>
              <PeopleRounded />
            </ListItemIcon>
            <ListItemText>Преподаватели</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
