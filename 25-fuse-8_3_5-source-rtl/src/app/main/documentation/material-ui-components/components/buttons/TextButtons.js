import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function TextButtons() {
  return (
    <Stack direction="row" spacing={2}>
      <Button>اولیه</Button>
      <Button disabled>غیرفعال</Button>
      <Button href="#text-buttons">لینک</Button>
    </Stack>
  );
}
