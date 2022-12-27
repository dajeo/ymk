import React, {useEffect} from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export function NewDomainDialog() {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const newDomainDialog = window.localStorage.newDomainDialog;
    setOpen(!newDomainDialog || newDomainDialog !== "false");
  }, []);

  const handleClose = () => {
    window.localStorage.newDomainDialog = false;
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>
        Сайт переезжает на новый домен
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Вы будете автоматически перенаправлены на <span style={{ textDecoration: "underline" }}>ymk.vercel.app</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}
