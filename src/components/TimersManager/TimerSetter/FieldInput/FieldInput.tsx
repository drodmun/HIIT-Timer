import { ChangeEvent, useState } from 'react';
import { IconButton, Modal, Paper, TextField, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useGlobalContext } from 'GlobalContext';

const FieldInput = (props: {
  label: string;
  value: number;
  onLess: () => void;
  onMore: () => void;
  onTenLess: () => void;
  onTenMore: () => void;
  onInput: (e: ChangeEvent<HTMLInputElement>) => string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSecondView?: boolean;
}) => {
  const theme = useTheme();
  const [modal, setModal] = useState<boolean>(false);
  const toggleModal = () => setModal((prev) => !prev);
  const { darkMode} = useGlobalContext()
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', width: 'fit-content' }}>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <div style={{ display: 'flex', flexDirection: 'column-reverse', margin: theme.spacing(1) }}>
            <IconButton
              onClick={props.onTenMore}
              sx={{ color: darkMode ? '#0d174d' : theme.palette.common.white, padding: 0 }}
            >
              <AddIcon fontSize='large' />
            </IconButton>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column-reverse', margin: theme.spacing(1) }}>
            <IconButton
              size='large'
              onClick={props.onMore}
              sx={{ color: darkMode? '#0d174d' : theme.palette.common.white, padding: 0 }}
            >
              <AddIcon fontSize='large' />
            </IconButton>
          </div>
        </div>

        <Typography
          variant='h1'
          component='div'
          onClick={toggleModal}
          style={{
            lineHeight: 1,
            color: darkMode ? '#0d174d' : theme.palette.common.white,
            fontWeight: 'lighter',
            fontSize: 150,
            margin: theme.spacing(1)
          }}
        >
          {(props.value > 9 ? '' : '0') + props.value}
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <div style={{ display: 'flex', flexDirection: 'column-reverse', margin: theme.spacing(1) }}>
            <IconButton
              onClick={props.onTenLess}
              sx={{ color: darkMode ? '#0d174d' : theme.palette.common.white, padding: 0 }}
            >
              <RemoveIcon fontSize='large' />
            </IconButton>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column-reverse', margin: theme.spacing(1) }}>
            <IconButton
              onClick={props.onLess}
              sx={{ color: darkMode ? '#0d174d' : theme.palette.common.white, padding: 0 }}
            >
              <RemoveIcon fontSize='large' />
            </IconButton>
          </div>
        </div>
      </div>

      <Modal
        open={modal}
        onClose={toggleModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Paper
          sx={{
            position: 'absolute' as const,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: 24,
            p: 4
          }}
        >
          <TextField
            type='number'
            variant='outlined'
            label={props.label}
            value={props.value}
            onInput={props.onInput}
            onChange={props.onChange}
            
          />
        </Paper>
      </Modal>
    </>
  );
};

export default FieldInput;
