import { ChangeEvent, useState } from 'react';
import { IconButton, Modal, Paper, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const FieldInput = (props: {
  label: string;
  value: number;
  onLess: () => void;
  onMore: () => void;
  onTenLess: () => void;
  onTenMore: () => void;
  onInput: (e: ChangeEvent<HTMLInputElement>) => string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [modal, setModal] = useState<boolean>(false);
  const toggleModal = () => setModal((prev) => !prev);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', width: 'fit-content' }}>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <IconButton onClick={props.onTenMore} color='secondary'>
              <AddIcon />
            </IconButton>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <IconButton onClick={props.onMore} color='secondary'>
              <AddIcon />
            </IconButton>
          </div>
        </div>

        <Typography variant='h1' component='div' onClick={toggleModal} style={{ lineHeight: 1 }}>
          {(props.value > 9 ? '' : '0') + props.value}
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <IconButton onClick={props.onTenLess} color='primary'>
              <RemoveIcon />
            </IconButton>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <IconButton onClick={props.onLess} color='primary'>
              <RemoveIcon />
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
