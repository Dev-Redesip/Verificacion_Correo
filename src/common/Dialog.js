import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
  const [open, setOpen] = useState(props.openAlert);
  const title = props.title ? props.title : "Información";

  const handleClose = () => {
    setOpen(false);
    props.setOpenAlert(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={props.openAlert}
        onClose={props.msg !== "" ? props.handleAccept : handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.msg !== ""
            ? title
            : "¿Estás seguro de querer continuar?"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.msg === ""
              ? "Esta acción puede afectar el funcionamiento para el cliente, confirme que desea continuar."
              : props.msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {props.msg === "" ? (<Button onClick={handleClose}>Cancelar</Button>) : <></>}
          <Button onClick={props.handleAccept} autoFocus>
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
