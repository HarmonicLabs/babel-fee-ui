import { createSignal } from 'solid-js';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@suid/material';

function MyDialog() {
  const [open, setOpen] = createSignal(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Open Dialog
      </Button>
      <Dialog
        open={open()}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(103, 58, 183, 0.2)',
            backgroundColor: (theme) => theme.palette.background.paper,
          },
        }}
      >
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is the content of the dialog. It can include text, images, or other components.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}