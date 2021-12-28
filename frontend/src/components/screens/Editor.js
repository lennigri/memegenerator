import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { useClipboard } from 'use-clipboard-copy';

const Editor = ({logout}) => {
  const [memes, setMemes] = useState([]);
  const [memeIndex, setMemeIndex] = useState(0);
  const [captions, setCaptions] = useState([]);
  const [generatedUrl, setGeneratedUrl] = useState(null);
  const [showsGenerated, setShowsGenerated] = useState(true);
  const [copied, setCopied] = useState(false);

  const clipboard = useClipboard();

  const copyLink = () => {
    clipboard.copy(generatedUrl);
    setCopied(true);
    alert('Link copied!', generatedUrl)
  };

  const updateCaption = (e, index) => {
    const text = e.target.value || '';
    setCaptions(
      captions.map((c, i) => {
        if(index === i) {
          return text;
        } else {
          return c;
        }
      })
    )
  }

  const generateMeme = () => {
    const currentMeme = memes[memeIndex];
    const formData = new FormData();

    formData.append('username', 'derBolide');
    formData.append('password', 'vpfCWA9Ah4XeX8w');
    formData.append('template_id', currentMeme.id);
    captions.forEach((c, index) => formData.append(`boxes[${index}][text]`, c))

    fetch('https://api.imgflip.com/caption_image', {
      method: 'POST',
      body: formData
    }).then(res => {
      res.json().then(res => {
        console.log(res)
        setGeneratedUrl(res.data.url);
        setShowsGenerated(!showsGenerated)
        setCopied(false);
      });
    });
  }

  const switchView = () => {
    setShowsGenerated(!showsGenerated);
    setGeneratedUrl(null);
  }

  useEffect( () => {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(res => {
        const memes = res.data.memes;
        setMemes(memes);
      })
  }, []);

  useEffect( () => {
    if(memes.length) {
      setCaptions(Array(memes[memeIndex].box_count).fill(''));
    }
  }, [memeIndex, memes])

  useEffect(() => {
    console.log(captions);
  }, [captions])


  return (
    <div
      style={{
        overflow: "hidden",
      }}
    >
      <NavBar logout={logout}/>
      <Container component="main">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >

          {memes.length ? <div>
            <img src={generatedUrl ? generatedUrl : memes[memeIndex].url} alt="meme" style={{ maxHeight: 500, maxwidth: 500, }}/>
          </div> : <></>}
          {
              captions.map((c, index) => (
                <TextField
                  required
                  id="outlined-required"
                  label="Caption"
                  onChange={(e) => updateCaption(e, index)}
                  key={index}
                  sx={{ mt: 2, mb: 2}}
                />
                ))
            }
          { showsGenerated ? 
          <Button variant="contained" color="success" sx={{ mb: 2}} onClick={generateMeme}>
            Generate
          </Button> 
          :
          <Button variant="contained" color="success" sx={{ mb: 2}} onClick={switchView}>
            Create New
          </Button>
          }
          { copied ?
          <Button variant="contained" sx={{ mb: 2}} onClick={() => {
              setMemeIndex(memeIndex + 1); setGeneratedUrl(null)}}
          >
            Skip
          </Button>
          :
          <Button variant="contained" sx={{ mb: 2}} onClick={copyLink}
          >
            Share
          </Button>
          }
        </Box>
      </Container>
    </div>
  );
};

export default Editor;
