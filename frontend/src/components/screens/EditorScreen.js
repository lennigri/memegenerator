import React, { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
import { Container, Stack, Typography } from '@mui/material';
import NavBar from '../NavBar';
import Editor from '../Editor';
import ServerTemplateSelector from '../uploadOptions/ServerTemplateSelector';
import ImgflipSelector from '../uploadOptions/ImgflipSelector';
import LocalFileSelector from '../uploadOptions/LocalFileSelector';
import URLSelector from '../uploadOptions/UrlSelector';
// import Download from '../Download';
import DownloadServer from '../DownloadServer';
import CameraUpload from '../uploadOptions/CameraUpload';
import DrawTemplateSelector from '../uploadOptions/DrawTemplateSelector';
import GenerateSaveMeme from '../GenerateSaveMeme';
import UpdateMeme from '../UpdateMeme';
import Share from '../Share';
import ShowMeme from '../ShowMeme';

const EditorScreen = ({ logout }) => {
  const fetchImgflip = useStoreActions((actions) => actions.fetchImgflip);
  const fetchServerTemplates = useStoreActions((actions) => actions.fetchServerTemplates);
  const fetchServerMemes = useStoreActions((actions) => actions.fetchServerMemes);

  useEffect(() => {
    fetchImgflip();
    fetchServerTemplates();
    fetchServerMemes();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ overflow: 'hidden' }}>
      <NavBar logout={logout} />
      <Container sx={{ justifyContent: 'space-around', display: 'flex' }}>
        <Stack direction='row' spacing={1} sx={{ mt: 3 }}>
          <ServerTemplateSelector />
          <ImgflipSelector />
          <LocalFileSelector ButtonText={'Use local file'}></LocalFileSelector>
          <URLSelector></URLSelector>
          <CameraUpload></CameraUpload>
          <DrawTemplateSelector ButtonText={'Draw Meme'}></DrawTemplateSelector>
        </Stack>
      </Container>
      <Editor />
      <Container sx={{ textAlign: 'center' }}>
        <Typography color='text.secondary'>
          Generate and save your meme to the server. Afterwards, you can view, share or download it.
        </Typography>
      </Container>
      <Container sx={{ justifyContent: 'space-around', display: 'flex' }}>
        <Stack direction='row' spacing={1} sx={{ my: 1 }}>
          <GenerateSaveMeme />
          <UpdateMeme />
        </Stack>
      </Container>
      <Container sx={{ textAlign: 'center' }}>
        <Typography color='text.secondary'>
          Afterwards, you can view, share or download it.
        </Typography>
      </Container>
      <Container sx={{ justifyContent: 'space-around', display: 'flex' }}>
        <Stack direction='row' spacing={1} sx={{ my: 1 }}>
          {/* <Download /> */}
          <DownloadServer />
          <ShowMeme />
          <Share />
        </Stack>
      </Container>
    </div>
  );
};

export default EditorScreen;
