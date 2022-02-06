import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Container, Box, Button, IconButton, CardMedia, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useStoreState } from 'easy-peasy';

const WIDTH = 600;

const Singleview = ({ openSingleView, setOpenSingleView, memeIndex }) => {
  const [viewWidth, setViewWidth] = useState(WIDTH);
  const [open, setOpen] = useState(false);
  const [shownIndex, setShownIndex] = useState(null);
  const scroll = 'paper';
  const serverTemplates = useStoreState((state) => state.serverTemplates);

  useEffect(() => {
    setOpen(openSingleView);
    setShownIndex(memeIndex);
  }, [openSingleView, memeIndex]);

  // implement something like this to resize dialog according to image size
  // useEffect(() => {
  //   if (imageSource) {
  //     if (imageSource.naturalWidth > WIDTH) {
  //       setViewWidth({
  //         width: WIDTH,
  //         height: (imageSource.naturalHeight * WIDTH) / imageSource.naturalWidth,
  //       });
  //     } else {
  //       setViewWidth({
  //         width: imageSource.naturalWidth,
  //         height: imageSource.naturalHeight,
  //       });
  //     }
  //   }
  // }, [memeIndex, setViewWidth]);

  const handleClose = () => {
    setOpen(false);
    setOpenSingleView(false);
  };

  const extractImageURL = (filePath) => {
    return 'http://localhost:3000' + filePath.substr(1, filePath.length - 1);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      maxWidth={'xl'}
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
    >
      <DialogTitle id='scroll-dialog-title'>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers={scroll === 'body'}>
        <Container sx={{ justifyContent: 'center', display: 'flex' }}>
          <Box width={viewWidth} boxShadow={1}>
            {serverTemplates[shownIndex] ? (
              <CardMedia
                component='img'
                id='img'
                image={extractImageURL(serverTemplates[shownIndex].filePath)}
                title='Picture'
                alt='pic'
              ></CardMedia>
            ) : (
              <CircularProgress />
            )}
          </Box>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={shownIndex < 1 ? true : false}
          onClick={() => setShownIndex(shownIndex - 1)}
        >
          Previous
        </Button>
        <Button
          disabled={shownIndex === serverTemplates.length - 1 ? true : false}
          onClick={() => setShownIndex(shownIndex + 1)}
        >
          Next
        </Button>
        <Button color={'error'} onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Singleview;
