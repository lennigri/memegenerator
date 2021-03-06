import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Alert from '@mui/material/Alert';
import DrawCanvas from '../DrawCanvas';
import { generateTemplateObject } from '../../tools/generateTemplateObject';

export default function DrawTemplateSelector({ ButtonText }) {
  const setEditorState = useStoreActions((actions) => actions.setEditorState);
  const user = useStoreState((state) => state.userSession.user);
  const [open, setOpen] = React.useState(false);

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const [preview, setPreview] = React.useState();
  const [alert, setAlert] = React.useState(false);

  const image = new Image();
  // image.src = `"${name}"`;
  image.src = preview;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const someMethod = (input) => {
    setPreview(input);
  };

  return (
    <div>
      <Button variant='contained' onClick={handleClickOpen}>
        {ButtonText}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Draw an image</DialogTitle>
        {alert ? (
          <Alert severity='error'>Please save a drawn picture before proceeding</Alert>
        ) : null}

        <DialogContent>
          <DrawCanvas parentMethod={someMethod} useStoreActions={useStoreActions}></DrawCanvas>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => {
              if (preview) {
                const templateObject = generateTemplateObject(user._id, 'draw', image);
                setEditorState({ image, templateObject, templateNew: true, memeObject: null });
                handleClose();
                setAlert(false);
              } else {
                setAlert(true);
              }
            }}
          >
            Use template
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
