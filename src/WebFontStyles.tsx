import {
    styled,
    TextareaAutosize,
    TextareaAutosizeProps,
  } from '@mui/material';
  
  export interface StyledTextAreaAutosizeProps extends TextareaAutosizeProps {
    family: string;
    url: string;
  }
  
  export const StyledTextAreaAudosize = styled(TextareaAutosize, {
    shouldForwardProp: (prop) => prop !== 'family' && prop !== 'url'
  })<StyledTextAreaAutosizeProps>(({ family, url }) => ({
    '@font-face': {
      fontFamily: `${family}`,
      src: `url(${url})`,
    },
  }));