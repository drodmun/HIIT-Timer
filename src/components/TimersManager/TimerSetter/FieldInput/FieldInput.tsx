import { ChangeEvent, useState } from "react";
import { Button, Modal, Paper, TextField, Typography } from "@mui/material";

const FieldInput = (props: {
  label: string;
  value: number;
  onLess: () => void;
  onMore: () => void;
  onInput: (e: ChangeEvent<HTMLInputElement>) => string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [modal, setModal] = useState<boolean>(false);
  const toggleModal = () => setModal((prev) => !prev);

  return (
    <div>
      <Typography variant="h1" component="div" onClick={toggleModal}>
        {(props.value > 9 ? "" : "0") + props.value}
      </Typography>

      <div style={{ display: "flex" }}>
        <Button variant="outlined" onClick={props.onLess}>
          -
        </Button>
        <Button variant="outlined" onClick={props.onMore}>
          +
        </Button>
      </div>

      <Modal
        open={modal}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: 24,
            p: 4
          }}
        >
          <TextField
            type="number"
            variant="outlined"
            label={props.label}
            value={props.value}
            onInput={props.onInput}
            onChange={props.onChange}
          />
        </Paper>
      </Modal>
    </div>
  );
};

export default FieldInput;
